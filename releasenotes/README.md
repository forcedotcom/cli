# Salesforce CLI v51 Release Notes

Here are the new and changed features in recent updates of Salesforce CLI and the `salesforcedx` plug-in.

We publish the `latest` plug-in and CLI on Thursdays. At the same time we also publish the `latest-rc` release candidate plug-in and CLI. The release candidates contain changes that will likely be in the final official version.

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx plugins --core` to display the version of the installed `salesforcedx` plug-in.

Run `sfdx update` to update both the CLI and the `salesforcedx` plug-in to the latest available version.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update the `salesforcedx` plug-in to ensure that autocomplete works correctly on any new commands.

[Click here for the v50 release notes.](./v50.md)

## 51.1.0 (February 18, 2020) - CLI 7.88.3

* FIX: The command `force:user:create` properly authenticates to a connected app authenticated with Web Flow login

## 51.0.2 (February 18, 2020) - CLI 7.88.3

Welcome to the first release of version 51 of the `salesforcedx` CLI plug-in in Spring '21.

### Installation Notes

Update Salesforce CLI to v51 by running `sfdx update`.

```bash
$ sfdx update
```

If you are installing Salesforce CLI for the first time, see [Install Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli) to install the CLI for your operating system, then run `sfdx update`.

Run `sfdx plugins --core` to display the version of Salesforce CLI and the installed `salesforcedx` plug-in.

```bash
$ sfdx plugins --core

@oclif/plugin-autocomplete 0.3.0 (core)
@oclif/plugin-commands 1.3.0 (core)
@oclif/plugin-help 3.2.2 (core)
@oclif/plugin-not-found 1.2.4 (core)
@oclif/plugin-plugins 1.9.5 (core)
@oclif/plugin-update 1.4.0-2 (core)
@oclif/plugin-warn-if-update-available 1.7.0 (core)
@oclif/plugin-which 1.0.3 (core)
@salesforce/sfdx-trust 3.6.0 (core)
alias 1.1.5 (core)
auth 1.4.8 (core)
config 1.2.4 (core)
generator 1.1.5 (core)
salesforcedx 51.0.2 (core)                    // salesforcedx plug-in version
├─ limits 1.0.3 (core)
├─ user 1.1.0 (core)
├─ schema 1.0.3 (core)
├─ apex 0.1.4 (core)
├─ templates 51.1.0 (core)
├─ custom-metadata 1.0.11 (core)
├─ @salesforce/sfdx-plugin-lwc-test 0.1.7 (core)
└─ salesforce-alm 51.0.1 (core)
sfdx-cli 7.88.3 (core)                        // Salesforce CLI version
telemetry 1.1.1 (core)
```

### Uninstall the Pre-Release Version of the salesforcedx CLI Plug-In

If you installed the pre-release version of the `salesforcedx` plug-in, uninstall it and update the CLI. We’re no longer updating the pre-release and will be removing the tag.

```bash
$ sfdx plugins:uninstall salesforcedx
$ sfdx update
```

### The Salesforce CLI platform installers now install nodejs v14 LTS
The platform installers for Salesforce CLI (Windows, Linux and Mac OS X) now install nodejs v14 LTS.

### Salesforce CLI has dropped support for nodejs v8
Nodejs v8 has reached end-of-life and is no longer maintained. Salesforce CLI supports nodejs engine v10 or greater.

### New Commands

No new commands have been added in release v51.

### Removed Commands

These commands were removed in v51. The ISV Hammer test closed pilot program has been terminated.

* `force:package:hammertest:list`
* `force:package:hammertest:report`
* `force:package:hammertest:run`

### New Parameters

* `force:mdapi:deploy --soapdeploy`

  The `soapdeploy` parameter will cause the metadata deploy to use the SOAP API, instead of the REST API.

* `force:package:create --orgdependent`

  For unlocked packages only, allows the package to depend on unpackaged metadata in the installation org.

### Removed Parameters

* `force:org:shape:create`

  The `definitionfile` parameter has been removed from this command. This parameter is part of the org shape feature which is currently in beta. We removed the parameter based on feedback from users that they preferred storing the org shape in the shape source org rather than in a scratch definition file.

### Second Generation Packaging

* The `force:pacakge:version:report --verbose` command displays the release version stamped on a package version.

* We've enhanced the package version CLI commands to support component deletion.
  * If `force:package:version:create` completes successfully, and metadata has been removed from the package version as compared to its ancestor, the command displays a generic warning message about the removed metadata.
  * The command `force:package:version:list --verbose` displays whether metadata was removed.
  * The command `force:package:version:report` displays whether metadata was removed.
  * The command `force:package:version:promote` displays a warning if components have been removed from the version being promoted and --noprompt isn't specified.

### Other Changes

* FIX: We've improved the error message returned when you run `force:user:password:generate` using API version 51.0 and EnableSetPasswordInApi is configured as a security setting in your scratch org definition file. EnableSetPasswordInApi is now a scratch org feature instead of a Metadata API setting. Here's an example of configuring it as a feature in your scratch org definition file:

  `"features": ["EnableSetPasswordInApi","MultiCurrency"],`

  This change is a result of the field `Settings.securitySettings.passwordPolicies.enableSetPasswordInApi` being [removed in version 51.0 of the Metadata API](https://help.salesforce.com/articleView?id=release-notes.rn_api_meta.htm&type=5&release=230).  (GitHub issue [#798](https://github.com/forcedotcom/cli/issues/798))

* FIX: The `force:user:password:generate` no longer fails when generating a password for a user that does not have access to Profile Standard Object.

* FIX: The output of `force:user:create` with `--json` now matches previous version.

* FIX: Command `force:source:deploy` no longer fails with "The org cannot be found" after a successful login.

* FIX: The password generator in @salesforce/core now reliably produces passwords that meet Salesforce password policies.

