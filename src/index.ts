/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import Webhooks = require('@octokit/webhooks')

const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    // The issue request exists on payload when an issue is created
    // Sets action status to failed when issue does not exist on payload.
    const issue = github.context.payload.issue as Webhooks.EventPayloads.WebhookPayloadIssuesIssue
    if (!issue) {
      core.setFailed('github.context.payload.issue does not exist')
      return
    }

    // Get input parameters.
    const token = core.getInput('repo-token')
    const message = core.getInput('message')
    console.log('message: ' + message)

    // Create a GitHub client.
    const octokit = new github.getOctokit(token)

    // Get owner and repo from context
    const owner = github.context.repo.owner
    const repo = github.context.repo.repo

    // Create a comment on Issue
    // https://octokit.github.io/rest.js/#octokit-routes-issues-create-comment
    console.log('owner: ' + owner)
    console.log('repo: ' + repo)
    console.log('number: ' + issue.number)

    const labels = issue.labels
    let comment: boolean = false

    /////// BEGIN FOR TESTING ONLY - WILL BE REMOVED ON MERGE
    for (let i = 0; i < labels.length; i++) {
      if (labels[i].name == 'test internal') {
        comment = true
        break
      }
    }

    if (!comment) {
      return
    }
    /////// END FOR TESTING ONLY - WILL BE REMOVED ON MERGE

    const response = await octokit.issues.createComment({
      owner,
      repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: issue.number,
      body: message
    })
    console.log('created comment URL: ' + response.data.html_url)

    core.setOutput('comment-url', response.data.html_url)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()