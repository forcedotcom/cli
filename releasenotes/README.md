# Salesforce CLI Release Notes

Here are the new and changed features in recent updates of Salesforce CLI.

We publish a new stable version of Salesforce CLI on Wednesdays. At the same time we also publish a release candidate that contains changes that will likely be in next week's stable release. We also publish nightly releases every night. Run `sf version` to display the version installed on your computer. 

> **IMPORTANT**: Are you still using `sfdx` (v7)?  If so, we recommend that you move to `sf` (v2). It's easy: simply uninstall `sfdx` and then install `sf`. See the new [Move from `sfdx` (v7) to `sf` (v2)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_move_to_sf_v2.htm) section of the Setup Guide for details, including how to update your continuous integration (CI) scripts. We've also updated the entire Setup Guide to assume you're using `sf` (v2) and the `sf`-style CLI commands and configuration. **`sfdx` (v7) will receive no updates.**

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

## 2.66.6 (November 13, 2024) [stable-rc]

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

------------

* NEW: Get the results of a previously run and completed bulk ingest (import, update, upsert, or delete) job with the new `data bulk results` command. The command works for jobs executed with Bulk API 2.0, such as a CLI command like `data import bulk` or an external tool like Data Loader, as long as the job provides a job ID. Pass the job ID to `data bulk results` to retrieve the results.

    The command displays information such as the job status, the ingest operation, updated Salesforce object, how many records were processed, and how many failed or succeeded. Finally, the output displays the names of the generated CSV-formatted files that contain the specific results for each ingested record. For example:

    ```bash
    sf data bulk results --job-id 7507i000fake341G --target-org my-scratch
    ```
    (GitHub discussion [#2387](https://github.com/forcedotcom/cli/discussions/2387), plugin-data PR [#1097](https://github.com/salesforcecli/plugin-data/pull/1097))

* NEW: Customize how the new [table-formatted command output](README.md#2646-october-30-2024) looks like with these new environment variables:

    * `SF_NO_TABLE_STYLE`: Removes all table stylings, such as borders and colors.
    * `SF_TABLE_OVERFLOW`: Specifies how to handle text in table output that is too wide for its column, such as by wrapping or truncating.
    * `SF_TABLE_BORDER_STYLE`: Specifies how to display the borders of table output, such as whether the table has an outline or vertical lines between columns.

    See [Salesforce CLI Environment Variables](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_env_variables.htm) for the possible and default values. 
 
## 2.65.8 (November 6, 2024) [stable]

* NEW: We updated these commands to use [multi-stage output](README.md#2639-october-23-2024), so while they are running they now display the stage they're currently on, the elapsed time, and more:

     * `project delete source`
     * `project deploy start`
     * `project deploy resume`
     * `project deploy validate`
     * `project deploy report`
     * `project retrieve start`

   Also, as a result of [this GitHub feedback](https://github.com/forcedotcom/cli/issues/3079), we changed how this multi-stage output displays in a continuous integration (CI) environment. Specifically:

   * The command polls for status updates every 5 seconds by default. You can change this interval with the new `SF_CI_UPDATE_FREQUENCY_MS` environment variable.  For example, to poll every 10 seconds, set `SF_CI_UPDATE_FREQUENCY_MS=10000`. This environment variable works only in a CI environment.
   * Status messages, such as `Components: 21/30 (70%)` which shows how many components have been deployed to the org, are displayed only when information changes.
   * If 5 minutes goes by without an update, then the last status message is displayed again. You can change this interval with the new `SF_CI_HEARTBEAT_FREQUENCY_MS` environment variable.  For example, to specify 10 minutes, set `SF_CI_HEARTBEAT_FREQUENCY_MS=600000`. This environment variable works only in a CI environment.

    (oclif multi-stage-output PR [#52](https://github.com/oclif/multi-stage-output/pull/52))

* CHANGE: As we [announced back in July 2024](https://github.com/forcedotcom/cli/issues/2974), we removed these deprecated commands from this release of Salesforce CLI:

    * `force:mdapi:convert`
    * `force:mdapi:deploy`
    * `force:mdapi:deploy:cancel`
    * `force:mdapi:deploy:report`
    * `force:mdapi:describemetadata`
    * `force:mdapi:listmetadata`
    * `force:mdapi:retrieve`
    * `force:mdapi:retrieve:report`
    * `force:source:convert`
    * `force:source:delete`
    * `force:source:deploy`
    * `force:source:deploy:cancel`
    * `force:source:deploy:report`
    * `force:source:ignored:list`
    * `force:source:manifest:create`
    * `force:source:open`
    * `force:source:pull`
    * `force:source:push`
    * `force:source:retrieve`
    * `force:source:status`
    * `force:source:tracking:clear`
    * `force:source:tracking:reset`
 
    If you haven't yet migrated to the new `sf` commands, see the [Migration Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_migrate.htm) for details. In particular:
  
    * [Map the old `sfdx` commands to their new `sf` equivalents.](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_old_new_command_mapping.htm)
    * [Read details and examples for migrating the `force:mdapi:*` and `force:source:*` commands.](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_mig_deploy_retrieve.htm)
    * [Read details and examples for migrating the `force:org:*` commands.](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_mig_org.htm)
  
   Finally, if you're not ready to migrate, see [this pinned issue](https://github.com/forcedotcom/cli/issues/2974) for workarounds. (source-deploy-retrieve PR [#1446](https://github.com/forcedotcom/source-deploy-retrieve/pull/1446), plugin-deploy-retrieve PR [#1197](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1197), cli PR [#1962](https://github.com/salesforcecli/cli/pull/1962), plugin-org PR [#1244](https://github.com/salesforcecli/plugin-org/pull/1244))

* FIX: If you run `data export tree` to export records from a Salesforce object that has a RecordType field, and you specify `RecordType.Name` in the SOQL query, you can now import that data using `data import tree` into a new org and the RecordType IDs and Names are correctly resolved.  (GitHub discussion [#2753](https://github.com/forcedotcom/cli/discussions/2753), plugin-data PR [#1102](https://github.com/salesforcecli/plugin-data/pull/1102))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):

    * AppFrameworkTemplateBundle
    * ChoiceList
    * ConvIntelligenceSignalRule
    * PublicKeyCertificate
    * PublicKeyCertificateSet

## 2.64.6 (October 30, 2024)

* NEW: Import a large number of records into a Salesforce object from a comma-separated values (CSV) file with the new `data import bulk` command. All the records in the CSV file must be for the same Salesforce object; see [Prepare Data to Ingest](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/datafiles_prepare_data.htm) in the "Bulk API 2.0 and Bulk API Developer Guide" for details about creating the CSV file. Use the `--sobject` flag to specify the Salesforce object. 

    For example, this command imports Account records from the `accounts.csv` file into an org with alias "my-scratch":

    ```bash
    sf data import bulk --file accounts.csv --sobject Account --wait 10 --target-org my-scratch
    ```

   Bulk imports can take a while, depending on how many records are in the CSV file. If the command times out after the specified wait time (10 minutes in our example), it displays a job ID that you then pass to the new `data import resume` command to see the status and results of the original export. For example:

    ```bash
    sf data import resume --job-id 750XXX00fake1222
    ```
    (GitHub issue [#2254](https://github.com/forcedotcom/cli/issues/2254) and discussion [#2339](https://github.com/forcedotcom/cli/discussions/2339), plugin-data PR [#1091](https://github.com/salesforcecli/plugin-data/pull/1091))

* NEW: Easily export records from a junction object and its parent objects by specifying multiple `--query` flags of the `data export tree` command; previously you could specify only one `--query` flag.

    A [junction object](https://help.salesforce.com/s/articleView?id=sf.relationships_manytomany.htm&type=5) is a custom Salesforce object with two master-detail relationships which you use to model a “many-to-many” relationship between two objects. We recommend that you also specify `--plan` when you run the export. After the export completes, you have a set of sObject tree files and a plan definition file to easily import the records of the junction object and its parent objects into a new org and preserve the many-to-many relationships.

    For example, the AccountContactRelation and AccountContactRole junction objects represents two many-to-many relationships between Contacts and Accounts. To export records from the two junction objects, along with associated Contact and Account records, and preserve the relationships, you could run something like this:

    ```bash
    sf data export tree --plan --output-dir junction \
        --query "select AccountId, ContactId from AccountContactRole" \
        --query "Select ID, AccountId, FirstName, LastName from Contact" \
        --query "select ID, ContactId, AccountId from AccountContactRelation" \
        --query "select ID, Name from Account where Name != 'Sample Account for Entitlements'"
    ```
    (plugin-data PR [#1092](https://github.com/salesforcecli/plugin-data/pull/1092))

* CHANGE: oclif now uses [ink](https://www.npmjs.com/package/ink) to display tables in human-readable output, making the tables more visually appealing and easier to read. Here's the new [oclif table](https://github.com/oclif/table) GitHub repo. Over the next few releases we'll update the Salesforce CLI commands that display table output to use this new feature.

    For example, in this release we updated [plugin-limits](https://github.com/salesforcecli/plugin-limits/pull/1026) which contains the command `org list limits`. The old output looked like this: 

   ```bash
   sf org list limits --target-org my-scratch
   Name                                        Remaining Max       
   ─────────────────────────────────────────── ───────── ───────── 
   AnalyticsExternalDataSizeMB                 40960     40960     
   CdpAiInferenceApiMonthlyLimit               500000000 500000000 
   ConcurrentAsyncGetReportInstances           200       200       
   ConcurrentEinsteinDataInsightsStoryCreation 5         5         
   ...
   ```

   The new output looks like this:

   ```bash
   sf org list limits --target-org my-scratch
   ┌─────────────────────────────────────────────┬───────────┬───────────┐
   │ Name                                        │ Remaining │ Max       │
   ├─────────────────────────────────────────────┼───────────┼───────────┤
   │ AnalyticsExternalDataSizeMB                 │ 40960     │ 40960     │
   │ CdpAiInferenceApiMonthlyLimit               │ 500000000 │ 500000000 │
   │ ConcurrentAsyncGetReportInstances           │ 200       │ 200       │
   │ ConcurrentEinsteinDataInsightsStoryCreation │ 5         │ 5         │
   ...
   ```

   Much prettier! 

## 2.63.9 (October 23, 2024)

* NEW: Get a behind-the-scenes look at what happens when you execute certain CLI commands with the new multi-stage output feature. For example, when you execute `org create scratch`, you now see this output while the command is executing:

    ```bash
    $ sf org create scratch --edition developer --alias my-scratch-org
    
      ────────────── Creating Scratch Org ──────────────

      ✔ Prepare Request 37ms
      ✔ Send Request 14.61s
      ◯ Wait For Org - Skipped
      ✔ Available 5ms
      ⢿ Authenticate 1.46s
      ◼ Deploy Settings
      ◼ Done

      Request Id: 2SRWs000002aOttOAE
      OrgId: 00DOv00000C6RbJ
      Username: test-p4bh29a7jcvc@example.com
      Alias: my-scratch-org
      Elapsed Time: 16.21s
     ```

     Checkmarks let you know when each stage completes and how long it took, with the total elapsed time counter at the bottom. Pretty cool, huh.  These commands have been updated to use this new output:

     * `org create scratch`
     * `org resume scratch`

    (plugin-org PR [#1203](https://github.com/salesforcecli/plugin-org/pull/1203), oclif [multi-stage-output](https://github.com/oclif/multi-stage-output))

* NEW: Open a local metadata file in its associated builder in your org, such as Agent Builder, with the improved `--source-file` flag of `org open`.

    Let's say, for example, that you completed the Trailhead [Quick Start: Build Your First Agent with Agentforce](https://trailhead.salesforce.com/content/learn/projects/quick-start-build-your-first-agent-with-agentforce). The Coral Cloud Agent that you built was so cool that you decided to retrieve its associated metadata to a local DX project. To then quickly open the agent back up in Agent Builder, simply run this CLI command:

     ```bash
     sf org open --source-file force-app/main/default/bots/Coral_Cloud_Agent/Coral_Cloud_Agent.bot-meta.xml --target-org <your-org>
     ```

     You can also use the `--source-file` flag to open local metadata in Flow Builder, Apex Classes Setup page, and more. (plugin-org PR [#1230](https://github.com/salesforcecli/plugin-org/pull/1230))

* NEW: We now display the Lightning deploy URL, in addition to the deploy ID, when you run any of the `project deploy` commands with the `--verbose` flag. For example, when you run `project deploy start --verbose`, you now see a Deploy URL entry in the output:

    ```bash
    ...
    Status: Succeeded
    Deploy ID: 0AfRKfake00WH0A3
    Target Org: test-ztqm4gogmflt@example.com
    Deploy URL: https://customer-fake.scratch.my.salesforce.com/lightning/setup/DeployStatus/page?address=%2Fchangemgmt%2Fmonitlotsofstuff.apexp
    ...
    ```
    Many thanks to [Matt Carvin](https://github.com/mcarvin8) for contributing this useful new feature. It was your first contribution, but we sure hope it won't be your last! 
    
* FIX: The `sf plugins --json` command no longer fails in certain circumstances with a `TypeError`. (GitHub issue [#3051](https://github.com/forcedotcom/cli/issues/3051), oclif core PR [#1216](https://github.com/oclif/core/pull/1216))

## 2.62.6 (October 16, 2024)

* NEW: Export a large number of records from an org with the new `data export bulk` command. Use a SOQL query to select the fields and records that you want to export, and specify whether you want to write to a CSV- or JSON-formatted file.  For example, this command exports the `Id`, `Name`, and `Account.Name` fields of the Contact object into a JSON-formatted file:

    ```bash
    sf data export bulk --query "SELECT Id, Name, Account.Name FROM Contact" --output-file export-accounts.json --result-format json --wait 10 --target-org my-scratch
    ```

    Bulk exports can take a while, so if the command times out after the specified wait time (10 minutes in our example), it displays a job ID that you then pass to the new `data export resume` command to see the status and results of the original export. For example:

    ```bash
    sf data export resume --job-id 750XXX00fake1222
    ```

    IMPORTANT: The `data export bulk` command uses Bulk API 2.0, which is optimized to handle very large sets of data asynchronously. However, the API limits the type of SOQL queries you can run. For example, you can't use aggregate functions such as `count()`. For the complete list of limitations, see the
  "SOQL Considerations" section at the end of [this page](https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/queries.htm). (plugin-data PR [#1035](https://github.com/salesforcecli/plugin-data/pull/1035))

* NEW: Salesforce CLI now warns you when you deploy metadata with the `project deploy start` command and either the total size of the metadata or the number of metadata files is over 80% of the [Metadata API limits](https://developer.salesforce.com/docs/atlas.en-us.salesforce_app_limits_cheatsheet.meta/salesforce_app_limits_cheatsheet/salesforce_app_limits_platform_metadata.htm). You can change this threshold by setting the new `SF_DEPLOY_SIZE_THRESHOLD` environment variable to a number between 1 and 100. For example, if you set `SF_DEPLOY_SIZE_THRESHOLD=70`, you get the warning when you try to deploy metadata that's over 70% of the limit.

    Salesforce CLI always attempts to deploy the metadata when you run the `project deploy start` command, even if it determines that the size or file count might be over the limit. (source-deploy-retrieve PR [#1435](https://github.com/forcedotcom/source-deploy-retrieve/pull/1435))

* NEW: Store the values for the HTTP request (header, body, etc) in a file when you run the `api request rest` command with the new `--file` flag. The command allows you to make an authenticated HTTP request using the Salesforce REST API. This flag is useful if you want to put the request information in a single JSON-formatted file rather than specify all the sections using flags, such as `--header`, `--body`, and so on. For example:

    ```bash
    sf api request rest --file ./myHttpRequest.json
    ```

    Run `sf api request rest --help` and read the long description for the `--file` flag for information on how to create the file.  (plugin-api PR [#14](https://github.com/salesforcecli/plugin-api/pull/14))

* NEW: Easily see which Salesforce CLI versions you previously downloaded with the new Download column in the `sf update --available` output. To see the Location column, you must now use the new `--verbose` flag along with the `--available` flag. We also made some minor formatting tweaks to the table output. (oclif plugin-plugins [#980](https://github.com/oclif/plugin-plugins/pull/980), plugin-update [#932](https://github.com/oclif/plugin-update/pull/932), plugin-commands [#763](https://github.com/oclif/plugin-commands/pull/763))

* FIX: The `force lightning lwc test run` command now correctly returns a non-zero exit code if a Lightning Web Component Jest test fails. (GitHub issue [#2991](https://github.com/forcedotcom/cli/issues/2991), plugin-lwc-test PR [#193](https://github.com/salesforcecli/plugin-lwc-test/pull/193))

* FIX: The Apex Code Coverage percentages displayed in the output of `sf project deploy start --test-level <value> --coverage-formatters <value>` now match the percentages in the code coverage reports, such as `coverage-summary.json`.  (GitHub issue [#3030](https://github.com/forcedotcom/cli/issues/3030), plugin-deploy-retrieve [#1175](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1175))

* FIX: (This fix is mostly interesting to `oclif` users, such as Salesforce CLI plugin developers). When you generate a `README.md` file for your plugin using `oclif readme`, flags that have the `noCacheDefault: false` option no longer display any locally set configuration variable values, similar to how `--help` works. (GitHub issue [#3041](https://github.com/forcedotcom/cli/issues/3041), oclif core PR [#1212](https://github.com/oclif/core/pull/1212), oclif oclif PR [#1566](https://github.com/oclif/oclif/pull/1566))

* FIX: The `project retrieve start --package-name` command now correctly retrieves packages that contain custom objects. (GitHub issue [#2977](https://github.com/forcedotcom/cli/issues/2977), source-deploy-retrieve PR [#1431](https://github.com/forcedotcom/source-deploy-retrieve/pull/1431))

## 2.61.8 (October 9, 2024)

* NEW: Download and install Salesforce CLI on Windows ARM64 computers with our new `sf-arm64.exe` installer. We're in the process of updating the [download page](https://developer.salesforce.com/tools/salesforcecli) with this new option, but in the meantime you can download the `stable` executable [here](https://developer.salesforce.com/media/salesforce-cli/sf/channels/stable/sf-arm64.exe). (oclif PR [#1559](https://github.com/oclif/oclif/pull/1559))

* NEW: When you create a sandbox with the `org create sandbox` command, you can now specify the public group of Salesforce users that can access the sandbox by including either the `activationUserGroupId` or `activationUserGroupName` option (but not both) in the sandbox definition file. This example specifies that the Salesforce public user group with name `ExpertUsers` can access the sandbox after it's created:

    ```
    {
       "sandboxName": "dev1",
       "licenseType": "Developer",
       "activationUserGroupName": "ExpertUsers"
    }
    ```
    You can also now specify the name of the Apex class that runs after each copy of the sandbox with the new `apexClassName` option.  Previously you could specify it only with an ID (`apexClassId`). (plugin-org PR [#1221](https://github.com/salesforcecli/plugin-org/pull/1221))

* NEW: Get detailed coverage results about an asynchronous test run by specifying the new `--detailed-coverage` flag of the `apex get test` command. Similar to how the `apex run test` command works, you must specify human-readable result format (the default) when you use the `--detailed-coverage`  flag. For example:

    ```bash
    sf apex get test --test-run-id <ID> --code-coverage --detailed-coverage --result-format human
    ```

    (plugin-apex PR [#597](https://github.com/salesforcecli/plugin-apex/pull/597))

* FIX: We fixed a source tracking issue with some metadata types, such as EmailTemplateFolder. (GitHub issue [#2902](https://github.com/forcedotcom/cli/issues/2902), source-tracking PR [#679](https://github.com/forcedotcom/source-tracking/pull/679))

* FIX: Salesforce DX projects now support the ExtlClntAppSamlConfigurablePolicies [metadata type](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json). 

## 2.60.13 (October 2, 2024)

* CHANGE: We shipped `decomposePermissionSetBeta` back in [April](README.md#2368-april-10-2024), asked you to [vote on a new design of the feature](https://github.com/forcedotcom/cli/discussions/2993) (thank you), and we now have a winner! We went with option 2 (focused decomposition); see details [here](https://github.com/forcedotcom/cli/discussions/2993#discussioncomment-10431670). 
    
   We now have a new source behavior value: `decomposePermissionSetBeta2`. If you haven't played with source decomposition at all yet, you can try it by running `sf project convert source-behavior --behavior decomposePermissionSetBeta2`. You can also use this command if you previously updated your project to use the original `decomposePermissionSetBeta` flavor, but you now want to try out the new stuff.  Enjoy! (source-deploy-retrieve PR [#1412](https://github.com/forcedotcom/source-deploy-retrieve/pull/1412))

* FIX: Deploying a sharing rule by specifying one of its child metadata types (such as `project deploy start --metadata SharingCriteriaRule:Account.Test_Rule1`) now works correctly. (source-deploy-retrieve PR [#1419](https://github.com/forcedotcom/source-deploy-retrieve/pull/1419))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):

    * ExtlClntAppPushSettings
    * ExtlClntAppPushConfigurablePolicies

## 2.59.6 (September 25, 2024)

* FIX: We fixed some under-the-hood bugs. 

## 2.58.7 (September 11, 2024)

* FIX: Salesforce CLI now supports these environment variables: `SF_DISABLE_SOURCE_MEMBER_POLLING` and `SF_SOURCE_MEMBER_POLLING_TIMEOUT`.  Previously only their `SFDX_` equivalents were supported. (GitHub [comment](https://github.com/forcedotcom/cli/issues/2974#issuecomment-2322907656), source-tracking PR [#668](https://github.com/forcedotcom/source-tracking/pull/668))

## 2.57.7 (September 4, 2024)

* NEW: The `project deploy start` command now reports the zip size and zip file count when using the `--verbose` flag. (GitHub Discussion [#2942](https://github.com/forcedotcom/cli/discussions/2942), plugin-deploy-retrieve PR [#1138](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1138))

* NEW: We've improved the `doctor` command so it now checks whether you are setting proxy env vars correctly (plugin-info PR [#848](https://github.com/salesforcecli/plugin-info/pull/848))

* NEW: Try the new BETA `api request graphql` command to send GraphQL requests to your org! (plugin-api PR [#6](https://github.com/salesforcecli/plugin-api/pull/6))

    - `sf api request graphql --body "query accounts { uiapi { query { Account { edges { node { Id \n Name { value } } } } } } }"`
    - `cat body.txt | sf api request graphql --body -`
    - Stream results to a file with the `--stream-to-file` flag
    - Run `sf api request graphql --help` to see more examples

* FIX: String Replacement logic will explicitly skip binary files even if they are included in the glob pattern. (source-deploy-retrieve PR [#1405](https://github.com/forcedotcom/source-deploy-retrieve/pull/1405))

## 2.56.7 (August 28, 2024)

* NEW: Try the new BETA `api request rest` command to send REST calls to your org! ([plugin-api repo](https://github.com/salesforcecli/plugin-api))

    - `sf api request rest sobjects/account/<ID> --method PATCH --body "{\"Name\": \"Updated\"}"`
    - `sf api request rest sobjects/account/<ID> --method PATCH --body body.txt`
    - `cat body.txt | sf api request rest sobjects/account --body -`
    - Stream results to a file with the `--stream-to-file` flag
    - Run `sf api request rest --help` to see more examples

* NEW: The `apex run test` and `apex get test` commands now have a new `--concise` flag.

    Setting this flag for `apex run test` or `apex get test` will suppress passing test results and the code coverage table. Only failing tests and the summary table will be displayed. (plugin-apex PR [#504](https://github.com/salesforcecli/plugin-apex/pull/504), Github Issue [#243](https://github.com/forcedotcom/salesforcedx-apex/issues/243), Github Discussion [#2872](https://github.com/forcedotcom/cli/discussions/2872))

    Many thanks to [Kyle Capehart](https://github.com/k-capehart) for contributing this useful new flag!

* NEW: The `sf project convert source-behavior` command will now warn if you have uncommitted work before doing project modifications. Note that this command puts components in a newly created `main/default` folder in each package directory. You might need to re-organize them into your preferred structure. (plugin-deploy-retrieve PR [#1130](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1130))

* CHANGE: We shipped `decomposeCustomLabelsBeta`, got [feedback](https://github.com/forcedotcom/cli/issues/2840) (thank you!), and decided to change how it behaves. You can see the design proposal [here](https://github.com/forcedotcom/cli/discussions/2948). It removes an extra folder layer that other decomposition strategies needed and supports more flexible folder structures.
    
    Now there's `decomposeCustomLabeltsBeta2`. If you haven't used it yet, you can try it via `sf project convert source-behavior --behavior decomposeCustomLabelsBeta2`. This works if your project isn't using a preset OR if you started using the original flavor of `decomposeCustomLabeltsBeta`. Please keep the feedback coming! (source-deploy-retrieve PR [#1392](https://github.com/forcedotcom/source-deploy-retrieve/pull/1392))

* CHANGE: You can now run these packaging commands outside of a Salesforce DX project:

    * `package delete`
    * `package update`
    * `package version delete`
    * `package version displayancestry`
    * `package version list`
    * `package version promote`
    * `package version report`

    (plugin-packaging PR [#771](https://github.com/salesforcecli/plugin-packaging/pull/771), packaging PR [#638](https://github.com/forcedotcom/packaging/pull/638))

* FIX: Salesforce DX projects now support the GenAiFunction [metadata type](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json) (source-deploy-retrieve PR [#1404](https://github.com/forcedotcom/source-deploy-retrieve/pull/1404), plugin-deploy-retrieve PR [#1137](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1137))

* FIX: Support for 21 new  (source-deploy-retrieve PR [#1398](https://github.com/forcedotcom/source-deploy-retrieve/pull/1398))
  * AssessmentConfiguration
  * ContextUseCaseMapping
  * ContractType
  * DocumentTemplate
  * EmployeeDataSyncProfile
  * ExternalAuthIdentityProvider
  * ExternalDataTranObject
  * ExternalDocStorageConfig
  * GenAiPlugin
  * LearningAchievementConfig
  * MktDataConnection
  * MktDataConnectionSrcParam
  * PortalDelegablePermissionSet
  * ProductAttrDisplayConfig
  * ProductSpecificationRecType
  * ProductSpecificationType
  * RecAlrtDataSrcExpSetDef
  * ReferencedDashboard
  * RelatedRecordAssocCriteria
  * VirtualVisitConfig
  * WaveAnalyticAssetCollection



## 2.55.6 (August 21, 2024)

* NEW: Execute a SOSL text-based search query in your org with the new `data search` command. Similar to how the `data query` command works with SOQL queries, you can specify the SOSL query at the command line with the `--query` flag or read the query from a file with the `--file` flag. This example executes the specified SOSL query in an org with alias `my-scratch`:

    ```bash
    sf data search --query "FIND {Anna Jones} IN Name Fields RETURNING Contact (Name, Phone)" --target-org my-scratch
    ```

    (plugin-data PR [#1025](https://github.com/salesforcecli/plugin-data/pull/1025))

* FIX: When parsing a scratch org definition file, Salesforce CLI now removes the `$schema` property (if it exists at the top of the JSON file) to prevent getting an invalid JSON error.  (sfdx-core PR [#1113](https://github.com/forcedotcom/sfdx-core/pull/1113))

    Thank you, [Alan Jaouen](https://github.com/alanjaouen), for noticing the problem and then contributing the fix! We love it. 

* FIX: We now wait for config files to be unlocked before we read them. This improvement fixes issues like parallel command executions that cause file reads to return empty. (GitHub issue [#2965](https://github.com/forcedotcom/cli/issues/2965), sfdx-core PR [#1116](https://github.com/forcedotcom/sfdx-core/pull/1116))

* FIX: We updated the help and output of the `--package-name` flag of `project retrieve start` to clarify that the results are for reference only and shouldn't be used in your development work. (GitHub issue [#2931](https://github.com/forcedotcom/cli/issues/2931), plugin-deploy-retrieve [#1124](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1124))

* FIX: Salesforce DX projects now support the UiFormatSpecificationSet [metadata type](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json).

## 2.54.6 (August 14, 2024)

* NEW: Salesforce CLI now automatically regenerates the autocomplete cache after you install or uninstall a plugin to ensure that the autocomplete feature is always using the latest set of CLI command and flag names. (plugin-autocomplete PR [#753](https://github.com/oclif/plugin-autocomplete/pull/753), oclif plugin-plugins PR [#932](https://github.com/oclif/plugin-plugins/pull/932))

    What's autocomplete, you ask? It's a way to automatically "complete" a partially-typed command or flag name by pressing the `<TAB>` key when using Salesforce CLI at the terminal or command window. It's a super-useful feature, so check out [the documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm) to learn how to configure and use it!

* FIX: The `project deploy start` command now correctly handles deployments of changed custom fields, even when the parent object hasn't changed. (source-deploy-retrieve PR [#1375](https://github.com/forcedotcom/source-deploy-retrieve/pull/1375))

* FIX: The `project deploy start` command now correctly handles deployments of objects whose source files are spread across multiple folders in your project. (GitHub issue [#2230](https://github.com/forcedotcom/cli/issues/2230), source-deploy-retrieve PR [#1381](https://github.com/forcedotcom/source-deploy-retrieve/pull/1381))

* FIX: Salesforce CLI now constructs valid URLs when gathering results from an execution of the `data query --bulk --query <query>` command.  (GitHub issue [#2968](https://github.com/forcedotcom/cli/issues/2968), jsforce PR [#1550](https://github.com/jsforce/jsforce/pull/1550))

## 2.53.6 (August 7, 2024)

* NEW: If you misspell a metadata type when using the `--metadata` flag of one of the `project` commands, such as `project deploy start`, we now prompt you with similar valid options. We also provide other troubleshooting resources. Go ahead, make a typo and see what the command suggests! (source-deploy-retrieve PR [#1374](https://github.com/forcedotcom/source-deploy-retrieve/pull/1374))

* NEW: Review what the `dev generate command|plugin` commands will do, without actually changing anything on your computer, with the new `--dry-run` flag. Instead, the command displays the files it will update or create and the commands it will run when you don't specify `--dry-run`.  For example:

    ```bash
    $ sf dev generate command --name init --dry-run
    [DRY RUN] Updating package.json
    [DRY RUN] Creating src/commands/init.ts
    [DRY RUN] Creating messages/init.md
    [DRY RUN] Creating test/commands/init.nut.ts
    [DRY RUN] Creating test/commands/init.test.ts
    [DRY RUN] yarn format
    [DRY RUN] yarn lint -- --fix
    [DRY RUN] yarn compile
    ```

    (plugin-dev PR [#519](https://github.com/salesforcecli/plugin-dev/pull/519))

* CHANGE: We've deprecated using the `--wait` flag of the `data query` command without `--bulk`. We plan to remove the usage in a future release. You can safely stop using `--wait` in this case, because it never affected the command without `--bulk` anyway. (plugin-data PR [#1002](https://github.com/salesforcecli/plugin-data/pull/1002))

* FIX: The `sf update` command now works correctly on computers running proxies. (plugin-update PR [#880](https://github.com/oclif/plugin-update/pull/880))

* FIX: If a flag value contains a comma in its name, you can now escape it with a `\` character so that Salesforce CLI doesn't think it's a delimiter. For example: `project source convert --source-dir dirwith\,comma`.

    Also, as part of this fix, we now print a warning when you use the old format of specifying multiple flag values with a comma (`--flag value1,value2`). Instead you should specify the flag multiple times (`--flag value1 --flag value2`). (GitHub issue [#2928]https://github.com/forcedotcom/cli/issues/2928), oclif PR [#1148](https://github.com/oclif/core/pull/1148))

## 2.52.6 (July 31, 2024)

* NEW: Salesforce CLI now supports the lowercase versions of the proxy environment variables: `http_proxy` and `https_proxy`. Lower-case env variables take precedence over their uppercase equivalents (`HTTP_PROXY` and `HTTPS_PROXY`). (jsforce PR [#1534](https://github.com/jsforce/jsforce/pull/1534))

* CHANGE: You're no longer required to run these commands inside of a Salesforce DX project:
    * `package installed list`
    * `package list`
    * `package1 version create`

    (GitHub discussion [#2932](https://github.com/forcedotcom/cli/discussions/2932), plugin-packaging PR [#733](https://github.com/salesforcecli/plugin-packaging/pull/733))

* CHANGE: The standard (non-JSON) output of the `org list metadata` and `org list metadata-types` commands are now in table format. (plugin-org PR [#1141](https://github.com/salesforcecli/plugin-org/pull/1141))

* FIX: The `project convert mdapi` command now correctly puts the converted files into the full `--output-dir` directory, if the flag is specified. (plugin-deploy-retrieve PR [#1091](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1091))

* FIX: Salesforce CLI now correctly accepts and prefers SF_AUDIENCE_URL (rather than SFDX_AUDIENCE_URL) and SF_DOMAIN_RETRY (rather than SFDX_DOMAIN_RETRY). (sfdx-core PR [#1104](https://github.com/forcedotcom/sfdx-core/pull/1104))

* FIX: We've improved the errors that result from certain executions of `project deploy` commands that are supposed to fail, such as executing `project deploy quick` and passing it an invalid job ID. (GitHub issue [#2962](https://github.com/forcedotcom/cli/issues/2962), sfdx-core PR [#1108](https://github.com/forcedotcom/sfdx-core/pull/1108))

* FIX: Let's say you have two sets of source files associated with two different objects in a package directory. Both sets of files also include the `All.listView-meta.xml` file and the ListView's XML is exactly the same.  The [Source Mobility (beta)](./README.md#2448-jun-5-2024) feature now correctly detects that moving both sets of files to a new package directory isn't an actual source change that needs to be tracked. (GitHub issue [#2945](https://github.com/forcedotcom/cli/issues/2945), source-tracking PR [#631](https://github.com/forcedotcom/source-tracking/pull/631))

## 2.51.6 (July 24, 2024)

* CHANGE: We deprecated the CMTRecordManagedDeletion scratch org feature because it's no longer necessary. The scratch org feature allows you to remove custom metadata type records from a second-generation managed package. But as of the Spring '24 Salesforce release, the feature is now available to all independent software vendors (ISVs). See the [Spring '24 release notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_packaging_remove_cmt_records.htm&release=248&type=5) for more information about the new feature.  (sfdx-core PR [#1102](https://github.com/forcedotcom/sfdx-core/pull/1102))

* FIX: Deploying, retrieving, or converting projects that contain multiple custom label files no longer result in `JavaScript heap out of memory` errors. (GitHub issue [#2939](https://github.com/forcedotcom/cli/issues/2939), source-deploy-retrieve PR [#1368](https://github.com/forcedotcom/source-deploy-retrieve/pull/1368))

* FIX:  We've improved the error message returned when `project deploy start --json` encounters a test failure as it's validating the deployment. ((GitHub issue [#2952](https://github.com/forcedotcom/cli/issues/2952), plugin-deploy-retrieve [#1085](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1085))

## 2.50.6 (July 17, 2024)

* NEW: By default, Salesforce CLI uses 128-bit encryption to encrypt its internal files, such as the authorization files associated with the orgs you’ve logged into. For increased security, you can now enable 256-bit encryption. Check out [these docs](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_enable_256_bit_encryption.htm) for instructions. (Github issue [#1861](https://github.com/forcedotcom/cli/issues/1861), sfdx-core PR [#810](https://github.com/forcedotcom/sfdx-core/pull/810))

* FIX: Plugins (ex: sfdx-scanner) using an old version of our libraries would cause an error.  We're now preventing that error.  (Github issue [#2935](https://github.com/forcedotcom/cli/issues/2935), sfdx-core PR [#1098](https://github.com/forcedotcom/sfdx-core/pull/1098))

* FIX: `sf project deploy start` with `--coverage-formatters` now prints the correct location for the coverage files in its output. (Github issue [#2816](https://github.com/forcedotcom/cli/issues/2816), plugin-deploy-retrieve PR [#973](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/973)).  We actually fixed this in April but forgot to put it in the release notes.

* FIX: Recently created packages take some time to become available to all orgs.  If you use `sf package install` to install that's not available yet, you get an error.  The error now explains that it might work but not yet. (Github issue [#2921](https://github.com/forcedotcom/cli/issues/2921), packaging library PR [#600](https://github.com/forcedotcom/packaging/pull/600/))

## 2.49.7 (July 10, 2024)

* NEW and FIX: (This new and fixed issue is interesting mostly to Salesforce CLI plugin developers.) The JSDoc for the [`SfProject`](https://forcedotcom.github.io/sfdx-core/classes/sfProject.SfProject.html) and [`SfProjectJson`](https://forcedotcom.github.io/sfdx-core/classes/sfProject.SfProjectJson.html) classes in the `@salesforce/core` library now align with the code, and we cleaned up the examples.  While we were messing around in there anyway, we added these two useful methods: `SfProject.getPluginConfiguration` and `SfProject.setPLuginConfiguration`.  Check 'em out! (sfdx-core PR [#1094](https://github.com/forcedotcom/sfdx-core/pull/1094))

* CHANGE: After a [successful beta period](https://github.com/forcedotcom/cli/issues/2738), the `data import|export beta tree` commands are now generally available.  Specifically:

     * We moved the new functionality in `data import beta tree` to the "official" `data import tree` command. We moved the functionality from the old `data import tree` to `data import legacy tree`.  Similarly...
     * We moved the new functionality in `data export beta tree` to the "official" `data export tree` command. We moved the functionality from the old `data export tree` to `data export legacy tree`.

     What does this mean in practice?  As of this release, when you execute `data import tree`, for example, you get the _new_ functionality that was in beta until now. If you run into any issues and you want to return to the old functionality, use the `data import legacy tree` command. Same with `data export tree`. However, note that we plan to remove these `legacy` commands in November, 2024.

     Read about the changes we added to these new commands, including two breaking changes to `data import tree`, in [this issue](https://github.com/forcedotcom/cli/issues/2738) that we've pinned since February 2024. (plugin-data PR [#975](https://github.com/salesforcecli/plugin-data/pull/975)). 

* CHANGE: These scratch org snapshot commands are now generally available; they were previously in beta. (plugin-signups PR [#629](https://github.com/salesforcecli/plugin-signups/pull/629))

    * `org create snapshot`
    * `org delete snapshot`
    * `org get snapshot`
    * `org list snapshot`

* FIX: You can now correctly deploy and retrieve the DecisionMatrixDefinition, DecisionMatrixDefinitionVersion, and ExpressionSetDefinitionVersion . (GitHub issue [#2823](https://github.com/forcedotcom/cli/issues/2823), source-deploy-retrieve PR [#1357](https://github.com/forcedotcom/source-deploy-retrieve/pull/1357))

* FIX: You can now correctly deploy and retrieve the ExperienceResource, DigitalExperienceBundle, and DigitalExperience . (GitHub issue [#2634](https://github.com/forcedotcom/cli/issues/2634), source-tracking PR [#621](https://github.com/forcedotcom/source-tracking/pull/621))

* FIX: You can now use the `--purge-on-delete` and `--metadata-dir` flags of the `project deploy start` command together to hard delete components whose local source files are in metadata-format. "Hard delete" means the component is immediately eligible for deletion in the org rather than being stored in the Recycle Bin. The directory pointed to by `--metadata-dir` must contain at least one of the destructive manifest files (`destructiveChangesPre.xml` or `destructiveChangesPost.xml`) or you get an error. (GitHub issue [#2909](https://github.com/forcedotcom/cli/issues/2909), plugin-deploy-retrieve [#1069](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1069))

* FIX: The `org list` command no longer displays incorrect information for a scratch org when its ID (when you ignore case) matches the ID of other ScratchOrgInfo records in the Dev Hub org. (plugin-org PR [#1119](https://github.com/salesforcecli/plugin-org/pull/1119))

* FIX: We improved the error message when a deploy, retrieve, or convert fails because of a problem with the source file, such as an incorrect XML element or missing parent XML file. (source-deploy-retrieve PR [#1355](https://github.com/forcedotcom/source-deploy-retrieve/pull/1355))

## 2.48.6 (July 3, 2024)

* NEW: Filter the list of package versions that are returned from the `package version list` command based on the source-control branch that the package versions are based on. (GitHub issue [#1530](https://github.com/forcedotcom/cli/issues/1530), plugin-packaging PR [#690](https://github.com/salesforcecli/plugin-packaging/pull/690), packaging PR [#594](https://github.com/forcedotcom/packaging/pull/594))

    This example lists package versions that are based on the `featureA` branch in your default Dev Hub org:

    ```
    sf package version list --branch featureA
    ```
    
* CHANGE: The colorization of the log output when you run `apex get log` and `apex tail log` is now the same; previously the commands used different color schemes, which was a tad confusing. (plugin-apex PR [#484](https://github.com/salesforcecli/plugin-apex/pull/484))

* CHANGE: The deprecation warning for the sfdx-style `force:org:create`, `force:org:delete`, `force:mdapi:*`, and `force:source:*` commands now include the date when they will be removed: November 6, 2024. (plugin-org PR [#1118](https://github.com/salesforcecli/plugin-org/pull/1118))

* CHANGE: You can now include keys that start with an upper-case letter inside of the `plugins` property of `sfdx-project.json` file. Almost all keys in the file must start with a lower-case letter (camelCase). We made this change because we previously made an exception for keys inside the `packageAlias` property, and sometimes it's useful to use these same key names in the `plugin` section too. We continue to enforce camelCase naming for all other `sfdx-project.json` keys. ([Trailblazer Community bug report](https://trailhead.salesforce.com/trailblazer-community/feed/0D53A00003wzhsn), sfdx-core PR [#1093](https://github.com/forcedotcom/sfdx-core/pull/1093))

* FIX: We fixed a bug where different major versions of sfdx-core in use simultaneously would cause a TypeError (github issue [#2935](https://github.com/forcedotcom/cli/issues/2935), sfdx-core PR [#1098](https://github.com/forcedotcom/sfdx-core/pull/1098)).
 
* FIX: We fixed a bug in which the first install of a JIT plugin would sometimes fail with the error `ModuleLoadError: [MODULE_NOT_FOUND]`. (oclif PR [#1124](https://github.com/oclif/core/pull/1124))

* FIX: Salesforce CLI now correctly handles situations such as expired passwords or required multi-factor authentication when it detects that a session has expired. (jsforce issues [#1291](https://github.com/jsforce/jsforce/issues/1291), [#1308](https://github.com/jsforce/jsforce/issues/1308), and [#1411](https://github.com/jsforce/jsforce/issues/1411); sfdx-core PR [#1095](https://github.com/forcedotcom/sfdx-core/pull/1095), jsforce PR [#1517](https://github.com/jsforce/jsforce/pull/1517))

## 2.47.6 (June 26, 2024)

* NEW: Permanently delete records in your org via the Bulk API 2.0 with the new `--hard-delete` flag of the `data delete bulk` command. When you specify this flag, the records become immediately eligible for deletion, which means you no longer need to manually clean them from the Recycle Bin. For example, permanently delete account records from your default org using the IDs listed in the specified CSV file:

    ```
    sf data delete bulk --sobject Account --file files/delete.csv --hard-delete
    ```

    Users must have the "Bulk API Hard Delete" system permission to use the `--hard-delete` flag.  This permission is disabled by default and can be enabled only by a system administrator. (GitHub discussion [#2904](https://github.com/forcedotcom/cli/discussions/2904), plugin-data PR [#959](https://github.com/salesforcecli/plugin-data/pull/959))

* FIX: The `force data bulk delete|status|upsert` commands now stop polling for the bulk job state in the org, and then stop executing and throw an error, if the job is aborted for some reason. These commands use Bulk API 1.0; the `data bulk` commands that use Bulk API 2.0 already work this way. (GitHub jsforce issue [#765](https://github.com/jsforce/jsforce/issues/765), jsforce PR [#1481](https://github.com/jsforce/jsforce/pull/1481))

* FIX: We've improved the warning message when retrieving custom fields using wildcards. (GitHub issue [#1366](https://github.com/forcedotcom/cli/issues/1366), plugin-deploy-retrieve [#1052](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1052))

* FIX: If a scratch org creation fails, after the org has created (such as it fails to deploy the settings), the command returns exit code 68 (like all other partial success outcomes).  It will save the auth so you can debug the settings deploy error or delete the scratch org. (GitHub issue [#202](https://github.com/forcedotcom/cli/issues/202), sfdx-core [#1086](https://github.com/forcedotcom/sfdx-core/pull/1086))

* FIX: Salesforce DX projects now support the StageDefinition [metadata type](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json).

    Salesforce DX projects no longer support using the ExpressionSetDefinitionVersion metadata type directly. Use its parent (ExpressionSetDefinition) instead.

## 2.46.6 (June 19, 2024)

* NEW: We now publish all artifacts associated with a Salesforce CLI release in the [salesforce/cli](https://github.com/salesforcecli/cli/releases) GitHub repository. The release artifacts include the operating system-specific installers, such as the Windows `*.exe` executable, and all TAR files for the Linux, Windows, and macOS installs.

    To download a particular artifact, go to the [Releases](https://github.com/salesforcecli/cli/releases) page, click on the release (such as [2.45.6](https://github.com/salesforcecli/cli/releases/tag/2.45.6)), open **Assets**, and then click on the artifact.  (github-workflows PR [#107](https://github.com/salesforcecli/github-workflows/pull/107))

    The links to download the Salesforce CLI installation packages, executables, and TAR files that are documented in the [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm) continue to work as before. 

* NEW: Salesforce CLI now prompts you with potential alternatives when you misstype a username or alias when running an `org login` command. (sfdx-core PR [#1079](https://github.com/forcedotcom/sfdx-core/pull/1079))

* CHANGE: We've improved the filesystem structure of the output when you set the SF_MDAPI_TEMP_DIR environment variable and then run `project deploy start` or `project retrieve start`. These changes make it easier to debug any issues when deploying or retrieving. The changes to the output include:

    * A top-level directory whose name includes the timestamp of the operation and whether the output is a result of a deploy or a retrieve.
    * For retrieves, the output includes both formats of the retrieved files, in their own directories (`metadata` and `source`). The `metadata` directory includes the downloaded `.ZIP` file and the unzipped metadata format files; the `source` directory contains the converted files in source format. Both directories include the `package.xml` file.
    * For deploys, the output includes only the metadata format of the deployed files in the `metadata` directory, along with a `package.xml` file.

    (source-deploy-retrieve PR [#1331](https://github.com/forcedotcom/source-deploy-retrieve/pull/1331))

* FIX: Source Mobility (BETA): If you move a local file to a new location in your project, and then edit the file before running `project deploy start|preview` or `project retrieve start|preview`, Salesforce CLI now correctly handles both the file move and the update. (source-tracking [#601](https://github.com/forcedotcom/source-tracking/pull/601))

* FIX: Source Mobility (BETA): You can now move source files in very large projects (over 8GB with over 1700 files) and successfully deploy without getting an out of memory error. (GitHub issue [#2880](https://github.com/forcedotcom/cli/issues/2880), source-tracking PR [#591](https://github.com/forcedotcom/source-tracking/pull/591))

* FIX: When retrieving a CustomField from the org, `project retrieve start` now preserves the content of the field's CustomObject source file. We partly fixed this bug [back in May](./README.md#2418-may-15-2024), but this time around we think we fixed it all. (Github issue [#2865](https://github.com/forcedotcom/cli/issues/2865), source-deploy-retrieve PR [#1338](https://github.com/forcedotcom/source-deploy-retrieve/pull/1338))

## 2.45.6 (June 12, 2024)

* NEW: We now warn you if you set an alias that includes a space, which we don't recommend. If you decide to stick with the spaces, then you must use double quotes around it, such as:

    ```bash
    sf project deploy start --target-org "my scratch"
    ```
    (plugin-settings PR [#625](https://github.com/salesforcecli/plugin-settings/pull/625))
  
* FIX: We now correctly display an error if you try to convert source files that are already in metadata format to the same format.   (source-deploy-retrieve PR [#1329](https://github.com/forcedotcom/source-deploy-retrieve/pull/1329))

* FIX: The JSON response, when running the `org sandbox create|refresh|resume` commands with the `--json` flag, now includes the sandbox username if the sandbox is in a completed state and has been authenticated. This update makes the JSON output consistent with the human-readable output. (GitHub issue [#2879](https://github.com/forcedotcom/cli/issues/2879), plugin-org PR [#1068](https://github.com/salesforcecli/plugin-org/pull/1068))

* FIX: We improved the error message when you run `package install` on a package that was created with an installation key, but you either don't provide the key when installing it, or the key is incorrect. (GitHub issue [#2882](https://github.com/forcedotcom/cli/issues/2882), packaging PR [#580](https://github.com/forcedotcom/packaging/pull/580))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):
    
    * EnblProgramTaskSubCategory
    * LearningItemType

## 2.44.8 (Jun 5, 2024)

* NEW: (Beta) Enable a behavior of your project source files with the new `project convert source-behavior` command. For example, to update your project so it starts decomposing permission sets, run this command:

    ```bash
    $ sf project convert source-behavior --behavior decomposePermissionSetBeta
    ```

   When the command finishes, your `sfdx-project.json` file is updated to always decompose permission sets, and the existing permission set files in your local package directories are converted into the new decomposed format. You run this command only once for a given behavior change. Use the `--dry-run` flag to preview what would be changed; sample files are created in a `DRY-RUN-RESULTS` directory.

   Here are the current possible values for the `--behavior` flag:

    * `decomposePermissionSetBeta` — Decompose the [PermissionSet](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_permissionset.htm) metadata type.
    * `decomposeCustomLabelsBeta` — Decompose the [CustomLabels](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_customlabels.htm) metadata type.
    * `decomposeWorkflowBeta` — Decompose the [WorkFlow](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_workflow.htm) metadata type.
    * `decomposeSharingRulesBeta` — Decompose the [SharingRules](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_sharingrules.htm) metadata type

  This command replaces the manual steps we documented in the [April 10, 2024](./README.md#2368-april-10-2024) release notes for converting your project to decompose the additional four metadata types. Because the behaviors are beta, the values for the `--behavior` flag include the word `Beta`.  When a particular behavior becomes generally available (GA), we'll remove the `Beta` label; for example, when we make decomposing permission sets generally available, the new flag value will be `--behavior decomposePermissionSet`.  This command, and the individual behaviors, can become generally available at different times; check these release notes for announcements.

  (plugin-deploy-retrieve PR [#1015](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/1015))

* NEW: We've improved the `doctor` command so it now checks whether your computer can access certain Web sites and registries required by Salesforce CLI.  Here's truncated sample output to show which URLs it checks:

    ```bash
    $ sf doctor
    === Running all diagnostics

    pass - salesforcedx plugin not installed
    pass - no linked plugins
    pass - [@salesforce/plugin-deploy-retrieve] sourceApiVersion matches apiVersion
    pass - [@salesforce/plugin-trust] can ping: https://registry.npmjs.org
    pass - [@salesforce/plugin-trust] can ping: https://registry.yarnpkg.com
    pass - [@salesforce/plugin-trust] can ping: https://registry.npmjs.org/
    pass - can access: https://test.salesforce.com
    pass - can access: https://appexchange.salesforce.com/services/data
    pass - can access: https://developer.salesforce.com/media/salesforce-cli/sf/channels/stable/sf-win32-x64-buildmanifest
    ...
    ```
    (plugin-info PR [#746](https://github.com/salesforcecli/plugin-info/pull/746), plugin-trust PR [#828](https://github.com/salesforcecli/plugin-trust/pull/828))
  

* NEW: Source Mobility (BETA). Source files can now be moved within your local Salesforce DX project without source-tracking thinking that you've deleted and then recreated a metadata component. This is a BETA feature and you must opt-in to enable it. You can opt-in by setting the SF_BETA_TRACK_FILE_MOVES environment variable to `true`.  Then reorganize your files as you like!  A few things to keep in mind:

    * Source Mobility works with file moves, not file renames. Renaming a source file is still interpreted as deleting a metadata component and creating a new one with the different name.
    * Child source files can only move to an identically named parent. For example, a custom field can move between Object folders in different package directories only if both Object folders have the same name.

    Enjoy!  (GitHub discussion [#2682](https://github.com/forcedotcom/cli/discussions/2682), source-tracking [#574](https://github.com/forcedotcom/source-tracking/pull/574))
    
* NEW: Upload a local file to an org with the new `data create file` command. The default title of the uploaded file in the Salesforce UI is its filename; you can change its title with the `--title` flag. By default, the file isn't associated with a Salesforce record; use the `--parent-id` flag to attach the file to an existing Salesforce record, such as an account.

    In this example, the uploaded file is given a new title and it's attached to the Salesforce record with ID a03fakeLoJWPIA3:

    ```bash
    sf data create file --file resources/astro.png --parent-id a03fakeLoJWPIA3 --title AstroOnABoat --target-org my-sandbox
    ```
    (GitHub issues [#2344](https://github.com/forcedotcom/cli/discussions/2344) and [#2346](https://github.com/forcedotcom/cli/discussions/2346), plugin-data PR [#922](https://github.com/salesforcecli/plugin-data/pull/922))
  
* CHANGE: We've changed the name of the new beta `sfdx-project.json` option that you use to decompose the optional metadata types when sync'ing source between your org and project.  

    * Old name: `registryPresets`
    * New name: `sourceBehaviorOptions`
    
    For example:

     ```bash
     "sourceBehaviorOptions": ["decomposePermissionSetBeta", "decomposeWorkflowBeta"]
     ```
    
    The new beta feature itself hasn't changed, including the list of possible values for the `sourceBehaviorOptions`. See the [April 10, 2024 release notes](./README.md#2368-april-10-2024) for more information. (schemas PR [#87](https://github.com/forcedotcom/schemas/pull/87), source-deploy-retrieve PR [#1312](https://github.com/forcedotcom/source-deploy-retrieve/pull/1312))

* FIX: If you delete a Global Action in a source-tracking-enabled org, then run `project retrieve start`, Salesforce CLI now deletes it locally.  Previously it did nothing because the server incorrectly lists the change as `QuickActionDefinition`.  (GitHub issue [#2829](https://github.com/forcedotcom/cli/issues/2829), source-tracking PR [#590](https://github.com/forcedotcom/source-tracking/pull/590))

* FIX: The `project deploy report` command no longer displays incorrect warnings about source format files that don't apply to the asynchronous deployment of metadata format files. (GitHub issue [#2862](https://github.com/forcedotcom/cli/issues/2862), source-deploy-retrieve PR [#1311](https://github.com/forcedotcom/source-deploy-retrieve/pull/1311))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):
    
    * GenAiFunction
    * GenAiPlanner
    * DataKitObjectDependency

## 2.42.6 (May 22, 2024)

* NEW: Quickly find the date that your current Salesforce CLI version was published by running the `version --verbose` command. The new output also lists the current `latest` (AKA `stable`) version of Salesforce CLI, based on the [npm tags](https://www.npmjs.com/package/@salesforce/cli?activeTab=versions). The new output also displays the same information for any user-installed plugins, including the Salesforce JIT plugins such as `@salesforce/sfdx-scanner`.  We also made the output easier to read. (oclif plugin-version PR [#425](https://github.com/oclif/plugin-version/pull/425))

    Here's partial output of the new command showing that the installed version (`2.39.6`) was published 21 days ago, and that the latest version is `2.40.7`:

     ```bash
     $ sf version --verbose
     CLI Version:
	    @salesforce/cli/2.39.6 published 21 days ago (Tue Apr 23 2024) (latest is 2.40.7)
     ...
     ```

* CHANGE: If you install Salesforce CLI using `npm`, your local version of Node.js must be at least 18.16. (cli PR [#1645](https://github.com/salesforcecli/cli/pull/1645))

* FIX: On Windows, running a Salesforce CLI command no longer causes a new CMD window to briefly appear and then disappear. Thanks [@jaklein](https://github.com/jaklein) for pointing out the fix!  (GitHub issue [#2833](https://github.com/forcedotcom/cli/issues/2833), plugin-telemetry PR [#620](https://github.com/salesforcecli/plugin-telemetry/pull/620))

* FIX: (This fix is mostly relevant to our fabulous plugin developers) We've updated various files, such as the schema for `sfdx-project.json`, so that you no longer get type issues or `Property not found` when developing with our APIs in VSCode or other IDE. (GitHub issue [#2201](https://github.com/forcedotcom/cli/issues/2201), schemas PR [#85](https://github.com/forcedotcom/schemas/pull/85), sfdx-core [#1066](https://github.com/forcedotcom/sfdx-core/pull/1066), packaging [#569](https://github.com/forcedotcom/packaging/pull/569))

## 2.41.8 (May 15, 2024)

* NEW: The `project retrieve start` command now warns you if you have the pattern `**/unpackaged/**` in your `.forceignore` file. This pattern causes the retrieve to ignore all files, because `/unpackaged` is the directory within the retrieved ZIP file in which all unpackaged metadata lives. (GitHub issue [#2399](https://github.com/forcedotcom/cli/issues/2399), source-deploy-retrieve PR [#1301](https://github.com/forcedotcom/source-deploy-retrieve/pull/1301)) 

* CHANGE: The `org delete snapshot` command now prompts for confirmation from the user before it deletes the snapshot; previously the command didn't prompt. Use the new `--no-prompt` flag to not be prompted, which is the old behavior. (plugin-signups PR [#567](https://github.com/salesforcecli/plugin-signups/pull/567))

* FIX: Specifying the `--no-namespace` flag of the `org create scratch` command now correctly creates a scratch org that doesn't have a namespace. (GitHub issue [#2855](https://github.com/forcedotcom/cli/issues/2855), sfdx-core PR [#1064](https://github.com/forcedotcom/sfdx-core/pull/1064))

* FIX: When retrieving a CustomField from the org, `project retrieve start` now preserves the content of the field's CustomObject source file. (Github issue [#2865](https://github.com/forcedotcom/cli/issues/2865), source-deploy-retrieve PR [#1308](https://github.com/forcedotcom/source-deploy-retrieve/pull/1308))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):

  * ForecastingGroup
  * RecordAlertTemplate
  * RetrievalSummaryDefinition
  * SearchCustomization
  * SearchOrgWideObjectConfig
 
## 2.40.7 (May 8, 2024)

* NEW: Some Salesforce CLI downloads, installations, and updates are now faster because we reduced the size of the Salesforce CLI OS-specific installers and TAR files. Specifically, we no longer include files like `oclif.lock`, `yarn.lock`, `npm-shrinkwrap`, and `package-lock` in them.  (GitHub discussion [#2835](https://github.com/forcedotcom/cli/discussions/2835), oclif PR [#1385](https://github.com/oclif/oclif/pull/1385))

* FIX: When converting from mdapi format to source format, Salesforce CLI now preserves all comments in the metadata XML file. As a result, the help text, labels, and picklist values of Custom Object Translations are correctly included in the source format files. (GitHub issue [#2830](https://github.com/forcedotcom/cli/issues/2830), source-deploy-retrieve PR [#1288](https://github.com/forcedotcom/source-deploy-retrieve/pull/1288))

* FIX: Salesforce CLI once again supports big object types whose index files use the legacy `.indexe` suffix rather than the better `.index` suffix. But we've also added a warning if your big object uses the `.indexe` suffix, asking you to update it to `.index`.  (GitHub issue [#2847](https://github.com/forcedotcom/cli/issues/2847), source-deploy-retrieve PR [#1298](https://github.com/forcedotcom/source-deploy-retrieve/pull/1298))

* FIX: The `.forceignore` file now works consistently, whether you're using source or mdapi format. Specifically, when you deploy or retrieve in source format (using `sf project deploy start`, for example), the command respects file names of `.forceignore` entries in source format. Similarly, when you deploy or retrieve in mdapi format (using `sf project deploy start --metadata-dir`, for example), the command respects file name entries in mdapi format. (GitHub issue [#2737](https://github.com/forcedotcom/cli/issues/2737), source-deploy-retrieve PR [#1295](https://github.com/forcedotcom/source-deploy-retrieve/pull/1295))

* FIX: The `org shape list` command now works as expected, even when the connection to the Dev Hub org is incorrect.

## 2.39.6 (May 1, 2024)

* FIX: `project delete source` doesn't throw errors when confirming that you want to delete source that doesn't exist locally.  (GitHub issue [#2836](https://github.com/forcedotcom/cli/issues/2836), plugin-deploy-retrieve PR [#986](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/986))

* FIX: `project generate manifest --from-org` was throwing errors when the metadata API responds with metadata missing required properties.  We've alerted the resonsible team, and in the meantime created some checks in the CLI to prevent the error (and warn you about what metadata can't be processed).  (GitHub issue [2841](https://github.com/forcedotcom/cli/issues/2841), source-deploy-retrieve PR [#1296](https://github.com/forcedotcom/source-deploy-retrieve/pull/1296)).

* FIX: `sf plugins link` had a problem linking plugins that needed to be compiled before use.  We've fixed that (GitHub issue [#2818](https://github.com/forcedotcom/cli/issues/2818), oclif/plugin-plugins PR [#841](https://github.com/oclif/plugin-plugins/pull/841))

* FIX: `sf apex test run` handles the `--wait` flag better.  (GitHub issue [#2108](https://github.com/forcedotcom/cli/issues/2108), plugin-apex PR [#422](https://github.com/salesforcecli/plugin-apex/pull/422), apex library PR [#364](https://github.com/forcedotcom/salesforcedx-apex/pull/364))

## 2.38.7 (April 24, 2024)

* NEW: Salesforce CLI downloads, installations, and updates just got a whole lot faster, especially on Windows! Why?  Because we've significantly reduced the size of both the `npm` packages and the OS-specific installers.  The `npm` reduction is the champion: it's ~35% smaller. But the installers are ~10% slimmer too. Nice. 

* NEW: You can now use the `language` property in scratch org definition files in combination with scratch org snapshots in Summer24.  (GitHub issue [#2643](https://github.com/forcedotcom/cli/issues/2643), sfdx-core PR [#1055](https://github.com/forcedotcom/sfdx-core/pull/1055) plus some server-side changes in the major release)
   
* FIX: Salesforce CLI, when interacting with an org, now properly retries the command when it runs into a network error. (GitHub issues [#1350](https://github.com/forcedotcom/cli/issues/1350) and [#2557](https://github.com/forcedotcom/cli/issues/2557), jsforce PR [#1403](https://github.com/jsforce/jsforce/pull/1403))

* FIX: The `project deploy report` command now returns results about all deployed files, even if they don't currently exist in your local project. This scenario can happen if the deploy occurs on one computer and the report command is run on a different computer where the project looks different. The report command warns the user if a local file doesnt' exist. (GitHub issues [#2602](https://github.com/forcedotcom/cli/issues/2603) and [#2602](https://github.com/forcedotcom/cli/issues/2602), source-deploy-retrieve PR [#1273](https://github.com/forcedotcom/source-deploy-retrieve/pull/1273))

* FIX: The `project deploy retrieve` command now does not check for a project when doing a metadata api retrieve when using the `--manifest` flag, and it shouldn't have started doing that. (Github issue [#2832](https://github.com/forcedotcom/cli/issues/2832) and [#2831](https://github.com/forcedotcom/cli/issues/2831), plugin-deploy-retrieve PR [#978](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/978)

* FIX: NodeJS made a breaking windows-related security change.  We adjusted the CLI to comply.  (Github issue [#2822](https://github.com/forcedotcom/cli/issues/2822), plugin-telemetry PR [#611](https://github.com/salesforcecli/plugin-telemetry/pull/611), oclif/plugin-plugins PR [#847](https://github.com/oclif/plugin-plugins/pull/847), oclif/plugin-update [#788](https://github.com/oclif/plugin-update/pull/788)) 

NOTE: As a result of this NodeJS change, some windows users will see a terminal "flash" (see [#2833](https://github.com/forcedotcom/cli/issues/2833)) in certain scenarios.  We're working on a way to avoid that.

## 2.37.4 (April 17, 2024)

* NEW: The JSON output of the `package version create` command now contains more information: the percentage of Apex code lines that are covered by tests (CodeCoverage) and the full package version number (VersionNumber). The new CodeCoverage key corresponds to the Tooling API `Package2Version.CodeCoverage` field; the VersionNumber key corresponds to a concatenation of the `Package2Version.MajorVersion`, `Package2Version.MinorVersion`, `Package2Version.PatchVersion`, and `Package2Version.BuildNumber` fields. (packaging PR [#492](https://github.com/forcedotcom/packaging/pull/492))

    Thank you, [Ronny Rokitta](https://github.com/Rocko1204)!  This is a great follow-on contribution from the one you made in [January](./README.md#2257-jan-24-2024) -- we love repeat contributors. Cheers!

* CHANGE: We removed the `force org clone` and `force org status` commands from Salesforce CLI; use the `org create sandbox` and `org resume sandbox`, respectively, instead. We deprecated the two commands on [Feb 9, 2023](https://github.com/forcedotcom/cli/blob/main/releasenotes/sfdx/README.md#71871-feb-9-2023).  (plugin-org PR [#1009](https://github.com/salesforcecli/plugin-org/pull/1009)).

* FIX: If you deploy source to an org, and source tracking fails for some reason (such as a server error, CLI error, or a problem in your environment), you now get the full details of the failure. Previously you would get just the `MetadataTransferError` error, and no more information, so it was difficult to troubleshoot what the problem was. (source-deploy-retrieve PR [#1275](https://github.com/forcedotcom/source-deploy-retrieve/pull/1275))

* FIX: You can now successfully run `project deploy report` and get information about a deployment that you first validated with `project deploy validate` and then quick deployed with `project deploy quick`.  (plugin-deploy-retrieve PR [#962](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/962))

## 2.36.8 (April 10, 2024)

* NEW: (Beta) Specify that Salesforce CLI decompose four more metadata types when it converts from mdapi to source format, in addition to the types it currently decomposes automatically (CustomObject and CustomObjectTranslation).  And stay tuned, we're planning to do more types soon!

    By "decompose" we mean that Salesforce CLI breaks the single, and often very large, mdapi-format XML file that corresponds to a metadata component into smaller XML files based on the sub-types. These files live in sub-directories of a directory named the same as the component. See [Salesforce DX Project Structure and Source Format](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_source_file_format.htm) for information on how CustomObject and CustomObjectTranslations are decomposed; that topic will soon be updated with similar information about the new decomposed types.

    Unlike CustomObject and CustomObjectTranslation, you must explicitly opt-in to decompose these new types. It's easy: just add a `registryPresets` option to your `sfdx-project.json` file and set it to one or more of these values:

    * `decomposePermissionSetBeta` : decompose the [PermissionSet](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_permissionset.htm) metadata type
    * `decomposeWorkflowBeta` : decompose the [Workflow](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_workflow.htm) metadata type
    * `decomposeCustomLabelsBeta` : decompose the [CustomLabels](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_customlabels.htm) metadata type
    * `decomposeSharingRulesBeta` : decompose the [SharingRules](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_sharingrules.htm) metadata type

    When you next retrieve the component, it will be decomposed. (The values include the word `Beta`, because this feature is currently in beta. When it becomes generally available, you'll simply remove the `Beta` part.)

    For example, if you want to decompose PermissionSet and Workflow types, add this to your `sfdx-project.json`:

    `"registryPresets": ["decomposePermissionSetBeta", "decomposeWorkflowBeta"]`

    If you already have these metadata types in your project, be sure you follow these steps to start using this new feature:

    1. Remove all the files that correspond to the existing metadata components from your project. For example, if you want to start decomposing PermissionSet and Workflow types, remove files that look something like this:

        ```bash
        cd <myproject>
        rm force-app/main/default/permissionsets/MyPermSet.permissionset-meta.xml
        rm force-app/main/default/workflows/Account.workflow-meta.xml
        ```

    1. Update your `sfdx-project.json` file and specify the two values to the `registryPresets` option:

       `"registryPresets": ["decomposePermissionSetBeta", "decomposeWorkflowBeta"]`

    1. Retrieve these components again:

       `sf project retrieve start --metadata PermissionSet --metadata Workflow`

  The command retrieved a bunch of smaller XML files for each permission set and workflow, rather than a single file.  Hurray!  (GitHub discussion [#2544](https://github.com/forcedotcom/cli/discussions/2544), issues [#1159](https://github.com/forcedotcom/cli/issues/1159), [#2356](https://github.com/forcedotcom/cli/discussions/2356), and [#2376](https://github.com/forcedotcom/cli/discussions/2376). source-deploy-retrieve PR [#1217](https://github.com/forcedotcom/source-deploy-retrieve/pull/1217) source-tracking PR [#552](https://github.com/forcedotcom/source-tracking/pull/552))

    **NOTE**: _This feature is a Beta Service. Customers may opt to try such Beta Service in its sole discretion. Any use of the Beta Service is subject to the applicable Beta Services Terms provided at Agreements and Terms (https://www.salesforce.com/company/legal/agreements/)._

    **NOTE**: _This beta feature is supported and tested for only the `sf project deploy|retrieve|delete|convert` commands.  We don't support using the `force:source:push|pull|deploy|retrieve` commands with this feature._    

* NEW: Bypass the warning prompt that's displayed when you install a trusted, yet unsigned, plugin using its GitHub URL by adding the URL to the [Salesforce CLI allowlist](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_allowlist.htm). Previously you could add only npm names to the file. The GitHub URL must be in the format `https://github.com/<org>/<repo>`.

    For example, let's say you add the `https://github.com/oclif/plugin-version` plugin, which isn't signed by Salesforce, to the `unsignedPluginAllowList.json` file. You can then run this command and you won't get the warning prompt:

    ```bash
    sf plugins install https://github.com/oclif/plugin-version
    ```

    We also improved the warning and install messages to clearly indicate which plugin you're installing. (plugin-trust PR [#771](https://github.com/salesforcecli/plugin-trust/pull/771))

* FIX: Salesforce DX projects now support the AffinityScoreDefinition [metadata type](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json).
 
## 2.35.6 (April 3, 2024)

* NEW: Specify the flag values for Salesforce CLI commands in local text files by using the `--flags-dir <dir-name>` flag when running the command. If the command finds a file in the specified directory with the same name as one of its flags, it uses the contents of the file as the value of the flag. Take this command, for example:

    ```bash
    sf project deploy start  --metadata ApexClass --test-level RunLocalTests --target-org my-scratch
    ```
    Let's say you create a directory called `flag-values` in your DX project. You then create a file in that directory called `metadata` (no extension) and add one line of content to the file: `ApexClass`.  Similarly, you create a file called `test-level` with contents `RunLocalTests` and a file called `target-org` with contents `my-scratch`. You can then run the preceding command from the DX project this way:

   ```bash
   sf project deploy start --flags-dir ./flag-values
   ```
   Additional usage notes:

     * The files that contain flag values don't usually have an extension; the only exception is if the files contain `JSON` content, in which case you must use the `.json` extension, such as `files.json`. 
     * For Boolean flags, create an empty file with the name of the Boolean flag.  For example, to specify the `--concise` flag, create an empty file called `concise`. 
     * You can name files for Boolean flags `no-<flagname>`, as long as the Boolean flag supports it. For example, to use this feature with the `org create scratch` command and disable source tracking, create an empty file called `no-track-source`. 
     * If you include multiple lines in a file, then the result is multiple flags, such as `--metadata ApexClass --metadata CustomObject --metadata PermissionSet`.
     * Actual flags take precedence over values in a file. For example, if you specify `--target-org my-scratch` when you run the command, but also specify `--flags-dir` that points to a `target-org` file that contains the line `my-other-scratch`, the command connects to `my-scratch`.  The only exception is for flags that take multiple values, such as `--metadata`; in this case, the flag and file values are combined. 
     * You can name the files using the flag's short name, such as `m` rather than `metadata`.
     * This release adds the new `--flags-dir` flag to all CLI commands except for the commands contained in these plugins:
          * [`sfdx-scanner`](https://github.com/forcedotcom/sfdx-scanner): Code Analyzer commands, such as `scanner run`.
          * [`plugin-devops-center`](https://github.com/salesforcecli/plugin-devops-center): DevOps Center commands, such as `project deploy pipeline start`.
          * [`plugin-functions`](https://github.com/salesforcecli/plugin-functions): Salesforce Functions commands, such as `run function`.

    Pretty cool feature, don't you think?  (GitHub discussions [#2346](https://github.com/forcedotcom/cli/discussions/2346) and [#2670](https://github.com/forcedotcom/cli/discussions/2670). GitHub issue [#2260](https://github.com/forcedotcom/cli/discussions/2260). salesforcecli/cli PR [#1536](https://github.com/salesforcecli/cli/pull/1536), 

* CHANGE: As [previously announced](https://github.com/forcedotcom/cli/issues/2691), Salesforce CLI is now using a major new version of [`oclif/plugin-plugins`](https://github.com/oclif/plugin-plugins); this oclif plugin uses `npm` instead of `yarn` (v1) to install and update user plugins.

    In most cases, there's nothing for you to do as a result of this change. The user plugins you've already installed will continue to work and be updatable using `plugins update`. But just in case, check the **What do I need to do?** section of the [announcement](https://github.com/forcedotcom/cli/issues/2691) for the specific use cases in which you might need to do something. The announcement also explains why we made this change. 

    If you experience issues after you update to this Salesforce CLI release, we recommend that you run `plugins reset --reinstall --hard`, which completely uninstalls all your plugins and then reinstalls them on your behalf. If you continue to experience issues, create a new GitHub issue.  (oclif/plugin-plugins PR [#776](https://github.com/oclif/plugin-plugins/pull/776))

* FIX: You can now include the same source component in all the manifest files (standard, pre-deploy-delete, post-deploy-delete) simultaneously. As a result, you can now, for example, first delete a component and then add it again in a single execution of the `project deploy start` command.  (GitHub issue [#2761](https://github.com/forcedotcom/cli/issues/2761), source-deploy-retrieve PR [#1261](https://github.com/forcedotcom/source-deploy-retrieve/pull/1261))

* FIX: Salesforce CLI now supports authenticating to orgs with `.cn` domains. (plugin-auth PR [#995](https://github.com/salesforcecli/plugin-auth/pull/955))

* FIX: You can now use the `--target-org` flag with the `project deploy cancel` command. (GitHub discussion [#2300](https://github.com/forcedotcom/cli/discussions/2300#discussioncomment-8053672), plugin-deploy-retrieve PR [#945](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/945))

* FIX: If you run a non-existent command with "closed stdin" (i.e. you specify `<&-` or `< /dev/null` after the command), Salesforce CLI now waits 10 seconds after prompting for a matching command, and then returns the appropriate error exit code. Previously it returned a `0` exit code. [oclif GitHub issue [#266](https://github.com/oclif/plugin-not-found/issues/266), oclif plugin-not-found PR [#566](https://github.com/oclif/plugin-not-found/pull/566))

* FIX: We've improved the performance and output messages for many of the `data` commands.  In particular:

    * Improved the performance and reduced the API call usage when monitoring bulk jobs for these commands: `data delete bulk`, `data upsert bulk`, `data delete resume`, `data upsert resume`, `data query`.
    * Improved the error if you pass an unparseable CSV file to these commands: `data delete bulk`, `data upsert bulk`.
    * Improved the output of the bulk job event updates for these commands: `data delete bulk`, `data upsert bulk`, `data delete resume`, `data upsert resume`.
 
     (plugin-data PR [#843](https://github.com/salesforcecli/plugin-data/pull/843))

## 2.34.7 (March 27, 2024)

* CHANGE: You can now override the name or license type of a new sandbox (that you create with a definition file) by specifying the `--name` or `--license-type` flags in addition to `--definition-file`. Previously, if you specified a definition file, you couldn't also specify either `--name` or `--license-type`. 

    For example, let's say the `sandboxName` option in the `config/dev-sandbox-def.json` file is `fulldev1`; the following command creates a sandbox using all the options in the definition file, except that the sandbox name is `fulldev2`:

    ```bash
    $ sf org create sandbox --definition-file config/dev-sandbox-def.json --target-org prodOrg --name fulldev2
    ```

    (plugin-org PR [#991](https://github.com/salesforcecli/plugin-org/pull/991))

* FIX: You can now successfully authorize an org using `org login web` and version 123 of the Chrome browser, which was recently released.  (GitHub issue [#2785](https://github.com/forcedotcom/cli/issues/2785), sfdx-core PR [#1040](https://github.com/forcedotcom/sfdx-core/pull/1040), plugin-auth PR [#975](https://github.com/salesforcecli/plugin-auth/pull/975))

* FIX: String replacements during deployments of individual CustomLabel metadata types (without their parent CustomLabels metadata type) are now working as expected.  (GitHub issue [#2755](https://github.com/forcedotcom/cli/issues/2755), source-deploy-retrieve PR [#1257](https://github.com/forcedotcom/source-deploy-retrieve/pull/1257))

* FIX: You can now successfully execute the `sf org open` command from the terminal window of VS Code that's running on Windows Subsystem for Linux (WSL) 2. (GitHub issue [#2677](https://github.com/forcedotcom/cli/issues/2677), plugin-org PR [#962](https://github.com/salesforcecli/plugin-org/pull/962))

    Thank you [nrakuyama](https://github.com/nrakuyama) for contributing the fix!  We love your initiative and help.  Here's to many more!

* FIX: We've improved how Salesforce CLI internally converts files between source and metadata formats. The conversion no longer returns an error when done outside a Salesforce DX project. Also, the conversion can now write a zip to disk. (source-deploy-retrieve PR [#1252](https://github.com/forcedotcom/source-deploy-retrieve/pull/1252))

    Many thanks to [Aaron Csetter](https://github.com/aaron-csetter) for finding the problems, and then contributing the fixes. Contributions like yours help make Salesforce CLI a better-than-ever developer tool, and we're very appreciative!
  
* FIX: When deploying, Salesforce CLI now continues to poll for status even when these HTTP error codes are in the response: 502, 503, and 420. (source-deploy-retrieve PR [#1262](https://github.com/forcedotcom/source-deploy-retrieve/pull/1262))

* FIX: Salesforce DX projects now support the ConversationMessageDefinition [metadata type](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json).

## 2.33.3 (March 20, 2024)

* FIX: The `org user display` command no longer displays the Profile Name twice. (GitHub issue [#2762](https://github.com/forcedotcom/cli/issues/2762), plugin-user PR [#898](https://github.com/salesforcecli/plugin-user/pull/898))

    Thank you [dwbuttler](https://github.com/dwbuttler) for noticing the problem, reporting the issue, and then simply fixing it yourself.  We love your initiative!  And we look forward to more contributions from you and our fabulous community.

* FIX: We've improved the error message returned when `project deploy validate --json` encounters a validation error with one or more metadata components. (GitHub issue [#2757](https://github.com/forcedotcom/cli/issues/2757), plugin-deploy-retrieve PR [#938](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/938))

* FIX: You can now successfully authenticate an org in which PKCE ([Proof Key for Code Exchange](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_pkce.htm&type=5)) is enforced.  (Github Discussion [#2726](https://github.com/forcedotcom/cli/discussions/2726), sfdx-core PR [#1035](https://github.com/forcedotcom/sfdx-core/pull/1035))
  
## 2.32.8 (March 13, 2024)

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):

  * MlModelArtifact
  * MlModelConnection
  * MlModelSchema

## 2.31.8 (March 8, 2024)

* NEW: Hold on to your hats, folks -- you can now easily refresh a sandbox org with the new `org refresh sandbox` command. Refreshing a sandbox copies the metadata, and optionally data, from your production org to the refreshed sandbox org. Specify the sandbox you want to refresh with the --name flag and the production org that contains the sandbox licenses with the --target-org flag. You can optionally specify a [definition file](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_sandbox_definition.htm) with the --definition-file flag if you want to change the configuration of the refreshed sandbox, such as its license type or template ID. 

    This example shows how to refresh a sandbox named "devSbx1" without changing its configuration. The production org that contains the sandbox license has the alias "prodOrg".

    ```bash
    sf org refresh sandbox --name devSbx1 --target-org prodOrg
    ```
    In this example, your default org is also your production org with the sandbox licenses, so you don't need to specify --target-org. The configuration changes are in the specified definition file.

    ```bash
    sf org refresh sandbox --name devSbx2 --definition-file config/devSbx2-config.json
    ```
    
    You can't change the sandbox name when you refresh it with this command. If you want to change the sandbox name, first delete it with the `org delete sandbox` command. And then recreate it with `org create sandbox` and give it a new name.

    (GitHub discussion [#2511](https://github.com/forcedotcom/cli/discussions/2511), plugin-org PR [#973](https://github.com/salesforcecli/plugin-org/pull/973), sfdx-core PR [#1031](https://github.com/forcedotcom/sfdx-core/pull/1031))

* FIX: Salesforce CLI no longer prompts and waits for an answer, and then time out and return a non-zero exit code, when you run a command that asks a question in a non-TTY environment. (GitHub issue [#2739](https://github.com/forcedotcom/cli/issues/2739), oclif/core PR [#967](https://github.com/oclif/core/pull/967))

* FIX: You can now correctly assign multiple permission set licenses at once with the `org assign permsetlicense` command by specifying multiple instances of the `--name` flag. While fixing this issue, we cleaned up a few other error-related issues.  (GitHub issue [#2744](https://github.com/forcedotcom/cli/issues/2744), plugin-user PR [#877](https://github.com/salesforcecli/plugin-user/pull/877))

* FIX: Salesforce DX projects now support the EnablementProgramDefinition [metadata type](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json).

## 2.30.8 (Feb 28, 2024)

* CHANGE: We made a bunch of improvements to the `data import tree` and `data export tree` commands. But because these improvements introduce breaking changes, we're going to first beta the new functionality, and then make it generally available when we're sure everything is in tip-top shape. Here's an overview of the plan, but see the [pinned issue #2738](https://github.com/forcedotcom/cli/issues/2738) for details about the improvements, the breaking changes, and timeline.

    * This release contains two new commands with the improvements: `data import beta tree` and `data export beta tree`. The existing `data import tree` and `data export tree` commands continue to work as before and coexist with the new beta commands.
    * Test these beta commands and let us know if you find any issues. Also let us know if you like the improvements!
    * When the beta period is over, we'll move the functionality that we added to `data import|export beta tree` to the "official" `data import|export tree` commands. We'll then move the functionality in the _old_ `data import|export tree` commands to new commands called `data import|export legacy tree`. 

    Enjoy! (GitHub issues [#2663](https://github.com/forcedotcom/cli/issues/2663) and [#248](https://github.com/forcedotcom/cli/issues/248). GitHub discussion [#2359](https://github.com/forcedotcom/cli/discussions/2359). plugin-data PR [#821](https://github.com/salesforcecli/plugin-data/pull/821) and [#810](https://github.com/salesforcecli/plugin-data/pull/810))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):
    
    * OauthTokenExchangeHandler (GitHub discussion [#2736](https://github.com/forcedotcom/cli/discussions/2736))
    * ActionableEventOrchDef
    * ActionableEventTypeDef
    * OmniExtTrackingDef
      
* FIX: When you pass a command alias to `sf which`, it now outputs an `aliasOf` property that shows the command that the passed-in command is an alias of. (oclif GitHub issue [#515](https://github.com/oclif/plugin-which/issues/515), plugin-which PR [#545](https://github.com/oclif/plugin-which/pull/545))


## 2.29.5 (Feb 21, 2024)

* CHANGE: We removed the `--target-dev-hub` flag from these commands; the flag has been deprecated and hidden for over two years because it has no effect:

    * `org create user`
    * `org display user`
    * `org list users`
 
    (plugin-users PR [#864](https://github.com/salesforcecli/plugin-user/pull/864))

* FIX: We updated our Github Actions to be more friendly to external developers. In particular, we modified our [external plugin template](https://github.com/salesforcecli/plugin-template-sf-external) so that `dev generate plugin` generates updated sample GitHub Actions workflow files. We also added Personal Access Token instructions to the [README](https://github.com/salesforcecli/github-workflows) in our GitHub Actions repo.

* FIX: Salesforce DX projects now support the EnablementMeasureDefinition [metadata type](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json).

## 2.28.6 (Feb 14, 2024)

* NEW: Your work life is about to get more colorful with Salesforce CLI's new help themes. The help output now uses colors to highlight certain parts, such as the help sections (USAGE, FLAGS, DESCRIPTION, and so on), flags and their descriptions, executable name, and more. To see the default colors, run any command with `--help`- or `-h`.

    If you don't like the colors we chose, specify your own colors by creating a file called `theme.json` file in this location:

    * (Linux and macOS): `$HOME/.config/sf/theme.json`
    * (Windows) Depending on your configuration, either `C:\Users\<username>\.config\sf\theme.json` or `%LOCALAPPDATA%\sf\theme.json`

   Use these JSON keys to specify the color of various sections. 
  
    * `alias`: The aliases listed in the ALIASES section.
    * `bin`: The `sf` executable.
    * `command`: The command's name.
    * `commandSummary`: The command's summary.
    * `dollarSign`: The `$` printed before examples and usage.
    * `flag`: The flag long and short names.
    * `flagDefaultValue`: The text `[default: X]` shown for flags that have a default value.
    * `flagOptions`: The valid options for a flag.
    * `flagRequired`: The text `(required)` shown for required flags.
    * `flagSeparator`: The `,` that separates the short and long flag names (for example, `-f, --foo`).
    * `sectionDescription`: The text inside each section (for example, everything under the DESCRIPTION section).
    * `sectionHeader`: The section header (for example, DESCRIPTION).
    * `topic`: The topics listed in the TOPICS section.
    * `version`: The VERSION section shown when you run `sf --help`.

    For the key's value, use [chalk-style colors](https://github.com/chalk/chalk/?tab=readme-ov-file#colors) (such as `greenBright`), hex code (`#FF0000`) or RGB (`rgb(255,255,255)`). To _not_ colorize a section, set it to `none` or remove it from the `theme.json` file.

    As an example, here's the default `theme.json` file; it uses chalk-style colors. 

   ```json
   {
      "aliases": "none",
      "bin": "blueBright",
      "command": "blueBright",
      "commandSummary": "none",
      "dollarSign": "green",
      "flag": "green",
      "flagDefaultValue": "blueBright",
      "flagOptions": "blueBright",
      "flagRequired": "red",
      "flagSeparator": "none",
      "sectionDescription": "none",
      "sectionHeader": "blue",
      "topic": "blueBright",
      "version": "none"
    }
   ```

    Many thanks to [Alan Oricil](https://github.com/AllanOricil), who contributed the general themes feature to [`oclif`](https://github.com/oclif/core/pull/852). We thought it was very cool, so decided to implement it in Salesforce CLI. May the pretty colors bring a little spark of joy to our community! (salesforce/cli PR [#1451](https://github.com/salesforcecli/cli/pull/1451))

* NEW: It's now super-easy to get your Salesforce CLI installation into a "clean" state with the new `--reinstall` and `--hard` flags of `plugins reset`.

    * `--reinstall` does exactly what it says: reinstalls every plugin that you previously installed.
    * `--hard` removes all package manager related files and directories (`node_modules`, `package.json`, `yarn.lock`, `package-lock.json`) from Salesforce CLI's internal data directory.
    
    For example:

    ```bash
    sf plugins reset --reinstall --hard
    ```
    (oclif/plugin-plugins PR [#777](https://github.com/oclif/plugin-plugins/pull/777))

* CHANGE: Any [string replacements](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_string_replace.htm) configured in your `sfdx-project.json` file are now also applied to source files that are packaged with the `package version create` command. The documentation will be updated shortly to reflect this change. (plugin-packaging PR [#566](https://github.com/salesforcecli/plugin-packaging/pull/566)

* CHANGE: We removed the SF_CODE_COVERAGE_REQUIREMENT environment variable because it never did anything.  (sfdx-core PR [#1023](https://github.com/forcedotcom/sfdx-core/pull/1023)

* FIX: The `package version list` and `package1 version list` commands now return up to 10K records; previously the maximum was 2000.  To get even more records, set the SF_ORG_MAX_QUERY_LIMIT environment variable. (GitHub issue [#2073](https://github.com/forcedotcom/cli/issues/2073), packaging PR [#500](https://github.com/forcedotcom/packaging/pull/500))

* FIX: Piping the SFDX authorization URL from stdin to the `org login sfdx-url` command is now working correctly.  NOTE that as part of this fix, you're not longer required to provide the `-` value to the `--sfdx-url-stdin` flag. Here's an example; it uses the _template_ for the SFDX authorization URL, not real secret information, for obvious reasons:

    ```bash
    echo "force://<clientId>:<clientSecret>:<refreshToken>@<instanceUrl>" | sf org login sfdx-url --sfdx-url-stdin
    ```

  (GitHub issue [#2690](https://github.com/forcedotcom/cli/issues/2690), oclif core [#935](https://github.com/oclif/core/pull/935))

* FIX: You can now correctly deploy and package source files that start with a period, such as `.specialFile`. (GitHub issue [#2666](https://github.com/forcedotcom/cli/issues/2666), source-deploy-retrieve PR [#1224](https://github.com/forcedotcom/source-deploy-retrieve/pull/1224))

## 2.27.6 (Feb 7, 2024)

* FIX: The `package version create list --created-last-days 0` command now correctly returns package versions that were created today. (GitHub issue [#2668](https://github.com/forcedotcom/cli/issues/2668), packaging PR [#496](https://github.com/forcedotcom/packaging/pull/496))

* FIX: The `project deploy quick --job-id <ID>` command now always works correctly with 15-character deployment job IDs. If the job ID isn't in the local cache, you must provide a valid target org with the `--target-org` flag.  (GitHub issue [#2591](https://github.com/forcedotcom/cli/issues/2591), plugin-deploy-retrieve PR [#884](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/884))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):
    
    * GenAiPromptTemplate
    * GenAiPromptTemplateActv

* FIX: The `org logout` command asked if you wanted to log out of all orgs when you wanted to log out of just one.  The message now correctly asks about only the one org.  (GitHub issue [#2671](https://github.com/forcedotcom/cli/issues/2671), plugin-auth PR [#923](https://github.com/salesforcecli/plugin-auth/pull/923))

## 2.26.10 (Jan 31, 2024)

* NEW: Choose whether Salesforce CLI capitalizes default record types when it creates a scratch org with the new Boolean `org-capitalize-record-types` configuration variable and corresponding `SF_CAPITALIZE_RECORD_TYPES` environment variable.

    Default record types are defined in the `objectSettings` option of a scratch org definition file, as described in [Scratch Org Definition File Options](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs_def_file.htm). The setting is required before installing a package that creates record types. Currently, Salesforce CLI automatically capitalizes these default record types when it creates them in the scratch org, even if they're lower case in the definition file, such as `svc_Technical_Support` in this snippet:

   ```json
    "objectSettings": {
      "case": {
        "defaultRecordType": "svc_Technical_Support",
        "sharingModel": "private"
      }
    }
   ```
   If you don't want Salesforce CLI to capitalize the record types, set `org-capitalize-record-types` or `SF_CAPITALIZE_RECORD_TYPES` to `false`. For example:

  ```bash
  sf config set org-capitalize-record-types=false --global
  ```
  **Important**: Salesforce CLI plans to switch this behavior on or after June 1, 2024. See the ANNOUNCEMENT above.  
  
* FIX: We've improved source tracking so it better handles undecodable SourceMember keys; previously, the relevant command, such as `project deploy start`, would return an errror such as `URIError: URI malformed` if it encountered one. (GitHub issue [#2624](https://github.com/forcedotcom/cli/issues/2624), source-tracking PR [#531](https://github.com/forcedotcom/source-tracking/pull/531))

* FIX: We've improved the `apex run` command so it can handle SOAP responses that don't include a header when executing anonymous Apex. (GitHub issue [#2630](Github issue link: https://github.com/forcedotcom/cli/issues/2630), salesforcedx-apex PR [#343](https://github.com/forcedotcom/salesforcedx-apex/pull/343))

* FIX: The error output from a failed execution of the `package version create report` command now contains the correct CLI command to run to get all relevant errors (`data query` rather than the incorrect `data:soql:query`). (GitHub issue [#2660](https://github.com/forcedotcom/cli/issues/2660), plugin-packaging PR [#561](https://github.com/salesforcecli/plugin-packaging/pull/561))

## 2.25.7 (Jan 24, 2024)

* NEW: We made some groovy improvements to the `dev generate flag` command. For example:

    * We added a new flag type: `option`. Specify this type for flags that have a short list of pre-defined string values, similar to a picklist. The command then prompts you to enter these pre-defined values.
    * When you pick one of the org-related flag types for your new flag, such as `optionalOrg` or `requiredHub`, the command now asks if you want to mimic the standard Salesforce CLI flag (`--target-org` or `--target-dev-hub`, respectively).  If you answer `Y`, the command uses the standard short flag name, summary, description, and default value for your new flag.  You can change the long flag name if you want, or use the standard name.
    * When you scroll through the possible flag values, we now provide a brief description of the type at the bottom of the terminal window. 
    * We tightened up the validation of inputted values in all the `dev generate <thing>` commands.
 
  (plugin-dev PR [#456](https://github.com/salesforcecli/plugin-dev/pull/456)) 
   
* NEW: Open your org in an incognito window of your browser with the new `--private` flag of `org open`. This example opens your default org in an incognito window of the Chrome browser:

   ```bash
   sf org open --browser chrome --private
   ```
   (GitHub issues [#1852](https://github.com/forcedotcom/cli/issues/1852), [#636](https://github.com/forcedotcom/cli/issues/636), and [#2262](https://github.com/forcedotcom/cli/discussions/2262);  plugin-org PR [#923](https://github.com/salesforcecli/plugin-org/pull/923))
  
* NEW: The JSON output of the `package version create` command now contains more information: the package name and whether code coverage tests were run and the resulting code coverage percentage is 75% or greater.  These values correspond to the Tooling API `Package2.Name` and `Package2Version.HasPassedCodeCoverageCheck` fields. (packaging library PRs [#486](https://github.com/forcedotcom/packaging/pull/486) and [#466](https://github.com/forcedotcom/packaging/pull/466))

     Many thanks to [Ronny Rokitta](https://github.com/Rocko1204) for this contribution. We love it. 
  
* FIX: If the `package version create` command times out, the output now includes a request ID so you can later query the status of the package version create request with the `package version create report --package-create-request-id <ID>` command. (GitHub issue [#2605](https://github.com/forcedotcom/cli/issues/2605), packaging library PR [#485](https://github.com/forcedotcom/packaging/pull/485))

* FIX: Salesforce CLI no longer includes security tokens in the URL used to open an org in a browser with the `org open` command. (plugin-org PR [#913](https://github.com/salesforcecli/plugin-org/pull/913))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):
    
    * ExtlClntAppNotificationSettings
    * DataCalcInsightTemplate
    * DataKitObjectTemplate

## 2.24.4 (Jan 17, 2024)

* NEW: Pipe the SFDX authorization URL through standard input when executing the `org login sfdx-url` command by specifying the new `--sfdx-url-stdin` flag and providing the `-` character as the value. Here's an example; it uses the _template_ for the SFDX authorization URL, not real secret information, for obvious reasons:

    ```
    echo "force://<clientId>:<clientSecret>:<refreshToken>@<instanceUrl>" | sf org login sfdx-url --sfdx-url-stdin -
    ```

    Many thanks to [Kyle Capehart](https://github.com/k-capehart) for contributing this cool new feature. Awesome sauce. We look forward to more contributions from you!  (GitHub issue #[2120](https://github.com/forcedotcom/cli/issues/2120), plugin-auth PR [#886](https://github.com/salesforcecli/plugin-auth/pull/886))
  
* FIX: The `project deploy start` command now correctly returns exit code 1 if you explicitly specify something to deploy (such as `--manifest package.xml` or `--source-dir force-app`) but nothing is deployed.  If you don't specify anything, and nothing is deployed, the exit code is 0. (GitHub issue [2621](https://github.com/forcedotcom/cli/issues/2621), plugin-deploy-retrieve PR [862](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/862))

* FIX: Salesforce DX projects now support these [metadata types](https://github.com/forcedotcom/source-deploy-retrieve/blob/main/src/registry/metadataRegistry.json):

    * ExpressionSetObjectAlias
    * ExtDataTranObjectTemplate
    * ExtDataTranFieldTemplate

## 2.23.20 (Jan 10, 2024)

* NEW and CHANGED (two for one!): We improved the output of the `sf commands` command so that it no longer displays deprecated commands and deprecated aliases of commands; the output is now cleaner and easier to read. Don't worry, you can still see all the deprecated stuff with the new `--deprecated` flag.  (oclif/plugin-commands PR [#568](https://github.com/oclif/plugin-commands/pull/568))

    ```bash
    sf commands --deprecated
    ```

* CHANGE: We generally cleaned up how we manage and display deprecated and hidden commands. For example, all deprecated commands now display appropriate and consistent warnings when you run them. Also, hidden commands no longer show up when you use autocomplete. (If you already use autocomplete, be sure to run `sf autocomplete --refresh-cache` to get this change.) (plugin-source PR [#1050](https://github.com/salesforcecli/plugin-source/pull/1050), plugin-auth PR [#905](https://github.com/salesforcecli/plugin-auth/pull/905), plugin-schema PR [#668](https://github.com/salesforcecli/plugin-schema/pull/668), plugin-limits PR [#739](https://github.com/salesforcecli/plugin-limits/pull/739), plugin-user PR [#835](https://github.com/salesforcecli/plugin-user/pull/835), plugin-org PR [#914](https://github.com/salesforcecli/plugin-org/pull/914))

* FIX: You can now successfully create a Partner Developer Edition scratch org with the `org create scratch --edition partner-developer` command. (GitHub issue [#2614](https://github.com/forcedotcom/cli/issues/2614), plugin-org PR [#916](https://github.com/salesforcecli/plugin-org/pull/916))

## 2.22.7 (Jan 3, 2023)

* NEW: These scratch org snapshot commands are now beta; they were previously pilot. 

    * `org create snapshot`
    * `org delete snapshot`
    * `org get snapshot`
    * `org list snapshot`
 
     A snapshot is a point-in-time copy of a scratch org. It captures the state of a scratch org’s configuration so that you can use it to create scratch org replicas.

    Snapshots are available when your Dev Hub org is upgraded to the Spring ’24 release. Then enable Scratch Org Snapshots in the Dev Hub org that you use to create scratch orgs. For more information, see [Scratch Org Snapshots](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_snapshots_intro.htm). (Available December 20, 2023, when the Spring '24 documentation is in preview.)

* NEW: When previewing a retrieve with the `project retrieve preview` command, use the new `--concise` flag to show only the changes that will be retrieved. The output also omits the files that are in the `.forceignore` file. For example:

    ```bash
    sf project retrieve preview --metadata ApexClass --target-org my-scratch --concise
    ```
    (GitHub issue [#2489](https://github.com/forcedotcom/cli/discussions/2489), plugin-deploy-retrieve PR [#831](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/831))

* FIX: Salesforce CLI now checks your local plugin allow list (specifically the `unsignedPluginAllowList.json` file) before it makes a callout to an npm registry endpoint. As a result, installs of allowed plugins are now faster. (GitHub issue [#2584](https://github.com/forcedotcom/cli/issues/2584), plugin-trust PR [#668](https://github.com/salesforcecli/plugin-trust/pull/668))

* FIX: Salesforce DX projects now support these metadata types:

    * SvcCatalogFilterCriteria
    * SvcCatalogFilterCondition
    * SvcCatalogItemDefFiltrCrit 

## Dec 20 and 27, 2023

Due to the holiday break in the United States, we aren't releasing new stable versions on Dec 20 or Dec 27. Happy holidays!

## 2.21.7 (Dec 13, 2023)

* NEW: View the namespace associated with an org with the new `Namespace` column of the `sf org list --verbose` command. If an org doesn't have a namespace, the value is blank. (GitHub issue [#1790](https://github.com/forcedotcom/cli/issues/1790), plugin-org PR [#596](https://github.com/salesforcecli/plugin-org/pull/596))

    Many thanks to [atsutton](https://github.com/atsutton) for contributing the code for this new feature! It's a nice improvement to the command.  Keep 'em coming!

* FIX: We improved the error message when you try to run `org create user` on a scratch org whose associated Dev Hub is running on Hyperforce and you authorized it with JWT. Salesforce doesn't support this use case. To work around it, try authorizing the Dev Hub using the `org login web` or `org login sfdx-url` commands instead of `org login jwt`.  (GitHub issue [#2575](https://github.com/forcedotcom/cli/issues/2575), plugin-user PR [#805](https://github.com/salesforcecli/plugin-user/pull/805))

* FIX: Using wildcards when retrieving metadata that isn't yet in your local project with the `project retrieve start --metadata` command now works as expected. For example, `project retrieve start --metadata "ApexClass:MyClass*` now always correctly retrieves all Apex classes that start with `MyClass`.  (GitHub issue [#2522](https://github.com/forcedotcom/cli/issues/2522), source-deploy-retrieve PR [#1182](https://github.com/forcedotcom/source-deploy-retrieve/pull/1182))

* FIX: When running Apex tests, Salesforce CLI now correctly displays test names that include a namespace. (GitHub issue [#296](https://github.com/forcedotcom/salesforcedx-apex/issues/296), salesforcedx-apex PR [#339](https://github.com/forcedotcom/salesforcedx-apex/pull/339))

    Shout-out and thanks to [Jonny Power](https://github.com/JonnyPower) for contributing the fix!  We love it.

* FIX: When you install an unsigned plugin that's in the `unsignedPluginAllowList.json` file, the `plugins install` command now bypasses _any_ HTTP 403 error, not just `403 Forbidden`. (GitHub issue [#2584](https://github.com/forcedotcom/cli/issues/2584), plugin-trust [#662](https://github.com/salesforcecli/plugin-trust/pull/662))

    Thank you [kyle-blair](https://github.com/kyle-blair) for contributing the fix! You're the best. 

## 2.20.7 (Dec 6, 2023)

* NEW: We've improved source tracking and the output of the `project deploy start` command in various ways:

    * We now output a warning if a tracked source file doesn't create a SourceMember Tooling API record in the org, or creates one with an unexpected name. During a deployment, Salesforce CLI waits for these events to complete, and depending on the deployment size and the fact that these kinds of events may never complete, the deployment appears stuck. These warnings give you more insight into what's happening.  If you notice the same warning consistently, open a GitHub issue so we can stop unnecessarily waiting for it. 
    * The progress bar now also includes the progress of SourceMember polling in the org.
    * The status bar hides errors and tests if there are none.
    
    (GitHub issue [#2495](https://github.com/forcedotcom/cli/issues/2495), source-tracking PR [#511](https://github.com/forcedotcom/source-tracking/pull/511), deploy-retrieve PRs [#819](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/819) and [#820](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/820))

* CHANGE: When installing Salesforce CLI on Windows with the `.exe` installer, the option in the Choose Components window to **Add %LOCALAPPDATA%\sf to Windows Defender exclusions** is now deselected by default. We changed the behavior because we wanted the default Windows installation to be more secure. However, excluding the CLI files from the antivirus scans improves the performance of Salesforce CLI, so select the option if you want. But use with caution. (salesforce/cli PR [#1328](https://github.com/salesforcecli/cli/pull/1328))

* FIX: When running `cmdt generate records` and the referenced CSV file doesn't include a value for a field, the command now skips the field; previously it incorrectly inserted an `undefined` value. (GitHub issues [#2074](https://github.com/forcedotcom/cli/issues/2074) and [#1714](https://github.com/forcedotcom/cli/issues/1714), plugin-custom-metadata PR [#662](https://github.com/salesforcecli/plugin-custom-metadata/pull/662))
  
* FIX: We updated the summary of the `--suite-names` flag of `apex run test` to no longer say the default value is all Apex test suites. The flag has no default value, and it's not possible to run all suites. (GitHub issue [#2580](https://github.com/forcedotcom/cli/issues/2580), plugin-apex PR [#294](https://github.com/salesforcecli/plugin-apex/pull/294))

## 2.19.7 (Nov 29, 2023)

* NEW: If you specify Apex tests with the `--tests` flag of `project deploy start|validate`, the `--test-level` flag defaults to `RunSpecifiedTests`. (GitHub issue [#2396](https://github.com/forcedotcom/cli/issues/2396), plugin-deploy-retrieve PR [#812](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/812))

    Many thanks to Christopher Bohlman ([cbohlman](https://github.com/cbohlman)) for contributing the code.  We put out a "Help Wanted" call, and he answered with aplomb. Community Collaboration in Action -- we love it!  

* NEW: Manage source tracking in existing orgs with these two new commands:

    * `org enable tracking`: Allow Salesforce CLI to track changes in your source files between your project and an org.
    * `org disable tracking`: Prevent Salesforce CLI from tracking changes in your source files between your project and an org.
 
    Enabling or disabling source tracking has no direct effect on the org, it affects only your local environment. Specifically, Salesforce CLI stores the setting in the org's local configuration file so that source tracking operations are, or aren't, executed when working with the org. Run the `org enable tracking` command on orgs that support source tracking, such as scratch orgs and Developer and Developer Pro sandboxes. The command returns an error if the org doesn't support tracking. Examples of orgs that don't support source tracking include Developer Edition orgs, production orgs, Partial Copy sandboxes, and Full sandboxes. 

    As an example, imagine you have a sandbox that you use for integration tests, and you want to deploy source to it but not wait for tracking operations.  This example shows how to disable source tracking on an org with alias `mySandbox`:

  ```bash
  sf org disable tracking --target-org mySandbox
  ```

    (GitHub issue [#2495](https://github.com/forcedotcom/cli/issues/2495), plugin-org PR [#868](https://github.com/salesforcecli/plugin-org/pull/868))

* NEW:  Ignore warnings and allow a deployment to validate successfully with the new `--ignore-warnings` flag of `project deploy validate`. This flag is similar to the equivalent flag of `project deploy start`. (GitHub issue [#2559](https://github.com/forcedotcom/cli/issues/2559), plugin-deploy-retrieve PR [#803](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/803))

* CHANGE: We've added exit codes for many Salesforce CLI command failures to better help you understand what happened. In particular, commands that:

    * Exit from a user-initiated Ctrl-C now return exit code 130. (sf-plugins-core PR [#445](https://github.com/salesforcecli/sf-plugins-core/pull/445))
    * Fail due to an internal Salesforce error (AKA "gack") now return exit code 20. (sf-plugins-core PR [#442](https://github.com/salesforcecli/sf-plugins-core/pull/442))
    * Fail due to a `TypeError` now return exit code 10. (sf-plugins-core PR [#442](https://github.com/salesforcecli/sf-plugins-core/pull/442))

* CHANGE: We've removed the `--json` flag of the `apex log tail` command. Why?  Because it didn't make much sense in the first place. The only way to exit the command is to enter Ctrl-C, so the JSON output can't be captured. And don't worry, we checked our telemetry data: this flag is hardly ever used.  Get logs in JSON format with the `apex list log` or `apex get log` commands. (plugin-apex PR [#280](https://github.com/salesforcecli/plugin-apex/pull/280))

* CHANGE: We removed the `plugin-login` plugin from Salesforce CLI.  The plugin contained two general commands, both of which are deprecated: `org login` and `org logout`.   Use specific commands instead, such as `org login web` or `org login jwt`.

* CHANGE: We converted `plugin-packaging` from a JIT to a core plugin.  This change doesn't fix the root cause of GitHub issue [2540](https://github.com/forcedotcom/cli/issues/2540) but should help some users who commented there.

* FIX: Your CLI configuration files are now cross-save safe. Wow! But what does that mean? Well, Salesforce CLI would sometimes try to save 2 copies of the same file concurrently, resulting in either an invalid JSON file or one of the "savers" losing their changes. To fix this issue, we redesigned how files are saved to try to be safer about concurrency. This fix applies to configuration files that you know and love, such as `sfdx-project.json` and org config files, as well as internal files that keep track of your configuration values, org authorization information, and various caches. (GitHub issues [#2423](https://github.com/forcedotcom/cli/issues/2423) and [#2528](https://github.com/forcedotcom/cli/issues/2528), sfdx-core PR [#959](https://github.com/forcedotcom/sfdx-core/pull/959)) 

* FIX: The `org login access-token` command now honors the SF_ACCESS_TOKEN environment variable, in addition to SFDX_ACCESS_TOKEN.  Side note: We encourage you to use the SF_ env vars because the old SFDX_ ones might go away one day. We also fixed the `--help` for the command to mention SF_ACCESS_TOKEN.  (GitHub issue [#2574](https://github.com/forcedotcom/cli/issues/2574), plugin-auth PR [#864](https://github.com/salesforcecli/plugin-auth/pull/864))

* FIX: The `cmdt generate records` command now correctly handles CSV files that produce non-unique custom metadata type record names. (GitHub issue [#2573](https://github.com/forcedotcom/cli/issues/2573), plugin-custom-metadata PR [#655](https://github.com/salesforcecli/plugin-custom-metadata/pull/655))

* FIX: The `project deploy quick` command now correctly waits for the quick deploy to finish, and then returns the results of the quick deploy and not of the original validate deploy. (GitHub issue [2537](https://github.com/forcedotcom/cli/issues/2537), plugin-deploy-retrieve PR [#815](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/815))

* FIX: If the `project deploy start` command fails to deploy a component, it now always displays the error along with the name of the failed component. (GitHub issue [2561](https://github.com/forcedotcom/cli/issues/2561), plugin-deploy-retrieve PR [#816](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/816))

* FIX: We've updated the flag descriptions of the `--target-org` and `--target-dev-hub` flags in all relevant commands to say that the flag isn't required if the related configuration value (`target-org` and `target-dev-hub`) is set. (GitHub issue [#2538](https://github.com/forcedotcom/cli/issues/2538), sf-plugins-core PR [#455](https://github.com/salesforcecli/sf-plugins-core/pull/455))

* FIX: We've fixed a bug when running `apex run test -r junit` or `apex get test -r junit` in which you sometimes got the error `Invalid time value`. (GitHub issue [#213](https://github.com/forcedotcom/salesforcedx-apex/issues/213), salesforcedx-apex PR [334](https://github.com/forcedotcom/salesforcedx-apex/pull/334))

* FIX: Salesforce CLI now correctly catches errors that are thrown when looking for decoded keys.  (GitHub issue [#2560](https://github.com/forcedotcom/cli/issues/2560), source-deploy-retrieve PR [#1167](https://github.com/forcedotcom/source-deploy-retrieve/pull/1167))

* FIX: You can now successfully run a command that's in a JIT plugin, but not yet installed, with the `--json` flag. For example, if you previously ran `sf package version create --json`, but the JIT plugin-packaging plugin wasn't yet installed, the plugin would be automatically installed but you'd get garbled and incorrect JSON command output. Now the JSON output is as clean as the proverbial whistle.   (GitHub issue [#2562](https://github.com/forcedotcom/cli/issues/2562), plugin-trust PR [#643](https://github.com/salesforcecli/plugin-trust/pull/643), oclif plugin-plugins PR [#712](https://github.com/oclif/plugin-plugins/pull/712))

* FIX: Salesforce CLI now correctly honors the `SF_DISABLE_LOG_FILE=true` environment variable setting without returning an error. (GitHub issue [#2553](https://github.com/forcedotcom/cli/issues/2553), sfdx-core PR [#979](https://github.com/forcedotcom/sfdx-core/pull/979))

## Nov 22, 2023

Due to the Thanksgiving break in the United States, we aren't releasing a new stable version today.  Happy Thanksgiving!

## 2.17.14 (Nov 15, 2023)

* NEW: Easily uninstall all user-installed and linked plugins, including JIT plugins, with the new `plugins reset` command.

    ```bash
    sf plugins reset
    ```
    
    After you run the command, you're left with only the core Salesforce CLI plugins, as if you had just installed the CLI from scratch. (oclif plugin-plugins PR [#701](https://github.com/oclif/plugin-plugins/pull/701))

* CHANGE: We've changed the official names of these commands that display org limits and counts. Both the new and old names work, but the [CLI Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_unified.htm) will soon list only the new name. (plugin-limits PR [#673](https://github.com/salesforcecli/plugin-limits/pull/673))

    |New Name|Old Name|Description|
    |---|---|---|
    |`org list limits`|`limits api display`|Display information about limits in your org.|
    |`org list sobject record-counts`|`limits recordcounts display`|Display record counts for the specified standard or custom objects.|

* FIX: Salesforce CLI now handles the `SF_CONTAINER_MODE` and `SF_DOMAIN_RETRY` environment variables; previously it handled only the old `SFDX_` equivalents (`SFDX_CONTAINER_MODE` and `SFDX_DOMAIN_RETRY`). And `SF_CONTAINER_MODE` [isn't documented](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_env_variables.htm) -- oopsie!  We're in the process of fixing that doc bug too.   (GitHub issue [#2554](https://github.com/forcedotcom/cli/issues/2554), plugin-org PR [#857](https://github.com/salesforcecli/plugin-org/pull/857))

* FIX: We've improved how `sf plugins install https://github.com/foo/bar` works, which sometimes returned an error. (oclif plugin-plugins PR [#702](https://github.com/oclif/plugin-plugins/pull/702))

* FIX: Installing a plugin on Windows with the `sf plugins install` command no longer returns an error if the path to the Node.js binary contains a space. (GitHub issue [#2465](https://github.com/forcedotcom/cli/issues/2564), oclif plugin-plugins PR [#711](https://github.com/oclif/plugin-plugins/pull/711), [#718](https://github.com/oclif/plugin-plugins/pull/718))

* FIX: Salesforce DX projects now support these metadata types. (GitHub issue [#2527](https://github.com/forcedotcom/cli/issues/2527))

    * CareBenefitVerifySettings
    * CareProviderAfflRoleConfig
    * ContextDefinition
    * DiscoveryStory
    * DocumentCategory
    * DocumentCategoryDocumentType
    * ExpressionSetMessageToken
    * ExternalAIModel
    * ManagedEventSubscription
    * RecordAggregationDefinition
    * RegisteredExternalService
    * WebStoreBundle

## 2.16.7 (Nov 8, 2023)

* NEW: Use the new `scopeProfiles` option of the `sfdx-project.json` file to control which profile settings are included in a new package version when you run the `package create version` command. If you set `scopeProfiles` to `true` for a package directory, profile settings from only the package directory being packaged are included, and profile settings outside of that package directory are ignored. When you set `scopeProfiles` to `false` (the default value), the new package version includes relevant pieces of profile settings in any package directory defined in `sfdx-project.json`.

    The `scopeProfiles` option is a child of `packageDirectory`, as shown in this example. 

    ```
    {
    "packageDirectories": [
        {
            "path": "force-app",
            "package": "TV_unl",
            "scopeProfiles": "true",
            "versionName": "ver 0.1",
            "versionNumber": "0.1.0.NEXT",
            "default": true,
            "unpackagedMetadata": {
                "path": "my-unpackaged-directory"
            }
        }
    ],
    "namespace": "",
    "sfdcLoginUrl": "https://login.salesforce.com",
    "sourceApiVersion": "58.0"
    }
    ```
    (packaging PR [#416](https://github.com/forcedotcom/packaging/pull/416), schemas PR [#80](https://github.com/forcedotcom/schemas/pull/80), sfdx-core PR [#957](https://github.com/forcedotcom/sfdx-core/pull/957))
    
* CHANGE: We upgraded the version of Node.js bundled in the Salesforce CLI operating system-specific installers, TAR files, and Docker images to v20. Why?  Because we always bundle the Active LTS version of Node.js in tandem with its [release schedule](https://github.com/nodejs/release#release-schedule), and v20 went LTS on October 24, 2023.

* FIX: We've improved the output of the `sf plugins install` command. For example, the warnings are better grouped and you no longer see duplicate warnings. And the final message clearly states that the plugin was successfully installed, if indeed it was. (oclif plugin-plugin PR [#683](https://github.com/oclif/plugin-plugins/pull/683))

* FIX: The `project retrieve start` command now correctly retrieves CustomFieldTranslation metadata types across multiple package directories. (GitHub issue [#2124](https://github.com/forcedotcom/cli/issues/2124), source-deploy-retrieve PR [#1146](https://github.com/forcedotcom/source-deploy-retrieve/pull/1146))

* FIX: The `--help` output for some commands no longer shows `[object Object]` for the default value of some flags; the output now shows the actual default value. An example of a command with the incorrect `--help` output was `org create scratch`. (GitHub issue [#2539](https://github.com/forcedotcom/cli/issues/2539), oclif core PR [#844](https://github.com/oclif/core/pull/844))

* FIX: You can now use the `--dev-debug` flag on its own to get debug log files from oclif and Salesforce CLI when you run a command; previously you also had to set the SF_LOG_LEVEL environment variable.  If the environment variable isn't set, then the default log level is `trace`.  (salesforcecli PR [#1246](https://github.com/salesforcecli/cli/pull/1246))

## 2.15.9 (Nov 1, 2023)

* NEW: The `dev convert script` command for migrating your CI scripts to use the `sf`-style commands now handles `sfdx` commands that span multiple lines.  For example, the command converts this:

    ```bash
    sfdx force:user:create -f config/user-def.json \
    -a myuser \
    -u myorg
    ```
    into this:

    ```bash
    sf org create user --definition-file config/user-def.json \
    --set-alias myuser \
    --target-org myorg
    ```
    (plugin-dev PR [#402](https://github.com/salesforcecli/plugin-dev/pull/402))
  
* FIX: The `org list` command now correctly renders the output when a listed org has expired or been deactivated, such as a [developer edition org](https://help.salesforce.com/s/articleView?id=sf.admin_deactivate_org.htm&type=5). (GitHub issue [#2533](https://github.com/forcedotcom/cli/issues/2533), plugin-org PR [#845](https://github.com/salesforcecli/plugin-org/pull/845))

* FIX: Salesforce CLI now correctly handles internal alias files that aren't in the expected format. (sfdx-core PR [#969](https://github.com/forcedotcom/sfdx-core/pull/969))

## 2.14.6 (Oct 25, 2023)

* NEW: Disable Salesforce CLI version checking with the new `SF_SKIP_NEW_VERSION_CHECK` environment variable. By default, every CLI command execution checks whether there's a new CLI version available, and prints out a warning message if it finds one. While this message is useful, it's not always wanted, especially in CI environments. To completely disable the check, set `SF_SKIP_NEW_VERSION_CHECK=true`.

    Alternatively, you can configure the frequency of the warning message, such as once a day, by setting these two environment variables:
  
    * `SF_NEW_VERSION_CHECK_FREQ`: A number that specifies the frequency that the warning message is displayed. Default is `0`, which displays the message every time a new version is found. 
    * `SF_NEW_VERSION_CHECK_FREQ_UNIT`: The unit of time of the frequency.  Possible values are `days`, `hours`, `minutes` (the default value), `seconds`, and `milliseconds`.
 
    For example, to get the warning message once a day, set `SF_NEW_VERSION_CHECK_FREQ=1` and `SF_NEW_VERSION_CHECK_FREQ_UNIT=days`.  Note that these two `FREQ` environment variables configure only when the warning is displayed; the version check still occurs for each command execution unless you set `SF_SKIP_NEW_VERSION_CHECK=true`. [oclif/plugin-warn-if-update-available PR [#437](https://github.com/oclif/plugin-warn-if-update-available/pull/437))

* NEW: Open a flow in Flow Builder from the command line by passing the local Flow metadata file to `org open --source-file`.  For example, to open the local Hello flow in Flow Builder:

     ```bash
     sf org open --source-file force-app/main/default/flows/Hello.flow-meta.xml
     ```
    Many thanks to [Arturs Gusjko](https://github.com/GusjkoA) who not only came up with the great idea, but also provided [excellent QA and suggestions](https://github.com/salesforcecli/plugin-org/pull/836) to help us release a better feature. Terrific community collaboration!   (GitHub issue [#2519](https://github.com/forcedotcom/cli/discussions/2519), plugin-org PR [#829](https://github.com/salesforcecli/plugin-org/pull/829))
  
* FIX: We corrected the help for `config list` to say that the command lists the config variable values based on the current context.  For example, if you run the command from a project which has a local config variable set, but it's also set globally, the command prints the local value which overrides the global one. (GitHub issue [#2435](https://github.com/forcedotcom/cli/issues/2435), plugin-settings [#405](https://github.com/salesforcecli/plugin-settings/pull/405))

* FIX: The `SF_NPM_REGISTRY` environment variable is now working correctly. (GitHub issue [#2517](https://github.com/forcedotcom/cli/issues/2517), plugin-trust PR [#618](https://github.com/salesforcecli/plugin-trust/pull/618))
 
## 2.13.9 (Oct 18, 2023)

* FIX: If the `project deploy start --metadata-dir` command encounters failures when deploying files in metadata format, the error message now contains the line and column number in the file where the error occurred. We also improved the output with better sorting and duplication removal. (GitHub issue [#356](https://github.com/forcedotcom/cli/issues/356), plugin-deploy-retrieve PR [#771](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/771))

* FIX: We improved the help of the `org generate password` command to say that the `--on-behalf-of` flag works only on users that were created locally with the `org create user` command and not users created in org's Setup UI. (GitHub issue [#2506](https://github.com/forcedotcom/cli/issues/2506), plugin-user PR [#747](https://github.com/salesforcecli/plugin-user/pull/747))
  
* FIX: Salesforce DX projects now support the EventRelayConfig metadata type. 
  
## 2.12.9 (Oct 11, 2023)

* CHANGE: Salesforce CLI now prompts you to select a matching command, even when the partial command you entered matches just a single command. This change prevents inadvertent behavior, such as automatic JIT plugin installations because the CLI thinks you want to run a command in a JIT plugin that isn't installed.  (GitHub issue [#2493](https://github.com/forcedotcom/cli/issues/2493), salesforcecli PR [#1180](https://github.com/salesforcecli/cli/pull/1180))

* FIX: The `org resume sandbox` command now correctly handles multiple sandboxes in a resumable state. It first displays a warning about the multiple sandboxes, and then resumes the most recent sandbox creation or refresh. (GitHub issues [#2238](https://github.com/forcedotcom/cli/issues/2238) and [#1833](https://github.com/forcedotcom/cli/issues/1833), sfdx-core PR [#944](https://github.com/forcedotcom/sfdx-core/pull/944), plugin-org PR [#823](https://github.com/salesforcecli/plugin-org/pull/823))

* FIX: The `--help` output of a deprecated aliased command (such as `force:org:list`) now displays the deprecation warning. (GitHub oclif issue [#800](https://github.com/oclif/core/issues/800), oclif PR [#801](https://github.com/oclif/core/pull/801))

* FIX: Certain `package` commands now display the error when they fail; previously they failed silently. (GitHub issues [#2434](https://github.com/forcedotcom/cli/issues/2434) and [#2469](https://github.com/forcedotcom/cli/issues/2469), packaging PR [#403](https://github.com/forcedotcom/packaging/pull/403))

* FIX: The CLI's source tracking library now prevents the registration of duplicate listeners. When the Salesforce Extensions for VS Code release an update with the updated source tracking library, the library will prevent the extensions from registering duplicate listeners. (GitHub issues [#2441](https://github.com/forcedotcom/cli/issues/2441), [#2458](https://github.com/forcedotcom/cli/issues/2458), [#2483](https://github.com/forcedotcom/cli/issues/2483), [#2476](https://github.com/forcedotcom/cli/issues/2476), and [#2439](https://github.com/forcedotcom/cli/issues/2439). source-tracking PR [#480](https://github.com/forcedotcom/source-tracking/pull/480), sfdx-core PR [#941](https://github.com/forcedotcom/sfdx-core/pull/941))

* FIX: HTML entities, such as `&#160;` in a CustomLabels metadata type, are now correctly encoded when deployed to an org. (GitHub issues [#2448](https://github.com/forcedotcom/cli/issues/2448) and [#2455](https://github.com/forcedotcom/cli/issues/2455), SDR PRs [#1102](https://github.com/forcedotcom/source-deploy-retrieve/pull/1102) and [#1128](https://github.com/forcedotcom/source-deploy-retrieve/pull/1128))

* FIX: The `org list` and `org display` commands no longer display the raw HTML 503 response when run against an org on an instance that's currently out of service. (GitHub issue [#2487](https://github.com/forcedotcom/cli/issues/2487), plugin-org PR [#814](https://github.com/salesforcecli/plugin-org/pull/814))

* FIX: Salesforce DX projects now support these metadata types:
  
    * ConversationChannelDefinition
    * ExtlClntAppConfigurablePolicies

## 2.11.8 (Oct 4, 2023)

* NEW: Plugin installs use `yarn` under the hood. If you run into errors during installs or updates, you can now enable the network mutex option by setting the SF_USE_NETWORK_MUTEX environment variable to `true`. Setting this variable opens a local network to manage the concurrent `yarn` instances and may be more reliable. You can also pass an optional port for the local server to open on with the SF_NETWORK_MUTEX_PORT environment variable.  See the [yarn documentation](https://classic.yarnpkg.com/lang/en/docs/cli/#toc-concurrency-and-mutex) for more information. [oclif plugin-plugins PR [#670](https://github.com/oclif/plugin-plugins/pull/670))

* NEW: Poll for status of a deployment when you run `project deploy report` with the new `--wait` flag. If you specify this flag, the command polls for the status every second until the timeout of `--wait` minutes.  If you don't specify the `--wait` flag, the command simply checks and displays the status of the deploy; the command doesn't poll for the status.

    We also added the `--target-org` flag to `project deploy report`. You usually don't need to specify this flag because the cached deploy job already references the org to which you deployed. But if you run `project deploy report` on a computer different than the one from which you originally deployed, and the default org is different from the deployment org, then you must specify `--target-org`. The flag must point to the same deployment org; if it doesn't, you get an error. 

    Finally, you no longer get an error if you run `project deploy resume` on a deployment that finished. Instead you get a message telling you that it completed and then the deploy results. (GitHub discussion [#2300](https://github.com/forcedotcom/cli/discussions/2300) and issues [#2293](https://github.com/forcedotcom/cli/issues/2293), [#2297](https://github.com/forcedotcom/cli/issues/2297), [#2078](https://github.com/forcedotcom/cli/issues/2078).  plugin-deploy-retrieve PRs [#762](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/762) and [#758](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/758))
 
* CHANGE: We removed the `package version retrieve` command that we announced on September 15, 2023. This feature isn't quite ready for prime time, so we're removing it for now while we make improvements. We'll let you know after it's back up. (plugin-packaging PR [#447](https://github.com/salesforcecli/plugin-packaging/pull/447))

* FIX: When you create a package version with the `package version create` command, the command now searches for profiles in the package directories defined in `sfdx-project.json`.   (GitHub issue [#2336](https://github.com/forcedotcom/cli/issues/2336), packaging PR [#397](https://github.com/forcedotcom/packaging/pull/397))

* FIX: Salesforce DX projects now support the PricingRecipe metadata type.

## 2.10.2 (Sept 27, 2023)

* NEW: Code Coverage UI Improvements. We changed the code coverage colors to indicate good, average, and poor coverage. (Github Issue [#2412](https://github.com/forcedotcom/cli/issues/2412), plugin-deploy-retrieve PR [#756](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/756), plugin-source PR [#950](https://github.com/salesforcecli/plugin-source/pull/950), plugin-source PR (superseded) [#934](https://github.com/salesforcecli/plugin-source/pull/934))

    Thank you @AllanOricil for your contributions to `plugin-source`! :heart:

* NEW: Uninstalled JIT Plugins are now displayed when you run `sf plugins --core [--json]`. The command displays a warning if you try to inspect an uninstalled JIT plugin.

* FIX: Uncovered line numbers are now correctly displayed in the Code Coverage report when you run `project deploy report`. (Github Issue [#2468](https://github.com/forcedotcom/cli/issues/2468), plugin-source PR [#950](https://github.com/salesforcecli/plugin-source/pull/950))

* FIX: The `.forceignore` file now correctly handles an opt-in style with directories. (Github Issue [#2404](https://github.com/forcedotcom/cli/issues/2404), source-deploy-retrieve PR [#1093](https://github.com/forcedotcom/source-deploy-retrieve/pull/1093))

* FIX: Running `project deploy quick` now displays the deploy ID of the quick deploy request, not the validation ID. (Github Issue [#2415](https://github.com/forcedotcom/cli/issues/2415), source-deploy-retrieve PR [#748](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/748))

## 2.9.8 (Sept 20, 2023)

* NEW: Salesforce CLI now shows a warning when the version of a core or JIT plugin is out of sync with what was shipped with your installed CLI.

* NEW: JIT plugins now respect a lock file during install. This new behavior prevents JIT plugins from installing dependencies that are newer than what they were shipped and tested with. 

* FIX: Running `project retrieve start` now shows warnings for problematic components. This behavior matches the functionality of `force:source:retrieve` (GitHub issue [#2405](https://github.com/forcedotcom/cli/issues/2405), plugin-deploy-retrieve PR [#747](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/747))

* FIX: Metadata transfers now automatically retry when they encounter an `ENOMEM` error. Keeps your eyes out for Shane McLaughlin's [debut album](https://github.com/forcedotcom/cli/issues/2452#issuecomment-1710027941). (GitHub issue [#2452](https://github.com/forcedotcom/cli/issues/2452), source-deploy-retrieve PR [#1103](https://github.com/forcedotcom/source-deploy-retrieve/pull/1103))

## 2.8.11 (Sept 15, 2023)

* NEW: Download metadata from a specific package version with the new `package version retrieve` command. You can retrieve metadata for a second- or first-generation managed package or an unlocked package. Retrieving a package version downloads the metadata into the directory you specify. When you run the command, specify the package alias or the subscriber package version ID (starts with 04t) and the path to an empty directory.

    To use this command you must have the Download Package Version Zip Files user permission.

    In this example, the org that owns the package has an alias of `my-org`, and we're retrieving the metadata from a package version with ID `04tXXX`. The metadata is downloaded into the `my-directory` directory:

    ```bash
    sf package version retrieve --package 04tXXX --output-dir my-directory --target-org my-org
    ```

* NEW: Enable AppExchange App Analytics usage data collection on a managed package and its components with the new `--enable-app-analytics` flag of the `package update` command. See [Enable App Analytics on Your Second-Generation Managed Package
](https://developer.salesforce.com/docs/atlas.en-us.pkg2_dev.meta/pkg2_dev/app_analytics_enable_2gp.htm) for more information. (plugin-packaging [#325](https://github.com/salesforcecli/plugin-packaging/pull/325))

* FIX: We've updated the message displayed when you install an unsigned plugin using the `plugins install` command to be more friendly.  (plugin-trust PR [#581](https://github.com/salesforcecli/plugin-trust/pull/581))

* FIX: We've improved the description of the `project generate` subtopic in the `package.json` file to include generating a project, manifest, and more. Thanks, [Peter Chittum](https://github.com/pchittum), for your contribution -- we love it! (plugin-deploy-retrieve PR [#742](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/742)) 

## 2.7.11 (Sept 6, 2023)

* NEW: Execute DevOps Center actions at the command line with these new beta CLI commands:

    * `project deploy pipeline start`: Deploy changes from a branch to the pipeline stage’s org.
    * `project deploy pipeline report`: Check the status of a pipeline deploy operation.
    * `project deploy pipeline validate`: Perform a validate-only deployment from a branch to the pipeline stage’s org. 
    * `project deploy pipeline quick` : Quickly deploy a validated deployment to an org.
    * `project deploy pipeline resume`: Resume watching a pipeline deploy operation.

    We created these commands for developers who want to work outside of DevOps Center or want to automate tasks. The commands are in [plugin-devops-center](https://github.com/salesforcecli/plugin-devops-center), which is a just-in-time (JIT) plugin. After you update to this Salesforce CLI release, run a DevOps Center command in a terminal or command window and the CLI automatically installs the plugin and then runs the command. Nifty, huh. Let's look at a few examples to see how the new beta commands work.

    In this example, several work item feature branches were previously merged to the `recruit-integration` branch. To deploy the changes from the `recruit-integration` branch to its associated Integration environment:

    ```bash
    sf project deploy pipeline start --branch-name recruit-integration --devops-center-username MyDevOpsCenterOrg --devops-center-project-name "Recruiting App"
    ```
    In this example, UAT is the bundling stage, which means that you must indicate a version identifier with the `--bundle-version-name` flag. To deploy all merged changes in a version 1.0 bundle to the UAT environment: 
    ```bash
    sf project deploy pipeline start --branch-name recruit-uat --devops-center-username MyDevOpsCenterOrg --devops-center-project-name "Recruiting App" --bundle-version-name 1.0
    ```
    In this example, you first validate the changes in the `recruit-staging` branch so you can later perform a quick deployment to production. The validate command returns a job ID that you later pass to the quick deploy command.
    ```bash
    sf project deploy pipeline validate --branch-name recruit-staging --devops-center-username MyDevOpsCenterOrg --test-level RunLocalTests --devops-center-project-name "Recruiting App"
    ```
    When ready, execute the quick deployment to production by specifying the job ID returned by the validate command:
    ```bash
    sf project deploy pipeline quick --job-id 0Af0x000017yLUFCA2
    ```
    You can also use the new `target-devops-center` configuration variable to specify the default username or alias for the org in which DevOps Center is installed. Use it instead of the `--devops-center-username` flag. For example, to set the config variable globally:
    ```bash
    sf config set target-devops-center MyDevOpsCenterOrg --global
    ```    
    As always, run the new commands with the `--help` flag to see more examples and information.

    Enjoy!
  
* NEW: Find 3rd-party (not created by Salesforce) CLI plugins with `sf plugins discover`.  The command uses [this list of packages](https://github.com/salesforcecli/plugin-marketplace/blob/main/src/shared/plugins.ts) to query npm for information about each plugin. If you'd like to contribute a plugin to the list, [send us a PR](https://github.com/salesforcecli/plugin-marketplace). 

## 2.6.9 (Aug 30, 2023)

* FIX: Salesforce CLI correctly retrieves metadata components (specifically Layouts and Profiles) whose names include non-alphanumeric characters, such as periods. (GitHub issue [#1683](https://github.com/forcedotcom/cli/issues/1683), source-deploy-retrieve PR [#1080](https://github.com/forcedotcom/source-deploy-retrieve/pull/1080))

* FIX: Salesforce DX projects now support the FundraisingConfig metadata type. 

## 2.5.7 (Aug 23, 2023)

* NEW: You now get a warning if you try to unset a global configuration variable without specifying the `--global` flag. The command is still considered a success because there was no local config variable to unset. For example:

    ```bash
    $ sf config list
    List Config
    =============================================
    | Name                Location Value          
    | ─────────────────── ──────── ────────────── 
    | org-max-query-limit Global   5000           
    | target-org          Local    my-scratch-org 
    
    $ sf config unset org-max-query-limit
    Warning: The org-max-query-limit config variable is still set globally, unset it by using the --global flag.
    Unset Config
    =============================
    | Name                Success 
    | ─────────────────── ─────── 
    | org-max-query-limit true

    $ sf config list
    List Config
    =============================================
    | Name                Location Value          
    | ─────────────────── ──────── ────────────── 
    | org-max-query-limit Global   5000           
    | target-org          Local    my-scratch-org 
    ```

    To unset the config var, specify the `--global` flag:

    ```bash
    $ sf config unset org-max-query-limit --global
    Unset Config
    =============================
    | Name                Success 
    | ─────────────────── ─────── 
    | org-max-query-limit true    

    $ sf config list
    List Config
    ====================================
    | Name       Location Value          
    | ────────── ──────── ────────────── 
    | target-org Local    my-scratch-org 
    ```

    (plugin-settings PR [#346](https://github.com/salesforcecli/plugin-settings/pull/346))

* CHANGE: We've generally improved the human-readable output of `org list`; the JSON output remains the same. Here are some of the key improvements:

    * All orgs are listed in a single table, grouped by type, which is now indicated in a new column.  Org types include DevHub, Scratch, and Sandbox.
    * The default org and DevHub are now indicated with emojis rather than the previous `(U)` and `(D)` characters which weren't intuitive.  See the legend at the end of the output for what's what.
    * Column names are now type case rather than all-caps.

    Here's an example of the output:

    ```bash
    $ sf org list
        Type    Alias          Username                                      Org ID             Status                Expires
     ── ─────── ────────────── ───────────────────────────────────────────── ────────────────── ───────────────────── ──────────
     🌳 DevHub  JulesDevHub    jules@sf.com                                  00DB0001234c7jiMAA Connected 
        Sandbox                jules@sf.com.jssandtwo                        00D020012344XTiEAM Connected
     🍁 Scratch my-scratch-org test-qjrr9q5d13o8@example.com                 00DMN0012342Gez2AE Active                2023-08-21    
   
    Legend:  🌳=Default DevHub, 🍁=Default Org      Use --all to see expired and deleted scratch orgs
    ```
    (plugin-org PR [#765](https://github.com/salesforcecli/plugin-org/pull/765))

* FIX: We've significantly shortened command startup times. Note that this performance enhancement applies to _all_ CLI commands, even ones in custom plugins. (telemetry PR [#274](https://github.com/forcedotcom/telemetry/pull/274), plugin-telemetry PR [#497](https://github.com/salesforcecli/plugin-telemetry/pull/497))

## 2.4.8 (Aug 16, 2023)

* NEW: We now provide these new TAR file formats and manifest files for installing Salesforce CLI on Linux operating systems:

    * [sf-linux-arm64.tar.gz](https://developer.salesforce.com/media/salesforce-cli/sf/channels/stable/sf-linux-arm64.tar.gz)
    * [sf-linux-arm64.tar.xz](https://developer.salesforce.com/media/salesforce-cli/sf/channels/stable/sf-linux-arm64.tar.xz)
    * [sf-linux-arm64-buildmanifest](https://developer.salesforce.com/media/salesforce-cli/sf/channels/stable/sf-linux-arm64-buildmanifest)
 
    See [Install Salesforce CLI With a TAR File](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli_linux) for details on using the files.  (The new download links will show up in the docs soon.)
  
* NEW: Use a wildcard (`*`) with the `--metadata` flag of the deploy and retrieve commands. This example shows how to deploy all FlexiPage metadata components whose names match `Property*`:

    ```bash
    sf project deploy start --metadata "FlexiPage:Property*" --target-org myscratch
    ```
    This sample output shows the components it deployed:

    ```bash
    Deployed Source
    ==================================================================================================================
    | State   Name                 Type      Path                                                                      
    | ─────── ──────────────────── ───────── ───────────────────────────────────────────────────────────────────────── 
    | Changed Property_Explorer    FlexiPage force-app/main/default/flexipages/Property_Explorer.flexipage-meta.xml    
    | Changed Property_Finder      FlexiPage force-app/main/default/flexipages/Property_Finder.flexipage-meta.xml      
    | Changed Property_Record_Page FlexiPage force-app/main/default/flexipages/Property_Record_Page.flexipage-meta.xml 
    ```
    (GitHub issue [#2386](https://github.com/forcedotcom/cli/issues/2386), source-deploy-retrieve PR [#1063](https://github.com/forcedotcom/source-deploy-retrieve/pull/1063))

* NEW: If you authorize an org that has a namespace linked, and then run `sf org list --json`, the JSON output now includes the `namespacePrefix` key, with value set to the namespace name.  (GitHub issue [#1790](https://github.com/forcedotcom/cli/issues/1790), sfdx-core PR [#908](https://github.com/forcedotcom/sfdx-core/pull/908))

* CHANGE: We changed the Node.js logger that Salesforce CLI uses from Bunyan to [Pino](https://getpino.io/#/). This internal change results in these user-visible changes:

    * Each day's logs are written to a file whose name is based on that day. For example, the logs for August 8, 2023 are written to the file `USER_HOME_DIR/.sf/sf-2023-08-07.log`.

      Previously, the log were written to the `USER_HOME_DIR/.sf/sf.log` file. Each day at midnight, that log file would be rotated to `USER_HOME_DIR/.sf/sf.log.0`, and any existing log files moved up by one number. That process didn't always work correctly.

     * The new logger occasionally checks for, and then deletes, any log files that are older than 7 days. If you want to keep these old log files, copy them to a different location.
 
     * The new logger will never delete the `USER_HOME_DIR/.sf/sf.log<N>` files written by the old logger. Other CLI plugins and tools, such as VS Code with the Salesforce Extension, still use the old logger and might write to these old files. At some point they will upgrade to use the new logger, but for now we still need to keep those old files around.
 
     * Here's how the log-related environment variables now work:
 
          * SF_LOG_ROTATION_PERIOD: You can set this variable to `1h` or `1m` if you want more, but smaller, log files. Any other value is treated as `1d`, which is the default.

            The new log file is created when the command loads. For example, if your deployment takes 40 minutes, all of its associated logs are written to a file with name based on when the command began.

          * SF_LOG_ROTATION_COUNT: This variable has no effect anymore. The number of logs that Salesforce CLI keeps is always 7 day's worth, regardless of how small the rotation period is.
      
    * Previously, setting `DEBUG=*` would log at the lowest level. You can now use both `DEBUG=*` and `SF_LOG_LEVEL=debug`, for example, to control how many logs you’re getting.
 
    * If you create custom CLI plugins, read more about these changes [here](https://github.com/forcedotcom/sfdx-core/blob/main/MIGRATING_V4-V5.md).

    (GitHub issues [#2209](https://github.com/forcedotcom/cli/issues/2209), [#2206](https://github.com/forcedotcom/cli/issues/2206), [#2198](https://github.com/forcedotcom/cli/issues/2198), [#2196](https://github.com/forcedotcom/cli/issues/2196), [#1928](https://github.com/forcedotcom/cli/issues/1928), [#1706](https://github.com/forcedotcom/cli/issues/1706), [#1699](https://github.com/forcedotcom/cli/issues/1699), [#1408](https://github.com/forcedotcom/cli/issues/1408).  sfdx-core PR [#876](https://github.com/forcedotcom/sfdx-core/pull/876))


* CHANGE: These commands are generally available and no longer beta:
    * `schema generate sobject`
    * `schema generate field`
    * `schema generate tab`
    * `schema generate platformevent`

     (plugin-sobject [#361](https://github.com/salesforcecli/plugin-sobject/pull/361)))

* CHANGE: We've updated the parent image of the [Salesforce CLI Docker images](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_docker.htm) to the [Heroku-22 stack](https://devcenter.heroku.com/articles/heroku-22-stack). (cli PR [#1028](https://github.com/salesforcecli/cli/pull/1028))

* FIX: We updated the README in this repo because it was a tad out of date. (GitHub issue [#2332](https://github.com/forcedotcom/cli/issues/2332))

* FIX: You can now successfully run `org delete sandbox` to delete a sandbox that you created in the Setup UI and then authenticated with Salesforce CLI.  We've also improved the error messages around deleting a sandbox. (GitHub issues [#1718](https://github.com/forcedotcom/cli/issues/1718) and [#1667](https://github.com/forcedotcom/cli/issues/1667), sfdx-core PR [#862](https://github.com/forcedotcom/sfdx-core/pull/862), plugin-org PR [#717](https://github.com/salesforcecli/plugin-org/pull/717))

* FIX: The telemetry plugin now works correctly behind a proxy. (GitHub issue [#1752](https://github.com/forcedotcom/cli/issues/1752), telemetry PR [#268](https://github.com/forcedotcom/telemetry/pull/268))

* FIX: The SF_CONTENT_TYPE environment variable now works correctly for all Salesforce CLI commands. (GitHub issue [#2331](https://github.com/forcedotcom/cli/issues/2331), oclif/core PR [#753](https://github.com/oclif/core/pull/753))

* FIX: The `data export tree --plan` command now correctly exports the number of rows returned by the `--query` flag (up to a maximum of 2,000 rows). Previously it would sometimes export only 1,000 rows, even when the query returned more. (GitHub issue [#1663](https://github.com/forcedotcom/cli/issues/1663))

* FIX: The commands to deploy and retrieve, such as `project deploy start`, now correctly return a non-zero exit code when they fail due to a missing source file error. (GitHub issue [#2011](https://github.com/forcedotcom/cli/issues/2011), source-deploy-retrieve PR [#1062](https://github.com/forcedotcom/source-deploy-retrieve/pull/1062))

* FIX: The `package version create` command no longer deletes Profile `fieldPermissions` on custom fields of the Activity object. (GitHub issue [#2278](https://github.com/forcedotcom/cli/issues/2278), packaging PR [#348](https://github.com/forcedotcom/packaging/pull/348))

## 2.3.8 (Aug 9, 2023)

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
