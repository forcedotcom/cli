# Salesforce CLI v50 Release Notes

Here are the new and changed features in recent updates of Salesforce CLI and the `salesforcedx` plug-in. 

We publish the `latest` plug-in and CLI on Thursdays. At the same time we also publish the `latest-rc` release candidate plug-in and CLI. The release candidates contain changes that will likely be in the final official version. 

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx plugins --core` to display the version of the installed `salesforcedx` plug-in.

Run `sfdx update` to update both the CLI and the `salesforcedx` plug-in to the latest available version.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update the `salesforcedx` plug-in to ensure that autocomplete works correctly on any new commands.

[Click here for the v49 release notes.](./v49.md)

## November 19, 2020

These changes are in the release candidate plug-in (`salesforcedx@latest-rc`). We plan to include these changes in next week's official release. This list isn't final and is subject to change. 

* FIX: The `force:source:push|pull|status|deploy|retrieve` commands work with duplicate rules. Previously you'd get the message `No results found` and the rule wouldn't be recognized by the `source` commands.    (GitHub issue [#685](https://github.com/forcedotcom/cli/issues/685))

## 50.5.0 (November 12, 2020) - CLI 7.80.0

* CHANGE: The `force:apex:log:list` command displays results in descending order. Previously it displayed results in ascending order. (Salesforce Extensions for VS Code GitHub issue [#2698](https://github.com/forcedotcom/salesforcedx-vscode/issues/2698)) 

* FIX: The `force:source:convert` command works on custom labels. Previously you'd get the error `ERROR running force:source:convert: The package root directory is empty`. (GitHub issue [#684](https://github.com/forcedotcom/cli/issues/684))

* FIX: The `force:source:convert` and `force:source:deploy` commands work with the EmailTemplate and EmailFolder metadata types. Previously you’d get an error such as `Cannot find folder: ExampleFolder`. (GitHub issue [#609](https://github.com/forcedotcom/cli/issues/609) and [#612](https://github.com/forcedotcom/cli/issues/612))


## November 5, 2020

* We aren't releasing a Salesforce CLI patch this week.

## 50.3.1 (October 29, 2020) - CLI 7.78.1

* FIX: We fixed various issues with the `.forceignore` file and it works as expected. In particular, we updated the version dependencies of the core plug-in libraries and improved how the CLI handles trailing slashes in file entries. ([GitHub issue #690](../../../issues/690))

## 50.2.0 (October 22, 2020) - CLI 7.77.1

* NEW: As part of [open-sourcing Salesforce CLI](https://developer.salesforce.com/blogs/2020/05/open-sourcing-salesforce-cli.html), we've broken out the source for the authorization commands, such as `force:auth:jwt:grant`, into their own [GitHub repo](https://github.com/salesforcecli/plugin-auth). These commands are now in the `auth` namespace. For example: 

    `$ sfdx auth:jwt:grant -u me@my.org -f ./server.key -i 345234`
    
     As we broke out the commands, we took the opportunity to also refactor the code. We’re keeping the current `force:auth:*` commands based on the original code. Test out the new commands and let us know if they behave differently or unexpectedly. We plan to alias the `force:auth:*` commands to the new `auth:*` commands in the future. Update your CI/CD scripts and let us know if you run into any issues with the new commands.

* CHANGE: The following org shape commands are now beta; they were pilot in v49.

  * `force:org:shape:create`
  * `force:org:shape:delete`
  * `force:org:shape:list`

* CHANGE:  A clarification to last week’s [`.forceignore` release note](#other-changes): To start using the new internal parser that follows the `.gitignore` patterns and rules, add this line to the top of your `.forceignore` file:

    `# .forceignore v2`

    If you don't add this line to your `.forceignore` file, the `force:source:*` commands continue to use the old parser.  The commands warn you about invalid entries so you can start updating them at your convenience. 

* FIX: These release notes now include the version of the CLI npm package (`sfdx-cli`) released each week, such as 7.77.1. ([GitHub issue #683](../../../issues/683))

## 50.1.1 (October 17, 2020) - CLI 7.76.1

Welcome to the first release of version 50 of the `salesforcedx` CLI plug-in in Winter '21. 

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

### New Commands

* `force:package:version:displayancestry`

    Create visualizations of your package or package version's ancestry tree. View the visualization in Salesforce CLI or use the `--dotcode` parameter to generate output that you can use in graph visualization software.

* `force:package:version:delete`
* `force:package:delete`

    Deletes the package or package version.

    You can't recover deleted packages or package versions, or specify them as dependencies. New installations of the package will fail. You can’t delete released versions of second-generation managed packages.

### Removed Commands

These commands were deprecated in v49 and removed in v50.  You can continue using them by installing the [Lightning Testing Service CLI Plug-in](https://github.com/forcedotcom/plugin-lightning-test-service). Salesforce doesn't support or update this plug-in.

* `force:lightning:test:install`
* `force:lightning:test:run`

### New Parameters

* `force:package:create --errornotificationusername (-o)`
* `force:package:update --errornotificationusername (-o)`

    Designate an active Dev Hub org user to receive email notifications for unhandled Apex exceptions, as well as install, upgrade, or uninstall failures associated with your packages. Specify the username during package creation, or when you update the package with the `force:package:update` command.

### Other Changes

* When parsing the `.forceignore` file, Salesforce CLI uses the same rules and patterns as [git uses with the `.gitignore` file](https://git-scm.com/docs/gitignore). As a result, some entries in your existing `.forceignore` files might be invalid. The `force:source:*` commands warn you about any invalid entries.  

* FIX: The `force:source:convert` command works correctly when you individually convert two or more custom fields of the same custom object.  

    For example, let’s say your custom object Flower__c has two custom fields: Color__c and Size__c. Previously, this command would convert only one custom field, now it correctly converts all specified fields:

    ```bash
    $ sfdx force:source:convert -m CustomField:Flower__c.Color__c,CustomField:Flower__c.Size__c
    ```

    This fix also applies when using the `-x` parameter to specify a manifest file that lists these fields individually. The fix also applies to `force:source:deploy`, which executes a convert before it deploys.  ([GitHub issue #628](../../../issues/628))
    
* As [previously announced](./v49.md#49140-october-8-2020), we've reorganized the Salesforce DX Developer and Setup Guides to improve their usability and better align with how the Salesforce developer tools have evolved over time. In particular, we've moved most of the CLI Configuration and Tips topics to the [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm) and the Dev Hub topics to the [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm). You might need to refresh your bookmarks.  

    **TIP**: If a bookmark to one of these guides no longer works, try changing the first two `setup` parts of the URL to `dev`, or vice versa. For example, the old URL to the CLI Runtime Configuration Values topic was:
 
    `https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_cli_config_values.htm`
 
    Now it's:
 
    `https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_config_values.htm`
