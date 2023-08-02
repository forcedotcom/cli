# Description

This is an issue-only and releases notes repository for Salesforce CLI. We monitor this repo for feedback from the community about Salesforce CLI and we post proposals for CLI changes we're working on see what you think. 

If you have a feature or enhancement request for Salesforce CLI, first review the [existing discussions](https://github.com/forcedotcom/cli/discussions) to see if someone has already requested it. If you don't see your feature or enhancement, click the **New discussion** button to create a new request. 

Similarly, if you've encountered a bug with Salesforce CLI, check out the [existing issues](https://github.com/forcedotcom/cli/issues) to see if it's already been reported. If you don’t see your bug listed, click the **New issue** button to create one. 

NOTICE: GitHub isn't a mechanism for receiving support under any agreement or SLA. If you require immediate assistance, use official Salesforce customer support channels.

# Contributing

If you are interested in contributing, take a look at the [CONTRIBUTING](.github/CONTRIBUTING.md) guide.

When contributing to Github Actions, modify the `.github/actions/**/src` files. A pre-commit hook will build and commit the compiled `lib` files. When adding a new action, add the path to the `references` in the base `tsconfig.json` file.

# A note on CLI Unification

On July 2023 we [announced the General Availability (GA)](https://developer.salesforce.com/blogs/2023/07/salesforce-cli-sf-v2-is-here) of the `sf` (v2), which is the culmination of our CLI unification efforts which started with [`sf` (v1)](https://developer.salesforce.com/blogs/2021/06/announcing-salesforce-cli-unification). `sf` (v2) is smart enough to understand all your `sfdx` commands, as well as the `sf` commands, with much faster install and update times. The `sf` (v2) CLI is everything that is `sf` and `sfdx`. After you install `sf` (v2), you’ll have access to all the `sfdx` and `sf` commands, and you can continue to run any of them.

# Salesforce DX and CLI Documentation 

* _[Release Notes](./releasenotes/README.md)_ - Read about the new and changed features in recent weekly updates to Salesforce CLI. 
* _[Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)_ - How to install, update, and configure Salesforce CLI. 
* _[Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)_ - Step-by-step guide on how to use the Salesforce DX tools.
* _[Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)_ - Complete reference documentation for all Salesforce CLI commands.
* _[sf Plugin Developer Guide](https://github.com/salesforcecli/cli/wiki/Quick-Introduction-to-Developing-sf-Plugins)_ - Learn how to create your own custom plugin which contains CLI commands that address your specific needs.
* [Build Apps Together with Package Development](https://trailhead.salesforce.com/en/content/learn/trails/sfdx_get_started) - Step-by-step Trailhead trail of tutorials for the Salesforce DX tools.
* [Salesforce Developers Blog](https://developer.salesforce.com/blogs/) 

# The up-to-date list of CLI [Repositories](https://github.com/salesforcecli/status) 
