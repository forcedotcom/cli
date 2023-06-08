const fs = require("fs");
const path = require("path");
const { getInput, setOutput, setFailed } = require("@actions/core");
const { context, getOctokit } = require("@actions/github");
const execSync = require("child_process").execSync;
const semver = require("semver");

(async function() {
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

    const { body } = issue;

    const sfVersionRegex = "@salesforce/cli/([0-9]+.[0-9]+.[0-9]+(-[a-zA-Z0-9]+.[0-9]+)?)";
    const sfdxVersionRegex = "sfdx-cli/([0-9]+.[0-9]+.[0-9]+(-[a-zA-Z0-9]+.[0-9]+)?)";
    const pluginVersionsRegex = "pluginVersions|Plugin Version:";

    const sfVersion = body.match(sfVersionRegex)?.[1];
    const sfdxVersion = body.match(sfdxVersionRegex)?.[1];
    const pluginVersionsIncluded = body.match(pluginVersionsRegex);

    if ((sfVersion || sfdxVersion) && pluginVersionsIncluded) {
      // FUTURE TODO:
      // - Check for bundled plugins that are user installed (user) or linked (link)
      // - Could do a check to see if the users has a prerelease version installed

      if (sfVersion && sfVersion.startsWith("1.")) {
        // TODO: Eventually suggest using sf@v2
        const { old, latest } = compareVersions("@salesforce/cli", sfVersion);

        if (old) {
          const oldSf = getFile("./messages/old-cli.md", { THE_USER: issue.user.login, USER_CLI: "sf", USER_VERSION: sfVersion, LATEST_VERSION: latest });
          postComment(oldSf);
          addMoreInfoLabel();
        }
      }
      if (sfdxVersion && sfdxVersion.startsWith("7.")) {
        // TODO: Eventually suggest using sf@v2
        const { old, latest } = compareVersions("sfdx-cli", sfdxVersion);

        if (old) {
          const oldSfdx = getFile("./messages/old-cli.md", { THE_USER: issue.user.login, USER_CLI: "sfdx", USER_VERSION: sfdxVersion, LATEST_VERSION: latest });
          postComment(oldSfdx);
          addMoreInfoLabel();
        }
      }

      return;
    } else {
      const message = getFile("./messages/provide-version.md", { THE_USER: issue.user.login });
      postComment(message);
      addMoreInfoLabel();
    }

    // ---------
    // FUNCTIONS
    // ---------
    async function postComment(body) {
      const { data: comments } = await octokit.rest.issues.listComments({ owner, repo, issue_number });

      // Check that this comment has not been previously commented
      if (comments.length) {
        if (comments.some((comment) => comment.body === body)) {
          console.log("Already commented");
          return;
        }
      }

      return octokit.rest.issues.createComment({ owner, repo, issue_number, body });
    }

    function addMoreInfoLabel() {
      return octokit.rest.issues.addLabels({
        owner,
        repo,
        issue_number,
        labels: ["more information needed"],
      });
      return;
    }

    function compareVersions(plugin, installed) {
      const distTags = execSync(`npm view ${plugin} dist-tags --json`).toString();
      const latest = JSON.parse(distTags).latest;
      const old = semver.lt(installed, latest);

      return {
        old,
        latest,
      };
    }

    function getFile(filename, replacements) {
      const contents = fs.readFileSync(path.join(__dirname, filename), "utf8");
      return Object.entries(replacements || {}).reduce((acc, [key, value]) => {
        return acc.replace(new RegExp(key, "g"), value);
      }, contents);
    }
  } catch (error) {
    setFailed(error.message);
  }
})();
