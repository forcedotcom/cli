# Salesforce CLI Release Notes (sf Commands)

Here are the new and changed features in recent updates of the `sf` executable of Salesforce CLI.

We publish a new stable version of `sf` on Wednesday. At the same time we also publish an `sf` release candidate that contains changes that we plan to include in next week's `sf` release.

Run `sf version` to display the version of `sf` installed on your computer. 

**Installation**: If you installed Salesforce CLI with the `sfdx` [installers](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm), then `sf` is also installed automatically. If you installed `sfdx` via `npm` then you must install `sf` separately by running `npm install @salesforce/cli -g`. 

**Update**: If you installed `sf` with the `sfdx` installers, run `sfdx update` to update to the latest available stable version. Run `sfdx update stable-rc` to update to the release candidate. To return to the stable version, run `sfdx update stable`.

If you installed `sf` with `npm`, run `npm install @salesforce/cli@latest-rc -g` to update to the release candidate. To return to the stable version, run `npm install @salesforce/cli@latest -g`. 

[Click here for the release notes for the `sfdx` executable.](../sfdx/README.md)

Additional documentation:

* [Salesforce CLI Command Reference (sf)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_unified.htm)
* [Get Started with Salesforce CLI Unification](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_sf_intro.htm)
* [Salesforce CLI Plugin Developer Guide (sf)](https://github.com/salesforcecli/cli/wiki/Quick-Introduction-to-Developing-sf-Plugins)
* [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)

## 1.86.6 (July 12, 2023) [stable-rc]

ANNOUNCEMENTS: 

* Check out `sf` (v2), which is now in Beta! See our [Trailblazer announcement](https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000Pf2wKSAR) for more information. 
* If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).
--------------------------------------------
These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

* FIX: When you run `org delete scratch` to delete your default org, the CLI now also unsets the `target-org` configuration variable and any aliases which point to the deleted org.  (sfdx-core PR [#874](https://github.com/forcedotcom/sfdx-core/pull/874))

## 1.85.8 (July 5, 2023) [stable]

ANNOUNCEMENTS: 

* Check out `sf` (v2), which is now in Beta! See our [Trailblazer announcement](https://trailhead.salesforce.com/trailblazer-community/feed/0D54S00000Pf2wKSAR) for more information. 
* If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).
--------------------------------------------

* NEW: Specify the value of the `sourceApiVersion` property in the generated `sfdx-project.json` project file with the new `--api-version` flag of the `project generate` command. The flag value overrides the `org-api-version` configuration variable, if set. If neither the flag nor the config var is set, then the `sourceApiVersion` property is set to the default value.  For example:

    ```bash
    sf project generate --name myFabProject --api-version 58.0
    ``` 

    (GitHub issue [#1939](https://github.com/forcedotcom/cli/issues/1939), plugin-templates PR [#150](https://github.com/salesforcecli/plugin-templates/pull/150))

* NEW: Include deleted records and archived activities when you run a SOQL query with the `data query` command by specifying the new `--all-rows` Boolean flag. This feature is equivalent to using the [ALL ROWS keyword when executing a SOQL query from Apex](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/langCon_apex_SOQL_query_all_rows.htm). For example:

     ```bash
     sf data query --query "SELECT Id, Name, Account.Name FROM Contact" --all-rows
     ```
     (GitHub issue [#1959](https://github.com/forcedotcom/cli/issues/1959), plugin-data PR [#602](https://github.com/salesforcecli/plugin-data/pull/602))

* NEW: When using the [pre-deployment string replacement feature](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_string_replace.htm), you can now specify that if an environment variable isn’t set, then _remove_ a string from the source file. Use the new `allowUnsetEnvVariable` property together with the `replaceWithEnv` property in the `replacements` section of your `sfdx-project.json` file.

    In this example, if the environment variable SOME_ENV_THAT_CAN_BE_BLANK isn’t set, the string `myNS__` in the `myClass.cls` file is removed when the file is deployed. If the environment variable is set to a value, then that value replaces the `myNS__` string. 

    ```json
    "replacements": [
      {
        "filename": "/force-app/main/default/classes/myClass.cls",
        "stringToReplace": "myNS__",
        "replaceWithEnv": "SOME_ENV_THAT_CAN_BE_BLANK",
        "allowUnsetEnvVariable": true
      }
    ]
  ```
    (GitHub issue [#2070](https://github.com/forcedotcom/cli/issues/2070), source-deploy-retrieve PR [#1019](https://github.com/forcedotcom/source-deploy-retrieve/pull/1019))

* FIX: We no longer display `Unexpected end of JSON input` when you run `org list` and one of your org authorization files is corrupt. We now display information for all orgs whose authorization files are fine, and a warning about the org that has the corrupt auth file. You can then delete the corrupt file and reauthorize the org.   (GitHub issue [#2066](https://github.com/forcedotcom/cli/issues/2066), sfdx-core PR [#869](https://github.com/forcedotcom/sfdx-core/pull/869))

* FIX: We now provide a better error message if your `.forceignore` file includes only one of the two source files for MetadataWithContent metadata types and you try to deploy or retrieve the type. For example, the `MyClass` Apex class consist of two source files: `MyClass.cls` and `MyClass.cls-meta.xml`. If you want to ignore the `MyClass` Apex class, you must list both these files (or use an asterisk) in your `.forceignore` file. (GitHub issue [#2237](https://github.com/forcedotcom/cli/issues/2237), source-deploy-retrieve PR [#1020](https://github.com/forcedotcom/source-deploy-retrieve/pull/1020))

* FIX: Source tracking now correctly handles metadata type names that contain special characters, such as parentheses.  (GitHub issue [#2212](https://github.com/forcedotcom/cli/issues/2212), source-tracking PR [#421](https://github.com/forcedotcom/source-tracking/pull/421))

* FIX: You can now set the `--instance-url` flag to a value that includes the `lightning` string as long as it's part of your actual My Domain name. For example, `https://mycompanyname-lightning.my.salesforce.com` is valid because the My Domain name itself includes `-lightning`. But we continue to not allow Lightning domain instance URLs, such as `https://mydomain.lightning.force.com`.  (GitHub issue [#2241](https://github.com/forcedotcom/cli/issues/2241), plugin-auth PR [#732](https://github.com/salesforcecli/plugin-auth/pull/732))

* FIX: When a bulk data command, such as `data delete bulk`, fails, we now return an exit code of 1. Previously we incorrectly returned an exit code of 0. (GitHub issue [#1648](https://github.com/forcedotcom/cli/issues/1648), plugin-data PR [#601](https://github.com/salesforcecli/plugin-data/pull/601))

* FIX: Salesforce DX projects now support these metadata types:

    - ExtlClntAppSampleConfigurablePolicies (previously called ExtlClntAppMobileConfigurablePolicies)
    - ExtlClntAppSampleSettings (previously called ExtlClntAppMobileSettings)

## 1.84.7 (June 28, 2023)

* NEW: Are you ready to convert your CI scripts to start using the `sf`-style commands? For example, you want to start using `org create scratch` to create a scratch org rather than `force:org:create`. If you're ready, use our new `dev convert script` command to convert most, if not all, of a script. First install the `plugin-dev` plugin.

    ```bash
    sf plugins install @salesforce/plugin-dev
    ```

    Then pass your script file to the `dev convert script` command with the `--script` flag.

    ```bash
    sf dev convert script --script ./myScript.yml
    ```

    The command scans your script file; when it finds an `sfdx` command or flag, it prompts whether you want to replace it with the new `sf` equivalent. Don't worry, the command doesn’t change your original file; instead it creates a file with the replacements, such as `myScript-converted.yml`.

   There's not always a one-to-one mapping between the `sfdx` and `sf` commands. As a result, `dev convert script` can convert a large portion of your script, but it likely can’t convert _all_ of it. In these cases, the command doesn't replace the `sfdx` command but instead adds a comment that starts with `#ERROR`.

  Finally, remember to test the converted script to make sure it's working as you expect! And check out the new [migration topics](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_migrate.htm) in the Salesforce CLI Reference Guide. 

* NEW: Run specific Apex tests when run `project delete source` with the new `RunSpecifiedTests` value of the `--test-level` flag. Just like the `project deploy start` command, specify the tests with the new `--tests` flag.  Previously you were required to run either all local or org tests.  For example:

    ```bash
    sf project delete source --metadata ApexClass:ExcitingClass --test-level RunSpecifiedTests --tests ApexClass:TestExcitingClass --target-org myorg
    ```
    (GitHub issue [#2175](https://github.com/forcedotcom/cli/issues/2175), plugin-deploy-retrieve [#659](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/659))

* FIX: We now display a message with useful information when `org create scratch` fails due to a problem in the `settings` in the definition file. (GitHub issue [#2227](https://github.com/forcedotcom/cli/issues/2227), [sfdx-core](https://github.com/forcedotcom/sfdx-core/commit/39d1124804ee845533888878c9a7aeb2c0ed8c25))

* FIX: If you pass a config variable with a typo to `config unset`, the command asks if you meant the var with the correct spelling. If you answer `Y`, and the command is successful, it no longer displays the `Unknown config name` error.  (GitHub issue [2019](https://github.com/forcedotcom/cli/issues/2019), plugin-settings PR [#291](https://github.com/salesforcecli/plugin-settings/pull/291))

* FIX: We reverted to the previous release of [`isomorphic-git`](https://isomorphic-git.org/) (a Salesforce CLI dependency) due to issues in version `1.24.0`. (GitHub issue [#2194](https://github.com/forcedotcom/cli/issues/2194), source-tracking PR [#417](https://github.com/forcedotcom/source-tracking/pull/417))

## 1.83.6 (June 21, 2023)

* CHANGE: We've removed all the `beta` aliases for the `force package` and `force package1` commands. As a result, you can no longer run commands like `force package beta version create`; use `package version create` instead. (plugin-packaging PR [#356](https://github.com/salesforcecli/plugin-packaging/pull/356))

* FIX: Running `project deploy start` with the environment variable `SF_USE_PROGRESS_BAR=false` now produces the expected output, similar to how the `force:source:deploy` worked. Specifically, the output doesn't include the bar graphics, it does include test completion and errors, and the output goes to stderr. (GitHub issue [#2103](https://github.com/forcedotcom/cli/issues/2103), plugin-deploy-retrieve PR [#662](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/662))

* FIX: When the `project deploy start` command fails, the output now wraps if your terminal is too narrow; previously the information was truncated. (GitHub issue [#2048](https://github.com/forcedotcom/cli/issues/2048 ), plugin-deploy-retrieve PR [#654](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/654))

* FIX: The `project retrieve start --package-name <packagename>` now retrieves only the specified package, and not the `unpackaged` package. (GitHub issue [#2148](https://github.com/forcedotcom/cli/issues/2148), plugin-deploy-retrieve PR [#658](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/658))

* FIX: Tables in command output are no longer truncated by default. As a result, when you run `org display --verbose`, for example, you now see the entire Access Token and Sfdx Auth Url values. (GitHub issue [#1974](https://github.com/forcedotcom/cli/issues/1974), sf-plugins-core PR [#318](https://github.com/salesforcecli/sf-plugins-core/pull/318))

* FIX: The `project retrieve start` command now correctly ignores files in non-default package directories if the files are listed in the `.forceignore` file.  (GitHub issue [#2126](https://github.com/forcedotcom/cli/issues/2126), plugin-deploy-retrieve PR [#652](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/652), source-tracking PR [#412](https://github.com/forcedotcom/source-tracking/pull/412))

* FIX: Let's say you run `project deploy start --dry-run --metadata-dir` to validate a deploy of files in metadata format. You can now run `project deploy quick` on the validated job without errors. (GitHub issue [#2098](https://github.com/forcedotcom/cli/issues/2098), plugin-deploy-retrieve PR [#651](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/651))

* FIX: When you run `project deploy start|validate` and it fails due to insufficient code coverage, you now get a warning; previously it failed without explanation. (GitHub issue [#2179](https://github.com/forcedotcom/cli/issues/2179), plugin-deploy-retrieve PR [#656](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/656))

## 1.82.6 (June 14, 2023)

* NEW: Use the new `jobId` value to check the status of your Experience Cloud site during the site creation or site publish process. The site creation and site publish processes are async jobs that generate a `jobId`. When you run `community create` or `community publish`, we include the `jobId` in the command results. To check the status of your site creation or site publish job, query the BackgroundOperation object and enter the `jobId` as the Id. Experience Cloud site IDs start with `08P`. 

    For example, if you ran the `community create` command on an org with alias `community`, use this command to query its status (replace `08Pxxx` with your specific `jobID`):

    ```bash
    sf data query --query "SELECT Status FROM BackgroundOperation WHERE Id = '08Pxxx'" --target-org community
    ```
    
    Completed site creation and site publish jobs expire after 24 hours and are removed from the database. (plugin-community PR [#353](https://github.com/salesforcecli/plugin-community/pull/353))

* FIX: We've fixed a number of issues related to Node.js v18.16.0. If you followed [our suggestions](https://github.com/forcedotcom/cli/issues/2125) for working around the issues, you can now return to the version of Node.js you were using before and update Salesforce CLI to the latest version. (GitHub issue [#2125](https://github.com/forcedotcom/cli/issues/2125), source-deploy-retrieve PR [#975](https://github.com/forcedotcom/source-deploy-retrieve/pull/975))

* FIX: The `project` commands that have the `-x|--manifest` flag, such as `project convert source` or `project deploy start`, correctly return an error if the specified manifest XML file is invalid. When possible, the commands also display information about what makes the file invalid.  Previously the commands silently ignored the component with the invalid XML and incorrectly displayed a successful result.  (source-deploy-retrieve PR [#996](https://github.com/forcedotcom/source-deploy-retrieve/pull/996))

* FIX: Running multiple commands that set an alias in parallel, such as `org create scratch --alias`, now correctly set the aliases for all the commands. Previously only one alias would be set. (GitHub issues [#1810](https://github.com/forcedotcom/cli/issues/1810) and [#1806](https://github.com/forcedotcom/cli/issues/1806), sfdx-core PR [#842](https://github.com/forcedotcom/sfdx-core/pull/842))

* FIX: When running `project deploy start` with the `--json` flag, you can now also use the `--junit` and `--coverage-formatters` flags to output JUnit local test results. Previously the results weren't created if you specified `--json`. (GitHub issue [#2172](https://github.com/forcedotcom/cli/issues/2172), plugin-deploy-retrieve PR [#650](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/650))

* FIX: You can now successfully add a sibling sub-topic with the `dev generate command` command. Previously, if you tried to add a sibling topic when one already existed in the plugin, the first topic was overwritten in the plugin's `package.json` file.  Now all works as expected and life is good again. (GitHub issue [#1805](https://github.com/forcedotcom/cli/issues/1805), plugin-dev PR [#335](https://github.com/salesforcecli/plugin-dev/pull/335))

    Many thanks to [KevinGossentCap](https://github.com/KevinGossentCap) for contributing the fix!  We love it. 
    
* FIX: When you run `package version create|update`, Salesforce CLI now resolves dependencies using the `branch` attribute of the `dependencies` key in the `sfdx-project.json` file and not the value of the `--branch` flag, if both are set. The value of the `--branch` flag is used only if the `branch` attribute isn't specified in `sfdx-project.json`. (GitHub issue [#2183](https://github.com/forcedotcom/cli/issues/2183), packaging PR [#310](https://github.com/forcedotcom/packaging/pull/310))

    Woo-hoos and thanks to [David Polehonski](https://github.com/David-Polehonski) for finding the issue, and then contributing the fix. We love this one too. 

## 1.81.6 (June 7, 2023)

* FIX: Get JSON output from the `sf plugins` command with the new `--json` flag. (GitHub issue [#267]( https://github.com/forcedotcom/cli/issues/267), oclif plugin-plugin PR [#609](https://github.com/oclif/plugin-plugins/pull/609))

* FIX: The `cmdt generate records` command correctly handles spaces and other non-alphanumeric characters in the CSV file when generating custom metadata type records. (GitHub issue [#2158](https://github.com/forcedotcom/cli/issues/2158), plugin-custom-metadata PR [#481](https://github.com/salesforcecli/plugin-custom-metadata/pull/481))

* FIX: The `project deploy start` command no longer return the error `Cannot read properties of null (reading 'replace')` when Apex tests fail.  (GitHub issue [#2149](https://github.com/forcedotcom/cli/issues/2149), plugin-deploy-retrieve PR [#633](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/633))

* FIX: The `project deploy start` command now displays metadata component failures in its command-line output. (GitHub issue [#2008](https://github.com/forcedotcom/cli/issues/2008), plugin-deploy-retrieve PR [#623](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/623))

## 1.80.6 (May 31, 2023)

* NEW: We now group the multiple flags of `project deploy|retrieve start` and `org create scratch` in the `-h|--help` output so you can easily find that special flag you love so much. For example, we group the testing flags of `project deploy start` under TEST FLAGS. For `org create scratch`, we group the flags that override options in the scratch org definition file under DEFINITION FILE OVERRIDE FLAGS.  (plugin-deploy-retrieve PR [#626](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/626), plugin-org [#685](https://github.com/salesforcecli/plugin-org/pull/685))
 
* NEW: Retrieve source files from your org into a directory other than the defined package directories with the new `--output-dir` (`-r`) flag of `project retrieve start`. If the output directory matches one of the package directories in your `sfdx-project.json` file, the command fails. (plugin-deploy-retrieve PR [#627](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/627))

* NEW: Salesforce DX projects now support the ScoreCategory metadata type.
 
* FIX: You can now generate a custom field of type `Number` on an object using the `schema generate field` command. (GitHub issue [#2142](https://github.com/forcedotcom/cli/issues/2142), plugin-sobject PR [#292](https://github.com/salesforcecli/plugin-sobject/pull/292)) 

* FIX: The description for the `--test-level` flag of the `project deploy start|validate` commands in their `--help` correctly refers to the `--tests` flag; previously it mentioned the non-existent `--run-tests` flag. (GitHub issue [#2117](https://github.com/forcedotcom/cli/issues/2117), plugin-deploy-retrieve PR [#622](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/622))

* FIX: Deleting a single custom label component with the `project source delete` command, or with one of the destructive changes flags of `project deploy start` command, no longer deletes the entire `CustomLabels.labels-meta.xml` file. (GitHub issue [#2118](https://github.com/forcedotcom/cli/issues/2118), plugin-deploy-retrieve PR [#613](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/613))

## 1.79.0 (May 24, 2023)

* NEW: You can now specify these two scratch org definition file options as command-line flags when you run `org create scratch`:

    * `--admin-email`: Email address that's applied to the org's admin user. Equivalent to the `adminEmail` option in the scratch org definition file.
    * `--source-org`: 15-character ID of the org whose shape the new scratch org is based on. Equivalent to the `sourceOrg` option in the scratch org definition file.

    As always, if you set the option in the scratch org definition file, and also specify its equivalent flag, the flag overrides the defintion file setting. 
    
    For example, let's say you set `adminEmail` in the scratch org definition file to `milo@tollbooth.com`. When you run this command, however, the scratch org admin's email address is actually set to `tock@phantom.com`:
    
    ```bash
    sf org create scratch --definition-file config/project-scratch-def.json --admin-email tock@phantom.com --target-dev-hub DevHub
    ```
    (GitHub Feature Request [#2130](https://github.com/forcedotcom/cli/issues/2130), plugin-org PR [#681](https://github.com/salesforcecli/plugin-org/pull/681))
    
* NEW: Salesforce DX projects now support the UserAccessPolicy metadata type. 
 
* CHANGE: the `project deploy` commands now leave the `--test-level` flag undefined by default and let the org decide what tests run.  If you don't specify the flag:

  - Non-production orgs don't run any tests.
  - Production orgs run tests if the deployment includes Apex classes or triggers. 

* FIX: We cleaned up the `--help` for the `project deploy start` command around specifying multiple Apex tests or code coverage formats with the `--tests` and `--coverage-formatters` flags. You no longer use a comma-separated list; instead, specify the flags multiple times or separate the values with spaces. (GitHub issue [#2117](https://github.com/forcedotcom/cli/issues/2117), plugin-deploy-retrieve PRs [#609](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/609) and [#662](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/622))

* FIX: We updated the `--help` for `org logout` to clarify that you don't get a list of orgs to interactively log out of if you've set your default org in your environment, such as with the `target-org` config variable. (GitHub issue [#2128](https://github.com/forcedotcom/cli/issues/2128), plugin-auth PR [#696](https://github.com/salesforcecli/plugin-auth/pull/696))

* FIX: The `orgID` value in the JSON output resulting from running `sf org create scratch <flags> --json` now contains the actual scratch org ID (starts with 00D) rather than the ScratchOrgInfo record ID (starts with 2SR). (GitHub issue [#2131](https://github.com/forcedotcom/cli/issues/2131), plugin-org PR [#675](https://github.com/salesforcecli/plugin-org/pull/675))

* FIX: All commands now know about the `org-metadata-rest-deploy` configuration variable, which is the new `sf`-style name for the `restDeploy` configuration variable. (GitHub issue [#2127](https://github.com/forcedotcom/cli/issues/2127), sfdx-core PR [#834](https://github.com/forcedotcom/sfdx-core/pull/834), plugin-signups PR [#276](https://github.com/salesforcecli/plugin-signups/pull/276))

* FIX: You can now run `project deploy start --metadata-dir`, which deploys source in metadata format, from outside a Salesforce DX project. Similarly, `project retrieve start --target-metadata-dir` also works outside of a project. (GitHub issue [#2089](https://github.com/forcedotcom/cli/issues/2089), plugin-deploy-retrieve PR [#619](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/619)).   
 
* FIX: You can now run `project retrieve start --package-name` on an org that doesn't have source-tracking enabled. (GitHub issue [#2091](https://github.com/forcedotcom/cli/issues/2091), plugin-deploy-retrieve PR [#619](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/619))

* FIX: When you run `project deploy start` without any of the flags that specify exactly what you want to deploy (such as `--source-dir`, `--manifest`, or `--metadata`), and nothing is deployed, the command now exits with a `0` code. Previously it exited with a `1` code. (GitHub discussion [#2065](https://github.com/forcedotcom/cli/discussions/2065), plugin-deploy-retrieve PR [#619](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/619))
        
## 1.78.0 (May 17, 2023)

* NEW: Autocomplete now works on Windows [PowerShell](https://learn.microsoft.com/en-us/powershell/)! Partially type a Salesforce CLI command or flag, then press Tab to see all the available commands or flags. Install the feature with these steps:

   1. From a PowerShell window, run `sf autocomplete powershell`. 
   2. Follow the displayed instructions.
   3. If autocomplete doesn’t work immediately after installation, run `sf autocomplete --refresh-cache`. Then open a new PowerShell window.

    Your work-life on Windows just got a little easier, how great is that?
 
* NEW: When the `project generate manifest` command runs into an unknown metadata type, such as from a misspelled metadata file, the error now includes handy suggestions for one or more similar metadata types that the command _does_ know about. (source-deploy-retrieve PR [#948](https://github.com/forcedotcom/source-deploy-retrieve/pull/948))

* FIX: The `project deploy|retrieve start` commands now support these metadata types:

    * AIScoringModelDefinition
    * AIScoringModelDefVersion
    * SkillType

* FIX: The JUnit test results after a successful execution of `project deploy start --junit` no longer include an empty failure tag. 
 
     Many thanks to [Robin Windey](https://github.com/R0Wi) who contributed the fix. We love it, and hope to see more from you and the community! (GitHub issue [#2076](https://github.com/forcedotcom/cli/issues/2076), plugin-deploy-retrieve PR [#610](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/610))
     
* FIX: If a deploy or retrieve encounters a `Socket connection timeout` error, the command now keeps retrying the deploy up to the retry limit. (GitHub issue [#2086](https://github.com/forcedotcom/cli/issues/2086), source-deploy-retrieve PR [#957](https://github.com/forcedotcom/source-deploy-retrieve/pull/957))

* FIX: We've improved the error message when you specify an invalid value for a flag of type `duration`, such as the `--wait` flag of `project deploy start`. (GitHub issue [#2109](https://github.com/forcedotcom/cli/issues/2109), sf-plugins-core PR [#287](https://github.com/salesforcecli/sf-plugins-core/pull/287))

* FIX: The `apex test run` command now correctly returns an error if you pass `-1` to its `--wait` flag. Previously the command would ignore the value and wait for the default 1 minute. The minimum value for this flag is `0`. (GitHub issue [#2110](https://github.com/forcedotcom/cli/issues/2110), plugin-apex PR [#116](https://github.com/salesforcecli/plugin-apex/pull/116))

* FIX: The `--license-type` flag of `org create sandbox` is now playing nice. In particular, its default value doesn't override the `licenseType` setting in the sandbox definition type when you don't specify the flag. And you no longer get an error when you specify both the flag and the `licenseType` definition file option. (GitHub issue [#2026](https://github.com/forcedotcom/cli/issues/2026), plugin-org [#667](https://github.com/salesforcecli/plugin-org/pull/667))

* FIX: String replacements before deploying metadata to the org are now working consistently on Windows, regardless of the shell you use.  

    Special thanks to [micha79x](https://github.com/micha79x) for an excellent repo that reproduced the problem, and for doing most of the detective work. (GitHub issue [#1885](https://github.com/forcedotcom/cli/issues/1885), source-deploy-retrieve PR [#958](https://github.com/forcedotcom/source-deploy-retrieve/pull/958))
    
* FIX: The `dev generate command` and `dev generate field` commands now work correctly on Windows. (GitHub issue [#2051](https://github.com/forcedotcom/cli/issues/2051), plugin-dev PR [#317](https://github.com/salesforcecli/plugin-dev/pull/317))

## 1.77.6 (May 10, 2023)

* CHANGE: After you run `org login web` and log into your org, you're now redirected to a web page that displays either success or failure, depending on whether you were able to log in successfully. You're no longer redirected to Salesforce's [frontdoor.jsp page](https://help.salesforce.com/s/articleView?id=sf.security_frontdoorjsp.htm&type=5). (sfdx-core PR [#811](https://github.com/forcedotcom/sfdx-core/pull/811))

* FIX: We fixed the `directoryName` property for these two metadata types (associated with OAuth and mobile policies) in Salesforce CLI's metadata registry: ExtlClntAppOauthConfigurablePolicies and ExtlClntAppMobileConfigurablePolicies. (SDR PR [#947](https://github.com/forcedotcom/source-deploy-retrieve/pull/947))

* FIX: When you install a Salesforce CLI plugin, the CLI now validates that the package name is a valid npm package.  This validation prevents accidents and increases security. (GitHub issue [#594](https://github.com/oclif/plugin-plugins/issues/594), oclif plugin-plugin PR [#597](https://github.com/oclif/plugin-plugins/pull/597))

* FIX: We've added a warning when you run `force:org:create` to say that it's been replaced by these two commands: `org create scratch` or `org create sandbox`. (plugin-org PR [#668](https://github.com/salesforcecli/plugin-org/pull/668))

* FIX: The `package1 version list` command now displays all results, not just the first 2000. (GitHub issue [#2073](https://github.com/forcedotcom/cli/issues/2073), packaging PR [#277](https://github.com/forcedotcom/packaging/pull/277))

## 1.76.2 (May 3, 2023)

* FIX: Salesforce CLI no longer creates massive log files when certain criteria are met. (GitHub issues [#1942](https://github.com/forcedotcom/cli/issues/1942) and [#1408](https://github.com/forcedotcom/cli/issues/1408), sfdx-core PR [#818](https://github.com/forcedotcom/sfdx-core/pull/818))

## 1.75.0 (April 26, 2023)

* NEW: When you create a scratch org with `org create scratch`, you specify a definition file that contains options or use the` --edition` flag to specify the one required option. For either method, you can now also use these flags; if you use them with `--definition-file`, they override their equivalent option in the scratch org definition file:

    * `--description`
    * `--name`  (equivalent to the `orgName` option)
    * `--username`
    * `--release`
    * `--edition`

    Note that now you can use `--definition-file` and `--edition` in a single command; previously you had to pick one or the other. If you want to set options other than the preceding ones, such as org features or settings, you must use a definition file. 
    
    In this example, the command uses a scratch org definition file but overrides its `edition` and `description` options:
    
    ```bash
    sf org create scratch --definition-file config/project-scratch-def.json --edition enterprise --description "Enterprise Edition scratch org" --target-dev-hub DevHub --set-default
    ```
    
    In this example, the command specifies all the options at the command line:
    
    ```bash
    sf org create scratch --edition enterprise --description "Enterprise Edition scratch org" --name "My Company" --target-dev-hub DevHub --set-default 
    ```
    
    (GitHub Feature Request [#2016](https://github.com/forcedotcom/cli/issues/2016), plugin-org PR [#641](https://github.com/salesforcecli/plugin-org/pull/641))
    
* NEW: Test Lightning web components with these `sfdx` commands that we added to `sf`:

    * `force lightning lwc test create` : Create a Lightning web component test file. 
    * `force lightning lwc test run` : Invoke Lightning Web Components Jest unit tests. 
    * `force lightning lwc test setup` : Install Jest unit testing tools for Lightning Web Components. 

    The commands are in the JIT [plugin-lwc-test](https://github.com/salesforcecli/plugin-lwc-test) plugin. Rather than bundle it in the core Salesforce CLI, we automatically install the plugin the first time you run one of its commands, such as `force lightning lwc test create`. 
    
    NOTE: If you use these commands, you must use version 16 of Node.js at this time due to an indirect dependency on `sa11y` which doesn't yet support version 18, the current LTS.  See [this feature request](https://github.com/salesforce/sa11y/issues/376) for `sa11y` to support Node.js 18.  See more information about Node.js versions [here](https://github.com/forcedotcom/cli/issues/1985). 
    
* FIX: If the `project deploy start` command fails, source-tracking information is updated correctly.  (GitHub issue [#2057](https://github.com/forcedotcom/cli/issues/2057), source-tracking PR [#368](https://github.com/forcedotcom/source-tracking/pull/368))

* FIX: The `cmdt generate records` command correctly generates custom metadata type records and no longer returns the error `ModuleLoadError: [MODULE_NOT_FOUND]`. (GitHub issue [#2058](https://github.com/forcedotcom/cli/issues/2058), plugin-custom-metadata PR [#445](https://github.com/salesforcecli/plugin-custom-metadata/pull/445))

* FIX: Retrieving a reactivated PicklistValue metadata type no longer returns an erroneous error message. (GitHub issue [#960](https://github.com/forcedotcom/cli/issues/960), source-tracking PR [#960](https://github.com/forcedotcom/cli/issues/960))

## 1.74.7 (April 19, 2023)

* FIX: We've recently done a lot of work in the [source-deploy-retrieve](https://github.com/forcedotcom/source-deploy-retrieve) (SDR) library to address various issues that result in the error `Cannot read properties of undefined (reading 'something')`. These issues are often caused by metadata files being in an unexpected location or format. In addition to addressing these issues, we also now provide more useful errors with details about the name, type, and location of the file in your project that is causing the error. Our goal is to make it easier for you to find and fix the error if it's on your side, or quickly determine if it's actually a bug with Salesforce CLI. 

* FIX: The `sf org delete scratch` command now correctly deletes expired scratch orgs. (GitHub issue [#2045](https://github.com/forcedotcom/cli/issues/2045), plugin-org PR [#640](https://github.com/salesforcecli/plugin-org/pull/640))

* FIX: The `sf apex run test` command now correctly runs Apex tests asynchronously by default. (GitHub issue [#2035](https://github.com/forcedotcom/cli/issues/2035), plugin-apex PR [#91](https://github.com/salesforcecli/plugin-apex/pull/91))

## 1.73.0 (April 12, 2023)

* CHANGE: Instead of bundling [plugin-env](https://github.com/salesforcecli/plugin-env) in the core Salesforce CLI, we now automatically install it the first time you run one of its commands. As we announced on [March 1, 2023](./README.md#1670-march-1-2023), the commands in `plugin-env` (`env list|display|open`) work only with compute environments (Salesforce Functions). Because not all our customers use these commands regularly, we decided to make the plugin a just-in-time one. NOTE: This change applies only to _new_ Salesforce CLI installations. If the plugin is already installed in your Salesforce CLI, there's no change.

* FIX: Running the `force source convert` command on Windows on a directory with Digital Experiences in it no longer produces a `package.xml` file with invalid entries.  (GitHub issue [#2014](https://github.com/forcedotcom/cli/issues/2014), SDR PR [#911](https://github.com/forcedotcom/source-deploy-retrieve/pull/911))

## 1.72.0 (April 5, 2023)

* NEW: As part of [improving the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands so they work like the `sf` commands, we've reconciled the deploy and retrieve commands in [plugin-deploy-retrieve](https://github.com/salesforcecli/plugin-deploy-retrieve) and [plugin-source](https://github.com/salesforcecli/plugin-source). As a result, some existing `sf` command names have changed, and some `sfdx` commands now work in `sf`. Here's a summary. 

    These commands are new:

    * `project convert mdapi` : Convert metadata retrieved via Metadata API into the source format used in Salesforce DX projects.
    * `project convert source` :  Convert source-formatted files into metadata that you can deploy using Metadata API.
    * `project delete source` : Delete source from your project and from a non-source-tracked org.
    * `project delete tracking` : Delete all local source tracking information.
    * `project list ignored` : Check your local project package directories for forceignored files.
    * `project generate manifest` : Create a project manifest that lists the metadata components you want to deploy or retrieve.
    * `project reset tracking` : Reset local and remote source tracking.

    We renamed the following existing `sf` commands, but aliased the old names so you can still use them. We recommend you start using the new names soon. We also added a few flags to some commands. And all previously beta commands are now generally available. 
    
    |Old Command Name|New Command Name|New Flags|
    |--------|--------|---|
    |`deploy metadata` | `project deploy start`|<ul> <li>`--coverage-formatters`</li> <li>`--junit`</li> <li>`--post-destructive-changes`</li> <li>`--pre-destructive-changes`</li> <li>`--purge-on-delete`</li> <li>`--results-dir`</li> </ul>|
    |`deploy metadata cancel` | `project deploy cancel`|No new flags.|
    |`deploy metadata preview` | `project deploy preview`|No new flags.|
    |`deploy metadata quick` | `project deploy quick`|No new flags.|
    |`deploy metadata report` | `project deploy report`|<ul> <li>`--api-version`</li> <li>`--coverage-formatters`</li> <li>`--junit`</li> <li>`--results-dir`</li> </ul>|
    |`deploy metadata resume` | `project deploy resume`|<ul> <li>`--coverage-formatters`</li> <li>`--junit`</li> <li>`--results-dir`</li> </ul>|
    |`deploy metadata validate` | `project deploy validate`|No new flags.|
    |`retrieve metadata` | `project retrieve start`|No new flags.|
    |`retrieve metadata preview` | `project retrieve preview`|No new flags.|

    Finally, we deprecated the interactive `sf deploy` command; use `project deploy start` or `deploy function` instead. 
    
    As always, run the new and existing commands with the `--help` flag to get detailed information, or `-h` for a quick look. 

## 1.71.0 (March 29, 2023)

* CHANGE: We changed the long name of the flag to specify a Dev Hub org from `--target-hub-org` to `--target-dev-hub` for these packaging commands:

    * `package convert`
    * `package create`
    * `package delete`
    * `package list`
    * `package update`
    * `package version create`
    * `package version create list`
    * `package version create report`
    * `package version delete`
    * `package version displayancestry`
    * `package version list`
    * `package version promote`
    * `package version report`
    * `package version update
    
    We aliased the old long name to the new one, so nothing will break. But we highly recommend you update your scripts to use the new flag name. The short flag name (`-v`) didn't change. We made this change so the flag name matches the other `sf` commands. 
    
* FIX: Executing the `apex get log` command with the `--log-id` flag now correctly fetches the log with the specified ID.  (GitHub issue [#2006](https://github.com/forcedotcom/cli/issues/2006), plugin-apex PR [#79](https://github.com/salesforcecli/plugin-apex/pull/79))

* FIX: The `--url-path-prefix` flag of the `community create` command is no longer required, which is the correct behavior. (GitHub issue [#2005](https://github.com/forcedotcom/cli/issues/2005), plugin-community PR [#303](https://github.com/salesforcecli/plugin-community/pull/303))

* FIX: Let's say you log into a Dev Hub org, and then log into a scratch org that's associated with it, but you created this scratch org from a different computer. Running `org list` on the first computer now correctly lists the scratch org and its expiration date in the appropriate section. (GitHub issue [#1941](https://github.com/forcedotcom/cli/issues/1941), sfdx-core PR [#775](https://github.com/forcedotcom/sfdx-core/pull/775))

* FIX: The `sf deploy|retrieve metadata` commands now support the ExtlClntAppGlobalOauthSettings metadata type.

## 1.70.0 (March 22, 2023)

* NEW: As part of [improving the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands so they work like the `sf` commands, we've added these two new commands to `sf`:

    * `sf org list metadata` : List the metadata components and properties of a specified type.
    * `sf org list metadata-types` : Display details about the metadata types that are enabled for your org.  
    
    We also added the `--source-file` flag to `sf open org` command so you can open a Lightning page in Lightning App Builder in your org. 
    
* CHANGE:  Instead of bundling the [Salesforce Functions plugin](https://github.com/salesforcecli/plugin-functions) in the core Salesforce CLI, we now automatically install it the first time you run one of its commands. We made this change because not all of you use the Salesforce Functions commands regularly. (This change applies only to new Salesforce CLI installations. If the plugin is already installed in your Salesforce CLI, there's no change.)  

* FIX: We fixed the examples for the `sf apex run` command so they use the correct flag: `--file` instead of the incorrect `--apex-code-file`. (GitHub issue [#1999](https://github.com/forcedotcom/cli/issues/1999), plugin-apex PR [#71](https://github.com/salesforcecli/plugin-apex/pull/71)) 

## 1.69.0 (March 15, 2023)

FIX: We fixed some under-the-hood bugs.

## 1.68.2 (March 8, 2023)

* NEW: We've made it easier for you to develop secure code by adding [Salesforce Code Analyzer](https://forcedotcom.github.io/sfdx-scanner/) as a "just-in-time" plugin. Simply type one of the commands, such as `sf scanner run`, and if the plugin isn't already installed, Salesforce CLI automatically installs the latest version. Then use the `sf scanner` commands to detect quality issues and security vulnerabilities in your code. As always, run a command with `--help` to see more information. And be sure to check the [prerequisites page](https://forcedotcom.github.io/sfdx-scanner/en/v3.x/getting-started/prerequisites/).  

* NEW: Generate your own custom plugins, commands, flags, and more with the commands in the just-in-time [plugin-dev](https://github.com/salesforcecli/plugin-dev). If you haven't already installed this plugin, simply type one of its commands and Salesforce CLI automatically installs it for you. For example, run this command to interactively generate the initial files and directory hierarchy for a new custom plugin; the command prompts you for the required information:

    ```bash
    sf dev generate plugin
    ```
    
    See [Get Started and Create Your Own Plugin](https://github.com/salesforcecli/cli/wiki/Get-Started-And-Create-Your-First-Plug-In) for simple examples of using the new commands.  See [Generate Stuff](https://github.com/salesforcecli/cli/wiki/Code-Your-Plugin#generate-stu) for the full list. 
    
* NEW: As part of [improving the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands so they work like the `sf` commands, we reconciled all `config` and `alias` commands in both executables into a single plugin: [plugin-settings](https://github.com/salesforcecli/plugin-settings). The commands work the same as before. Actually, some of the `config` commands work _better_ than before because you can now enter a slightly-misspelled configuration variable and the command prompts you with the correct name. Super handy if you forget the exact name of a config var. For example:

    ```bash
    $ sf config set version=57.0
      ? Did you mean org-api-version? Yes
      Set Config
      ===============================
      | Name            Value Success 
      | ─────────────── ───── ─────── 
      | org-api-version 57.0  true
    ```
    
    **Important**: As announced [here](https://github.com/forcedotcom/cli/issues/1970), we introduced a breaking change in what the `sf config set --json` and `sf config unset --json` commands display; specifically they now produce slightly different JSON output. For example, this command:

    ```bash
    sf config set org-instance-url=https://test.salesforce.com --json 
    ```
    
    Now produces this output:
    
    ```json
    {
      "status": 0,
      "result": {
        "successes": [
          {
            "name": "org-instance-url",
            "value": "https://test.salesforce.com",
            "success": true
          }
        ],
        "failures": []
      },
      "warnings": []
    }
    ```
    
    Previously it produced this output:
    
    ```json
    {
      "status": 0,
      "result": [
        {
          "name": "org-instance-url",
          "value": "https://test.salesforce.com",
          "success": true
        }
      ],
      "warnings": []
    }
    ```
    The JSON output of `sf config unset --json` changed similarly. There is no change in the other `config` and `alias` commands. 

* CHANGE: When running any `sf retrieve metadata` command with the `--json` flag, we no longer include the `zipfile` property in the `result`. (plugin-deploy-retrieve PR [#514](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/514))

## 1.67.0 (March 1, 2023)

* NEW: We continue to improve the usability of existing `sfdx` commands so they work like the `sf` commands. We're doing this work plugin by plugin. As a result of this work, when a Salesforce CLI release includes an updated plugin, you can execute the plugin's commands in both `sfdx` AND `sf`. See [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) for details. 

    This week we've reconciled the various authentication and login commands between `sfdx` and `sf`. We've added the updated `sfdx` [plugin-auth](https://github.com/salesforcecli/plugin-auth) to `sf`, and made changes to the existing `sf` [plugin-env](https://github.com/salesforcecli/plugin-env) and [plugin-login](https://github.com/salesforcecli/plugin-login). Here's a summary of the changes.

    Use these commands to log in and authorize an org: 
    
    * `sf org login jwt` : Log in to a Salesforce org using a JSON web token (JWT).
    * `sf org login web` : Log in to a Salesforce org using the web server flow.
    * `sf org logout` : Log out of a Salesforce org.
    * `sf org list auth` : List authorization information about the orgs you created or logged into.
    * `sf org login access-token` : Authorize an org using an existing Salesforce access token.
    * `sf org login device` : Authorize an org using a device code
    * `sf org login sfdx-url` : Authorize an org using a Salesforce DX authorization URL stored in a file.
    
    Here's how the existing `sf` commands have changed:
    
    |Existing Command|Changes|
    |-----|-----|
    |`sf login org jwt`|Original command has been removed, use `sf org login jwt` instead.|
    |`sf login org`|Original command has been removed, use `sf org login web` instead|
    |`sf logout org`|Original command has been removed, use `sf org logout` instead|
    |`sf logout`|Command is deprecated and no longer works on orgs. Use `sf org logout` instead|
    |`sf login`|Command is deprecated and no longer works on orgs. Use `sf org login web` instead|
    |`sf env display`|Works only with compute environments, not with orgs. Use `sf org display` instead.|
    |`sf env list`|Works only with compute environments, not with orgs. Use `sf org list auth` or `sf org list` instead.|
    |`sf env open`|Works only with compute environments, not with orgs. Use `sf org open` instead.|    

* NEW: Use Bulk API 2.0 to upsert and delete data to and from your org with these new commands:

    * `sf data delete bulk` : Bulk delete records from an org using a CSV file. Uses Bulk API 2.0.
    * `sf data delete resume` : Resume a bulk delete job that you previously started. Uses Bulk API 2.0.
    * `sf data upsert bulk` : Bulk upsert records to an org from a CSV file. Uses Bulk API 2.0.
    * `sf data upsert resume` : Resume a bulk upsert job that you previously started. Uses Bulk API 2.0.
    
    For example, bulk upsert records from a CSV file to the Contact object in your default org with this command:

    ```bash
    sf data upsert bulk --sobject Contact --file files/contacts.csv --external-id Id 
    ```
    
    The preceding command returns control to you immediately and runs the bulk upsert asynchronously. Resume the job to see the results with this command:

    ```bash
    $ sf data upsert resume --use-most-recent
    ```
   
    We recommend that you start using these new Bulk API 2.0 commands rather than the existing `sf force data bulk` commands, which are based on Bulk API 1.0. However, one reason to keep using the existing `sf force data bulk upsert` command is if you want to run the upsert serially with the `--serial` flag. The new Bulk API 2.0 commands don't support serial execution. In this case, or if you simply want to continue using Bulk API 1.0, use these commands:
    
    * `sf force data bulk delete` 
    * `sf force data bulk upsert` 
    * `sf force data bulk status` 
    
    Run the commands with `--help` to see examples.  
    
    Finally, the `sf data resume` command is deprecated.  Use `sf data delete resume` or `sf data upsert resume` instead. 

* NEW: When you type a command fragment and `sf` displays a list of possible commands for you to choose from, we now also display the command summary. The summaries make it easier for you to pick the command you want. 

* CHANGE: Due to low usage and high complexity, we removed the Salesforce Functions `sf run function start container` command; use `sf run function start` instead. 
 
* FIX: You can now specify `packageAliases` that contain spaces in the `sfdx-project.json` file and execute `package` commands that use the alias without getting an error.  (GitHub issue [#1936](https://github.com/forcedotcom/cli/issues/1936), oclif PR [#614](https://github.com/oclif/core/pull/614))

* FIX: For backwards compatibility, we added the `-v|--targetdevhubusername` flag back to the `force org delete` and `org delete scratch` commands, even though the flag doesn't do anything and is deprecated. (GitHub issue [#1925](https://github.com/forcedotcom/cli/issues/1925), plugin-org PR [#581](https://github.com/salesforcecli/plugin-org/pull/581))

* FIX:  When the `sf org create scratch` command deploys the org settings, it waits for the amount of time left from the specified `--wait` value.  Previously it waited for a maximum of 10 minutes for this step, regardless of the value of `--wait`. (GitHub issue [#1817](https://github.com/forcedotcom/cli/issues/1817), sfdx-core PR [#771](https://github.com/forcedotcom/sfdx-core/pull/771))

* FIX: If you run into authentication errors when running `sf org list shape`, such as an expired refresh token, the displayed table now shows information for orgs the command can connect to, and an appropriate warning for orgs it can't connect to.  (GitHub issue [#1882](https://github.com/forcedotcom/cli/issues/1882), plugin-signups PR [#216](https://github.com/salesforcecli/plugin-signups/pull/216))

## 1.66.2 (Feb 22, 2023)

* NEW: We now install some plugins just when you need them, rather than include them automatically in a Salesforce CLI release. Let's use the [updated]((https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli)) [plugin-packaging](https://github.com/salesforcecli/plugin-packaging) as an example. The plugin isn't included in `sf` by default, although `sf` _knows_ about it. When you run one of the plugin's commands for the first time, such as `sf package version create`, Salesforce CLI installs the latest released version of the plugin and then runs the command. The installation happens automatically, although we display a little message so you know what's going on. From then on, run any of the commands contained in the plugin as usual. And when you next run `sfdx update`, if the just-in-time plugin has released a new version, then it's also updated. Just a little just-in-time magic!    
    
* NEW: We continue to improve the usability of existing `sfdx` commands so they work like the `sf` commands. We're doing this work plugin by plugin. As a result of this work, when a Salesforce CLI release includes an updated plugin, you can execute the plugin's commands in both `sfdx` AND `sf`. See [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) for details. 

   This week's release includes the updated [plugin-apex](https://github.com/salesforcecli/plugin-apex) and [plugin-templates](https://github.com/salesforcecli/plugin-templates). Consequently, you can now run these existing `sfdx` commands in `sf`:

    * `sf analytics generate template` : Create a simple Analytics template. 
    * `sf apex run` : Execute anonymous Apex code entered on the command line or from a local file.                                                 
    * `sf apex generate class` : Create an Apex class.                                           
    * `sf apex generate trigger` : Create an Apex trigger.
    * `sf apex get log` : Fetch the specified log or given number of most recent logs from the org.
    * `sf apex list log` : Display a list of IDs and general information about debug logs.            
    * `sf apex tail log` : Activate debug logging and display logs in the terminal.            
    * `sf apex get test` : Display test results for a specific asynchronous test run.         
    * `sf apex run test` : Invoke Apex tests in an org.            
    * `sf lightning generate app` : Create a Lightning App.   
    * `sf lightning generate component` : Create a bundle for an Aura component or a Lightning web component.
    * `sf lightning generate event` : Create a Lightning Event. 
    * `sf lightning generate interface` : Create a Lightning Interface.
    * `sf lightning generate test` : Create a Lightning test.  
    * `sf static-resource generate` : Create a static resource. 
    * `sf visualforce generate component` : Create a Visualforce Component.
    * `sf visualforce generate page` : Create a Visualforce Page.

    We also changed the official name of the existing `sf generate project` command to `sf project generate`.

    In addition to the two new _included_ plugins, we also added [plugin-packaging](https://github.com/salesforcecli/plugin-packaging) as a just-in-time plugin. We decided to make it a just-in-time plugin because not all of you use the packaging commands regularly. See the previous release note about how this type of plugin works. After Salesforce CLI installs the plugin, you can run these existing `sfdx` commands in `sf`:

    * `sf package1 version create` : Create a first-generation package version in the release org.
    * `sf package1 version create get` : Retrieve the status of a package version creation request. 
    * `sf package1 version display` : Display details about a first-generation package version.
    * `sf package1 version list` : List package versions for the specified first-generation package or for the org.
    * `sf package create`: Create a package.
    * `sf package delete` : Delete a package.
    * `sf package install`: Install a version of a package in the target org.
    * `sf package install report` : Retrieve the status of a package installation request.
    * `sf package installed list` : List the org’s installed packages.
    * `sf package list` : List all packages in the Dev Hub org.
    * `sf package uninstall` : Uninstall a second-generation package from the target org.
    * `sf package uninstall report` : Retrieve the status of a package uninstall request.
    * `sf package update` : Update package details.
    * `sf package version create` : Create a package version in the Dev Hub org.
    * `sf package version create list` : List package version creation requests.
    * `sf package version create report` : Retrieve details about a package version creation request.
    * `sf package version delete` : Delete a package version.
    * `sf package version displayancestry` : Display the ancestry tree for a 2GP managed package version.
    * `sf package version list` : List all package versions in the Dev Hub org.
    * `sf package version promote` : Promote a package version to released.
    * `sf package version report` : Retrieve details about a package version in the Dev Hub org.
    * `sf package version update` : Update a package version.

    As always, run the commands with `--help` to see the list of flags, examples, and usage information. We'll be releasing other updated plugins over the next weeks. Enjoy!

* NEW: The `sf org display` output now includes the API version of the org at the time you authorized it with the `sf login org` command. We cache the value locally, so if Salesforce updates your org to a new release, the API version will be incorrect. Re-login to your org to refresh the API version information in the `sf org display` output. (GitHub issue [#314](https://github.com/forcedotcom/cli/issues/314), plugin-org PR [#580](https://github.com/salesforcecli/plugin-org/pull/580))

* NEW: Configure autocomplete on Zsh for commands that use spaces as separators by running this command:

    ```bash
    sf autocomplete
    ```
    Follow the displayed instructions to set up autocomplete in your environment. Then use the tab key to autocomplete commands. For example, if you type `sf data ` then press TAB, you'll get a list of data commands to chose from. You can also autocomplete flags: 
    
    * Type `-` to see suggestions that show both the long and short flag names. For example, if you type `sf data query -` then press TAB, zsh displays all the flags for this command, including both short and long names. If you type `sf data query --`, then only the long names are shown. 
    * For flags that define a set of valid values, type `--<flagname>` to see the list. For example, if you type `sf data query --result-format` then press TAB, zsh suggests the valid options for this flag, which are `human`, `json`, or `csv`. 
    * Flags that can be specified multiple times are still suggested, even if you've already used it. 
    
    If you currently use autocomplete for colon-separated commands, you must regenerate the autocomplete cache to get this new behavior; nothing in your environment changes otherwise:
    
    ```bash
    sf autocomplete --refresh-cache
    ``` 
    
    If you regenerate the cache, but then want to go back to autocompleting commands that use `:` as a separator, first set this environment variable:
    
    ```bash
    OCLIF_AUTOCOMPLETE_TOPIC_SEPARATOR=colon
    ```

     Then regenerate the autocomplete cache (`sf autocomplete --refresh-cache`).
    
* CHANGE: Remember when we added [`plugin-custom-metadata`](#cmdt-community), [`plugin-signups`](#signups), and [`plugin-community`](#cmdt-community) to `sf`?  We're changing them to just-in-time plugins, because, like packaging, not all of you use these commands regularly.  

## 1.65.0 (Feb 15, 2023)
    
* CHANGE: We upgraded the version of Node.js contained in the [Salesforce CLI installers and TAR files](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm) to [v18.14.0](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V18.md#2023-02-02-version-18140-hydrogen-lts-bethgriggs-prepared-by-juanarbol). 

* FIX: The `sf data query` command no longer suppresess or nullifies the value of `0` (in human-readable output) when it's returned by a SOQL query. (GitHub issue [#1892](https://github.com/forcedotcom/cli/issues/1892), plugin-data PR [#470](https://github.com/salesforcecli/plugin-data/pull/470))

    Many thanks to [Leo Stewart](https://github.com/leostewart) for reporting the issue, and then providing the fix. We're stoked with your contribution, and we look forward to more from you and community!

* FIX: The `sf deploy|retrieve metadata` commands now support the ExperiencePropertyTypeBundle metadata type.

## 1.64.0 (Feb 8, 2023)
    
* CHANGE: As part of [this project](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli), we changed the official name of these existing `sf` commands: 

    | Old command name | New command name|
    |---|---|
    |`sf env create sandbox`|`sf org create sandbox`|
    |`sf env create scratch`|`sf org create scratch`|
    |`sf env delete sandbox`|`sf org delete sandbox`|
    |`sf env delete scratch`|`sf org delete scratch`|
    |`sf env resume sandbox`|`sf org resume sandbox`|
    |`sf env resume scratch`|`sf org resume scratch`|

    We also brought over these org-specific `sfdx` commands:
    
    * `sf org display` : Display information about an org.
    * `sf org list` : List all orgs you’ve created or authenticated to.
    * `sf org open` : Open your default scratch org, or another specified org, in a browser.
    
    We recommend you use their `env` equivalents (`sf env display|list|open`) for Salesforce Functions. 
    
* FIX: The `sf deploy|retrieve metadata` commands now support these metadata types:

    * AccountingFieldMapping
    * AccountingModelConfig
    * ActionLauncherItemDef
    * ActionableListDefinition
    * ExplainabilityMsgTemplate
    * IntegrationProviderDef
    * LocationUse
    * PersonAccountOwnerPowerUser
    * PipelineInspMetricConfig
    * ProductSpecificationTypeDefinition

## 1.63.2 (Feb 1, 2023)

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

* NEW: We continue to improve the usability of existing `sfdx` commands so they work like the `sf` commands. We're doing this work plugin by plugin. As a result of this work, when a Salesforce CLI release includes an updated plugin, you can execute the plugin's commands in both `sfdx` AND `sf`. See [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) for details. 

   This week's release includes the updated [plugin-user](https://github.com/salesforcecli/plugin-user). Consequently, you can now run these existing `sfdx` commands in `sf`:

    * `sf org assign permset` : Assign a permission set to one or more users of a scratch org.                       
    * `sf org assign permsetlicense` : Assign a permission set license to one or more users of a scratch org.                
    * `sf org create user` : Create a user for a scratch org.                          
    * `sf org display user` : Display information about a Salesforce user.                         
    * `sf org generate password` : Generate a random password for scratch org users.                    
    * `sf org list users` : List all locally-authenticated users of an org. 
    
    As always, run the commands with `--help` to see the list of flags, examples, and usage information. We'll be releasing other updated plugins over the next weeks. Enjoy!
    
* CHANGE: We changed the official names of these `sf` commands that we recently added:

    | Old command name | New command name|
    |---|---|
    |`sf generate cmdt object`|`sf cmdt generate object`|
    |`sf generate cmdt field `|`sf cmdt generate field `|
    |`sf generate cmdt fromorg`|`sf cmdt generate fromorg`|
    |`sf generate cmdt record`|`sf cmdt generate record`|
    |`sf generate cmdt records`|`sf cmdt generate records`|
    |`sf generate metadata field` |`sf schema generate field`|
    |`sf generate metadata platformevent` |`sf schema generate platformevent`|
    |`sf generate metadata sobject` |`sf schema generate sobject`|
    |`sf generate metadata tab` |`sf schema generate tab`|  
    
* FIX: When running `sf env delete scratch|sandbox` to delete a scratch or sandbox org, all local source tracking files associated with the deleted org are cleaned up correctly. (GitHub issue [#1879](https://github.com/forcedotcom/cli/issues/1879), sfdx-core PR [#754](https://github.com/forcedotcom/sfdx-core/pull/754))

* FIX: The `cmdt generate record` command is now working correctly and no longer returns `Error: Unexpected arguments`. (GitHub issue [#1893](https://github.com/forcedotcom/cli/issues/1893), plugin-custom-metadata PR [#380](https://github.com/salesforcecli/plugin-custom-metadata/pull/380))

<a name="signups">

## 1.62.2 (Jan 25, 2023)

* NEW: We continue to improve the usability of existing `sfdx` commands so they work like the `sf` commands. We're doing this work plugin by plugin. As a result of this work, when a Salesforce CLI release includes an updated plugin, you can execute the plugin's commands in both `sfdx` AND `sf`. See [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) for details. 

   This week's release includes updated [plugin-signups](https://github.com/salesforcecli/plugin-signups). Consequently, you can now run these existing `sfdx` commands in `sf`:

    * `sf org create shape` : Create a scratch org configuration (shape) based on the specified source org.
    * `sf org delete shape` : Delete all org shapes for a target org.
    * `sf org list shape` : List all org shapes you’ve created.
    * `sf org create snapshot` : Create a snapshot of a scratch org. (Pilot)
    * `sf org delete snapshot` : Delete a scratch org snapshot. (Pilot)
    * `sf org get snapshot` : Get details about a scratch org snapshot. (Pilot)
    * `sf org list snapshot` : List scratch org snapshots. (Pilot)

    As always, run the commands with `--help` to see the list of flags, examples, and usage information. We'll be releasing other updated plugins over the next weeks. Enjoy!

* NEW: You can now automatically replace snippets of your metadata source files with specific values right before you deploy the files to an org with the `sf deploy metadata` command. This string replacement is "ephemeral" because the changes aren't written to your project; they apply only to the deployed files. Use this new feature to, for example, replace the endpoint in a NamedCredential, depending on whether you're deploying to a production or scratch org. Or specify a password in an ExternalDataSource that you don't want to store in your repo. The use cases are endless!

    To configure string replacement, add a `replacements` property to your `sfdx-project.json` file and use key-value pairs to describe how the string replacement works. See [Replace Strings in Code Before Deploying](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_string_replace.htm) for details and examples. This topic uses the `force:source:deploy|push` sfdx commands in the examples, but they apply equally to `sf deploy metadata`.
    
    Note these `sf`-specific considerations:
    
    * By default, if you specify the `--json` flag for `sf metadata deploy`, the JSON output includes a `replacements` property that lists the affected files and the string that was replaced. Specify the `--concise` flag to omit this information.
    * To view string replacement information in the `sf metadata deploy` human-readable output, specify `--verbose`.

<a name="cmdt-community">

## 1.61.1 (Jan 18, 2023)

* NEW: We continue to improve the usability of existing `sfdx` commands so they work like the `sf` commands. We're doing this work plugin by plugin. As a result of this work, when a Salesforce CLI release includes an updated plugin, you can execute the plugin's commands in both `sfdx` AND `sf`. See [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) for details. 

   This week's release includes updated [plugin-data](https://github.com/salesforcecli/plugin-data), [plugin-community](https://github.com/salesforcecli/plugin-community), and [plugin-custom-metadata](https://github.com/salesforcecli/plugin-custom-metadata). Consequently, you can now run these existing `sfdx` commands in `sf`:

    * `sf community create` :  Create an Experience Cloud site using a template.             
    * `sf community list template` :  Retrieve the list of templates available in your org.       
    * `sf community publish` : Publish an Experience Builder site to make it live.  
    * `sf data create record` : Create and insert a record into a Salesforce or Tooling API object.              
    * `sf data delete bulk` : Bulk delete records from an org using a CSV file.                  
    * `sf data delete record` : Deletes a single record from a Salesforce or Tooling API object.            
    * `sf data export tree` : Export data from an org into one or more JSON files.              
    * `sf data get record` : Retrieve and display a single record of a Salesforce or Tooling API object.               
    * `sf data import tree` : Import data from one or more JSON files into an org.              
    * `sf data query` : Execute a SOQL query.                    
    * `sf data query resume` : View the status of a bulk query.             
    * `sf data resume` : View the status of a bulk data load job or batch.                   
    * `sf data update record` : Updates a single record of a Salesforce or Tooling API object.            
    * `sf data upsert bulk` : Bulk upsert records to an org from a CSV file.
    * `sf generate cmdt object` : Generate a new custom metadata type in the current project.                  
    * `sf generate cmdt field ` : Generate a field for a custom metadata type based on the provided field type.             
    * `sf generate cmdt fromorg` : Generate a custom metadata type and all its records from a Salesforce object.                
    * `sf generate cmdt record` : Generate a new record for a given custom metadata type in the current project.           
    * `sf generate cmdt records` : Generate new custom metadata type records from a CSV file.            

    As always, run the commands with `--help` to see the list of flags, examples, and usage information. We'll be releasing other updated plugins over the next weeks. Enjoy!
    
## 1.60.0 (Jan 11, 2023)

ANNOUNCEMENT: Happy new year, Salesforce CLI community! Be sure to read our latest [blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) that describes some of the big improvements that are coming in Salesforce CLI this year. And now back to our regular schedule. 

* NEW: As described in [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli), we're updating many of the existing `sfdx` commands to use the improvements we made in `sf`. We're doing this work plugin by plugin. When a Salesforce CLI release includes an updated plugin, you can execute the plugin's commands in both `sfdx` AND `sf`. Let's see how this works. 

   This week's release includes updated [plugin-limits](https://github.com/salesforcecli/plugin-limits) and [plugin-schema](https://github.com/salesforcecli/plugin-schema). As a result, you can now run these existing `sfdx` commands in `sf`:
    
    * `sf limits api display`: Display information about limits in your org.
    * `sf limits recordcounts display`: Display record counts for the specified standard or custom objects.
    * `sf sobject describe`: Display the metadata for a standard or custom object or a Tooling API object.
    * `sf sobject list`: List all Salesforce objects of a specified category.

    As always, run the commands with `--help` to see the list of flags, examples, and usage information. We'll be releasing other updated plugins over the next weeks. Enjoy!
    
* CHANGE: Salesforce CLI has always automatically run a partial command if it finds only one option. For example, if you run `sf open`, the CLI runs `sf env open` automatically because it's the only command that contains the fragment `open`.  But now we warn you about it, just so you know exactly what command you just ran.  [cli PR [#475](https://github.com/salesforcecli/cli/pull/475))

## 1.59.0 (Dec 21, 2022)

* NEW: Get debugging information about any command execution with the new `--dev-debug` flag. Each line in the debug output starts with the name of a function or plugin, such as `sf:core`. Use these values to filter the debug output with the `--debug-filter` flag. For example:

     `sf env list --dev-debug --debug-filter sf:core`
     
     (salesforce/cli PR [#452](https://github.com/salesforcecli/cli/pull/452)) 
     
* FIX: The `sf deploy|retrieve metadata` commands now support these metdata types used by Net Zero Cloud:

   * FuelType
   * FuelTypeSustnUom
   * SustainabilityUom
   * SustnUomConversion

## 1.58.0 (Dec 14, 2022)

* FIX: We fixed some under-the-hood bugs. 

## 1.57.0 (Dec 7, 2022)

* FIX: Any configured `postorgcreate` hooks in custom plugins are now firing correctly after you run `sf env create scratch|sandbox`.

## 1.56.0 (Nov 30, 2022)

* NEW: Do you write plugins for Salesforce CLI (`sf` executable)?  If so, check out the new `sf dev audit messages` command in [plugin-dev](https://github.com/salesforcecli/plugin-dev). It audits your plugin's messages directory, looking for unused messages and missing messages referenced by your source code. If you don't specify any flags, you must run it from your plugin's top-level directory. First make sure you've installed the plugin:

    ```bash
    sf plugins install @salesforce/plugin-dev
    ```
    
    Then change to your plugin directory and get an audit of your messages:

    ```bash
    sf dev audit messages
    ```
    
    Or run the command from anywhere and use the `--project-dir` flag to specify your plugin directory:
    
    ```bash
    sf dev audit messages --project-dir /User/romeo/my-plugin (macOS/Linux)
    sf dev audit messages --project-dir c:\custom-plugins\my-plugin (Windows)
    ```
    
    Maybe you haven't yet written your own `sf` plugin, but you're curious?  We've made it super easy.  Check out the [sf Plugin Developer Guide](https://github.com/salesforcecli/cli/wiki/Quick-Introduction-to-Developing-sf-Plugins) for all the deets, or just [plunge right in](https://github.com/salesforcecli/cli/wiki/Get-Started-And-Create-Your-First-Plug-In).  Happy coding!
    
* FIX: The `sf env resume scratch` command displays the correct message.  (GitHub issue [#1701](https://github.com/forcedotcom/cli/issues/1701). sfdx-core PR [#706](https://github.com/forcedotcom/sfdx-core/pull/706))

## 1.55.0 (Nov 23, 2022)

* FIX: The `sf deploy|retrieve metadata` commands now support the ExtlClntAppMobileConfigurablePolicies metadata type. 

## 1.54.0 (Nov 16, 2022)

* NEW: Determine which plugin a command is in with the new `which` command. For example:

    ```bash
    $ sf which "deploy metadata"
    === deploy metadata

    plugin: @salesforce/plugin-deploy-retrieve
    ```
 
* FIX: The `sf deploy|retrieve metadata` commands now support these metdata types:

   * ExtlClntAppOauthConfigurablePolicies (previously called ExtlClntAppOauthPlcyCnfg)
   * ExtlClntAppMobileSettings (previously called ExtlClntAppMobileSet)

## 1.53.0 (Nov 9, 2022)

* NEW:  Quickly gather Salesforce CLI configuration data and run diagnostic tests with the new `doctor` command. Use the command to easily generate informational files that you can attach to [GitHub issues](https://github.com/forcedotcom/cli/issues) or provide to Salesforce Customer Support. 

    Run without parameters, the command first displays basic information, such as whether you're on the latest CLI version. It then writes your configuration and a detailed diagnosis to a JSON file in the current directory. Use the `--outputdir` flag to specify a different directory. For example:

    `sf doctor --outputdir diagnostic-files`

    Use the `--command` flag to run a specific command in debug mode; the doctor writes both stdout and stderr to separate `*.log` files. Encapsulate the command in double quotes. For example:

    `sf doctor --command "env list --all"`

    To run diagnostic tests on a specific plugin rather than the CLI itself, use the `--plugin` flag. If the plugin isn't listening to the doctor, then you get a warning and no data. 

    `sf doctor --plugin @salesforce/plugin-deploy-retrieve`
    
    We've made it really easy to create a GitHub issue: specify the `--createissue` flag, enter a title at the prompt, and a browser window automatically opens with a partially-filled GitHub issue. Enter the remaining information about your specific issue, click **Submit new issue**, and you're done.  Easy peasy!

    The CLI doctor is in and ready to diagnose all your problems!

## 1.52.0 (Nov 2, 2022)

* FIX: The `sf deploy|retrieve metadata` commands now support these metadata types:

   * BotBlock
   * ClauseCatgConfiguration
   * DisclosureType
   * DisclosureDefinition
   * DisclosureDefinitionVersion
   * ExtlClntAppOauthPlcyCnfg
   * ExtlClntAppOauthSettings
   * ExtlClntAppMobileSet
   * OmniSupervisorConfig

## 1.51.0 (Oct 26, 2022)

* NEW: Create aliases to simplify how you use the CLI with these new beta commands:

    * `sf alias set`
    * `sf alias unset`
    * `sf alias list`

    For example, scratch org usernames are long and unwieldy, such as `test-sadbiytjsupn@example.com`. Creating an alias for the username, such as `my-scratch-org` makes it easy to refer to it. Check the `--help` of a CLI command to determine where you can use an alias.  
    
    Here's how to set an alias to a scratch org username:
    
    `sf alias set my-scratch-org=test-sadbiytjsupn@example.com`
    
    Refer to the alias this way:
    
    `sf deploy metadata --target-org my-scratch-org --metadata ApexClass`
    
    Enjoy! 

## 1.50.0 (Oct 19, 2022)

* FIX: The `sf deploy|retrieve metadata` commands now support these metadata types:

    * CallCtrAgentFavTrfrDest
    * ExternalCredential
    * MarketSegmentDefinition
    * MfgProgramTemplate
    * StreamingAppDataConnector

## 1.49.0 (Oct 12, 2022)

* FIX: The `sf deploy metadata` command correctly deploys any CustomFieldTranslation metadata types that have local changes. (PRs: source-deploy-retrieve [#726](https://github.com/forcedotcom/source-deploy-retrieve/pull/726) and [#728](https://github.com/forcedotcom/source-deploy-retrieve/pull/728), plugin-source [#597](https://github.com/salesforcecli/plugin-source/pull/597), source-tracking [#243](https://github.com/forcedotcom/source-tracking/pull/243))

* FIX: The `sf deploy metadata` command correctly handles the new enhanced domains in Winter '23 preview sandboxes. [GitHub issue [#1687](https://github.com/forcedotcom/cli/issues/1687).  PRs: jsforce [#1272](https://github.com/jsforce/jsforce/pull/1272), sfdx-core [#667](https://github.com/forcedotcom/sfdx-core/pull/667))

* FIX: The `sf deploy|retrieve metadata` commands now support the RelationshipGraphDefinition metadata type. [PR: source-deploy-retrieve [#722](https://github.com/forcedotcom/source-deploy-retrieve/pull/722))

## 1.48.0 (Oct 5, 2022)

* FIX: When you install a plugin with the `sf plugin install` command, `sf` now verifies its signature. If the plugin is unsigned, `sf` prompts you to confirm that you really want to install it. This behavior mimics the existing behavior of `sfdx`. 

## 1.47.0 (Sept 28, 2022)

* FIX: We fixed some under-the-hood bugs. 

## 1.46.0 (Sept 21, 2022)

* FIX: The `sf deploy|retrieve metadata` commands now support these metadata types:

    * DigitalExperienceBundle
    * DigitalExperience
    * DigitalExperienceConfig

* FIX: You can now correctly deploy empty metadata files; previously you'd get an UNKNOWN_EXCEPTION error. (GitHub issue [#1673](https://github.com/forcedotcom/cli/issues/1673), SDR PR [#705](https://github.com/forcedotcom/source-deploy-retrieve/pull/705))

## 1.45.0 (Sept 14, 2022)

* NEW: Retrieve components in metadata format with the new `--target-metadata-dir | -t` flag of the `sf retrieve metadata` command. _Metadata format_ refers to the file format used by the Metadata API. Previously, the `sf retrieve metadata` command retrieved files only in source format.

    With the new `--target-metadata-dir` flag, the components in metadata format are retrieved into a ZIP file called `unpackaged.zip` (by default) in the specified local directory. You must use this flag in combination with one of these flags so the command knows which components to retrieve: `--source-dir`, `--manifest`, `--metadata`, or `--package-name`.    

    For example, this command retrieves all Apex classes from an org with alias `myorg` into a ZIP file called `unpackaged.zip` and puts it in the local directory called `md-output`: 

    `sf retrieve metadata --metadata ApexClass --target-metadata-dir md-output --target-org myorg`

    Customize the command output with these other new flags:

    * `--single-package`: Indicates that the retrieved ZIP file has a single package directory. 
    * `--unzip, -z`: Automatically extract the files from the downloaded ZIP file. 
    * `--zip-file-name`: Name for the downloaded ZIP file. Default is `unpackaged.zip`.

    For example:

    `sf retrieve metadata --metadata ApexClass --target-metadata-dir md-output --unzip --target-org myorg`

* FIX: The `sf deploy|retrieve metadata` commands now support these metadata types:

    * ExternalClientApplication
    * ForecastingFilter
    * ForecastingFilterCondition
    * SchedulingObjective

## 1.44.0 (Sept 8, 2022)

* FIX: The `sf deploy|retrieve metadata` commands now support the MarketingAppExtension metadata type. 

## 1.43.0 (Sept 1, 2022)

* NEW: Preview a metadata deployment or retrieval with the new `sf deploy|retrieve metadata preview` beta commands. They're like `sfdx force:source:status`, but smarter.

    The commands display a table of the metadata components that will be deployed or retrieved or deleted. The table also lists the conflicts between the source in your local project and the components in the org. Finally, the table lists components that won't be deployed or retrieved because they're included in your `.forceignore` file. Use the `--ignore-conflicts` to see what is deployed or retrieved when any conflicts are ignored. For example:

    `sf retrieve metadata preview --ignore-conflicts`

    The `sf deploy metadata preview` command also supports the flags to narrow what's deployed, such as `--metadata`, `--manifest`, or `--source-dir`. For example:

    ```bash
    sf deploy metadata preview --metadata ApexClass
    sf deploy metadata preview --source-dir force-app
    ```

* NEW: Interactively create local Salesforce metadata, such as custom objects and platform events, with these new beta commands in the new [plugin-sobject](https://github.com/salesforcecli/plugin-sobject) plug-in:

    ```bash
    sf generate metadata sobject
    sf generate metadata platformevent
    sf generate metadata field
    ```
    
    Each command requires the `--label` flag, and then uses the value to provide intelligent suggestions for its prompts, such as its API name. This example shows how to interactively create a custom object:

    `sf generate metadata sobject --label "My Fab Object"`

    Want to automatically enable optional features on the new custom object rather than answer all the prompts? Try this:

    `sf generate metadata sobject --label "My Fab Object" --use-default-features`

    Now create a custom field on your shiny new object; the command prompts you for the object:

    `sf generate metadata field --label "My Field"`

    Remember to run `sf deploy metadata` to deploy the new local source files to your org. Then you can further customize the new components using Setup UI, then `sf retrieve metadata` the changes back to your local project. How fun is that?

* NEW: Create a custom tab for a custom object with the new `sf generate metadata tab` beta command. You must provide the object's API name, [icon number](https://www.lightningdesignsystem.com/icons/#custom), and local directory to store the files. For example:

    `sf generate metadata tab --object MyFabObject__c --icon 54 --directory force-app/main/default/tabs`

## 1.42.0 (Aug 25, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.41.0 (Aug 18, 2022)

* NEW: Search the `sf` commands for that special one you've been looking for all your life with the new interactive `sf search` command. 

* CHANGE: The `sf deploy|retrieve metadata` commands no longer support these metadata types associated with Connect Center:

    * ConnectedSystem
    * DataMapping
    * DataMappingObjectDefinition
    * DataMappingSchema
    * DataMappingFieldDefinition
    * FederationDataMappingUsage

## 1.40.0 (Aug 11, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.39.0 (Aug 4, 2022)

* FIX: Following our standard conventions, these commands no longer have the `-j` short flag for producing JSON output, only the `--json` long flag:

    * `sf deploy functions`
    * `sf env create compute`
    * `sf env delete`
    * `sf env logdrain add`
    * `sf env logdrain remove`
    * `sf env var set`
    * `sf env var unset`
    * `sf logout functions`
    * `sf run function`

## 1.38.0 (July 28, 2022)

* FIX: The `sf deploy|retrieve metadata` commands now support these metadata types:

    * IdentityVerificationProcDef
    * ServiceAISetupDefinition
    * ServiceAISetupField

## 1.37.0 (July 21, 2022)

* NEW: Get JSON output from these Salesforce Functions commands with the `--json` flag:

    * `sf deploy functions`
    * `sf env create compute`
    * `sf env delete`
    * `sf env logdrain add`
    * `sf env logdrain remove`
    * `sf env var set`
    * `sf env var unset`
    * `sf logout functions`
    * `sf run function`

* NEW: Stream log output for a compute environment with the new beta `sf env log` command. For example:

    `sf env log --target-compute environment-alias` 

* FIX: Refreshing expired access tokens is working as expected. (GitHub issue [#1615](https://github.com/forcedotcom/cli/issues/1615), [sfdx-core PR #619](https://github.com/forcedotcom/sfdx-core/pull/619))
 
* FIX: The `sf deploy|retrieve metadata` commands now support these metadata types:

    * AIUsecaseDefinition
    * DataPackageKitDefinition
    * DataPackageKitObject
    * DataSourceBundleDefinition
    * DataSrcDataModelFieldMap
    * DataStreamTemplate

## 1.36.0 (July 14, 2022)

* FIX: The `sf env create scratch` command correctly labels a scratch org in its internal authentication files. (GitHub issue https://github.com/forcedotcom/cli/issues/1598)

## 1.35.0 (July 7, 2022)

* NEW: These commands now support source tracking:

    * `sf deploy metadata`
    * `sf deploy metadata validate`
    * `sf retrieve metadata`

    The first time you run `sf deploy metadata` on a scratch or sandbox org that allows source tracking, the command deploys all local source files. But when you next run the command, it deploys only the files that changed locally. Narrow the list of deployed files with the `--source-dir`, `--metadata`, or `--manifest` flags. If you don’t specify these flags, then the command deploys all changes in the project, similar to how `force:source:push` in `sfdx` works. 

    The `sf retrieve metadat`a command is the same as deploy, but in reverse. The first time you retrieve, everything is retrieved; the next time only changes in the org are retrieved. If you don’t specify `--source-dir`, `--metadat`a, or `--manifest`, then all changes in the org are retrieved, just like `force:source:pull` in `sfdx`.

    If a command detects a conflict in the files you’re about to deploy or retrieve, the command displays the conflicts. Use the `--ignore-conflicts` flag to force the deployment or retrieval of the changes. This flag is similar to the`--forceoverwrite` parameter of many of the `force:source` commands in `sfdx`. For example:

    `sf deploy metadata --source-dir force-app --ignore-conflicts`

    See [Getting Started with Salesforce CLI Unification](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_sf_intro.htm), which will soon be updated with additional details about source tracking in `sf` and how it’s slightly different from `sfdx`. 

* NEW: Opt out of source tracking when you create a scratch or sandbox org with the new `--no-track-source` flag of the `sf env create scratch|sandbox` commands. Source tracking is enabled by default for orgs that support it. But you sometimes want to disable source tracking, such as in a CI/CD environment to improve performance. This example creates a scratch org with source tracking disabled:

    `sf env create scratch --target-dev-hub=MyHub --definition-file config/project-scratch-def.json --no-track-source`

* NEW: Get detailed information about the Salesforce CLI version you're using with the new `--verbose` flag of the `sf version` command. Output includes versions of the core and installed plug-ins, operating system information, and version of Node.js. 

* FIX: Authentication tokens are now consistently and correctly encrypted or decrypted. (GitHub issue #[1314](https://github.com/forcedotcom/cli/issues/1314))

## 1.34.0 (June 30, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.33.0 (June 23, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.32.0 (June 16, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.31.0 (June 9, 2022)

* FIX: We fixed some under-the-hood bugs.
 
## 1.30.0 (June 2, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.29.0 (May 26, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.28.0 (May 19, 2022)

* NEW: Deploy components in metadata format with these new flags for the `sf deploy metadata` and `sf deploy metadata validate` commands:

    * `--metadata-dir`: Either the root directory or the .zip file that contains the metadata formatted files you want to deploy.
    * `--single-package`: Indicates that `--metadata-dir` points to a directory structure for a single package. By default, the deploy command assumes the directory is structured for a set of packages.
 
    _Metadata format_ refers to the file format used by the Metadata API. Previously, the `sf deploy metadata` and `sf deploy metadata validate` commands deployed files only in source format. 
    
    If you use `--metdata-dir` to deploy metadata formatted source files, you can't use the `--metadata`, `--source-dir`, or `--manifest` flags, which apply only to source formatted files.
    
    This example deploys the metadata formatted files in the `MyMdComponents.zip` file and specifies that the files are in a single package directory:
    
    ```sf deploy metadata --metadata-dir zips/MyMdComponents.zip --single-directory```
  
* FIX: The `sf deploy|retrieve metadata` commands now support these metadata types:

    * AssessmentQuestion
    * AssessmentQuestionSet
 
## 1.27.0 (May 12, 2022) 

* NEW: Check out these new beta commands that make deploying metadata easier than ever:

    * `deploy metadata validate`: Validate a metadata deployment without actually executing it. 
    * `deploy metadata quick`: Quick deploy a validated deployment to an org.
    * `deploy metadata resume`: Resume watching a deploy operation.
    * `deploy metadata cancel`: Cancel a deploy operation.
    * `deploy metadata report`: Check the status of a deploy operation. 

    The `validate` and `quick` commands work together. They're useful if the deployment to your production org takes several hours and you don’t want to risk a failed deploy. You first validate a deployment to verify whether it will succeed, without actually deploying the metadata to your org. The command returns a job ID, which you then pass to the `quick` command to _actually_ deploy the metadata. The quick deploy takes less time because it skips running Apex tests, which ran as part of the validation. Let's look at some examples.  
    
    Validate the deployment to the org with alias `my-prod-org` of all source files in the `force-app` directory:
    
    `sf deploy metadata validate --source-dir force-app --target-org my-prod-org`
    
    When the command completes, you can pass the displayed job ID to the `quick` command:
    
    `sf deploy metadata quick --job-id 0Af0x000017yLUFCA2`
    
    Use the `--async` flag on either command to run it asynchronously; the command still displays the job ID but immediately returns the control of the terminal to you.  
    
    `sf deploy metadata validate --source-dir force-app --target-org my-prod-org --async`
    
    Resume watching the asynchronous command by passing the job ID to the `resume` command:
    
    `sf deploy metadata resume --job-id 0Af0x000017yLUFCA2`
    
    Cancel a deploy operation that hasn't yet completed in the org using the `cancel` command. In this context, "deploy operations" include standard deploys, quick deploys, deploy validations, and deploy cancellations. 
    
    `sf deploy metadata cancel --job-id 0Af0x000017yLUFCA2`
    
    Want to check the status of a deploy operation? Use the `report` command:
    
    `sf deploy metadata report --job-id 0Af0x000017yLUFCA2`
     
    Lost the job ID? Don't panic! Specify the `--use-most-recent` flag with any command that takes a job ID:
    
    `sf deploy metadata resume --use-most-recent`
     
    See the `--help` of each command for more interesting flags and examples. 
    
## 1.26.0 (May 5, 2022)

* NEW: Manage scratch orgs and sandboxes with these new beta commands:

    * `env create scratch`
    * `env resume scratch`
    * `env delete scratch`
    * `env create sandbox`
    * `env resume sandbox`
    * `env delete sandbox`

    Use the `create` commands to create scratch orgs and sandboxes. While executing, they display running information about the background processes, such as sending requests, deploying org settings, and so on. Pretty cool knowing what's going on behind the scenes, no? Use the `resume` command if the original `create` command times out, or you specified the `–async flag` to run it asynchronously. Use the `delete` commands to, yep, you guessed it, delete a scratch org or sandbox! Let's run through a few scratch org examples to see the new commands in action. 

    Create a scratch org from a definition file, set it as your default environment, give it an alias, and use the Dev Hub with alias `DevHub`: 

    `sf env create scratch --definition-file config/project-scratch-def.json --set-default --alias myscratch --target-dev-hub DevHub`

    Create a Developer Edition scratch org using your default Dev Hub and give it an alias:

    `sf env create scratch --edition=developer --alias anotherscratch`

    Create a scratch org asynchronously. The command returns control to you right away and displays a job ID:

    `sf env create scratch --edition=developer --alias happyscratch --async`

    Resume the scratch org creation by passing the job ID to the `resume` command:

    `sf env resume scratch --job-id 2SR3u0000008fBDGXD`

    Delete the scratch org when you’re done with it:

    `sf env delete scratch --target-org happyscratch`

    The sandbox commands work much the same, except they have a few additional flags specific to sandboxes, such as `–license-type` and `–name`. See the `–-help` for all the flags.  

## 1.25.2 (April 28, 2022)
 
* CHANGE: We no longer support v12 of Node.js because of its fast approaching end-of-life ([April 30, 2022](https://nodejs.org/en/about/releases/)). We bundle Node.js in each operating system-specific Salesforce CLI installer. We include the Active LTS version of Node.js and update it in tandem with the Node.js release schedule. If you prefer to install Salesforce CLI using `npm`, we recommend you also use the Active LTS version of Node.js.

## 1.24.0 (April 21, 2022)

Starting today, `sf` commands that we're actively working on, but are publicly available, are marked with a beta tag. We can update these beta commands in any future release. While we try not make any breaking changes in these beta commands, we reserve the right to do so without warning. This process allows us to iteratively build `sf` and get feedback from you as we go. 

As soon as we've finished working on a beta command, and we've provided ample time for improvements based on your feedback, we'll remove the beta tag. At that point, the command is GA and follows our [deprecation policy](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/sfdx_dev_cli_deprecation.htm).

A few additional notes:

* All beta `sf` commands have a corresponding `sfdx` command. 
* We don't recommend that you use the beta commands in your CI/CD scripts. 
* We do recommend that you use and test the beta commands in your day to day CLI work and give us feedback early and often by entering [GitHub issues](https://github.com/forcedotcom/cli/issues). 
* `sf` commands that support GA products and have no `sfdx` equivalents, such as Salesforce Functions, will never be marked as beta. These commands are GA from the moment the product itself goes GA and are subject to our [deprecation policy](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/sfdx_dev_cli_deprecation.htm).
* New `sf` commands are marked with a beta tag by default, unless there are no `sfdx` equivalents and they support a GA product. 

--- 

* CHANGE: These commands are now marked beta; they behave the same as before:

    * `sf deploy metadata`
    * `sf retrieve metadata`

## 1.23.0 (April 14, 2022)

* FIX: We fixed some under-the-hood bugs. 

## 1.22.0 (April 7, 2022)

* CHANGE: As part of the fix for [GitHub issue #1408](https://github.com/forcedotcom/cli/issues/1408), Salesforce CLI now uses rotating log files. By default, every day at midnight the CLI makes a backup copy of the log file and then clears out its entries to start afresh. This new behavior ensures that the log file doesn't get too big. We keep backups for the past two days along with the current day’s logs.

    Change the default behavior with these new environment variables:
    
    * SF_LOG_ROTATION_PERIOD: How often a new log file is created. For example, a value of `1d` means a new log file is created daily, at midnight. A value of `2w` creates a new file every 2 weeks. See the _period_ entry in [this table](https://github.com/forcedotcom/node-bunyan#stream-type-rotating-file) for other options. Default value is `1d`. 
    * SF_LOG_ROTATION_COUNT: Number of backup files to keep. Default value is `2`. 

    For example, if you choose a rotation period of 2 weeks and a count of 2, you always have backups for the four weeks before the first entry in the current log. 
    
* CHANGE: We've changed the names of these configuration variables to better fit into the unified CLI world: 

    |Old Name|New Name|
    |--------|--------|
    |apiVersion|org-api-version|
    |disableTelemetry|disable-telemetry|
    |instanceUrl|org-instance-url|
    |maxQueryLimit|org-max-query-limit|
    |restDeploy|org-metadata-rest-deploy|
    
    The new names [interoperate with the equivalent `sfdx` config values](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_sf_and_sfdx.htm), just like the old names did. But you can no longer use the old names. For example:
    
    * If you run `sfdx config:set apiVersion=54.0`, then `org-api-version` is also set to `54.0` in `sf`.
    * If you run `sf config set org-api-version=54.0`, then `apiVersion` is also set to `54.0`in `sfdx`.
    * If you run `sf config set apiVersion=54.0`, you get an error. Run `sf config set org-api-verison=54.0` instead. 

    We're in the process of updating the [documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_sf_and_sfdx.htm). 

## 1.20.0 (March 31, 2022)

* NEW: We've added the following new flags to the `deploy metadata` command that mirror similar functionality in the `sfdx force:source:deploy` command:

    * `--api-version`: API version to use when deployng. 
    * `--dry-run`: Validate the deploy and run Apex tests but don't save to the org.
    * `--ignore-errors`: Ignore any errors and don't roll back deployment.
    * `--ignore-warnings`: Ignore warnings and allow a deployment to complete successfully.
    * `--tests` : Apex tests to run when `--test-level` is `RunSpecifiedTests`.
    * `--verbose`: Show verbose output of the deploy result.

* NEW: Get JSON output when running the `env var get` command with the `--json` flag. 

## 1.19.0 (March 24, 2022)

* NEW: Salesforce CLI can now read your mind. Okay, not really, but the `sf` executable got a lot smarter in this release. You can now enter command fragments in any order, and the CLI figures out what you mean. For example, let's say you want to log into an org using JWT but you forgot the exact command. All of the following commands work without returning any `command not found` errors:

    ```bash
    sf login org jwt
    sf org login jwt
    sf jwt org login
    ```

    But wait, there’s more. If you remember only part of a command, run the partial command anyway to see a handy list of all the commands that contain that part. Use arrows to highlight the one you want, then press return to choose it. For example, let's say you want to list all your environments, but can't remember the exact command name. Try this:

    ```bash
    sf list
    ? Which of these commands do you mean (Use arrow keys)
    > config list                                                                                    
    > env list                                                                                               
    > env logdrain list                                                                            
    > env var list
    ```
    
    The command to list your environments is, wait for it... `sf env list`!
    
    To narrow down a long list of possible commands, provide a flag. For example, if you run `sf list –all`, it displays only the `env list` command because it's the only one that has the `–all` flag.

    Each command still has a canonical signature, which we use in the `–help` examples and to organize the [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_unified.htm).  

   Here's a fun activity: discover all the cool `sf` commands by simply entering keywords at the command line!

* NEW: We've improved how the interactive `sf deploy` command handles expired scratch orgs. As before, the command refers to the `target-org` configuration variable when prompting you for the org to which to deploy. If, however, the scratch org it points to has expired, the command now asks if you want to deploy to a different org. If you do, the command gives you a list of orgs to choose from, and then asks if you want to set it as your default. Nice. 

## 1.18.0 (March 17, 2022)

* NEW: Add a Heroku user as a collaborator on a compute environment with the new `env compute collaborator add` command. Specify the Heroku user's email address with the `--heroku-user` flag. After running the command, you can attach [Heroku add-ons](https://elements.heroku.com/addons) to the compute environment. For example:

    `sf env compute collaborator add --heroku-user me@example.com`

## 1.17.0 (March 10, 2022)

* FIX: We've improved the error messages returned when you use one of these Salesforce Functions commands to run a JavaScript or TypeScript function that encounters unexpected data:

    * `run function start`
    * `run function start local`
    * `run function start container`

    The improved error messages provide more information about the problem to help you understand what went wrong and how to proceed. 
    
## 1.16.0 (March 3, 2022)

* CHANGE: When you run `sf update`, we now warn you that it has no effect if you installed `sf` using the `sfdx` installer. In this case, to update `sf`, run `sfdx update`.

## 1.15.0 (Feb 24, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.14.0 (Feb 17, 2022)

* NEW: Easily update `sf` to any available version with the new `--version` flag of the `update` command. Not sure which versions are available? Use the new `--available` flag to list them. The output also handily includes the location of the version, either local (because you've previously installed it) or out there in the cloudy world. There's no need to download remote versions, the `sf update --version` command does it for you. We've even added an `--interactive` flag; use your cursor to choose the version from a list. For example:

    ```bash
    sf update --version 1.12.0
    sf update --interactive
    sf update --available
    ```
    Updating to the current or release candidate versions using the `stable` or `stable-rc` tags works as before:
    
    ```bash
    sf update stable-rc
    ```
    NOTE: These update changes apply only if you installed `sf` with its installer. They don't apply if you installed `sf` with either the `sfdx` installer or `npm`.

## 1.12.0 (Feb 10, 2022)

* FIX: We fixed some under-the-hood bugs.

## 1.11.1 (Feb 3, 2022) 

* FIX: We fixed some under-the-hood bugs.
 
## 1.10.0 (Jan 27, 2022)

* CHANGE: Docker is no longer required when you develop a Salesforce Function locally using the `run function start` command. Instead, you can build and run Functions on the host operating system, which results in a faster development cycle. If you want to continue using Docker for local Salesforce Functions development, use the new `run function local container` command. This command behaves the same as `run function start` did before this release.

## 1.9.1 (Jan 20, 2022)

* NEW: Build and run a Salesforce Function in a container with the new `run function start container` command. 

* FIX: We've switched the HTTP library used by the [Salesforce Functions commands](https://github.com/salesforcecli/plugin-functions) to ensure compatibility with customer VPNs.

## 1.8.0 (Jan 13, 2022)

* CHANGE: If the `info releasenotes display` command (alias `whatsnew`) can't find an exact match of the installed CLI version in the release notes, the command displays the notes for the closest version. The command behaves the same way if it can't find the exact version specified by the `–version` parameter in the release notes. 

## 1.7.0 (Dec 23, 2021)

NOTE: Because of the holidays, we're not publishing a new `stable-rc` release today or next week (Dec 30, 2021). We'll return to our regular weekly release schedule on Jan 6, 2022. (Wow, next year we'll be exactly 200 years away from the first every-digit-is-the-same year since 1111. Exciting stuff!) Happy holidays to our fabulous developer community, and see you next year!

* NEW: Easily find the `sf` command or flag you want to execute with the new autocomplete feature. It works the same as standard autocomplete on a terminal: it's all about the TAB key. First type `sf` at the prompt and then press TAB twice to view the full list of topics and top-level commands. Then type the first letter of a topic or command, press TAB again, and the CLI autocompletes it as best it can. Autocomplete works similarly with flags: after you've typed out a command, type a dash (`-`) then TAB twice to see the full list of available flags. Then type a letter and TAB to autocomplete a specific flag. Play around with it and you'll get the hang of it, don't worry!

    To install autocomplete, run `sf autocomplete` and follow the instructions for your particular environment. For example, on macOS with the bash shell, you run this command, which updates your `.bashrc` file:
    
    `printf "eval $(sf autocomplete:script bash)" >> ~/.bashrc; source ~/.bashrc`

    Autocomplete on `sf` is currently supported only on the macOS and Linux operating systems and the Bash shell.
    
* NEW:  Quickly catch up on the new and changed features in any Salesforce CLI release with the new `info releasenotes display` command (alias `whatsnew`). By default, the command displays the release notes for the Salesforce CLI version that's currently installed. Use the `--version|-v` flag to specify a specific CLI version or a tag, such as `stable-rc`. For example:

    ```bash
    sf whatsnew
    sf whatsnew --version stable-rc
    sf whatsnew -v 1.6.0 
    ```

## 1.6.0 (Dec 16, 2021)

* CHANGE: Installing the `sfdx` executable with the `npm install sfdx-cli -g` command no longer installs the `@salesforce/cli` package, which corresponds to the `sf` executable. 

   To install `sf` via npm, run this command: `npm install @salesforce/cli -g`. 
   
   Installing Salesforce CLI with the installers and TAR files hasn't changed; they still install both the `sfdx` and `sf` executables.
    
## 1.5.2 (Dec 9, 2021)

* NEW: Build and run a Salesforce Function locally with the new `sf run function start local` command.

## 1.4.0 (Nov 18, 2021)

* FIX: We fixed some under-the-hood bugs.

## 1.3.0 (Nov 11, 2021)

* FIX: We improved the automatic installation of `sf` when you install `sfdx` using the operating system-specific installers and TAR files. 

## 1.2.0 (Nov 4, 2021)

* FIX: We fixed a bug that prevented `sfdx update` from also updating `sf` to its latest version.

## 1.1.5 (Oct 28, 2021)

* FIX: We fixed some under-the-hood bugs.

## 1.1.0 (Oct 21, 2021) 

* FIX: We fixed some under-the-hood bugs.

## 1.0.4 (Oct 7, 2021)

Welcome to the first GA release of the new `sf` executable of Salesforce CLI!

Salesforce CLI is a bundle of two executables: `sf` and `sfdx`. We first launched `sfdx` for you to develop and test your apps more easily on Salesforce Platform. But if you want to work across all Salesforce clouds, `sfdx` doesn’t provide all the commands you need. With `sf`, we're bringing together a cross-cloud set of commands that streamline how you build and deploy across Salesforce. See [Get Started with CLI Unification](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_sf_intro.htm) for more information about the `sf` executable, such as how it works with `sfdx`, a mapping of the available `sf` commands to their equivalent `sfdx` commands, and more. 

### Installation Notes

If you've already installed Salesforce CLI and are using `sfdx` commands, update the CLI to the latest version to also get `sf`:

    sfdx update

NOTE: If you haven't already, [uninstall the old `salesforcedx` plug-in](../sfdx/README.md#71063-june-17-2021) to ensure the update succeeds.

Verify that you can use `sf` by running the `help` command, which lists the version and top-level topics:

    sf help

You can also install `sf` with npm:

    npm install @salesforce/cli --global

See [Install sf](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_sf_install.htm) for other installation options and troubleshooting information.

### Documentation

We've enhanced the command-line help to include additional information. As a result, the help can get long, so we've also changed the behavior of the flags:

* `-h` : Displays a subset of the full help: short command and flag descriptions and command usage. Great for quick reference. 
* `--help` : Displays the `-h` content plus longer command and flag descriptions, examples, and the configuration and environment variables that affect the command. 

As far as the online documentation:

* The [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_top.htm) contains reference information about both `sf` and `sfdx` commands.
* For now, the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm) continues to use only the `sfdx` executable in its examples. 
* The [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_sf_intro.htm) contains all the online information about `sf` in a new Get Started section. 

### Feedback

We want to hear from you!  Enter any issues you encounter with the `sf` executable and feature requests in [Issues tab of this GitHub repo](https://github.com/salesforcecli/cli/issues). 
