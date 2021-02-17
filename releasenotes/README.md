# Salesforce CLI v51 Release Notes

Here are the new and changed features in recent updates of Salesforce CLI and the `salesforcedx` plug-in.

We publish the `latest` plug-in and CLI on Thursdays. At the same time we also publish the `latest-rc` release candidate plug-in and CLI. The release candidates contain changes that will likely be in the final official version.

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx plugins --core` to display the version of the installed `salesforcedx` plug-in.

Run `sfdx update` to update both the CLI and the `salesforcedx` plug-in to the latest available version.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update the `salesforcedx` plug-in to ensure that autocomplete works correctly on any new commands.

[Click here for the v50 release notes.](./v50.md)

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
Nodejs v8 has reached end-of-life and is no longer maintained. Salesforce CLI supports nodejs engine v10 or greater

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

### Deprecated Parameters

* `force:org:shape:create`

  The `definitionfile` parameter has been removed from this command. This parameter is part of the Org Shape feature which is currently in beta and has been removed based on feedback that users prefer storing Org Shape in the shape source org instead of a scratch definition file.

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
