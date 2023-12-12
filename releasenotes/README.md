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


## 2.22.7 (Dec 20, 2023) [stable-rc]

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

------------

* NEW: These scratch org snapshot commands are now beta; they were previously pilot. 

    * `org create snapshot`
    * `org delete snapshot`
    * `org get snapshot`
    * `org list snapshot`
 
     A snapshot is a point-in-time copy of a scratch org. It captures the state of a scratch org’s configuration so that you can use it to create scratch org replicas.

    Snapshots are available when your Dev Hub org is upgraded to the Spring ’24 release. Then enable Scratch Org Snapshots in the Dev Hub org that you use to create scratch orgs. For more information, see [Scratch Org Snapshots](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_snapshots_intro.htm) (Available December 20, 2023, with the Spring '24 preview documentation.)

* FIX: Salesforce DX projects now support these metadata types:

    * SvcCatalogFilterCriteria
    * SvcCatalogFilterCondition
    * SvcCatalogItemDefFiltrCrit 

## 2.21.7 (Dec 13, 2023) [stable]

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
