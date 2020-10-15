# Salesforce CLI v50 Release Notes

## 50.1.0 (October 17, 2020) 

Welcome to the first release of version 50 of the `salesforcedx` CLI plug-in in Winter '21. 

[Click here for the v49 release notes.](./v49.md)

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
salesforcedx 50.1.0 (core)                    // salesforcedx plug-in version
├─ templates 50.1.0 (core)
├─ custom-metadata 1.0.10 (core)
├─ @salesforce/sfdx-plugin-lwc-test 0.1.7 (core)
├─ apex 0.1.0 (core)
└─ salesforce-alm 50.1.0 (core)
sfdx-cli 7.75.1 (core)                        // Salesforce CLI version
```

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update the `salesforcedx` plug-in to ensure that autocomplete works correctly on any new commands.

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
