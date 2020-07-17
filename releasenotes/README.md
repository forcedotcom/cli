# Salesforce CLI v49 Release Notes

## 49.2.3 (July 18, 2020) 

Welcome to the first release of version 49 of the `salesforcedx` CLI plug-in in Summer '20. 

[Click here for the v48 release notes.](./v48.md)

### Installation Notes

Update Salesforce CLI to v49 by running `sfdx update` or any CLI command.

```bash
$ sfdx update
```

If you are installing Salesforce CLI for the first time, see [Install Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli) to install the CLI for your operating system, then run `sfdx update`.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update the `salesforcedx` plug-in to ensure that autocomplete works correctly on any new commands.

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx plugins --core` to display the version of the installed `salesforcedx` plug-in.

### Uninstall the Pre-Release Version of the salesforcedx CLI Plug-In

If you installed the pre-release version of the `salesforcedx` v49 plug-in to test the next version of Salesforce CLI, uninstall it and update the CLI. We’re no longer updating the pre-release v49 plug-in.

```bash
$ sfdx plugins:uninstall salesforcedx
$ sfdx update
```

### New Parameter

* `force:package:create --orgdependent` (beta)

  For unlocked packages only, allows the package to depend on unpackaged metadata in the installation org.

  **Note**: As a beta feature, Org-Dependent Unlocked Packages is a preview and isn’t part of the “Services” under your master subscription agreement with Salesforce. Use this feature at your sole discretion, and make your purchase decisions only on the basis of generally available products and features. Salesforce doesn’t guarantee general availability of this feature within any particular time frame or at all, and we can discontinue it at any time. This feature is for evaluation purposes only, not for production use. It’s offered as is and isn’t supported, and Salesforce has no liability for any harm or damage arising out of or in connection with it. All restrictions, Salesforce reservation of rights, obligations concerning the Services, and terms for related Non-Salesforce Applications and Content apply equally to your use of this feature. You can provide feedback and suggestions for Org-Dependent Unlocked Packages in the [Trailblazer Community](https://success.salesforce.com/_ui/core/chatter/groups/GroupProfilePage?g=0F93A000000Lg5USAS).

### Deprecated Commands

These commands are deprecated in v49. Use the `force:lightning:lwc:test:*` commands instead.

* `force:lightning:test:create`
* `force:lightning:test:install`
* `force:lightning:test:run`

These commands continue to be deprecated in v49; they were first deprecated in v48 and will be removed in a future release. Use `sfdx commands` instead, which produces similar output.

* `force:doc:commands:list`
* `force:doc:commands:display`

## Other Changes

* We've upgraded the CLI's version of Node.js to 12.13.0.
* The `force:org:clone` and `force:org:status` sandbox CLI commands are generally available. The commands were beta in v48.
