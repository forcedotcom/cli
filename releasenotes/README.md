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


## 2.9.8 (Sept 20, 2023) [stable-rc]

* NEW: The CLI now shows a warning when the version of a core or JIT plugin is out of sync with what was shipped with your installed cli.

* NEW: JIT plugins now respect a lock file during install. This will prevent JIT plugins from installing dependencies that are newer than what they were shipped and tested with. 

* FIX: Running `project retrieve start` now shows warnings for problematic components. This now matches the functionality of `force:source:retrieve` (GitHub issue [#2405](https://github.com/forcedotcom/cli/issues/2405), plugin-deploy-retrieve PR [#747](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/747))

* FIX: Metadata transfers will now automatically retry when they encounter an `ENOMEM` error. Keeps your eyes out for Shane McLaughlin's [debut album](https://github.com/forcedotcom/cli/issues/2452#issuecomment-1710027941). (GitHub issue [#2452](https://github.com/forcedotcom/cli/issues/2452), source-deploy-retrieve PR [#1103](https://github.com/forcedotcom/source-deploy-retrieve/pull/1103))
## 2.8.11 (Sept 15, 2023) [stable]

ANNOUNCEMENTS: 
* Check out our new [public roadmap](https://github.com/orgs/salesforcecli/projects/2/views/1)! Read it like a DevOps pipeline or Kanban board: the items on the left are in the early stages of development, and the items toward the right are almost done or complete.  Let us know what you think!
 
* If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

-------------
These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

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

ANNOUNCEMENTS: 
* Check out our new [public roadmap](https://github.com/orgs/salesforcecli/projects/2/views/1)! Read it like a DevOps pipeline or Kanban board: the items on the left are in the early stages of development, and the items toward the right are almost done or complete.  Let us know what you think!
 
* If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

-------------

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
