/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { execSync } from "child_process";
import * as semver from "semver";
import { readFileSync } from "fs";
import * as path from "path";

async function run() {
  try {
    // Uncomment for local testing
    // const issue = JSON.parse(getFile("../mock/sample-context.json"));
    const issue = context.payload.issue;

    if (!issue) {
      setFailed("github.context.payload.issue does not exist");
      return;
    }

    // Temporary check to prevent this action from running on old issues
    // This will prevent noise on tickets already being investigated
    // This can be removed once the action has been running for a while
    const creationDate = new Date(issue.created_at);
    const cutoffDate = new Date("2023-06-14T00:00:00Z");
    if (creationDate < cutoffDate) {
      console.log("Issue was created before 6/14/2023, skipping");
      return;
    }

    // Create a GitHub client
    const token = getInput("repo-token");
    const octokit = getOctokit(token);

    // Get owner and repo from context
    // uncomment env var for local testing
    // process.env.GITHUB_REPOSITORY = "iowillhoit/gha-sandbox";
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const issue_number = issue.number;

    console.log("Issue URL:", issue.html_url);

    const { body } = issue;
    const { login: author } = issue.user;
    const { data: comments } = await getAllComments();

    // For version checks, we only care about comments from the author
    const authorComments = comments.filter((comment) => comment?.user?.login === author);
    // Build an array of the issue body and all of the comment bodies
    const bodies = [body, ...authorComments.map((comment) => comment.body)].filter((body): body is string => body !== undefined);

    const sfVersionRegex = /@salesforce\/cli\/([0-9]+.[0-9]+.[0-9]+(-[a-zA-Z0-9]+.[0-9]+)?)/g;
    const sfdxVersionRegex = /sfdx-cli\/([0-9]+.[0-9]+.[0-9]+(-[a-zA-Z0-9]+.[0-9]+)?)/g;
    const pluginVersionsRegex = /pluginVersions|Plugin Version:/;

    // Search all bodies and get an array of all versions found (first capture group)
    const sfVersions = bodies.map((body) => [...body.matchAll(sfVersionRegex)].map((match) => match[1])).flat();
    const sfdxVersions = bodies.map((body) => [...body.matchAll(sfdxVersionRegex)].map((match) => match[1])).flat();
    // If we match pluginVersionRegex anywhere, we assume the user has provided the full --verbose output
    const pluginVersionsIncluded = bodies.some((body) => body?.match(pluginVersionsRegex));

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
          const oldSf = getFile("../messages/old-cli.md", { THE_AUTHOR: author, USER_CLI: "sf", USER_VERSION: sfVersions.join("`, `"), LATEST_VERSION: sfLatest });
          postComment(oldSf);
          valid = false;
        }
      }
      if (sfdxVersions.find((v) => v.startsWith('7.'))) {
        const noOldSfdx = getFile("../messages/noSfdx7.md", { THE_AUTHOR: author });
        postComment(noOldSfdx);
        valid = false;
      }

      if (valid) {
        console.log("All information provided is valid!");
        removeLabel("more information required");
        addLabel("investigating");
        // This label will prevent the action from running again after version info has been confirmed
        // Otherwise, this action will continue to trigger after every weekly release as `latest` is bumped
        addLabel("validated");
      } else {
        console.log("Information provided is NOT valid");
        addLabel("more information required");
        removeLabel("investigating");
      }
    } else {
      console.log("Full version information was not provided");
      const message = getFile("../messages/provide-version.md", { THE_AUTHOR: issue.user.login });
      postComment(message);
      addLabel("more information required");
      removeLabel("investigating");
    }

    // ---------
    // FUNCTIONS
    // ---------
    async function getAllComments() {
      return await octokit.rest.issues.listComments({ owner, repo, issue_number });
    }

    async function postComment(body: string) {
      // Check that this comment has not been previously commented
      if (comments.length) {
        if (comments.some((comment) => comment.body === body)) {
          console.log("Already commented");
          return;
        }
      }

      return await octokit.rest.issues.createComment({ owner, repo, issue_number, body });
    }

    async function addLabel(label: string) {
      await octokit.rest.issues.addLabels({ owner, repo, issue_number, labels: [label] });
    }

    async function removeLabel(label: string) {
      try {
        await octokit.rest.issues.removeLabel({ owner, repo, issue_number, name: label });
      } catch (err) {
        const error = err as Error & { status: number };
        if (error.status === 404) {
          console.log(`Cannot remove label '${label}' since it was not applied`);
          return;
        }
        throw error;
      }
    }

    function getLatestVersion(plugin: string) {
      const distTags = execSync(`npm view ${plugin} dist-tags --json`).toString();
      return JSON.parse(distTags).latest;
    }

    function getFile(filename: string, replacements: { [key: string]: string } | undefined) {
      let contents = readFileSync(path.join(__dirname, filename), "utf8");

      Object.entries(replacements || {}).map(([key, value]) => {
        contents = contents.replaceAll(key, value);
      });

      return contents;
    }
  } catch (err) {
    const error = err as Error;
    setFailed(error.message);
  }
}

run();
