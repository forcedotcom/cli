# Contributing to the Salesforce CLI
Welcome, and thank you for your interest in contributing to the Salesforce CLI!

There are multiple ways you can contribute. Before you get started, please review our [Code of Conduct](CODE_OF_CONDUCT.md) to help us keep our OSS projects a safe and welcoming environment.

### Report an issue
Did you find a bug? First, make sure the bug wasn't already reported by searching on the `issues` section: https://github.com/forcedotcom/cli/issues.
If you cannot find a related issue, then open a new one and follow the bug template. Providing a minimal reproduction is highly encouraged as these help us to quickly identify the root cause of the issue.

### Security
Please report any security issue to security@salesforce.com as soon as it is discovered.

### Pull requests
We accept pull requests for bug fixes and feature requests for any issues labeled with [`help wanted`](https://github.com/forcedotcom/cli/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).
You can leave a comment in the issue you are interested to work on and we will assign it to you.

We work in branches off of `main`, to create a PR you should:

1. Fork the plugin/library repo you want to contribute to.
2. Create a new branch: `git checkout -b fix-bug`
3. Make your changes and ensure all tests pass.
4. [Create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

#### Note:
We use conventional commits in all of our repos. Our CI/CD pipeline relies on each commit type to decide whether or not to publish a new release and we enforce this using a git hook to run `commitlint`, make sure to folow this convention, otherwise `commitlint` will not allow you to commit your change.

Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/#summary

`commitlint`: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

## CLA
External contributors will be required to sign a Contributor's License Agreement. You can do so by going to: https://cla.salesforce.com/sign-cla.

## Building the project

Prerequisites:
* [Node.js](https://nodejs.org/) (recommended: latest active LTS release)
* [Yarn v1](https://classic.yarnpkg.com/) (`npm install --global yarn`)

1. Clone the repo: 
    * `sfdx`: `git clone https://github.com/salesforcecli/sfdx-cli.git`
    * `sf`: `git clone https://github.com/salesforcecli/cli.git`
2. Install dependencies: `yarn install`
3. Build the project: `yarn build`
4. Run the CLI using the `bin/run` executable as:
    * macOS/linux: `bin/run`
    * Windows: `bin\run.cmd`


## Project structure
For the `sf` CLI, see https://github.com/salesforcecli/cli/blob/main/ARCHITECTURE.md

The same architecture document applies for the `sfdx` CLI, but instead the bundled Salesforce plugins in are:

* [plugin-alias](https://github.com/salesforcecli/plugin-alias/)
* [plugin-apex](https://github.com/salesforcecli/plugin-apex/)
* [plugin-auth](https://github.com/salesforcecli/plugin-auth/)
* [plugin-community](https://github.com/salesforcecli/plugin-community/)
* [plugin-config](https://github.com/salesforcecli/plugin-config/)
* [plugin-data](https://github.com/salesforcecli/plugin-data)
* [plugin-generator](https://github.com/forcedotcom/sfdx-plugin-generate)
* [plugin-info](https://github.com/salesforcecli/plugin-info)
* [plugin-limits](https://github.com/salesforcecli/plugin-limits)
* [plugin-org](https://github.com/salesforcecli/plugin-org)
* [plugin-packaging](https://github.com/salesforcecli/plugin-packaging)
* [plugin-schema](https://github.com/salesforcecli/plugin-schema)
* [plugin-signups](https://github.com/salesforcecli/plugin-signups)
* [plugin-telemetry](https://github.com/salesforcecli/plugin-telemetry)
* [plugin-templates](https://github.com/salesforcecli/plugin-templates)
* [plugin-trust](https://github.com/salesforcecli/plugin-trust)
* [plugin-user](https://github.com/salesforcecli/plugin-user)

For an up-to-date list of CLI plugins and libraries, see: https://github.com/salesforcecli/status
