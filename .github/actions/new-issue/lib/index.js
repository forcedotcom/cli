"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2025, Salesforce, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
async function run() {
    try {
        // The issue request exists on payload when an issue is created
        // Sets action status to failed when issue does not exist on payload.
        const issue = github_1.context.payload.issue;
        if (!issue) {
            (0, core_1.setFailed)("github.context.payload.issue does not exist");
            return;
        }
        // Get input parameters.
        const token = (0, core_1.getInput)("repo-token");
        const message = (0, core_1.getInput)("message");
        const label = (0, core_1.getInput)("label");
        console.log("message: ", message);
        console.log("label: ", label);
        // Create a GitHub client.
        const octokit = (0, github_1.getOctokit)(token);
        // Get owner and repo from context
        const owner = github_1.context.repo.owner;
        const repo = github_1.context.repo.repo;
        // Create a comment on Issue
        // https://octokit.github.io/rest.js/#octokit-routes-issues-create-comment
        console.log("owner: " + owner);
        console.log("repo: " + repo);
        console.log("issue number: " + issue.number);
        const issueLabels = issue.labels;
        console.log("issue labels: ", issueLabels);
        // If label is passed in as an input, make sure it is on the issue before posting the message.
        // Otherwise, we want to post message on all issues regardless.
        if (label) {
            if (!issueLabels.find((issueLabel) => issueLabel.name === label)) {
                // We didn't find the label, so don't post on this issue.
                return;
            }
        }
        const { data: comments } = await octokit.rest.issues.listComments({
            owner,
            repo,
            issue_number: issue.number,
        });
        // If we have comments check out that this comment has not been previously commented
        if (comments.length) {
            if (comments.some((comment) => comment.body === message)) {
                console.log("Already commented");
                return;
            }
        }
        const response = await octokit.rest.issues.createComment({
            owner,
            repo,
            // eslint-disable-next-line @typescript-eslint/camelcase
            issue_number: issue.number,
            body: message,
        });
        console.log("created comment URL: " + response.data.html_url);
        (0, core_1.setOutput)("comment-url", response.data.html_url);
    }
    catch (err) {
        const error = err;
        (0, core_1.setFailed)(error.message);
    }
}
run();
//# sourceMappingURL=index.js.map