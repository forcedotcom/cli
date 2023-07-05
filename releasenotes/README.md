# Salesforce CLI Release Notes

We publish a new stable version of Salesforce CLI on Wednesdays. At the same time we also publish a release candidate which contains changes that will likely be in next week's stable release. We also publish nightly releases every night. Run `sf version` to display the version installed on your computer. 

If you installed Salesforce CLI using the installers or TAR files, run `sf update stable` to update to the latest available stable version. Run `sf update stable-rc` to update to this week's release candidate and `sf update nightly` to update to the most recent nightly. 

If you installed Salesforce CLI using `npm`, run `npm install @salesforce/cli@latest --global` to install the latest stable version. Run `npm install @salesforce/cli@latest-rc --global` to install the release candidate and `npm install @salesforce/cli@nightly --global` to install the recent nightly.

For all installation methods, see [this document](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli_olderversions) to install an old Salesforce CLI release.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sf autocomplete --refresh-cache` after you update Salesforce CLI to ensure that autocomplete works correctly on any new commands.

Report and read about issues [here](https://github.com/forcedotcom/cli/issues). Join the discussion about new features we're considering [here](https://github.com/forcedotcom/cli/discussions). 

Want the release notes for previous releases?  See [`sfdx` (v7)](./sfdx/README.md) and [`sf` (v1)](./sf/README.md).

Additional documentation:

* [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
* [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
* [Salesforce CLI Plugin Developer Guide](https://github.com/salesforcecli/cli/wiki/Quick-Introduction-to-Developing-sf-Plugins)
* [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)

## 2.0.6 (July 19, 2023) [stable-rc]

Welcome to the GA of `sf` (v2)! Read [this blog post](TBD) for product information and background about this new version. 

Have you moved from `sfdx` (v7) to `sf` (v2) yet? We highly recommend you do it soon. It's easy: simply uninstall `sfdx` and then install `sf`. See the [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_release_notes.htm) for details, including how to update your continuous integration (CI) scripts. BTW, we've updated the entire guide to assume you're using `sf` (v2) and the `sf`-style CLI commands and configuration. 

We recommend that you start using the `sf`-style CLI commands soon, such as `sf org create scratch`. Don't worry, the `sfdx`-style commands, such as `sfdx force:org:create`, continue to work just fine. But we think you'll like the new ones better. See [this document](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_migrate.htm) for migration information. We're in the process of updating the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm) to show `sf`-style examples and usage. 

We hope you enjoy `sf` (v2)!  And now on to our regular ole release notes. 

----------------------------------------------------

ANNOUNCEMENT: If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.
