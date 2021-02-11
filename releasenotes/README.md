# Salesforce CLI v51 Release Notes

Here are the new and changed features in recent updates of Salesforce CLI and the `salesforcedx` plug-in.

We publish the `latest` plug-in and CLI on Thursdays. At the same time we also publish the `latest-rc` release candidate plug-in and CLI. The release candidates contain changes that will likely be in the final official version.

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx plugins --core` to display the version of the installed `salesforcedx` plug-in.

Run `sfdx update` to update both the CLI and the `salesforcedx` plug-in to the latest available version.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update the `salesforcedx` plug-in to ensure that autocomplete works correctly on any new commands.

[Click here for the v50 release notes.](./v50.md)

## 51.0.1 (February 18, 2020) - CLI 7.88.0

Welcome to the first release of version 50 of the `salesforcedx` CLI plug-in in Spring '21.

### Installation Notes

Update Salesforce CLI to v50 by running `sfdx update`.

```bash
$ sfdx update
```

If you are installing Salesforce CLI for the first time, see [Install Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli) to install the CLI for your operating system, then run `sfdx update`.

Run `sfdx plugins --core` to display the version of Salesforce CLI and the installed `salesforcedx` plug-in.

```bash
$ sfdx plugins --core

@oclif/plugin-autocomplete 0.1.5 (core)
@oclif/plugin-commands 1.3.0 (core)
@oclif/plugin-help 3.2.0 (core)
@oclif/plugin-not-found 1.2.4 (core)
@oclif/plugin-plugins 1.9.0 (core)
@oclif/plugin-update 1.3.10 (core)
@oclif/plugin-warn-if-update-available 1.7.0 (core)
@oclif/plugin-which 1.0.3 (core)
@salesforce/sfdx-trust 3.4.3 (core)
alias 1.1.2 (core)
config 1.1.8 (core)
generator 1.1.3 (core)
salesforcedx 50.1.1 (core)                    // salesforcedx plug-in version
├─ templates 50.1.0 (core)
├─ custom-metadata 1.0.10 (core)
├─ @salesforce/sfdx-plugin-lwc-test 0.1.7 (core)
├─ apex 0.1.0 (core)
└─ salesforce-alm 50.1.1 (core)
sfdx-cli 7.76.1 (core)                        // Salesforce CLI version
```

### Uninstall the Pre-Release Version of the salesforcedx CLI Plug-In

If you installed the pre-release version of the `salesforcedx` v50 plug-in, uninstall it and update the CLI. We’re no longer updating the pre-release v50 plug-in.

```bash
$ sfdx plugins:uninstall salesforcedx
$ sfdx update
```

### The sfdx CLI platform installers now install nodejs v14 LTS
The platform installers for sfdx CLI (Windows, Linux and Mac OS X) now install nodejs v14 LTS.

### Salesforce DX NPM modules for CLI plugins and libraries have dropped support for nodejs v8
Nodejs v8 has reached end-of-life and is no longer maintained. Salesforce DX NPM modules support nodejs engine v10 or greater

### New Commands

No new commands have been added in release v51.

### Removed Commands

These commands were removed in v51. The Hammer Test closed pilot program has been terminated.

* `force:package:hammertest:list`
* `force:package:hammertest:report`
* `force:package:hammertest:run`

### New Parameters

* `force:mdapi:deploy --soapdeploy`

  The `soapdeploy` parameter will cause the metadata deploy to use the SOAP API, instead of the REST API.

### Deprecated Parameters

* `force:org:shape:create`

  The `definitionfile` parameter has been removed from this command.

### Second Generation Packaging

* The release version stamped on a package version is now available in the response of command `force:package:version:report` when the user specifies the `--verbose` parameter.

* Package version CLI commands are enhanced to support component deletion
  * If force:package:version:create completes successfully and if any metadata has been removed from the package version in comparison to its ancestor, a generic warning message is shown in the `force:package:version:create` output highlighting that some metadata was removed.
  * Command `force:package:version:list` displays this info (boolean, whether or not metadata was removed) when used with --verbose param
  * Command `force:package:version:report` displays this info (boolean, whether or not metadata was removed).
  * Command `force:package:version:promote` displays a warning if the version being promoted contains removed components and if --noprompt is not specified.

### Other Changes

* FIX: The `force:user:password:generate` no longer fails whe run against Spring '21 release of Salesforce.

  The cause of the error, "The requested Resource does not exist API 51.0", is due the deprecation of a security setting, "enableSetPasswordInApi", a scratch org required in order to generate a password.

  Starting in Spring '21, EnableSetPasswordInApi is a feature in your scratch org definition file and not a setting.

* FIX: The `force:user:password:generate` no longer fails when generating a password for a user that does not have access to Profile Standard Object.


* As [previously announced](./v49.md#49140-october-8-2020), we've reorganized the Salesforce DX Developer and Setup Guides to improve their usability and better align with how the Salesforce developer tools have evolved over time. In particular, we've moved most of the CLI Configuration and Tips topics to the [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) and the Dev Hub topics to the [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm). You might need to refresh your bookmarks.

  **TIP**: If a bookmark to one of these guides no longer works, try changing the first two `setup` parts of the URL to `dev`, or vice versa. For example, the old URL to the CLI Runtime Configuration Values topic was:

  `https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_cli_config_values.htm`

  Now it's:

  `https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_config_values.htm`
