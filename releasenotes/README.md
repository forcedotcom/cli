# Salesforce CLI Release Notes

Here are the new and changed features in recent updates of Salesforce CLI.

We publish a new stable version of Salesforce CLI on Wednesdays. At the same time we also publish a release candidate that contains changes that will likely be in next week's stable release. We also publish nightly releases every night. Run `sf version` to display the version installed on your computer. 

**IMPORTANT**: Are you still using `sfdx` (v7)?  If so, we recommend that you move to `sf` (v2). It's easy: simply uninstall `sfdx` and then install `sf`. See the [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_move_to_sf_v2.htm) (available July 12, 2023) for details, including how to update your continuous integration (CI) scripts. We've also updated the entire Setup Guide to assume you're using `sf` (v2) and the `sf`-style CLI commands and configuration. 

If you installed Salesforce CLI using the installers or TAR files, run `sf update stable` to update to the latest available stable version. Run `sf update stable-rc` to update to this week's release candidate and `sf update nightly` to update to the most recent nightly. 

If you installed Salesforce CLI using `npm`, run `npm install @salesforce/cli@latest --global` to install the latest stable version. Run `npm install @salesforce/cli@latest-rc --global` to install the release candidate and `npm install @salesforce/cli@nightly --global` to install the recent nightly.

For all installation methods, see [this document](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli_olderversions) to install an old Salesforce CLI release.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sf autocomplete --refresh-cache` after you update Salesforce CLI to ensure that autocomplete works correctly on any new commands.

Report and read about issues [here](https://github.com/forcedotcom/cli/issues). Join the discussion about new features we're considering [here](https://github.com/forcedotcom/cli/discussions). 

Looking for the release notes for previous Salesforce CLI releases?  See [`sfdx` (v7)](./sfdx/README.md) and [`sf` (v1)](./sf/README.md).

Additional documentation:

* [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
* [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
* [Salesforce CLI Plugin Developer Guide](https://github.com/salesforcecli/cli/wiki/Quick-Introduction-to-Developing-sf-Plugins)
* [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)

## 2.0.2 (July 12, 2023) [stable]

Welcome to the GA of `sf` (v2)! 

Check out [this blog post](https://developer.salesforce.com/blogs/2023/07/salesforce-cli-sf-v2-is-here) (available July 12, 2023) for information about this new Salesforce CLI version. 

We recommend that you start using the `sf`-style CLI commands soon, such as `sf org create scratch`. Don't worry, the `sfdx`-style commands continue to work just fine, such as `sfdx force:org:create`. But we think you'll like the new ones better. See [this document](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_migrate.htm) for migration information. We're in the process of updating the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm) to show `sf`-style examples and usage. 

We hope you enjoy `sf` (v2)!  And now on to our regular ole release notes. 

----------------------------------------------------

ANNOUNCEMENT: If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

* FIX: When you run `org delete scratch | sandbox` to delete your default org, the CLI now also unsets the `target-org` configuration variable (if set) and any aliases which point to the deleted org.  (sfdx-core PR [#874](https://github.com/forcedotcom/sfdx-core/pull/874))

* FIX: The `package version create` command now correctly displays an error if the `definitionFile` parameter of `packageDirectories` in the `sfdx-project.json` file is set to an incorrect file location. Previously the command would fail silently.  (GitHub issue [#2193](https://github.com/forcedotcom/cli/issues/2193), plugin-packaging PR [#364](https://github.com/salesforcecli/plugin-packaging/pull/364))
