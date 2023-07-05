# Salesforce CLI Release Notes

We publish a new stable version of Salesforce CLI on Wednesdays. At the same time we also publish a release candidate which contains changes that will likely be in next week's stable release. We also publish nightly releases every night. Run `sf version` to display the version installed on your computer. 

If you installed Salesforce CLI using the installers or TAR files, run `sf update` to update to the latest available stable version. Check out these other update options:

* Run `sf update stable-rc` to update to this week's release candidate and `sf update nightly` to update to the most recent nightly. To return to the stable version, run `sf update stable`. 
* Use the `--version` flag to update to an older version, such as `sf update --version 2.0.1`.  
* Use the `--available` flag to view all available older versions you can update to or `-interactive` to update interactively.

If you installed using `npm`:

* Run `npm install @salesforce/cli@latest --global` to install the latest stable version.
* Run `npm install @salesforce/cli@latest-rc --global` to install the release candidate.
* Run `npm install @salesforce/cli@nightly --global` to install the recent nightly.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sf autocomplete --refresh-cache` after you update Salesforce CLI to ensure that autocomplete works correctly on any new commands.

Report and read about issues [here](https://github.com/forcedotcom/cli/issues). Join the discussion about new features we're considering [here](https://github.com/forcedotcom/cli/discussions). 

Release notes for previous releases:

* [`sfdx` (v7)](./sfdx/README.md)
* [`sf` (v1)](./sf/README.md)

Additional documentation:

* [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
* [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
* [Salesforce CLI Plugin Developer Guide](https://github.com/salesforcecli/cli/wiki/Quick-Introduction-to-Developing-sf-Plugins)
* [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)

## 2.0.1 (July 12, 2023) [stable-rc]

Welcome to the GA of `sf` (v2)!
