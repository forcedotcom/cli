# Salesforce CLI Release Notes

Here are the new and changed features in recent updates of Salesforce CLI.

We publish a new stable version of Salesforce CLI on Wednesdays. At the same time we also publish a release candidate that contains changes that will likely be in next week's stable release. We also publish nightly releases every night. Run `sf version` to display the version installed on your computer. 

**IMPORTANT**: Are you still using `sfdx` (v7)?  If so, we recommend that you move to `sf` (v2). It's easy: simply uninstall `sfdx` and then install `sf`. See the new [Move from `sfdx` (v7) to `sf` (v2)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_move_to_sf_v2.htm) section of the Setup Guide for details, including how to update your continuous integration (CI) scripts. We've also updated the entire Setup Guide to assume you're using `sf` (v2) and the `sf`-style CLI commands and configuration. 

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

## 2.4.7 (Aug 16, 2023) [stable-rc]

ANNOUNCEMENT: If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

-------------

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

* NEW: If you authorize an org that has a namespace linked, and then run `sf org list --json`, the JSON output now includes the `namespacePrefix` key, with value set to the namespace name.  (GitHub issue [#1790](https://github.com/forcedotcom/cli/issues/1790), sfdx-core PR [#908](https://github.com/forcedotcom/sfdx-core/pull/908))

* CHANGE: These commands are generally available and no longer beta:
    * `schema generate sobject`
    * `schema generate field`
    * `schema generate tab`
    * `schema generate platformevent`

     (plugin-sobject [#361](https://github.com/salesforcecli/plugin-sobject/pull/361)))

* FIX: We updated the README in this repo because it was a tad out of date. (GitHub issue [#2332](https://github.com/forcedotcom/cli/issues/2332))

* FIX: (GitHub issues [#1718](https://github.com/forcedotcom/cli/issues/1718) and [#1667](https://github.com/forcedotcom/cli/issues/1667),

* FIX: The telemetry plugin now works correctly behind a proxy. (GitHub issue [#1752](https://github.com/forcedotcom/cli/issues/1752), telemetry PR [#268](https://github.com/forcedotcom/telemetry/pull/268))

## 2.3.8 (Aug 9, 2023) [stable]

ANNOUNCEMENT: If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

-------------

* NEW: When you install an unsigned plugin with the `sf plugins install` command, and you answer Y to the warning, you now get information about adding the plugin to the `unsignedPluginAllowList.json` allow list file, and a link to the docs for more information. (plugin-trust PR [#545](https://github.com/salesforcecli/plugin-trust/pull/545))

* FIX: Salesforce DX projects now support these metadata types:

    * SearchCriteriaConfiguration
    * SearchableObjDataSyncInfo

## 2.2.7 (Aug 2, 2023)

* FIX: The `package install` command now uses a reasonable number of API calls when it polls for installation status.  As a result, the performance of the command has improved and fewer writes are made to the log file. (GitHub issue [#2319](https://github.com/forcedotcom/cli/issues/2319), packaging PR [#355](https://github.com/forcedotcom/packaging/pull/355))

* FIX: The `apex run test` command now correctly honors the `--output-dir` flag. (GitHub issue [#2321](https://github.com/forcedotcom/cli/issues/2321), plugin-apex PR [#178](https://github.com/salesforcecli/plugin-apex/pull/178))

* FIX: We've reduced the amount of time between the end of a deployment to the target org (such as with the `project deploy start` command) and when the command itself exits.  (GitHub issue [#2012](https://github.com/forcedotcom/cli/issues/2012), source-tracking PR [#446](https://github.com/forcedotcom/source-tracking/pull/446))

* FIX: Salesforce DX projects now support the MessagingChannel metadata type.

* FIX: Really large retrieves won't throw a `Maximum call stack size exceeded` anymore. SDR PR [#1046](https://github.com/forcedotcom/source-deploy-retrieve/pull/1046)    

* FIX: When retrieving a CustomObject (including CustomMetadataTypes), the top-level `Whatever__c.object-meta.xml` will no longer be saved to your project when it's ignored by `.forceignore`.  SDR PR [#1053](https://github.com/forcedotcom/source-deploy-retrieve/pull/1053)

## 2.1.7 (July 26, 2023)

* NEW: View the package name and version when you run `package version create list` with the new `--verbose` flag. The information is displayed in both the human-readable table and JSON results.   For example:

    ```bash
    sf package version create list --created-last-days 3 --target-dev-hub --verbose
    ```
   (GitHub issue [#222](https://github.com/forcedotcom/cli/issues/222), plugin-packaging PR [#370](https://github.com/salesforcecli/plugin-packaging/pull/370))

* NEW: Specify test formats and destructive changes for the `project deploy validate` command with these new flags:

    * `--coverage-formatters` : Format of the code coverage results.
    * `--junit` : Output JUnit test results.
    * `--results-dir` : Output directory for code coverage and JUnit results; defaults to the deploy ID.
    * `--post-destructive-changes` : File path for a manifest (destructiveChangesPost.xml) of components to delete after the deploy.
    * `--pre-destructive-changes` : File path for a manifest (destructiveChangesPre.xml) of components to delete before the deploy
    * `--purge-on-delete` : Specify that deleted components in the destructive changes manifest file are immediately eligible for deletion rather than being stored in the Recycle Bin.

    These flags already exist on the `project deploy start` command; use them in the same way when validating a deployment. For example:

    ```bash
    sf project deploy validate --source-dir path/to/source --test-level RunAllTestsInOrg --junit --results-dir results --post-destructive-changes path/to/destructiveChangesPost.xml
    ```
    (GitHub issues [#2265](https://github.com/forcedotcom/cli/issues/2265) and [#2255](https://github.com/forcedotcom/cli/issues/2255) and [#2246](https://github.com/forcedotcom/cli/issues/2246), plugin-deploy-retrieve PR [#675](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/675))

* NEW: The JSON output of the `sf project deploy validate --json` command now contains a `deployId` property, which is useful if the validation fails and you want the ID to figure out the problem. The ID is in the new `data` property of the JSON output. For example:

    ```json
    {
      "code": 1,
      "context": "DeployMetadataValidate",
      "commandName": "DeployMetadataValidate",
      "data": {
        "deployId": "0Af1nFakeID123"
      },
      "message": "Failed to validate the deployment (0Af1nFakeID123).",
      "name": "FailedValidationError",
    ...
    ```
    (GitHub issue [#2312](https://github.com/forcedotcom/cli/issues/2312), plugin-deploy-retrieve PR [#702](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/702))

* NEW: Easily determine which records failed to bulk upsert or delete by specifying the new `--verbose` flag of the `sf data upsert|delete bulk` commands.  If one or more records fail to bulk upsert or delete, the command displays a table with the record IDs and error.

    Thank you, [Robin Windey](https://github.com/R0Wi), for the great idea, and then contributing the code.  We love it. And this is your second contribution, which is awesome. Are you planning a third?  We hope so! (GitHub issue [#2221](https://github.com/forcedotcom/cli/issues/2221), plugin-data PR [#615](https://github.com/salesforcecli/plugin-data/pull/615))
 
* CHANGE: Previously, when deploying metadata, Salesforce CLI allowed you to include multiple files with identical file paths in the ZIP file that's sent to the org to deploy, and the org would deploy them. Crazy, huh. We recently swapped out a library to fix a different issue, and the new library no longer supports that incorrect behavior.  (GitHub issue [#2191](https://github.com/forcedotcom/cli/issues/2191))

* FIX: Salesforce CLI now detects when you include the word `help` in a command and asks if you're looking for help information about the rest of the command.  For example, if you type `sf package install help`, the CLI asks if you want help about `package install`.  (GitHub issue [#2240](https://github.com/forcedotcom/cli/issues/2240), oclif PR [#409](https://github.com/oclif/plugin-not-found/pull/409))
 
* FIX: If you run `project deploy report --results-dir`, the command now uses the new results directory rather than the one from the original `project deploy start` command, if specified. (GitHub issue [#2265](https://github.com/forcedotcom/cli/issues/2265), plugin-deploy-retrieve PR [#675](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/675))

* FIX: You can now run `project deploy validate --metdata-dir` outside of a Salesforce DX project. (GitHub issue [#2275](https://github.com/forcedotcom/cli/issues/2275), plugin-deploy-retrieve PR [#691](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/691))

* FIX: Deploy and retrieves when running the `project deploy|retrieve` commands now correctly show the progress bar by default. (GitHub issues [2276](https://github.com/forcedotcom/cli/issues/2276) and [2249](https://github.com/forcedotcom/cli/issues/2249), plugin-deploy-retrieve PR [#681](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/681)

* FIX: The `project retrieve` command now clearly displays the API version it's using for the HTTP request/response (`apiVersion`) and the metadata shape (`sourceApiVersion`). See [How API Version and Source API Version Work in Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_apiversion.htm) for more information.  (GitHub issue [#353](https://github.com/forcedotcom/cli/issues/353), plugin-deploy-retrieve [#669](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/669))

* FIX: We now display the help for partial commands if Salesforce CLI finds only one possible match.  For example, `sf project create --help` correctly displays the help for `project generate` because it's the only (aliased) match.  Previously you'd get a `Command not found.` error.  (GitHub issue [#2301](https://github.com/forcedotcom/cli/issues/2301), oclif PR [#733](https://github.com/oclif/core/pull/733))

* FIX: `package:version:create` no longer remove Profiles just because they are empty.  (Github issues [#2192](https://github.com/forcedotcom/cli/issues/2192)/[#2218](https://github.com/forcedotcom/cli/issues/2218) , packaging PR [#349](https://github.com/forcedotcom/packaging/pull/349))

* FIX: `package:version:create` was briefly erroring because of a change in the xml2js library.  They fixed it and that fixed these commands.  If you encounter the issue, uninstall the packaging plugin and run your command again to get the new fixed version. (Github issue [#2324](https://github.com/forcedotcom/cli/issues/2324)).  

* FIX: Salesforce DX projects now support these metadata types:

    * ExtlClntAppMobileConfigurablePolicies
    * ExtlClntAppMobileSettings
    * ServiceProcess
    * ProcessFlowMigration


## 2.0.2 (July 19, 2023)

Welcome to the GA of `sf` (v2)! 

Check out [this blog post](https://developer.salesforce.com/blogs/2023/07/salesforce-cli-sf-v2-is-here) for information about this new Salesforce CLI version. 

We recommend that you start using the `sf`-style CLI commands soon, such as `sf org create scratch`. Don't worry, the `sfdx`-style commands continue to work just fine, such as `sfdx force:org:create`. But we think you'll like the new ones better. See [this document](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_migrate.htm) for migration information. We're in the process of updating the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm) to show `sf`-style examples and usage. 

We hope you enjoy `sf` (v2)!  And now on to our regular ole release notes. 

----------------------------------------------------

* FIX: When you run `org delete scratch | sandbox` to delete your default org, the CLI now also unsets the `target-org` configuration variable (if set) and any aliases which point to the deleted org.  (sfdx-core PR [#874](https://github.com/forcedotcom/sfdx-core/pull/874))

* FIX: The `package version create` command now correctly displays an error if the `definitionFile` parameter of `packageDirectories` in the `sfdx-project.json` file is set to an incorrect file location. Previously the command would fail silently.  (GitHub issue [#2193](https://github.com/forcedotcom/cli/issues/2193), plugin-packaging PR [#364](https://github.com/salesforcecli/plugin-packaging/pull/364))
