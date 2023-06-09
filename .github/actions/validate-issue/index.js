const fs = require("fs");
const path = require("path");
const { getInput, setOutput, setFailed } = require("@actions/core");
const { context, getOctokit } = require("@actions/github");
const execSync = require("child_process").execSync;
const semver = require("semver");

async function run() {
  try {
    // Set this env var to true to test locally
    // Example: GHA_VALIDATE_ISSUE_LOCAL=true node .github/actions/validate-issue/index.js
    const local = process.env.GHA_VALIDATE_ISSUE_LOCAL;
    const issue = local ? JSON.parse(getFile("./sample-context.json")) : context.payload.issue;

    if (!issue) {
      setFailed("github.context.payload.issue does not exist");
      return;
    }

    const token = local ? process.env.GH_TOKEN : getInput("repo-token");

    // Create a GitHub client
    const octokit = getOctokit(token);

    // Get owner and repo from context
    if (local) process.env.GITHUB_REPOSITORY = "iowillhoit/gha-sandbox";
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const issue_number = issue.number;

    console.log("Issue URL:", issue.html_url);

    const { body } = issue;
    const { login: author } = issue.user;
    const { data: comments } = await getAllComments();

    // For version checks, we only care about comments from the author
    const authorComments = comments.filter((comment) => comment.user.login === author);
    // Build an array of the issue body and all of the comment bodies
    const bodies = [body, ...authorComments.map((comment) => comment.body)];

    const sfVersionRegex = /@salesforce\/cli\/([0-9]+.[0-9]+.[0-9]+(-[a-zA-Z0-9]+.[0-9]+)?)/g;
    const sfdxVersionRegex = /sfdx-cli\/([0-9]+.[0-9]+.[0-9]+(-[a-zA-Z0-9]+.[0-9]+)?)/g;
    const pluginVersionsRegex = /pluginVersions|Plugin Version:/;

    // Search all bodies and get an array of all versions found (first capture group)
    const sfVersions = bodies.map((body) => [...body.matchAll(sfVersionRegex)].map((match) => match[1])).flat();
    const sfdxVersions = bodies.map((body) => [...body.matchAll(sfdxVersionRegex)].map((match) => match[1])).flat();
    // If we match pluginVersionRegex anywhere, we assume the user has provided the full --verbose output
    const pluginVersionsIncluded = bodies.some((body) => body.match(pluginVersionsRegex));

    console.log("sfVersions", sfVersions);
    console.log("sfdxVersions", sfdxVersions);
    console.log("pluginVersionsIncluded", pluginVersionsIncluded);

    if ((sfVersions.length > 0 || sfdxVersions.length > 0) && pluginVersionsIncluded) {
      // FUTURE TODO:
      // - Check for bundled plugins that are user installed (user) or linked (link)
      // - Could do a check to see if the users has a prerelease version installed
      let valid = true;

      if (sfVersions.length > 0) {
        const sfLatest = getLatestVersion("@salesforce/cli");
        const oneSatisfies = sfVersions.some((version) => semver.gte(version, sfLatest));

        if (!oneSatisfies) {
          const oldSf = getFile("./messages/old-cli.md", { THE_AUTHOR: author, USER_CLI: "sf", USER_VERSION: sfVersions.join("`, `"), LATEST_VERSION: sfLatest });
          postComment(oldSf);
          valid = false;
        }
      }
      if (sfdxVersions.length > 0) {
        // TODO: Eventually suggest using sf@v2, a new md template could be created
        const sfdxLatest = getLatestVersion("sfdx-cli");
        const oneSatisfies = sfdxVersions.some((version) => semver.gte(version, sfdxLatest));

        if (!oneSatisfies) {
          const oldSfdx = getFile("./messages/old-cli.md", { THE_AUTHOR: author, USER_CLI: "sfdx", USER_VERSION: sfdxVersions.join("`, `"), LATEST_VERSION: sfdxLatest });
          postComment(oldSfdx);
          valid = false;
        }
      }

      if (valid) {
        console.log("All information provided is valid!");
        removeLabel("more information needed");
        addLabel("investigating");
        // This label will prevent the action from running again after version info has been confirmed
        // Otherwise, this action will continue to trigger after every weekly release as `latest` is bumped
        addLabel("validated");
      } else {
        console.log("Information provided is NOT valid");
        addLabel("more information needed");
        removeLabel("investigating");
      }
    } else {
      console.log("Full version information was not provided");
      const message = getFile("./messages/provide-version.md", { THE_AUTHOR: issue.user.login });
      postComment(message);
      addLabel("more information needed");
      removeLabel("investigating");
    }

    // ---------
    // FUNCTIONS
    // ---------
    async function getAllComments() {
      return await octokit.rest.issues.listComments({ owner, repo, issue_number });
    }

    async function postComment(body) {
      // Check that this comment has not been previously commented
      if (comments.length) {
        if (comments.some((comment) => comment.body === body)) {
          console.log("Already commented");
          return;
        }
      }

      return await octokit.rest.issues.createComment({ owner, repo, issue_number, body });
    }

    async function addLabel(label) {
      await octokit.rest.issues.addLabels({ owner, repo, issue_number, labels: [label] });
    }

    async function removeLabel(label) {
      try {
        await octokit.rest.issues.removeLabel({ owner, repo, issue_number, name: label });
      } catch (error) {
        if (error.status === 404) {
          console.log(`Cannot remove label '${label}' since it was not applied`);
          return;
        }
        throw error;
      }
    }

    function getLatestVersion(plugin) {
      const distTags = execSync(`npm view ${plugin} dist-tags --json`).toString();
      return JSON.parse(distTags).latest;
    }

    function getFile(filename, replacements) {
      let contents = fs.readFileSync(path.join(__dirname, filename), "utf8");

      Object.entries(replacements || {}).map(([key, value]) => {
        contents = contents.replaceAll(key, value);
      });

      return contents;
    }
  } catch (error) {
    setFailed(error.message);
  }
}

run();
