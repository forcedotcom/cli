# Salesforce CLI Release Notes (sfdx Commands)

Here are the new and changed features in recent updates of the `sfdx` executable of Salesforce CLI.

We publish a new `stable` version of `sfdx` on Thursdays. At the same time we also publish the `stable-rc` release candidate. The release candidate contains changes that will likely be in the final weekly version.

Run `sfdx version` to display the version installed on your computer. Run `sfdx update` to update to the latest available stable version. 

Check out these other update options:

* Run `sfdx update stable-rc` to update to this week's release candidate. To return to the stable version, run `sfdx update stable`. 
* Use the `--version` flag to update to an older version, such as `sfdx update --version 7.178.0`.  
* Use the `--available` flag to view all available older versions you can update to or `-interactive` to update interactively. 

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update Salesforce CLI to ensure that autocomplete works correctly on any new commands.

[Click here for the previous sfdx release notes.](./v50.md)

Want to check out the new `sf` executable of Salesforce CLI? [Click here for the release notes.](../sf/README.md)

Additional documentation:

* [Salesforce CLI Command Reference (sfdx)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
* [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
* [Salesforce CLI Plugin Developer Guide (sfdx)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins.htm)
* [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)

## 7.204.0 (June 8, 2023) [stable-rc]

ANNOUNCEMENT: If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change. 

* NEW: Use the new `jobId` value to check the status of your Experience Cloud site during the site creation or site publish process. The site creation and site publish processes are async jobs that generate a `jobId`. When you run `community create` or `community publish`, we include the `jobId` in the command results. To check the status of your site creation or site publish job, query the BackgroundOperation object and enter the `jobId` as the Id. Completed site creation and site publish jobs expire after 24 hours and are removed from the database. (plugin-community PR [#353](https://github.com/salesforcecli/plugin-community/pull/353))

* FIX: The `cmdt generate records` command correctly handles spaces and other non-alphanumeric characters in the CSV file when generating custom metadata type records. (GitHub issue [#2158](https://github.com/forcedotcom/cli/issues/2158), plugin-custom-metadata PR [#481](https://github.com/salesforcecli/plugin-custom-metadata/pull/481))

* FIX: The `project deploy start` command no longer return the error `Cannot read properties of null (reading 'replace')` when Apex tests fail.  (GitHub issue [#2149](https://github.com/forcedotcom/cli/issues/2149), plugin-deploy-retrieve PR [#633](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/633))

* FIX: The `project deploy start` command now displays metadata component failures in its command-line output. (GitHub issue [#2008](https://github.com/forcedotcom/cli/issues/2008), plugin-deploy-retrieve PR [#623](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/623))

## 7.203.0 (June 1, 2023) [stable-rc]

ANNOUNCEMENT: If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

* NEW: We now group the multiple flags of `project deploy|retrieve start` and `org create scratch` in the `-h|--help` output so you can easily find that special flag you love so much. For example, we group the testing flags of `project deploy start` under TEST FLAGS. For `org create scratch`, we group the flags that override options in the scratch org definition file under DEFINITION FILE OVERRIDE FLAGS.  (plugin-deploy-retrieve PR [#626](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/626), plugin-org [#685](https://github.com/salesforcecli/plugin-org/pull/685))
 
* NEW: Retrieve source files from your org into a directory other than the defined package directories with the new `--output-dir` (`-r`) flag of `project retrieve start`. If the output directory matches one of the package directories in your `sfdx-project.json` file, the command fails. (plugin-deploy-retrieve PR [#627](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/627))

* NEW: Salesforce DX projects now support the ScoreCategory metadata type.
 
* FIX: You can now generate a custom field of type `Number` on an object using the `schema generate field` command. (GitHub issue [#2142](https://github.com/forcedotcom/cli/issues/2142), plugin-sobject PR [#292](https://github.com/salesforcecli/plugin-sobject/pull/292)) 

* FIX: The description for the `--test-level` flag of the `project deploy start|validate` commands in their `--help` correctly refers to the `--tests` flag; previously it mentioned the non-existent `--run-tests` flag. (GitHub issue [#2117](https://github.com/forcedotcom/cli/issues/2117), plugin-deploy-retrieve PR [#622](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/622))

* FIX: Deleting a single custom label component with the `project source delete` command, or with one of the destructive changes flags of `project deploy start` command, no longer deletes the entire `CustomLabels.labels-meta.xml` file. (GitHub issue [#2118](https://github.com/forcedotcom/cli/issues/2118), plugin-deploy-retrieve PR [#613](https://github.com/salesforcecli/plugin-deploy-retrieve/pull/613))

* FIX: Get JSON output from the `sfdx plugins` command with the new `--json` flag. (GitHub issue [#267]( https://github.com/forcedotcom/cli/issues/267), oclif plugin-plugin PR [#609](https://github.com/oclif/plugin-plugins/pull/609))
 
## 7.202.0 (May 25, 2023)

ANNOUNCEMENT: If you install Salesforce CLI using `npm`, and use Node.js 14 or 16, be aware of these [end-of-life dates](https://github.com/forcedotcom/cli/issues/1985).

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

## 7.201.6 (May 18, 2023)

* NEW: Autocomplete now works on Windows [PowerShell](https://learn.microsoft.com/en-us/powershell/)! Partially type a Salesforce CLI command or flag, then press Tab to see all the available commands or flags. Install the feature with these steps:

   1. From a PowerShell window, run `sfdx autocomplete powershell`. 
   2. Follow the displayed instructions.
   3. If autocomplete doesn’t work immediately after installation, run `sfdx autocomplete --refresh-cache`. Then open a new PowerShell window.

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

## 7.200.7 (May 11, 2023)

* FIX: We now bundle Node.js version 18.15.0 in the installers. When we upgraded to 18.16.0, we saw issues around source conversion, deployment, and retrieval. If you install with `npm`, we recommend you not use Node.js 18.16.0 at this time. See [this pinned issue](https://github.com/forcedotcom/cli/issues/2125) for details. 
 
* FIX: We fixed the `directoryName` property for these two metadata types (associated with OAuth and mobile policies) in Salesforce CLI's metadata registry: ExtlClntAppOauthConfigurablePolicies and ExtlClntAppMobileConfigurablePolicies. (SDR PR [#947](https://github.com/forcedotcom/source-deploy-retrieve/pull/947))

* FIX: When you install a Salesforce CLI plugin, the CLI now validates that the package name is a valid npm package.  This validation prevents accidents and increases security. (GitHub issue [#594](https://github.com/oclif/plugin-plugins/issues/594), oclif plugin-plugin PR [#597](https://github.com/oclif/plugin-plugins/pull/597))

* FIX: We've added a warning when you run `force:org:create` to say that it's been replaced by these two commands: `org create scratch` or `org create sandbox`. (plugin-org PR [#668](https://github.com/salesforcecli/plugin-org/pull/668))

* FIX: The `package1 version list` command now displays all results, not just the first 2000. (GitHub issue [#2073](https://github.com/forcedotcom/cli/issues/2073), packaging PR [#277](https://github.com/forcedotcom/packaging/pull/277))

## 7.199.7 (May 4, 2023)

* CHANGE: After you run `org login web` (`auth:web:login`) and log into your org, you're now redirected to a web page that displays either success or failure, depending on whether you were able to log in successfully. You're no longer redirected to Salesforce's [frontdoor.jsp page](https://help.salesforce.com/s/articleView?id=sf.security_frontdoorjsp.htm&type=5). (sfdx-core PR [#811](https://github.com/forcedotcom/sfdx-core/pull/811))

* FIX: The `force:source:push --json` command now produces the correct JSON output to stdout when the command fails due to a conflict.  (GitHub issue [#2095](https://github.com/forcedotcom/cli/issues/2095), plugin-source PR [#828](https://github.com/salesforcecli/plugin-source/pull/828))

* FIX: Salesforce CLI no longer creates massive log files when certain criteria are met. (GitHub issues [#1942](https://github.com/forcedotcom/cli/issues/1942) and [#1408](https://github.com/forcedotcom/cli/issues/1408), sfdx-core PR [#818](https://github.com/forcedotcom/sfdx-core/pull/818))

## 7.198.6 (April 27, 2023)

* NEW: When you create a scratch org with `org create scratch`, you specify a definition file that contains options or use the` --edition` flag to specify the one required option. For either method, you can now also use these flags; if you use them with `--definition-file`, they override their equivalent option in the scratch org definition file:

    * `--description`
    * `--name`  (equivalent to the `orgName` option)
    * `--username`
    * `--release`
    * `--edition`

    Note that now you can use `--definition-file` and `--edition` in a single command; previously you had to pick one or the other. If you want to set options other than the preceding ones, such as org features or settings, you must use a definition file. 
    
    In this example, the command uses a scratch org definition file but overrides its `edition` and `description` options:
    
    ```bash
    sfdx org create scratch --definition-file config/project-scratch-def.json --edition enterprise --description "Enterprise Edition scratch org" --target-dev-hub DevHub --set-default
    ```
    
    In this example, the command specifies all the options at the command line:
    
    ```bash
    sfdx org create scratch --edition enterprise --description "Enterprise Edition scratch org" --name "My Company" --target-dev-hub DevHub --set-default 
    ```
    
    (GitHub Feature Request [#2016](https://github.com/forcedotcom/cli/issues/2016), plugin-org PR [#641](https://github.com/salesforcecli/plugin-org/pull/641))

* CHANGE: Instead of bundling [plugin-lwc-test](https://github.com/salesforcecli/plugin-lwc-test) in the core Salesforce CLI, we now automatically install it the first time you run one of its commands:

    * `force lightning lwc test create` 
    * `force lightning lwc test run`  
    * `force lightning lwc test setup`  

    Because not all our customers regularly test Lightning web components, we decided to make the plugin a just-in-time one. Note that this change applies only to _new_ Salesforce CLI installations. If the plugin is already installed in your Salesforce CLI, there's no change.

    NOTE: If you use these commands, you must use version 16 of Node.js at this time due to an indirect dependency on `sa11y` which doesn't yet support version 18, the current LTS.  See [this feature request](https://github.com/salesforce/sa11y/issues/376) for `sa11y` to support Node.js 18.  See more information about Node.js versions [here](https://github.com/forcedotcom/cli/issues/1985). 
    
* FIX: If the `project deploy start` command fails, source-tracking information is updated correctly.  (GitHub issue [#2057](https://github.com/forcedotcom/cli/issues/2057), source-tracking PR [#368](https://github.com/forcedotcom/source-tracking/pull/368))

* FIX: The `cmdt generate records` command correctly generates custom metadata type records and no longer returns the error `ModuleLoadError: [MODULE_NOT_FOUND]`. (GitHub issue [#2058](https://github.com/forcedotcom/cli/issues/2058), plugin-custom-metadata PR [#445](https://github.com/salesforcecli/plugin-custom-metadata/pull/445))

* FIX: Retrieving a reactivated PicklistValue metadata type no longer returns an erroneous error message. (GitHub issue [#960](https://github.com/forcedotcom/cli/issues/960), source-tracking PR [#960](https://github.com/forcedotcom/cli/issues/960))

## 7.197.8 (April 20, 2023)

* FIX: We've recently done a lot of work in the [source-deploy-retrieve](https://github.com/forcedotcom/source-deploy-retrieve) (SDR) library to address various issues that result in the error `Cannot read properties of undefined (reading 'something')`. These issues are often caused by metadata files being in an unexpected location or format. In addition to addressing these issues, we also now provide more useful errors with details about the name, type, and location of the file in your project that is causing the error. Our goal is to make it easier for you to find and fix the error if it's on your side, or quickly determine if it's actually a bug with Salesforce CLI. 

* FIX: The `sfdx apex run test` command now correctly runs Apex tests asynchronously by default. (GitHub issue [#2034](https://github.com/forcedotcom/cli/issues/2034), plugin-apex PR [#91](https://github.com/salesforcecli/plugin-apex/pull/91))

## 7.196.6 (April 13, 2023)

* NEW: We continue to [improve the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands. A [few weeks ago](./README.md#71932-march-23-2023) we started updating the commands in [plugin-source](https://github.com/salesforcecli/plugin-sobject) to the new `sf` styles; this week we finish up.  

    The following existing commands have new names; both names work interchangeably. Some command flags also have new names, but just like the commands, both names work interchangeably. Note that the old names are deprecated, so we recommend you start using the new names as soon as you can. 
    
    |Existing Command Name|New Command Name|Flag Name Changes|
    |-----|------|---|
    |`force:mdapi:convert`|`project convert mdapi`|<ul> <li>`--metadatapath` ==> `--metadata-dir`</li> <li>`--outputdir` ==> `--output-dir`</li><li>`--rootdir` ==> `--root-dir`</li> <li>New flag: `--api-version`</li> <li>Deprecated flag: `--loglevel`</li></ul>|
    |`force:source:convert`|`project convert source`|<ul> <li>`--outputdir` ==> `--output-dir`</li> <li>`--packagename` ==> `--package-name`</li>  <li>`--rootdir` ==> `--root-dir`</li> <li>`--sourcepath` ==> `--source-dir`</li> <li>New flag: `--api-version`</li> <li>Deprecated flag: `--loglevel`</li><ul>|
    |`force:source:delete`|`project delete source`|<ul> <li>`--apiversion` ==> `--api-version`</li> <li>`--checkonly` ==> `--check-only`</li><li>`--forceoverwrite` ==> `--force-overwrite`</li><li>`--noprompt` ==> `--no-prompt`</li> <li>`--sourcepath` ==> `--source-dir`</li> <li>`--targetusername` ==> `--target-org` (new short name `-o`)</li>   <li>`--testlevel` ==> `--test-level`</li> <li>`--tracksource` ==> `--track-source`</li> <li>Deprecated flag: `--loglevel`</li><ul>|
    |`force:source:ignored:list`|`project list ignored`|<ul> <li>`--sourcepath` ==> `--source-dir`</li><li>Deprecated flag: `--loglevel`</li></ul>|
    |`force:source:manifest:create`|`project generate manifest`|<ul> <li>`--apiversion` ==> `--api-version`</li> <li>`--fromorg` ==> `--from-org`</li> <li>`--includepackages` ==> `--include-packages`</li> <li>`--manifestname` ==> `--manifest-name`</li> <li>`--manifesttype` ==> `--manifest-type`</li> <li>`--outputdir` ==> `--output-dir`</li> <li>`--sourcepath` ==> `--source-dir`</li> <li>Deprecated flag: `--loglevel`</li></ul>|
    |`force:source:tracking:clear`|`project delete tracking`|<ul> <li>`--apiversion` ==> `--api-version`</li><li>`--noprompt` ==> `--no-prompt`</li> <li>`--targetusername` ==> `--target-org` (new short name `-o`)</li> <li>Deprecated flag: `--loglevel`</li></ul>|
    |`force:source:tracking:reset`|`project reset tracking`|<ul> <li>`--apiversion` ==> `--api-version`</li><li>`--noprompt` ==> `--no-prompt`</li> <li>`--targetusername` ==> `--target-org` (new short name `-o`)</li> <li>Deprecated flag: `--loglevel`</li></ul>|

    We plan to deprecate the following existing commands in the future, although don't worry, they'll still be around for a while. Each existing command has an equivalent new command with almost the same functionality, except for what we note in the table.  We suggest you start using the new commands as soon as possible. As always, run the new commands with the `--help` flag to see details and examples and new flag names. 

    |Existing Command|New Equivalent Command|Functionality changes and additions|
    |---------------------------|----------------------|----|
    |`force:mdapi:deploy`|`project deploy start`|The `project deploy start` command works for _both_ source format and metadata format (mdapi) files. Use flags to specify the format you're deploying. For example, the `project deploy start` command deploys source formatted files by default, but you can use `--metadata-dir` to deploy metadata format files.|
    |`force:mdapi:deploy:cancel`|`project deploy cancel`|None.|
    |`force:mdapi:deploy:report`|`project deploy report\|resume`|The existing `force:mdapi:deploy:report` command does more than just report: it also resumes a deployment, which is confusing. We now provide two new commands for each task (`project deploy report` and `project deploy resume`) which is more intuitive. <br><br>The new commands don't support the `--wait -1` existing flag (which means "wait forever"). Instead, specify a very large number with the new commands. |
    |`force:mdapi:retrieve`|`project retrieve start`|The `project retrieve start` command works for _both_ source format and metadata format (mdapi) files. Use flags to specify the format you're retrieving. For example, the `project retrieve start` command retrieves source formatted files by default, but you can use `--target-metadata-dir` to retrieve metadata format files.|
    |`force:mdapi:retrieve:report`|No equivalent|We removed this command.|
    |`force:source:deploy`|`project deploy start`|The new command always keeps track of your source if the org is enabled for source-tracking.  If you don't want to use source tracking, create an org that doesn't have source tracking enabled.|
    |`force:source:deploy:cancel`|`project deploy cancel`|None.|
    |`force:source:deploy:report`|`project deploy report\|resume`|The `force:source:deploy:report` command does more than just report: it also resumes a deployment, which is confusing. We've now provide two new commands for each task (`project deploy report` and `project deploy resume`) which is more intuitive. |
    |`force:source:open`|`org open --source-file`|The `force:source:open` command is now the `--source-file` flag on the `org open` command. You can now also specify the browser.|
    |`force:source:pull`|`project retrieve start`|None.|
    |`force:source:push`|`project deploy start`|The new command doesn't support the `pushPackageDirectoriesSequentially` property of `sfdx-project.json`.  The `force:source:push` command uses this property to deploy packages sequentially. If you need to deploy packages sequentially and in a specific order, use separate `project deploy start` commands in the desired order. |
    |`force:source:retrieve`|`project retrieve start`|The new command keeps track of your source if the org is enabled for source-tracking.  If you don't want to use source tracking, create an org that doesn't have source tracking enabled.|
    |`force:source:status`|`project deploy\|retrieve preview`|We now provide two separate commands to preview what a deploy or a retrieve will do, which is more intuitive. These `preview` commands have the same flags as their non-preview commands, such as `project deploy start`. The `force:source:status` command shows both local and remote changes, which is confusing. |

    Finally, we removed these beta commands.

    |Removed Beta Command|Use This Command Instead| 
    |----|----|
    |`force:source:beta:tracking:reset`|`project reset tracking`|
    |`force:source:beta:tracking:clear`|`project delete tracking`|
    |`force:mdapi:beta:convert`|`project convert mdapi`|

    Let's look at some examples. This command:
    
    ```bash
    sfdx force:source:deploy --metadata "ApexClass,CustomObject" --testlevel RunSpecifiedTests --runtests MyTests --targetusername my-scratch
    ```
    
    Can be run this way:
    
    ```bash
    sf project deploy start --metadata ApexClass --metadata CustomObject --test-level RunSpecifiedTests --tests MyTests --target-org my-scratch
    ```
    This command:
    
    ```bash
    sfdx force:source:delete --sourcepath force-app/main/default/flows --targetusername my-scratch --forceoverwrite --noprompt
    ```
    
    Can be run this way:
    
    ```bash
    sf project delete source --source-dir force-app/main/default/flows --target-org my-scratch --force-overwrite --no-prompt
    ```
    Have fun with these new commands!

* FIX: Running the `force source convert` command on Windows on a directory with Digital Experiences in it no longer produces a `package.xml` file with invalid entries.  (GitHub issue [#2014](https://github.com/forcedotcom/cli/issues/2014), SDR PR [#911](https://github.com/forcedotcom/source-deploy-retrieve/pull/911))

## 7.194.1 (March 30, 2023)

* FIX: Executing the `apex get log` command with the `--log-id` flag now correctly fetches the log with the specified ID.  (GitHub issue [#2006](https://github.com/forcedotcom/cli/issues/2006), plugin-apex PR [#79](https://github.com/salesforcecli/plugin-apex/pull/79))

* FIX: The `--url-path-prefix` flag of the `community create` command is no longer required, which is the correct behavior. (GitHub issue [#2005](https://github.com/forcedotcom/cli/issues/2005), plugin-community PR [#303](https://github.com/salesforcecli/plugin-community/pull/303))

* FIX: Let's say you log into a Dev Hub org, and then log into a scratch org that's associated with it, but you created this scratch org from a different computer. Running `org list` on the first computer now correctly lists the scratch org and its expiration date in the appropriate section. (GitHub issue [#1941](https://github.com/forcedotcom/cli/issues/1941), sfdx-core PR [#775](https://github.com/forcedotcom/sfdx-core/pull/775))

* FIX: When you run `force:source:deploy --verbose` with the progress bar turned off (`SFDX_USE_PROGRESS_BAR=false`), we now display the deploy status with every poll. With this change, CI systems that have low output timeouts don't exit during long-running deploys in which the results aren't outputted for many minutes.  (GitHub issue [#1839](https://github.com/forcedotcom/cli/issues/1839), plugin-source PR [#757](https://github.com/salesforcecli/plugin-source/pull/757))

* FIX: The `force source` commands now support the ExtlClntAppGlobalOauthSettings metadata type.

## 7.193.2 (March 23, 2023)

* NEW: We continue to [improve the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands. We are slowly updating the commands in [plugin-source](https://github.com/salesforcecli/plugin-sobject) to the new `sf` styles; you'll see changes over the next few weeks. 

    These are the new command names this week. For each command, you can still use colons instead of spaces, such as `org:list:metadata`.

    |Existing Command Name|New Command Name|
    |------------|-------------|
    |`force:mdapi:listmetadata`|`org list metadata`|
    |`force:mdapi:describemetadata`|`org list metadata-types`|

    These are the new flag names for the new command names listed above. If an existing flag name isn't listed in the table, it has the same name in the new command name.

    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`. The `-a` short flag name  is deprecated.|`--api-version`|Both commands. |
    |`--metadatatype`|`--metadata-type`|`force:mdapi:listmetadata`|
    |`--resultfile`|`--output-file`|Both commands|
    |`--targetusername`|`--target-org`, with new short flag name `-o`.|Both commands|

    This flag is deprecated and has no effect.

    |Deprecated Flag|Affected Existing Command|
    |---|---|
    |`--loglevel`|Both commands|
    
    Let's look at an example, such as this command: 

    ```bash
    sfdx force:mdapi:listmetadata --metadatatype CustomObject --apiversion 57.0 --resultfile /path/to/outputfile.txt --targetusername my-org-alias
    ```

    You can now run it this way using the `sf` style:

    ```bash
    sfdx org list metadata --metadata-type CustomObject --api-version 57.0 --output-file /path/to/outputfile.txt --target-org my-org-alias
    ```

    The existing commands work exactly as before. But give this new stuff a try, we think you'll like it.

* NEW: Open a Lightning Page from your local project in Lightning App Builder with the new `--source-file` flag of the `org open` command. For example:

    ```bash
    sfdx org open --source-path force-app/main/default/flexipages/Hello.flexipage-meta.xml --target-org my-org-alias --browser firefox
    ```
    
    The new flag replaces the existing `force:source:open` command, which you can still use but you'll get those pesky deprecation warnings. The change is part of SCUIC ([Salesforce CLI Usability Improvement Campaign](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli)). Note that you now have more options; for example, you can open a page in Lightning App Builder and specify the browser, as shown in the previous example.  

* CHANGE: We changed the long name of the flag to specify a Dev Hub org from `--target-hub-org` to `--target-dev-hub` for these packaging commands:

    * `package:convert`
    * `package:create`
    * `package:delete`
    * `package:list`
    * `package:update`
    * `package:version:create`
    * `package:version:create:list`
    * `package:version:create:report`
    * `package:version:delete`
    * `package:version:displayancestry`
    * `package:version:list`
    * `package:version:promote`
    * `package:version:report`
    * `package:version:update
    
    We aliased the old long name to the new one, so nothing will break. But we highly recommend you update your scripts to use the new flag name. The short flag name (`-v`) didn't change. We made this change so the flag name matches the other `sfdx` commands. 

* FIX: We fixed the examples for the `sfdx apex run` command so they use the correct flag: `--file` instead of the incorrect `--apex-code-file`. (GitHub issue [#1999](https://github.com/forcedotcom/cli/issues/1999), plugin-apex PR [#71](https://github.com/salesforcecli/plugin-apex/pull/71)) 

## 7.192.2 (March 16, 2023)

* FIX: The `package version create` command now applies the `language` attribute from the scratch org definition file. (GitHub issue [#1921](https://github.com/forcedotcom/cli/issues/1921), packaging PR [#239](https://github.com/forcedotcom/packaging/pull/239))

## 7.191.1 (March 9, 2023)

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change. 

* NEW: We've made it easier for you to develop secure code by adding [Salesforce Code Analyzer](https://forcedotcom.github.io/sfdx-scanner/) as a "just-in-time" plugin. Simply type one of the commands, such as `sfdx scanner run`, and if the plugin isn't already installed, Salesforce CLI automatically installs the latest version. Then use the `sfdx scanner` commands to detect quality issues and security vulnerabilities in your code. As always, run a command with `--help` to see more information. And be sure to check the [prerequisites page](https://forcedotcom.github.io/sfdx-scanner/en/v3.x/getting-started/prerequisites/).  

* NEW: As part of [improving the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands so they work like the `sf` commands, we reconciled all `config` and `alias` commands in both executables into a single plugin: [plugin-settings](https://github.com/salesforcecli/plugin-settings). The commands work the same as before. Actually, some of the `config` commands work _better_ than before because you can now enter a slightly-misspelled configuration variable and the command prompts you with the correct name. Super handy if you forget the exact name of a config var. For example:

    ```bash
    $ sfdx config set version=57.0
      ? Did you mean org-api-version? Yes
      Set Config
      ===============================
      | Name            Value Success 
      | ─────────────── ───── ─────── 
      | org-api-version 57.0  true
    ```
    
    We also deprecated the old names of the configuration variables in favor of the new `sf` ones. You can still set the old names, but we display a deprecation warning to nudge you towards the new names. We recommend that you start using the new names as soon as possible.  Here's a summary:
    
    |Old Name|New Name|
    |---|---|
    |`apiVersion`|`org-api-version`|
    |`customOrgMetadataTemplates`|`org-custom-metadata-templates`|
    |`defaultdevhubusername`|`target-dev-hub`|
    |`defaultusername`|`target-org`|
    |`disableTelemetry`|`disable-telemetry`|
    |`instanceUrl`|`org-instance-url`|
    |`maxQueryLimit`|`org-max-query-limit`|
    |`restDeploy`|`org-metadata-rest-deploy`|

## 7.190.0 (Mar 2, 2023)

**NOTE**: Due to various issues with the `7.189.x` releases candidates, and some `7.190` changes that snuck in early, we didn't promote any of them to `stable` or `latest` last week. 

* NEW: We now install some plugins just when you need them, rather than include them automatically in a Salesforce CLI release. Let's use this week's new [plugin-sobject](https://github.com/salesforcecli/plugin-sobject) as an example. The plugin isn't included in `sfdx` by default, although `sfdx` _knows_ about it. When you run one of the plugin's commands for the first time, such as `sfdx schema generate sobject`, Salesforce CLI installs the latest released version of the plugin and then runs the command. The installation happens automatically, although we display a little message so you know what's going on. From then on, run any of the commands contained in the plugin as usual. And when you next run `sfdx update`, if the just-in-time plugin has released a new version, then it's also updated. Just a little just-in-time magic!    

* NEW: We continue to [improve the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands. This week's release includes updated [plugin-auth](https://github.com/salesforcecli/plugin-auth). The existing `sfdx` commands and their flags still work the same as before. 

    These are the new command names. For each command, you can still use colons instead of spaces, such as `org:login:web`.

    |Existing Command Name|New Command Name|
    |------------|-------------|
    |`auth:web:login`|`org login web`|
    |`auth:jwt:grant`|`org login jwt`|
    |`auth:logout`|`org logout`|
    |`auth:list`|`org list auth`|
    |`auth:accesstoken:store`|`org login access-token`|
    |`auth:device:login`|`org login device`|
    |`auth:sfdxurl:store`|`org login sfdx-url`|

    These are the new flag names for the new command names listed above. If an existing flag name isn't listed in the table, it has the same name in the new command name.

    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--jwtkeyfile`|`--jwt-key-file`|`auth:jwt:grant`|
    |`--clientid`|`--client-id`|`auth:jwt:grant`, `auth:web:login`, `auth:device:login`|
    |`--setdefaultdevhubusername`|`--set-default-dev-hub`|All commands except `auth:logout`|
    |`--setalias`|`--alias`|`auth:jwt:grant`, `auth:web:login`, `auth:accesstoken:store`, `auth:device:login`, `auth:sfdxurl:store`|
    |`--username`|Same, but new short flag name is `-o`|`auth:jwt:grant`|
    |`--instanceurl`|`--instance-url`|`auth:jwt:grant`, `auth:web:login`, `auth:accesstoken:store`, `auth:device:login`|
    |`--setdefaultusername`|`--set-default`|`auth:jwt:grant`, `auth:web:login`, `auth:accesstoken:store`, `auth:device:login`, `auth:sfdxurl:store`|
    |`--targetusername`|`--target-org`, with new short flag name `-o`|`auth:logout`|
    |`--noprompt`|`--no-prompt`|`auth:logout`, `auth:accesstoken:store`|
    |`--sfdxurlfile`|`--sfdx-url-file`|`auth:sfdxurl:store`|
    |`--apiversion`|Removed|`auth:logout`|

    This flag is deprecated and has no effect.

    |Deprecated Flag|Affected Existing Command|
    |---|---|
    |`--loglevel`|All commands|

    We also updated the `--help` for each command to use the new command and flag names, to gently encourage you to start switching over to the new style. Use the `-h` flag to get a condensed view of the help, for when you don't need long descriptions and examples. 

    Let's look at an example, such as this command: 

    ```bash
    sfdx auth:jwt:grant --username jdoe@example.org --jwtkeyfile /Users/jdoe/JWT/server.key --clientid 123456 --setdefaultdevhubusername
    ```

    You can now run it this way using the `sf` style:

    ```bash
    sfdx org login jwt --username jdoe@example.org --jwt-key-file /Users/jdoe/JWT/server.key --client-id 123456 --set-default-dev-hub
    ```

    Finally, just in case we weren't clear, the existing commands work exactly as before! But give this new stuff a try, we think you'll like it.

* NEW: Interactively create local Salesforce metadata, such as custom objects and platform events, with these new beta commands in the just-in-time [plugin-sobject](https://github.com/salesforcecli/plugin-sobject) plugin:

    ```bash
    sfdx schema generate sobject
    sfdx schema generate platformevent
    sfdx schema generate field
    ```
    The plugin isn't automatically included in Salesforce CLI; instead, it's automatically installed the first time you run one of its commands.

    Each command requires the `--label` flag, and then uses the value to provide intelligent suggestions for its prompts, such as its API name. You must run these commands in a Salesforce DX project directory. This example shows how to interactively create a custom object:

    ```bash
    sfdx schema generate sobject --label "My Fab Object"
    ```

    Want to automatically enable optional features on the new custom object rather than answer all the prompts? Try this:

    ```bash
    sfdx schema generate sobject --label "My Fab Object" --use-default-features
    ```

    Now create a custom field on your shiny new object; the command prompts you for the object:

    ```bash
    sfdx schema generate  field --label "My Field"
    ```

    Also, while not an interactive commands, you can also create a custom tab for a custom object with the new `sfdx schema generate tab` beta command. You must provide the object's API name, [icon number](https://www.lightningdesignsystem.com/icons/#custom), and local directory to store the files. For example:

    ```bash
    sfdx schema generate tab --object MyFabObject__c --icon 54 --directory force-app/main/default/tabs
    ```

    Remember to run `sfdx force:source:deploy` to deploy the new local source files to your org. Then you can further customize the new components using Setup UI, then `sfdx force:source:retrieve` the changes back to your local project. 

* NEW: Use Bulk API 2.0 to upsert and delete data to and from your org with these new commands:

    * `sfdx data delete bulk` : Bulk delete records from an org using a CSV file. Uses Bulk API 2.0.
    * `sfdx data delete resume` : Resume a bulk delete job that you previously started. Uses Bulk API 2.0.
    * `sfdx data upsert bulk` : Bulk upsert records to an org from a CSV file. Uses Bulk API 2.0.
    * `sfdx data upsert resume` : Resume a bulk upsert job that you previously started. Uses Bulk API 2.0.

    For example, bulk upsert records from a CSV file to the Contact object in your default org with this command:

    ```bash
    sfdx data upsert bulk --sobject Contact --file files/contacts.csv --external-id Id 
    ```

    The preceding command returns control to you immediately and runs the bulk upsert asynchronously. Resume the job to see the results with this command:

    ```bash
    $ sfdx data upsert resume --use-most-recent
    ```

    We recommend that you start using these new Bulk API 2.0 commands rather than the existing `sf force data bulk` commands, which are based on Bulk API 1.0. However, one reason to keep using the existing `sf force data bulk upsert` command is if you want to run the upsert serially with the `--serial` flag. The new Bulk API 2.0 commands don't support serial execution. In this case, or if you simply want to continue using Bulk API 1.0, use these commands:

    * `sfdx force data bulk delete` 
    * `sfdx force data bulk upsert` 
    * `sfdx force data bulk status` 

    Run the commands with `--help` to see examples.  

    Finally, the `sfdx data resume` command is deprecated.  Use `sfdx data delete resume` or `sfdx data upsert resume` instead. 

* NEW: Generate your own custom `sf`-style plugins, commands, flags, and more with the commands in the just-in-time [plugin-dev](https://github.com/salesforcecli/plugin-dev). If you haven't already installed this plugin, simply type one of its commands and Salesforce CLI automatically installs it for you. For example, run this command to interactively generate the initial files and directory hierarchy for a new custom plugin; the command prompts you for the required information:

    ```bash
    sfdx dev generate plugin
    ```

    **Important**: The new interactive `sfdx dev generate plugin` command _replaces_ the existing `sfdx plugins generate` command. The existing command generates `sfdx`-style plugins that are based on deprecated code, which we don't want you to use anymore. 

    See [Get Started and Create Your Own Plugin](https://github.com/salesforcecli/cli/wiki/Get-Started-And-Create-Your-First-Plug-In) for simple examples of using the new commands.  See [Generate Stuff](https://github.com/salesforcecli/cli/wiki/Code-Your-Plugin#generate-stu) for the full list. 

* NEW: When you type a command fragment and `sfdx` displays a list of possible commands for you to choose from, we now also display the command summary. The summaries make it easier for you to pick the command you want.

* NEW: We continue to [improve the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands. This week's release includes updated [plugin-apex](https://github.com/salesforcecli/plugin-apex). The `sfdx` commands and their flags still work the same as before. 

    These are the new command names. For each command, you can still use colons instead of spaces, such as `apex:run`. 
    
    |Existing Command Name|New Command Name|
    |------------|-------------|
    |`force:apex:execute`|`apex run`|
    |`force:apex:log:get`|`apex get log`|
    |`force:apex:log:list`|`apex list log`|
    |`force:apex:log:tail`|`apex tail log`|
    |`force:apex:test:report`|`apex get test`|
    |`force:apex:test:run`|`apex run test`|
    
    These are the new flag names for the new command names listed above. If an existing flag name isn't listed in the table, it has the same name in the new command name.
    
    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`|`--api-version`|All commands|
    |`--targetusername`|`--target-org`, with new short name `-o`|All commands|
    |`--outputdir`|`--output-dir`|`force:apex:log:get`, `force:apex:test:report`, `force:apex:test:run`|
    |`--logid`|`--log-id`|`force:apex:log:get`|
    |`--codecoverage`|`--code-coverage`|`force:apex:test:run`, `force:apex:test:report`|
    |`--testrunid`|`--test-run-id`|`force:apex:test:report`|
    |`--resultformat`|`--result-format`|`force:apex:test:report`, `force:apex:test:run`|
    |`--apexcodefile`|`--file`|`force:apex:execute`|
    |`--testlevel`|`--test-level`|`force:apex:execute`|
    |`--classnames`|`--class-names`|`force:apex:execute`|
    |`--suitenames`|`--suite-names`|`force:apex:execute`|
    |`--detailedcoverage`|`--detailed-coverage`|`force:apex:execute`|
    |`--debuglevel`|`--debug-level`|`force:apex:log:tail`|
    |`--skiptraceflag`|`--skip-trace-flag`|`force:apex:log:tail`|
    
    This flag is deprecated and has no effect.

    |Deprecated Flag|Affected Existing Command|
    |---|---|
    |`--loglevel`|All commands|
    
    We also updated the `--help` for each command to use the new command and flag names, to gently encourage you to start switching over to the new style. Use the `-h` flag to get a condensed view of the help, for when you don't need long descriptions and examples. 
    
    Let's look at an example, such as this command: 
    
    ```bash
    sfdx force:apex:test:run --suitenames "MySuite,MyOtherSuite" --codecoverage --detailedcoverage --targetusename my-scratch --outputdir tests/output"
    ```
    
    You can now run it this way using the `sf` style:
    
    ```bash
    sfdx apex run test --suite-names "MySuite,MyOtherSuite" --code-coverage --detailed-coverage --target-org my-scratch --output-dir tests/output"
    ```

* NEW: Configure autocomplete on Zsh for commands that use spaces as separators by running this command:

    ```bash
    sfdx autocomplete
    ```
    Follow the displayed instructions to set up autocomplete in your environment. Then use the tab key to autocomplete commands. For example, if you type `sf data ` then press TAB, you'll get a list of data commands to chose from. You can also autocomplete flags: 
    
    * Type `-` to see suggestions that show both the long and short flag names. For example, if you type `sf data query -` then press TAB, zsh displays all the flags for this command, including both short and long names. If you type `sf data query --`, then only the long names are shown. 
    * For flags that define a set of valid values, type `--<flagname>` to see the list. For example, if you type `sf data query --result-format` then press TAB, zsh suggests the valid options for this flag, which are `human`, `json`, or `csv`. 
    * Flags that can be specified multiple times are still suggested, even if you've already used it. 
    
    If you currently use autocomplete for colon-separated commands, you must regenerate the autocomplete cache to get this new behavior; nothing in your environment changes otherwise:
    
    ```bash
    sfdx autocomplete --refresh-cache
    ``` 
    
    If you regenerate the cache, but then want to go back to autocompleting commands that use `:` as a separator, first set this environment variable:
    
    ```bash
    OCLIF_AUTOCOMPLETE_TOPIC_SEPARATOR=colon
    ```

     Then regenerate the autocomplete cache again (`sfdx autocomplete --refresh-cache`).
    
* NEW: The `sfdx org display` (`force:org:display`) output now includes the API version of the org at the time you authorized it with the `sfdx auth:*` commands. We cache the value locally, so if Salesforce updates your org to a new release, the API version will be incorrect. Re-login to your org to refresh the API version information in the `sfdx org display` output. (GitHub issue [#314](https://github.com/forcedotcom/cli/issues/314), plugin-org PR [#580](https://github.com/salesforcecli/plugin-org/pull/580))

* CHANGE: Michelangelo created David, NASA put an astronaut on the moon, and Beyoncé just won her 32nd GRAMMY. Not to be outdone, the Salesforce CLI team delivered an equally impressive accomplishment this week: a 100% [open-source CLI](https://developer.salesforce.com/blogs/2023/02/achieving-an-open-source-salesforce-cli). After methodically breaking up the original `salesforce-alm` plugin into smaller open-source plugins, we finally removed it completely from Salesforce CLI this week. It was the last remaining private plugin. The only noticeable change is that commands with `legacy` in their name are no longer available. But don't worry, if you want them back, you can always reinstall the plugin like this:

    ```bash
    sfdx plugins install salesforce-alm
    ```
    
   Alternatively, install a version of Salesforce CLI that still contains the `salesforce-alm` plugin, such as `7.188.1`:
   
   ```bash
   sfdx update --version 7.188.1
   ```
  Congratulations, team, on achieving a significant goal that's been a long-time coming!
  
* CHANGE: If you run `force:apex:execute` and the compilation or execution of the anonymous Apex code fails, you now get a non-zero exit code, which is more intuitive. Previously the command execution was still considered a success (zero exit code). NOTE that this is a breaking change. After we [announced it](https://github.com/forcedotcom/cli/issues/1889), we got lots of positive feedback, so we made the change. Thanks for your input. 

    Thank you, [Matthias Rolke](https://github.com/amtrack), for contributing the fix. We love it. Keep 'em coming!
    
* FIX: You can now specify `packageAliases` that contain spaces in the `sfdx-project.json` file and execute `package` commands that use the alias without getting an error.  (GitHub issue [#1936](https://github.com/forcedotcom/cli/issues/1936), oclif PR [#614](https://github.com/oclif/core/pull/614))

* FIX: For backwards compatibility, we added the `-v|--targetdevhubusername` flag back to the `force org delete` and `org delete scratch` commands, even though the flag doesn't do anything and is deprecated. (GitHub issue [#1925](https://github.com/forcedotcom/cli/issues/1925), plugin-org PR [#581](https://github.com/salesforcecli/plugin-org/pull/581))

* FIX:  When the `sfdx org create scratch` command deploys the org settings, it waits for the amount of time left from the specified `--wait` value.  Previously it waited for a maximum of 10 minutes for this step, regardless of the value of `--wait`. (GitHub issue [#1817](https://github.com/forcedotcom/cli/issues/1817), sfdx-core PR [#771](https://github.com/forcedotcom/sfdx-core/pull/771))

* FIX: If you run into authentication errors when running `sfdx org list shape` (`force:org:shape:list`), such as an expired refresh token, the displayed table now shows information for orgs the command can connect to, and an appropriate warning for orgs it can't connect to.  (GitHub issue [#1882](https://github.com/forcedotcom/cli/issues/1882), plugin-signups PR [#216](https://github.com/salesforcecli/plugin-signups/pull/216))

* FIX: The `--publishwait` flag of `force:package:install` correctly waits for the specified amount of time for the subscriber package version ID to become available in the target org. And this time we mean it! (GitHub issue [#1895](https://github.com/forcedotcom/cli/issues/1895), plugin-packaging PR [#235](https://github.com/salesforcecli/plugin-packaging/pull/235))
    
* FIX: Commands are no longer duplicated in the output of `sfdx commands --json`. (GitHub issue [#1777](https://github.com/forcedotcom/cli/issues/1777), plugin-commands PR [#382](https://github.com/oclif/plugin-commands/pull/382))

* FIX: Packaging commands support aliases with spaces in them. (GitHub issue [#1936](https://github.com/forcedotcom/cli/issues/1936), oclif-core PR [#614](https://github.com/oclif/core/pull/614))  
    
## 7.188.1 (Feb 16, 2023)

* NEW: We continue to [improve the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands. This week's release includes updated [plugin-templates](https://github.com/salesforcecli/plugin-templates). The `sfdx` commands and their flags still work the same as before. 

    These are the new command names. For each command, you can still use colons instead of spaces, such as `analytics:generate:template`. 
    
    |Existing Command Name|New Command Name|
    |------------|-------------|
    |`force:analytics:template:create`|`analytics generate template`|
    |`force:apex:class:create`|`apex generate class`|
    |`force:apex:trigger:create`|`apex generate trigger`|
    |`force:lightning:app:create`|`lightning generate app`|
    |`force:lightning:component:create`|`lightning generate component`|
    |`force:lightning:event:create`|`lightning generate event`|
    |`force:lightning:interface:create`|`lightning generate interface`|
    |`force:lightning:test:create`|`lightning generate test`|
    |`force:project:create`|`project generate`|
    |`force:staticresource:create`|`static-resource generate`|
    |`force:visualforce:component:create`|`visualforce generate component`|
    |`force:visualforce:page:create`|`visualforce generate page`|
    
    These are the new flag names for the new command names listed above. If an existing flag name isn't listed in the table, it has the same name in the new command name.

    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`|`--api-version`|All commands|
    |`--outputdir`|`--output-dir`|All commands|
    |`--XXname`, such as `--classname` of `force:apex:class:create` or `--appname` of `force:lightning:app:create`|`--name`|All commands.|
    |`--triggerevents`|`--event`|`force:apex:trigger:create`|
    |`--defaultpackagedir`|`--default-package-dir`|`force:project:create`|
    
   This flag is deprecated and has no effect.

    |Deprecated Flag|Affected Existing Command|
    |---|---|
    |`--loglevel`|All commands|
    
    We also updated the `--help` for each command to use the new command and flag names, to gently encourage you to start switching over to the new style. Use the `-h` flag to get a condensed view of the help, for when you don't need long descriptions and examples. 
    
    Let's look at an example, such as this command: 
    
    ```bash
    sfdx force:apex:trigger:create --triggername MyTrigger --sobject Account --triggerevents "before insert,after insert"
    ```
    
    You can now run it this way using the `sf` style:
    
    ```bash
    sfdx apex generate trigger --name MyTrigger --sobject Account --event "before insert" --event "after insert"
    ```
    
    Note that we split up the values to `--event`, which is the `sf` way of passing multiple values to a flag.  You could also do it this way: 
    
    ```bash
    sfdx apex generate trigger --name MyTrigger --sobject Account --event "before insert" "after insert"
    ```

    Finally, just in case we weren't clear, the existing commands work exactly as before! But give this new stuff a try, it's pretty cool.
    
* NEW: We now provide the `arm64` flavor of the `.pkg` and TAR files for installing Salesforce CLI on macOS. The new files include a version of Node.js that's built for Apple Silicon CPUs. If your computer uses an Apple Silicon CPU, you'll likely get a small performance boost if you [uninstall your current version of Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_uninstall.htm) and then [reinstall](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli_macos) using the [.pkg installer](https://developer.salesforce.com/tools/sfdxcli#) or [TAR file](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli_linux) labeled "Apple Silicon" (GitHub issue [#1045](https://github.com/forcedotcom/cli/issues/1045) and [#768](https://github.com/forcedotcom/cli/issues/768)).

* CHANGE: We upgraded the version of Node.js contained in the [Salesforce CLI installers, TAR files, and Docker images](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm) to [v18.14.0](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V18.md#2023-02-02-version-18140-hydrogen-lts-bethgriggs-prepared-by-juanarbol). 

* CHANGE: Do you develop custom Salesforce CLI plugins?  If so, this note is for you. We marked `SfdxCommand` (the base class for `sfdx` plugins) and other code in [this repo](https://github.com/salesforcecli/command) as deprecated. We plan to continue updating dependencies in the repo for a while longer, but we recommend you start looking at [this repo](https://github.com/salesforcecli/sf-plugins-core) for all your plugin command needs, such as `SfCommand`. Check out [Migrate Plugins Build for sfdx](https://github.com/salesforcecli/cli/wiki/Migrate-Plugins-Built-For-Sfdx) for details. 

* FIX: The `data query` command no longer suppresess or nullifies the value of `0` (in human-readable output) when it's returned by a SOQL query. (GitHub issue [#1892](https://github.com/forcedotcom/cli/issues/1892), plugin-data PR [#470](https://github.com/salesforcecli/plugin-data/pull/470))

   Many thanks to [Leo Stewart](https://github.com/leostewart) for reporting the issue, and then providing the fix. We're stoked with your contribution, and we look forward to more from you and community!

* FIX: The `package version list` command now supports multiple packages specified as comma-delimited entries. (GitHub issue [#1912](https://github.com/forcedotcom/cli/issues/1912), plugin-packaging PR [#249](https://github.com/salesforcecli/plugin-packaging/pull/249))

* FIX: The `package version create` command runs successfully even if your `sfdx-project.json` file doesn't contain a `versionName` option for defining the package. (GitHub issue [#1907](https://github.com/forcedotcom/cli/issues/1907), packaging PR [#219](https://github.com/forcedotcom/packaging/pull/219))

* FIX: When using `force source retrieve` to retrieve bundle metadata types, such as LightningComponentBundle, the files and directories listed in the `.forceignore` file are correctly ignored.  (GitHub issue [#1904](https://github.com/forcedotcom/cli/issues/1904), SDR PR [#847](https://github.com/forcedotcom/source-deploy-retrieve/pull/847))

* FIX: The `force source` commands now support the ExperiencePropertyTypeBundle metadata type.

* FIX: Commands that have transitioned to the new `sf` style now emit their warnings to stderr instead of stdout.  (GitHub issue [#1926](https://github.com/forcedotcom/cli/issues/1926), sf-plugins-core PR [#216](https://github.com/salesforcecli/sf-plugins-core/pull/216)).

## 7.187.1 (Feb 9, 2023)

* NEW: We continue to [improve the usability](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) of existing `sfdx` commands. This week's release includes updated [plugin-org](https://github.com/salesforcecli/plugin-org). The existing `sfdx` commands and their flags still work the same as before, although we've deprecated some commands and flags and added new ones. Here's a summary.

    These are the new command names. For each command, you can still use colons instead of spaces, such as `org:open`. 
    
    |Existing Command Name|New Command Name|
    |-----------------------|---------|
    |`force:org:open`|`org open`|
    |`force:org:list`|`org list`|
    |`force:org:display`|`org display`|
    
    These are the deprecated commands, along with the new commands you should use instead. For each command, you can still use colons instead of spaces, such as `org:create:sandbox`.
    
    |Deprecated command|Use this command instead|
    |-----------------------|---------|
    |`force:org:create`|`org create sandbox` or `org create scratch`|
    |`force:org:delete`|`org delete sandbox` or `org delete scratch`|
    |`force:org:status`|`org resume sandbox`|
    |`force:org:clone`|`org create sandbox`|

    These are the new flag names for the `force:org:*` commands. If an existing flag name isn't listed in the table, it has the same name in the new command.

    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`|`--api-version`|All commands|
    |`--clientid`|`--client-id`|`force:org:create`|
    |`--definitionfile`|`--definition-file`|`force:org:create`, `force:org:clone`|
    |`--durationdays`|`--duration-days`, with new short name `-y`|`force:org:create`|
    |`--noancestors`|`--no-ancestors`|`force:org:create`|
    |`--nonamespace`|`--no-namespace`, with new short name `-m`|`force:org:create`|
    |`--noprompt`|`--no-prompt`|All commands|
    |`--setalias`|`--alias`|`force:org:create`, `force:org:clone`|
    |`--setdefaultusername`|`--set-default`, with new short name `-d`|`force:org:clone`, `force:org:create`, `force:org:status`|
    |`--skipconnectionstatus`|`--skip-connection-status`|`force:org:list`|
    |`--targetdevhubusername`|`--target-dev-hub`|All commands|
    |`--targetusername`|`--target-org`, with new short name `-o`|All commands|
    |`--urlonly`|`--url-only`|`force:org:open`|

    These flags are deprecated and have no effect.

    |Deprecated Flag|Affected Existing Command|
    |---|---|
    |`--loglevel`|All commands|
    
    We also updated the `--help` for each command to use the new command and flag names, to gently encourage you to start switching over to the new style. Fun tip: use the `-h` flag to get a condensed view of the help, for when you don't need long descriptions and examples. 
    
    The new commands to manage sandboxes and scratch orgs work a bit differently from the `force:org:*` commands. For example, we split `force:org:create` into two commands, one each for scratch orgs and sandboxes, which is more intuitive. We also introduced commands to resume org creation, which is particularly useful when a scratch org creation times out. Previously you could no longer connect to it and you had to manually delete it from your Dev Hub. Now you can easily resume where it left off using a job ID. When the creation finishes, the command automatically authenticates to the org, saves the org info locally, and deploys any configured settings. Let's look at a few examples to get you started with these new commands.  
    
    This existing way to create a scratch org:
    
    ```bash
    sfdx force:org:create --definitionfile config/enterprise-scratch-def.json --setalias MyScratchOrg --targetdevhubusername MyDevHub --nonamespace --setdefaultusername
    ```
   Looks like this in the `sf` style:
    
    ```bash
    sfdx org create scratch --definition-file config/enterprise-scratch-def.json --alias MyScratchOrg --target-dev-hub MyDevHub --no-namespace --set-default
    ```
    
    This command to create a sandbox:
    
    ```bash
    sfdx force:org:create --type sandbox --definitionfile config/dev-sandbox-def.json --setalias MyDevSandbox --targetusername ProdOrg
    ```
    
   Now looks like this in the `sf` style:
    
    ```bash
    sfdx org create sandbox --definition-file config/dev-sandbox-def.json --alias MyDevSandbox --target-org ProdOrg
    ```
    
   This command to delete a scratch org:
    
    ```bash
    sfdx force:org:delete --targetusername MyDevSandbox --noprompt
    ```
   Looks like this in the `sf` style:
    
    ```bash
    sfdx org delete sandbox --target-org MyDevSandbox --no-prompt
    ```
   Here's an example of resuming a timed-out scratch org creation. Let's say you run this command:
   
    ```bash
    sfdx org create scratch --definition-file config/enterprise-scratch-def.json --wait 3 --alias MyScratchOrg --target-dev-hub MyDevHub 
    ```
   If the scratch org creation doesn't complete in 3 minutes, Salesforce CLI returns control of the terminal to you and displays a job ID.  Pass the ID to the `sfdx org resume scratch` command to resume the job:
   
   ```bash
   sfdx org resume scratch --job-id 2SR3u0000008fBDGAY
   ```
   Alternatively, use the handy `--use-most-recent` flag to, yep, resume the most recent scratch org create job:
   
   ```bash
   sfdx org resume scratch --use-most-recent
   ```
   Cool beans, no?  Enjoy!
    
* NEW: Use the new `--verbose` flag of `force:package:version:create` to display a new line of status and timeout data for each poll request. By default, the command displays a spinner with a message that updates on every poll request. This new flag is useful in CI systems to prevent timeouts that can occur during long periods of no output from commands. (GitHub issue [#1894](https://github.com/forcedotcom/cli/issues/1894), plugin-packaging PR [#236](https://github.com/salesforcecli/plugin-packaging/pull/236))

* FIX: The `force:source:retrieve` command, run with either the `--metadata` or `--sourcepath` flag, correctly ignores the `_tests_` directory if it's listed in the `.forceignore` file. (GitHub issue [#1904](https://github.com/forcedotcom/cli/issues/1904))

* FIX: The `--publishwait` flag of `force:package:install` correctly waits for the specified amount of time for the subscriber package version ID to become available in the target org. (GitHub issue [#1895](https://github.com/forcedotcom/cli/issues/1895), plugin-packaging PR [#235](https://github.com/salesforcecli/plugin-packaging/pull/235))

* FIX: The `force:source:*` commands now support these metadata types:

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

## 7.186.2 (Feb 2, 2023)

* NEW: We continue to improve the usability of existing `sfdx` commands, such as more intuitive flag names and using spaces as separators, similar to how `sf` works. See [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) for details. We're doing this work plugin by plugin. This week's release includes updated [plugin-packaging](https://github.com/salesforcecli/plugin-packaging) and [plugin-user](https://github.com/salesforcecli/plugin-user). Don't worry, the `sfdx` commands and their flags still work the same as before! But give the new style a try -- we think you'll like it.

    These are the new command names. For each command, you can still use colons instead of spaces, such as `org:create:user`. 
    
    |Existing Command Name|New Command Name|
    |-----------------------|---------|
    |`force:user:create`|`org create user`|
    |`force:user:display`|`org display user`|
    |`force:user:list`|`org list users`|
    |`force:user:password:generate`|`org generate password`|
    |`force:user:permset:assign`|`org assign permset`|
    |`force:user:permsetlicense:assign`|`org assign permsetlicense`|
    |`force:package1:version:create`|`package1 version create`|
    |`force:package1:version:create:get`|`package1 version create get`|
    |`force:package1:version:display`|`package1 version display`|
    |`force:package1:version:list`|`package1 version list`|
    |`force:package:create`|`package create`|
    |`force:package:delete`|`package delete`|
    |`force:package:install`|`package install`|
    |`force:package:install:report`|`package install report`|
    |`force:package:installed:list`|`package installed list`|
    |`force:package:list`|`package list`|
    |`force:package:uninstall`|`package uninstall`|
    |`force:package:uninstall:report`|`package uninstall report`|
    |`force:package:update`|`package update`|
    |`force:package:version:create`|`package version create`|
    |`force:package:version:create:list`|`package version create list`|
    |`force:package:version:create:report`|`package version create report`|
    |`force:package:version:delete`|`package version delete`|
    |`force:package:version:displayancestry`|`package version displayancestry`|
    |`force:package:version:list`|`package version list`|
    |`force:package:version:promote`|`package version promote`|
    |`force:package:version:report`|`package version report`|
    |`force:package:version:update`|`package version update`|

    These are the new flag names for the `force:package1:*` commands. If an existing flag name isn't listed in the table, it has the same name in the new command name.

    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`|`--api-version`|All `force:package1:*` commands|
    |`--installationkey`|`--installation-key` | `force:package1:version:create`|
    |`--managedrelease`|`--managed-release` | `force:package1:version:create`|
    |`--packageid`|`--package-id` | `force:package1:version:create`, `force:package1:version:list`|
    |`--packageversionid`|`--package-version-id` | `force:package1:version:display`|
    |`--postinstallurl`|`--post-install-url` | `force:package1:version:create`|
    |`--releasenotesurl`|`--release-notes-url` | `force:package1:version:create`|
    |`--requestid`|`--request-id` | `force:package1:version:create:get`|
    |`--targetusername`|`--target-org`, with new short name `-o` | `force:package1:version:create`, `force:package1:create:get`, `force:package1:display`, `force:package1:list`|

    These are the new flag names for the `force:package:*` commands. If an existing flag name isn't listed in the table, it has the same name in the new command name.

    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apexcompile`|`--apex-compile`|`force:package:install`|
    |`--codecoverage`|`--code-coverage`|`force:package:version:create`|
    |`--createdlastdays`|`--created-last-days`|`force:package:version:create:list`, `force:package:version:list`|
    |`--definitionfile`|`--definition-file`|`force:package:version:create`|
    |`--dotcode`|`--dot-code`|`force:package:version:displayancestry`|
    |`--errornotificationusername`|`--error-notification-username`|`force:package:create`, `force:package:update`|
    |`--installationkey`|`--installation-key`|`force:package:install`, `force:package:version:create`, `force:package:version:update`|
    |`--installationkeybypass`|`--installation-key-bypass`|`force:package:version:create`|
    |`--modifiedlastdays`|`--modified-last-days`|`force:package:version:list`|
    |`--nonamespace`|`--no-namespace`|`force:package:create`|
    |`--noprompt`|`--no-prompt`|`force:package:delete`, `force:package:install`, `force:package:version:delete`, `force:package:version:promote`|
    |`--orderby`|`--order-by`|`force:package:version:list`|
    |`--orgdependent`|`--org-dependent`|`force:package:create`|
    |`--packagecreaterequestid`|`--package-create-request-id`|`force:package:version:create:report`|
    |`--packagetype`|`--package-type`|`force:package:create`|
    |`--postinstallscript`|`--post-install-script`|`force:package:version:create`|
    |`--postinstallurl`|`--post-install-url`|`force:package:version:create`|
    |`--publishwait`|`--publish-wait`|`force:package:install`|
    |`--releasenotesurl`|`--releasenotes-url`|`force:package:version:create`|
    |`--requestid`|`--request-id`|`force:package:install:report`, `force:package:uninstall:report`|
    |`--securitytype`|`--security-type`|`force:package:install`|
    |`--skipancestorcheck`|`--skip-ancestor-check`|`force:package:version:create`|
    |`--skipvalidation`|`--skip-validation`|`force:package:version:create`|
    |`--targetdevhubusername`|`--target-hub-org`|`force:package:create`, `force:package:delete`, `force:package:list`, `force:package:update`, `force:package:version:create`, `force:package:version:create:list`, `force:package:version:create:report`, `force:package:version:delete`, `force:package:version:displayancestry`, `force:package:version:list`, `force:package:version:promote`, `force:package:version:report`, `force:package:version:update`|
    |`--targetusername`|`--target-org`, with new short name `-o` | `force:package:install`, `force:package:install:report`, `force:package:installed:list`, `force:package:uninstall`, `force:package:uninstall:report`|
    |`--uninstallscript`|`--uninstall-script`|`force:package:version:create`|
    |`--upgradetype`|`--upgrade-type`|`force:package:install`|
    |`--versiondescription`|`--version-description`|`force:package:version:create`, `force:package:version:update`|
    |`--versionname`|`--version-name`|`force:package:version:create`, `force:package:version:update`|
    |`--versionnumber`|`--version-number`|`force:package:version:create`|

    These are the new flag names for the `force:user:*` commands. If an existing flag name isn't listed in the table, it has the same name in the new command name.
    
    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`|`--api-version`|All `force:user:*` commands|
    |`--targetusername`|`--target-org`, with new short name `-o` | `force:user:permset:generate`, `force:user:permsetlicense:generate`, `force:user:create`, `force:user:display`, `force:user:password:generate`, `force:user:list`|
    |`--onbehalfof`|`--on-behalf-of` , with new short name `-b`| `force:user:permset:generate`, `force:user:permsetlicense:generate`, `force:user:password:generate`|
    |`--permsetname`|`--name` | `force:user:permset:generate`|
    |`--setalias`|`--set-alias` | `force:user:create`|
    |`--definitionfile`|`--definition-file` | `force:user:create`|
    |`--setuniqueusername`|`--set-unique-username` | `force:user:create`|
    
    These flags are deprecated and have no effect.

    |Existing Command|Deprecated Flags|
    |---|---|
    |All commands|`--loglevel`|
    |All `force:user:*` commands| `--targetdevhubusername`|

    We also updated the `--help` for each command to use the new command and flag names, to gently encourage you to start switching over to the new style. Fun tip: use the `-h` flag to get a condensed view of the help, for when you don't need long descriptions and examples. 
    
    Let's look at an example, such as this command (IDs truncated for security):
    
    ```bash
    sfdx force:package:version:create --package "Your Package Alias" --installationkey password123 --skipvalidation --targetdevhubusername devhub@example.com
    ```
    
    You can now run it this way using the `sf` style:
    
    ```bash
    sfdx package version create --package "Your Package Alias" --installation-key password123 --skip-validation --target-hub-org devhub@example.com
    ```
    
    Finally, just in case we weren't clear, the existing commands work exactly as before! But give this new stuff a try, it's pretty cool.

* CHANGE: Remember how we [updated the `force:cmdt` commands](./README.md#71842-jan-19-2023) to be in the style of `sf`?  We changed their official new names: 

    | Existing Command Name | New Command Name|
    |---|---|
    |`generate cmdt object`|`cmdt generate object`|
    |`generate cmdt field `|`cmdt generate field `|
    |`generate cmdt fromorg`|`cmdt generate fromorg`|
    |`generate cmdt record`|`cmdt generate record`|
    |`generate cmdt records`|`cmdt generate records`|
    
* FIX: When running `force:org:delete` to delete a scratch or sandbox org, all local source tracking files associated with the deleted org are cleaned up correctly. (GitHub issue [#1879](https://github.com/forcedotcom/cli/issues/1879), sfdx-core PR [#754](https://github.com/forcedotcom/sfdx-core/pull/754))

* FIX: When deploying multiple package directories sequentially (by including `"pushPackageDirectoriesSequentially" : true` in your `sfdx-project.json` file), the deploy command no longer displays duplicate log entries. (GitHub issue [#1879](https://github.com/forcedotcom/cli/issues/1879), SDR PR [#825}(https://github.com/forcedotcom/source-deploy-retrieve/pull/825), plugin-source PR [#698](https://github.com/salesforcecli/plugin-source/pull/698))

* FIX: The `force:source:manifest:generate --fromorg` command now correctly includes the StandardValueSets metadata type if it's present in your org. (GitHub issue [#1877](https://github.com/forcedotcom/cli/issues/1877), SDR PR [#824](https://github.com/forcedotcom/source-deploy-retrieve/pull/824))

* FIX: The `force:cmdt:record:create` command is now working correctly and no longer returns `Error: Unexpected arguments`. (GitHub issue [#1893](https://github.com/forcedotcom/cli/issues/1893), plugin-custom-metadata PR [#380](https://github.com/salesforcecli/plugin-custom-metadata/pull/380))

## 7.185.0 (Jan 26, 2023)

* NEW: We continue to improve the usability of existing `sfdx` commands, such as more intuitive flag names and using spaces as separators, similar to how `sf` works. See [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) for details. We're doing this work plugin by plugin. This week's release includes updated [plugin-signups](https://github.com/salesforcecli/plugin-signups). Don't worry, the `sfdx` commands and their flags still work _exactly_ the same as before! But give the new style a try -- we think you'll like it.

    These are the new command names. For each command, you can still use colons instead of spaces, such as `org:create:shape`. 
    
    |Existing Command Name|New Command Name|
    |-----------------------|---------|
    |`force:org:shape:create`|`org create shape`|
    |`force:org:shape:delete`|`org delete shape`|
    |`force:org:shape:list`|`org list shape`|
    |`force:org:snapshot:create` (Pilot)|`org create snapshot` (Pilot)|
    |`force:org:snapshot:delete` (Pilot)|`org delete snapshot` (Pilot)|
    |`force:org:snapshot:get` (Pilot)|`org get snapshot` (Pilot)|
    |`force:org:snapshot:list` (Pilot)|`org list snapshot` (Pilot)|

    These are the new flag names for the `force:org:shape::*` commands. If an existing flag name isn't listed in the table, it has the same name in the new command name.
    
    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`|`--api-version`|All `force:org:shape:*` commands|
    |`--targetusername`|`--target-org`, with new short name `-o`|`force:org:shape:create`, `force:org:shape:delete`|
    |`--noprompt`|`--no-prompt`|`force:org:shape:delete`|
    
    These are the new flag names for the `force:org:snapshot:*` pilot commands. If an existing flag name isn't listed in the table, it has the same name in the new command name.
    
    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`|`--api-version`|All `force:org:snapshot:*` commands|
    |`--targetdevhubusername`|`--target-dev-hub`|All `force:org:snapshot:*` commands|
    |`--snapshotname`|`--name`|`force:org:snapshot:create`|
    |`--sourceorg`|`--source-org`|`force:org:snapshot:create`|

    These flags are deprecated and have no effect.

    |Existing Command|Deprecated Flags|
    |---|---|
    |All commands|`--loglevel`|
    |`force:org:shape:list`|`--verbose`|
    
    We also updated the `--help` for each command to use the new command and flag names, to gently encourage you to start switching over to the new style. Fun tip: use the `-h` flag to get a condensed view of the help, for when you don't need long descriptions and examples. 
    
    Let's look at an example, such as this command:
    
    ```bash
    sfdx force:org:snapshot:create --sourceorg myuser@myorg.com --snapshotname NightlyBranch --description 'Contains PkgA v2.1.0' --targetdevhubusername NightlyDevHub
    ```
    
    You can now run it this way using the `sf` style:
    
    ```bash
    sfdx org create snapshot --source-org myuser@myorg.com --name NightlyBranch --description 'Contains PkgA v2.1.0' --target-dev-hub NightlyDevHub
    ```
    
    We've said this a lot, but here it is again: the existing commands work exactly as before. But give this new stuff a try, you might like it.
    
* FIX: You can now correctly execute `force:package:version:create` when the org definition file specified by the `--definitionfile` flag uses the `language` option to specify a default language. (plugin-packaging PR [#218](https://github.com/salesforcecli/plugin-packaging/pull/218))

## 7.184.2 (Jan 19, 2023)

* NEW: We continue to improve the usability of existing `sfdx` commands, such as more intuitive flag names and using spaces as separators, similar to how `sf` works. See [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) for details. We're doing this work plugin by plugin. This week's release includes updated [plugin-data](https://github.com/salesforcecli/plugin-data), [plugin-community](https://github.com/salesforcecli/plugin-community), and [plugin-custom-metadata](https://github.com/salesforcecli/plugin-custom-metadata). Don't worry, the `sfdx` commands and their flags still work _exactly_ the same as before! But give the new style a try -- we think you'll like it.

    These are the new command names. For each command, you can still use colons instead of spaces, such as `community:create`. 
    
    |Existing Command Name|New Command Name|
    |-----------------------|---------|
    |`force:community:create`|`community create`|
    |`force:community:publish`|`community publish`|
    |`force:community:template:list`|`community list template`|
    |`force:data:bulk:delete`|`data delete bulk`|
    |`force:data:bulk:status`|`data resume`|
    |`force:data:bulk:upsert`|`data upsert bulk`|
    |`force:data:record:create`|`data create record`|
    |`force:data:record:delete`|`data delete record`|
    |`force:data:record:get`|`data get record`|
    |`force:data:record:update`|`data update record`|
    |`force:data:soql:bulk:report`|`data query resume`|
    |`force:data:soql:query`|`data query`|
    |`force:data:tree:export`|`data export tree`|
    |`force:data:tree:import`|`data import tree`|
    |`force:cmdt:create`|`generate cmdt object`|
    |`force:cmdt:field:create`|`generate cmdt field`|
    |`force:cmdt:generate`|`generate cmdt fromorg`|
    |`force:cmdt:record:create`|`generate cmdt record`|
    |`force:cmdt:record:insert`|`generate cmdt records`|
    
    These are the new flag names for the `force:community:*` commands. If an existing flag name isn't listed in the table, it has the same name in the new command name.
    
    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |`--apiversion`|`--api-version`|All `force:community:*` commands|
    |`--templatename`|`--template-name`|`force:community:create`|
    |`--urlpathprefix`|`--url-path-prefix`|`force:community:create`|
    
    These are the new flag names (and one new flag!) for the `force:data:*` commands. If an existing flag name isn't listed in the table, it has the same name in the new command name.
    
    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---|---|---|
    |(new flag)|`--async`|`force:data:soql:query`|
    |`--apiversion`|`--api-version`|All `force:data:*` commands|
    |`--sobjectype`|`--sobject`|`force:data:record:create`, `force:data:bulk:delete`, `force:data:record:delete`, `force:data:record:get`, `force:data:record:update`, `force:data:bulk:upsert`|
    |`--usetoolingapi`|`--use-tooling-api`|`force:data:record:create`, `force:data:record:delete`, `force:data:record:get`, `force:data:record:update`, `force:data:soql:query`|
    |`--csvfile`|`--file`|`force:data:bulk:delete`, `force:data:bulk:upsert`|
    |`--sobjectid`|`--record-id`|`force:data:record:delete`, `force:data:record:get`, `force:data:record:update`|
    |`--outputdir`|`--output-dir`|`force:data:tree:export`|
    |`--sobjecttreefiles`|`--files`|`force:data:tree:import`|
    |`--confighelp`|`--config-help`|`force:data:tree:import`|
    |`--soqlqueryfile`|`--file`|`force:data:soql:query`|
    |`--resultformat`|`--result-format`|`force:data:soql:query`, `force:data:soql:bulk:report`|
    |`--bulkqueryid`|`--bulk-query-id`|`force:data:soql:bulk:report`|
    |`--batchid`|`--batch-id`|`force:data:bulk:status`|
    |`--jobid`|`--job-id`|`force:data:bulk:status`|
    |`--externalid`|`--external-id`|`force:data:bulk:upsert`|

    These are new flag names for the `force:cmdt:*` commands. If an existing flag name isn't listed in the table, it has the same name in the new command name.
    
    |Existing Flag Name|New Flag Name|Affected Existing Commands|
    |---------------|----------------------|-----------------------|
    |`--apiversion`|`--api-version`|All `force:cmdt:*` commands|
    |`--decimalplaces`|`--decimal-places`|`force:cmdt:field:create`|
    |`--devname`|`--dev-name`|`force:cmdt:generate`|
    |`--fieldname`|`--name`|`force:cmdt:field:create`|
    |`--fieldtype`|`--type`|`force:cmdt:field:create`|
    |`--filepath`|`--csv`|`force:cmdt:record:insert`|
    |`--ignoreunsupported`|`--ignore-unsupported`|`force:cmdt:generate`|
    |`--inputdir`|`--input-directory`|`force:cmdt:record:create`, `force:cmdt:record:insert`|
    |`--namecolumn`|`--name-column`|`force:cmdt:record:insert`|
    |`--outputdir`|`--output-directory`|`force:cmdt:field:create`, `force:cmdt:create`, `force:cmdt:record:create`, `force:cmdt:record:insert`|
    |`--picklistvalues`|`--picklist-values`|`force:cmdt:field:create`|
    |`--plurallabel`|`--plural-label`|`force:cmdt:generate`, `force:cmdt:create`|
    |`--recordname`|`--record-name`|`force:cmdt:record:create`|
    |`--recordsoutputdir`|`--records-output-dir`|`force:cmdt:generate`|
    |`--sobjectname`|`--sobject`|`force:cmdt:generate`|
    |`--typeoutputdir`|`--type-output-directory`|`force:cmdt:generate`|
    |`--typename`|`--type-name`|`force:cmdt:create`, `force:cmdt:record:create`, `force:cmdt:record:insert`|
    
    These flags are deprecated and have no effect.

    |Existing Command|Deprecated Flags|
    |---|---|
    |All commands|`--loglevel`|
    |`force:data:record:create`|`--perflog`|
    |`force:data:record:update`|`--perflog`|
    |`force:data:soql:bulk:report`|`--perflog`, `--wait`, `--bulk`, `--usetoolingapi`, `--soqlqueryfile`, `--query`|
    
    We also updated the `--help` for each command to use the new command and flag names, to gently encourage you to start switching over to the new style. Fun tip: use the `-h` flag to get a condensed view of the help, for when you don't need long descriptions and examples. 
    
    Let's look at an example, such as this command (IDs truncated for security):
    
    ```bash
    sfdx force:data:record:get --usetoolingapi --sobjecttype TraceFlag --sobjectid 7tf8H --targetusername MyScratch
    ```
    
    You can now run it this way using the `sf` style:
    
    ```bash
    sfdx data get record --use-tooling-api --sobject TraceFlag --record-id 7tf8H --target-org MyScratch
    ```
    
    Finally, just in case we weren't clear, the existing commands work exactly as before! But give this new stuff a try, it's pretty cool.

* NEW: We reached an important milestone today: the entire Salesforce CLI (excluding the `legacy` commands) is open source. The final private plugin ([plugin-custom-metadata](https://github.com/salesforcecli/plugin-custom-metadata), which contains the `cmdt` commands) is now public. Congrats, team!
  
* FIX: Plugins that are linked locally with the `sfdx plugins link` command now automatically compile when you make a local change to them. Previously you had to run `yarn build` each time you made a change. (GitHub issue [#1664](https://github.com/forcedotcom/cli/issues/1664), oclif PR [#517](https://github.com/oclif/plugin-plugins/pull/517))
    
## 7.183.1 (Jan 12, 2023)

ANNOUNCEMENT: Happy new year, Salesforce CLI community! Be sure to read our latest [blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli) that describes some of the big improvements that are coming in Salesforce CLI this year. And now back to our regular schedule. 

* NEW: After a [successful beta](https://github.com/forcedotcom/cli/issues/1721) and incorporating feedback from our community, the commands that used to be in the `force:package1:beta` and `force:package:beta` topics are now generally available.

    What does this mean? Let's look at an example: the functionality we added to `force:package:beta:create` is now in `force:package:create`.  The functionality in the _old_ `force:package:create` is now in `force:package:legacy:create`. In the short term, you can use the `force:package1:legacy:*` and `force:package:legacy:*` commands if you run into issues with the new commands. The new commands are open-source, live in the [plugin-packaging](https://github.com/salesforcecli/plugin-packaging) plugin, and are semantically (name, flags) and functionally equivalent as the old commands. 
    
* NEW: As described in [this blog post](https://developer.salesforce.com/blogs/2022/12/big-improvements-coming-to-the-salesforce-cli), we're updating many of the existing `sfdx` commands to use the improvements we made in `sf`. We're doing this work plugin by plugin, starting this week with the commands in [plugin-limits](https://github.com/salesforcecli/plugin-limits) and [plugin-schema](https://github.com/salesforcecli/plugin-schema). Don't worry, the `sfdx` commands and their flags still work _exactly_ the same as before! But you can now run them using the `sf` style, such as spaces instead of colons and new flag names; we highly recommend you give it a try. 

    These are the new command names.
    
    |Existing Command Name|New Command Names|
    |-------------------------------------|---------|
    |`force:limits:api:display`|`limits:api:display` (or `limits api display`)|
    |`force:limits:recordcounts:display`|`limits:recordcounts:display` (or `limits recordcounts display`)|
    |`force:schema:sobject:describe`|`sobject:describe` (or `sobject describe`)|
    |`force:schema:sobject:list`|`sobject:list` (or `sobject list`)|
    
    And these are the new flag names. 
    
    |Existing Command|Existing Flag Name|New Flag Name|
    |---------|------|---|
    |All four commands|`--apiversion`|`--api-version`|
    |All four commands|`--targetusername`|`--target-org` (new short name `-o`)|
    |`force:limits:recordcounts:display`|`--sobjecttype`|`--sobject` |
    |`force:schema:sobject:describe`|`--sobjecttype`|`--sobject`|
    |`force:schema:sobject:describe`|`--usetoolingapi`|`--use-tooling-api`|
    |`force:schema:sobject:list`|`--sobjecttype`|`--sobject`|
    
    For all four commands, the existing `--loglevel` flag is deprecated and has no effect. We've also updated the `--help` for each command to use the new command and flag names, to gently encourage you to start switching over to the new style. Fun tip: use the `-h` flag to get a condensed view of the help, for when you don't need long descriptions and examples. 
    
    Let's look at an example, such as this command:
    
    ```bash
    sfdx force:schema:sobject:describe --sobjecttype ApexCodeCoverage --usetoolingapi --targetusername my-scratch-org
    ```
    
   You can now run it this way, using the `sf` style:
    
    ```bash
    sfdx sobject describe --sobject ApexCodeCoverage --use-tooling-api --target-org my-scratch-org
    ```
    
    Finally, just in case we weren't clear, the existing commands work exactly as before! But give this new stuff a try, it's pretty cool.
    
* NEW: Don't remember the exact name of a command? We got you: simply type the command fragments that you do remember, in any order, and press return. Then `sfdx` either displays a list of possible commands that you can choose from, or it automatically runs the command if there's only one choice. You get a friendly warning for the latter, so you know exactly what the CLI is doing. You're welcome.

* NEW: Change the source-tracked file batch size during a deploy or retrieve with the new `SFDX_SOURCE_TRACKING_BATCH_SIZE` environment variable. The default value for this env var is 8,000 (Windows) and 15,000 (Linux/macOS). 

    `SFDX_SOURCE_TRACKING_BATCH_SIZE` is useful when deploying or retrieving a large project that contains many source-tracked files, and you exceed your operating system open file limit. While the deploy or retrieve likely complete successfully, source-tracking can run into errors in this case. Either increase your open file limit, such as with the `ulimit -Hn <number>` Linux/macOS command, or set the `SFDX_SOURCE_TRACKING_BATCH_SIZE` environment variable to a number significantly lower than the output of `ulimit -Hn`. 
    
    This new feature fixes these GitHub issues: [#1711](https://github.com/forcedotcom/cli/issues/1711), [#1676](https://github.com/forcedotcom/cli/issues/1676), and [#1504](https://github.com/forcedotcom/cli/issues/1504). Here's the source-tracking PR: [#295](https://github.com/forcedotcom/source-tracking/pull/295). 

* FIX: The `force:package:beta:delete --package <packageID>` command now correctly deletes a package even if the associated packageAlias is not listed in the `sfdx-project.json` file. As of this release, `force:package:beta:delete` is now `force:package:delete`. (GitHub issue [#1858](https://github.com/forcedotcom/cli/issues/1858), packaging PR [#179](https://github.com/forcedotcom/packaging/pull/179))

* FIX: To keep the new `force:package:version:create` command consistent with its legacy version, we updated the new command so you can use the `--package` and `--path` flags together in a single command execution. However, we also added a warning to say that the usage is deprecated and will be removed in the future. (GitHub issue [#1865](https://github.com/forcedotcom/cli/issues/1865), plugin-packaging PR [#211](https://github.com/salesforcecli/plugin-packaging/pull/211))

* FIX: The `force:package:version:create` command now correctly resolves the package directory when you specify both a package ID with the `--package` flag on the command and as the value for the `package` property in the `packageDirectories` section of `sfdx-project.json`. (GitHub issue [#1865](https://github.com/forcedotcom/cli/issues/1865), plugin-packaging PR [#211](https://github.com/salesforcecli/plugin-packaging/pull/211))

## 7.182.1 (Dec 22, 2022)

 * FIX: When deploying or retrieving source to or from an org, Salesforce CLI now strictly enforces [this order of priority](https://github.com/forcedotcom/source-deploy-retrieve/pull/791#issue-1479939776) to determine the value of `apiVersion` and `sourceApiVersion`. As a reminder, `apiVersion` refers to the core Metadata API version used to service the HTTPS request or response via either SOAP or REST; `sourceApiVersion` refers to the shape of the metadata itself. 

    For example, let's say you set the global `apiVersion` configuration value to 55.0 but then run `force:source:deploy` with the `--apiversion 56.0` flag. The command uses 56.0 as the `apiVersion` when deploying. Similarly, say you set the `sourceApiVersion` property in the `sfdx-project.json` file to 57.0, but the `<version>` element in the `package.xml` manifest file is 56.0. The command uses 56.0 as the `sourceApiVersion`. 

    This fix applies to all of these commands: `force:source:deploy|retrieve`, `force:source:push|pull`, and `force:mdapi:deploy|retrieve`. 
    
    We've also improved the message that's displayed when you deploy or retrieve source with one of these commands. In this sample retrieve message, the `sourceApiVersion` is 54.0, the `apiVersion` is 57.0, and the retrieve uses SOAP API: 
    
    `Retrieving v54.0 metadata from test-xktpgkdbuyp7@example.com using the v57.0 SOAP API`
    
    Yep, we know this API version stuff is tricky. We're in the process of updating the docs with more information and examples. 
    
    (PRs: SDR [#791](https://github.com/forcedotcom/source-deploy-retrieve/pull/791) and [#797](https://github.com/forcedotcom/source-deploy-retrieve/pull/797), plugin-source [#673](https://github.com/salesforcecli/plugin-source/pull/673))
    
* FIX: The `auth:list` command correctly displays `No results found` again when it doesn't find any authenticated orgs; previously it printed an empty table. 

   Here's some awesomeness: we put out a call for help with this issue, and [Mounib](https://github.com/aemounib) graciously answered it. Thanks for your (second!) contribution, we look forward to more! (GitHub issue [#1798](https://github.com/forcedotcom/cli/issues/1796), PR plugin-auth [#552](https://github.com/salesforcecli/plugin-auth/pull/552))

* FIX: Salesforce CLI retries the command if it encounters either of these errors from the server during metadata deploy operations:

    * `INVALID_QUERY_LOCATOR`
    * `<h1>Bad Message 400</h1><pre>reason: Bad Request</pre>`
    
    (GitHub issues [#1727](https://github.com/forcedotcom/cli/issues/1727) and [#1835](https://github.com/forcedotcom/cli/issues/1835), PR SDR [#792](https://github.com/forcedotcom/source-deploy-retrieve/pull/792))

* FIX: The `force:source:*` commands now support these metdata types used by Net Zero Cloud:

   * FuelType
   * FuelTypeSustnUom
   * SustainabilityUom
   * SustnUomConversion
   
## 7.181.1 (Dec 15, 2022)

* FIX: Running the command `force:package:beta:version:create:report` on a package that failed to build correctly now displays the full list of errors that caused the package build to fail. (GitHub issue [#1779](https://github.com/forcedotcom/cli/issues/1779), plugin-packaging PR [#181](https://github.com/salesforcecli/plugin-packaging/pull/181))

* FIX: The `sfdx:force:data:record:create|update` commands correctly handle field values passed to the `--values` flag that contain a single or double quote, such as `--values "customfield__c=Won't Fix"`. (GitHub issue [#1820](https://github.com/forcedotcom/cli/issues/1820), plugin-data PR [#427](https://github.com/salesforcecli/plugin-data/pull/427))

* FIX:  The `force:org:create` command now correctly displays all errors encountered when attempting to create a sandbox. (plugin-org PR [#517](https://github.com/salesforcecli/plugin-org/pull/517))

## 7.180.0 (Dec 8, 2022)

* NEW: We've worked hard to make the [`sf` executable of Salesforce CLI](../sf/README.md) a whiz-bang developer tool that's also fun to use. We like it so much that we decided to add some of its coolest features to `sfdx` too! Check 'em out:

    - Use spaces as topic separators, such as `sfdx force org list`. Don't worry, you can still use colons if you prefer, such as `sfdx force:org:list`.
    
    * Enter command fragments in any order, using either spaces or colons as separators, and Salesforce CLI figures out what you mean. For example, let's say you want to list all your orgs, but forgot the exact command. All of the following commands work without returning any `command not found` errors:
    
        ```bash
        sfdx force org list
        sfdx org force list
        sfdx list force org
        sfdx force:org:list
        sfdx org:force:list
        sfdx list:force:org
        ```
    
    * Search the `sfdx` commands for that special one you've been looking for all your life with the new interactive `sfdx search` command. 

    * (Changed behavior) The `-h` flag now displays a subset of the full help, specifically the short command and flag descriptions and the command usage. It's great for quick reference information. The `-help` flag continues to display the full help, including long command and flag descriptions and examples. 
    
* NEW: If you installed Salesforce CLI with the installers, you can now easily update to an older version with the new `--version` flag. For example, to update to version `7.176.0`:
    
    ```bash
    sfdx update --version 7.176.0
    ```

    Use the `--available` flag to list all available older versions to which you can update. The output also shows whether you already have a local copy or if it must be downloaded. Use `-interactive` to choose a version interactively. 

* NEW: Specify the browser to use with the `auth:web:login` command with the new `--browser|-b` parameter. Supported browsers are `chrome`, `edge`, and `firefox`. If you don't specify `--browser`, the authorization page opens in your default browser. For example, to authorize an org in Firefox:

    `sfdx auth:web:login --browser firefox`

    Thank you, [Mounib](https://github.com/aemounib), for writing the code for this new feature! We love contributions from the community, and look forward to many more. (GitHub issue [#1465](https://github.com/forcedotcom/cli/issues/1465), plugin-auth PR [#537](https://github.com/salesforcecli/plugin-auth/pull/537))

* FIX: The `force:source:deploy:report` command no longer returns the error `ERROR running force:source:deploy:report: Metadata API request failed: The org cannot be found`. (GitHub issue [#1713](https://github.com/forcedotcom/cli/issues/1713), sfdx-core PR [#712](https://github.com/forcedotcom/sfdx-core/pull/712))

* FIX: The `--retrievetargetdir` flag of the `force:source:retrieve` command is working as expected when retrieving custom labels and when components listed in the manifest don't exist in the org. (GitHub issues [#1827](https://github.com/forcedotcom/cli/issues/1827) and [#1823](https://github.com/forcedotcom/cli/issues/1823), plugin-source PR [#659](https://github.com/salesforcecli/plugin-source/pull/659))

## 7.179.0 (Dec 1, 2022)

* FIX: The command `force:source:deploy` provides more detailed error messages while converting metadata. (GitHub issue [#1420[(https://github.com/forcedotcom/cli/issues/1420), SDR PR [#781](https://github.com/forcedotcom/source-deploy-retrieve/pull/781))

* FIX: The `force:source:push` command no longer deletes the entire zipped Static Resource from the org after you've deleted a single static resource file with from that folder in your project.  (GitHub issue [#1589[(https://github.com/forcedotcom/cli/issues/1589), source-tracking PR [#273](https://github.com/forcedotcom/source-tracking/pull/273))

* FIX: The command `force:package:version:create` no longer fails when creating a package version on a package that has a dependency on another package. (GitHub issue [#1742](https://github.com/forcedotcom/cli/issues/1742))

* FIX: Salesforce CLI now correctly performs flag validation that has been specified with a custom `parse` property on a flag. This fix means that when you run a command that has a flag with a custom `parse` property, you now correctly get an error if your passed-in value fails the validation. Previously the invalid value was incorrectly accepted. (command PR [#193](https://github.com/salesforcecli/command/pull/193)) 

## 7.178.0 (Nov 24, 2022)

* FIX: The `force:source:*` commands support the ExtlClntAppMobileConfigurablePolicies metadata type.

## 7.177.1 (Nov 17, 2022)

* FIX: The `force:org:status` command is working correctly and no longer returns the error `MediaType of 'application/json,application/json' is not supported by this resource`. (sfdx-core PR [#697](https://github.com/forcedotcom/sfdx-core/pull/697))

* FIX: The `force:org:create` command correctly fires configured `postorgcreate` hooks. (GitHub issue [#1722](https://github.com/forcedotcom/cli/issues/1722), plugin-org PR [#485](https://github.com/salesforcecli/plugin-org/pull/485))

* FIX: The `force:package:beta:version:create` command includes and installs unpackaged metadata so package version create with code coverage is working correctly.  (GitHub issue [#1743](https://github.com/forcedotcom/cli/issues/1743), packaging PR [#117](https://github.com/forcedotcom/packaging/pull/117))

* FIX: The `force:package:beta:version:create` command adds `dependencies` in the `packageDirectories` section of the `sfdx-project.json` file using the correct `package` key rather than the incorrect `subscriberPackageVersionId` key. (GitHub issue [#1764](https://github.com/forcedotcom/cli/issues/1764), packaging PR [#117](https://github.com/forcedotcom/packaging/pull/117))

* FIX: The `force:package:beta:version:create` command correctly creates a package version and no longer returns the error `Converting circular structure to JSON`.  (GitHub issue [#1789](https://github.com/forcedotcom/cli/issues/1789))

* FIX: The `force:package:beta:version:list` command correctly outputs the datetime values in the **Created Date** and **Last Modified Date** columns using the user's locale rather than UTC.  (GitHub issue [#1794](https://github.com/forcedotcom/cli/issues/1794), plugin-packaging PR [#152](https://github.com/salesforcecli/plugin-packaging/pull/152))

* FIX: The `force:mdapi:deploy` command correctly deploys and returns the expected response.  It would unexpectedly exit on very large files in 7.176.1 and 7.177.0.  Special thanks to [Andrew Goodman](https://github.com/gdman) for helping find the root cause.  (Github issue [#1802](https://github.com/forcedotcom/cli/issues/1802), source-deploy-retrieve PR [#768](https://github.com/forcedotcom/source-deploy-retrieve/pull/768))

## 7.176.1 (Nov 10, 2022)

* NEW:  Quickly gather Salesforce CLI configuration data and run diagnostic tests with the new `doctor` command. Use the command to easily generate informational files that you can attach to [GitHub issues](https://github.com/forcedotcom/cli/issues) or provide to Salesforce Customer Support. 

    Run without parameters, the command first displays basic information, such as whether you're on the latest CLI version. It then writes your configuration and a detailed diagnosis to a JSON file in the current directory. Use the `--outputdir` parameter to specify a different directory. For example:

    `sfdx doctor --outputdir diagnostic-files`

    Use the `--command` parameter to run a specific command in debug mode; the doctor writes both stdout and stderr to separate `*.log` files. Encapsulate the command in double quotes. For example:

    `sfdx doctor --command "force:org:list --all"`

    To run diagnostic tests on a specific plugin rather than the CLI itself, use the `--plugin` parameter. If the plugin isn't listening to the doctor, then you get a warning and no data.

    `sfdx doctor --plugin @salesforce/plugin-source`
    
    We've made it really easy to create a GitHub issue: specify the `--createissue` parameter, enter a title at the prompt, and a browser window automatically opens with a partially-filled GitHub issue. Enter the remaining information about your specific issue, click **Submit new issue**, and you're done.  Easy peasy!

    The CLI doctor is in and ready to diagnose all your problems!
    
* NEW: You can now automatically replace snippets of your metadata source files with specific values right before you deploy the files to an org with the `force:source:deploy|push` commands. This string replacement is "ephemeral" because the changes aren't written to your project; they apply only to the deployed files. Use this new feature to, for example, replace the endpoint in a NamedCredential, depending on whether you're deploying to a production or scratch org. Or specify a password in an ExternalDataSource that you don't want to store in your repo. The use cases are endless!

    To configure string replacement, add a `replacements` property to your `sfdx-project.json` file and use key-value pairs to describe how the string replacement works. 

    For example, this `sfdx-project.json` snippet specifies that when you deploy the `force-app/main/default/classes/myClass.cls` source file, all occurrences of the string `replaceMe` are replaced with the value of the `THE_REPLACEMENT` environment variable:

    ```json
    {
      "packageDirectories": [
         {
           "path": "force-app",
           "default": true
         }
      ],
      "name": "myproj",
      "replacements": [
        {
          "filename": "force-app/main/default/classes/myClass.cls",
          "stringToReplace": "replaceMe",
          "replaceWithEnv": "THE_REPLACEMENT"  
        }
      ]
    }
    ```

    You can specify these keys in the `replacements` property:

    * `filename`: Single file that contains the string to be replaced.
    * `glob`: Collection of files that contain the string to be replaced. Example: `**/classes/*.cls`.
    * `stringToReplace`: The string to be replaced.
    * `regexToReplace`: Regular expression that specifies a string pattern to be replaced. 
    * `replaceWithEnv`: Specifies that the string be replaced with the value of the environment variable.
    * `replaceWithFile`: Specifies that the string be replaced with the contents of a file.
    * `replaceWhenEnv`: Specifies a condition, using environment variables, for when a string replacement occurs. 

    A few syntax notes:
    
    * Always use forward slashes (`/`), even on Windows.
    * JSON requires that you escape all backlashes (`\`) with another backslash. 

    This example is similar to the previous one, except that the replacement occurs only if an environment variable called `DEPLOY_DESTINATION` exists and it has a value of `PROD`.

    ```json 
    "replacements": [
      {
        "filename": "force-app/main/default/classes/myClass.cls",
        "stringToReplace": "replaceMe",
        "replaceWithEnv": "THE_REPLACEMENT"
        "replaceWhenEnv": [{
          "env": "DEPLOY_DESTINATION",
          "value": "PROD"
        }]  
      }
    ]
    ```

    We’re updating the [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_develop.htm) with more details and examples; we’ll let you know when it’s available.

* NEW: Retrieve source files into a non-package directory (AKA a directory that _isn't_ configured in your `sfdx-project.json` file) with the new `--retrievetargetdir` parameter of the `force:source:retrieve` command. With this parameter you can now keep your unpackaged source files separate from your packaged files. Then, for example, you can easily prevent these unpackaged files from being deployed to a scratch org because they're not included in any configured package directory. 

    This example shows how to retrieve all Apex classes from your default org and put the source-formatted files into the `unpackaged-files` directory. If this directory doesn't exist, the command creates it for you. Your configured package directories are unchanged.

    `sfdx force:source:retrieve --retrievetargetdir ./unpackaged-files --metadata ApexClass`

    Many thanks to [Matthias Rolke](https://github.com/amtrack) for suggesting the cool feature, and then writing a lot of the code!  [plugin-source PR #426](https://github.com/salesforcecli/plugin-source/pull/426)

* CHANGE: We upgraded the version of Node.js contained in the full Salesforce CLI Docker image to LTS v18. (sfdx-cli PR [#720](https://github.com/salesforcecli/sfdx-cli/pull/720))

* FIX: The `force:source:*` commands now support these metdata types:

   * ExtlClntAppOauthConfigurablePolicies (previously called ExtlClntAppOauthPlcyCnfg)
   * ExtlClntAppMobileSettings (previously called ExtlClntAppMobileSet)

* FIX: StaticResources now deploy correctly; in the previous version of this week's RC (7.176.0) the deploy command would immediately exit.  Special thanks to [David Esposito](https://github.com/daveespo) for building a nightly pipeline that uses the RC, and for debugging and reporting the issue so quickly and with a perfect repro. [#1791](https://github.com/forcedotcom/cli/issues/1791).   

## 7.175.0 (Nov 3, 2022)

* FIX: The `force:source:*` commands now support these metadata types:

   * BotBlock
   * ClauseCatgConfiguration
   * DisclosureType
   * DisclosureDefinition
   * DisclosureDefinitionVersion
   * ExtlClntAppOauthPlcyCnfg
   * ExtlClntAppOauthSettings
   * ExtlClntAppMobileSet
   * OmniSupervisorConfig

* FIX: We've improved the error message thrown by the `force:source` commands when they encounter an invalid metadata type when parsing a manifest file, such as `package.xml`. (GitHub issue [#1187](https://github.com/forcedotcom/cli/issues/1187), SDR PR [#740](https://github.com/forcedotcom/source-deploy-retrieve/pull/740))

* FIX: The `force:package:beta:version:create` command is working correctly and no longer returns the error `Cannot read properties of undefined (reading 'package')`. (GitHub issue [#1750](https://github.com/forcedotcom/cli/issues/1750), plugin-packaging PR [#129](https://github.com/salesforcecli/plugin-packaging/pull/129))

## 7.174.0 (Oct 27, 2022)

* CHANGE: The [Docker images](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_docker.htm) we publish each week now run a more recent version of Ubuntu. Additionally, the `full` images run a more recent minor version of Node.js 16. For details about the supported runtime versions, see the [documentation about the Heroku-20 Stack](https://devcenter.heroku.com/articles/heroku-20-stack), which is the new parent image of our Salesforce CLI Docker images.

* FIX: The `force:source:push` command now correctly returns a non-zero exit code when it encounters a [GACK](https://developer.salesforce.com/blogs/tag/gack) and displays the full internal error message. The `force:source:deploy` and `force:mdapi:deploy` commands were already returning a non-zero exit code in this case. But they now also display the full message; previously you had to use the `--json` flag to view it. 

## 7.173.0 (Oct 20, 2022)

* FIX: The `force:apex:test:run|report -r junit` commands now produce valid XML output. (GitHub issue [#280](https://github.com/forcedotcom/salesforcedx-apex/issues/280), salesforcedx-apex PR [#285](https://github.com/forcedotcom/salesforcedx-apex/pull/285))

* FIX: The `force:source:*` commands now support these metadata types:

    * CallCtrAgentFavTrfrDest
    * ExternalCredential
    * MarketSegmentDefinition
    * MfgProgramTemplate
    * StreamingAppDataConnector
    
* FIX: The `force:org:create` command now throws a better error message when it's run against an org that is not a DevHub. (GitHub PR https://github.com/forcedotcom/sfdx-core/pull/669)

## 7.172.0 (Oct 13, 2022)

* FIX: The `force:source:push` and `force:source:deploy` commands correctly deploy any CustomFieldTranslation metadata types that have local changes. (PRs: source-deploy-retrieve [#726](https://github.com/forcedotcom/source-deploy-retrieve/pull/726) and [#728](https://github.com/forcedotcom/source-deploy-retrieve/pull/728), plugin-source [#597](https://github.com/salesforcecli/plugin-source/pull/597), source-tracking [#243](https://github.com/forcedotcom/source-tracking/pull/243))

* FIX: The `force:mdapi:deploy` command correctly handles the new enhanced domains in Winter '23 preview sandboxes. [GitHub issue [#1687](https://github.com/forcedotcom/cli/issues/1687).  PRs: jsforce [#1272](https://github.com/jsforce/jsforce/pull/1272), sfdx-core [#667](https://github.com/forcedotcom/sfdx-core/pull/667))

* FIX: The `force:source:*` commands now support the RelationshipGraphDefinition metadata type. [PR: source-deploy-retrieve [#722](https://github.com/forcedotcom/source-deploy-retrieve/pull/722))
 
## 7.171.0 (Oct 6, 2022)

* FIX: The `force:org:create` command now respects the `apiVersion` config value. (GitHub issue [#1719](https://github.com/forcedotcom/cli/issues/1719), sfdx-core PR [#656](https://github.com/forcedotcom/sfdx-core/pull/656))

## 7.170.0 (Sept 29, 2022)

* FIX: We fixed some under-the-hood bugs. 

## 7.169.1 (Sept 22, 2022)

* CHANGE: We've completed [open-sourcing](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) the packaging commands and created these new beta commands in the new [plugin-packaging](https://github.com/salesforcecli/plugin-packaging) plug-in:

    * `force:package:beta:uninstall:report`
    * `force:package:beta:version:displayancestry`
 
    These beta commands work the same as their equivalent existing commands. 
    
    Now that we've created open-source beta versions of all the packaging commands, we no longer maintain the current implementations of the `force:package:*` commands. We recommend that you start testing the equivalent `force:package:beta:*` commands, which are functionally the same. If you run into issues with the current commands, first try the equivalent `force:package:beta` command to see if your issue is fixed. If it isn't, file a report against the `force:package:beta:*` command on https://github.com/forcedotcom/cli/issues. The same applies to the `force:package1:*` commands. We plan to make the beta commands generally available in the near future. 

* FIX: The `force:source:*` commands now support these metadata types:

    * DigitalExperienceBundle
    * DigitalExperience
    * DigitalExperienceConfig

* FIX: Any registered `postorgcreate` hooks, which fire immediately after a new scratch org or sandbox is created, no longer fire twice. (GitHub issue [#1700](https://github.com/forcedotcom/cli/issues/1700), plugin-org PR [#391](https://github.com/salesforcecli/plugin-org/pull/391))

* FIX: You can now correctly deploy empty metadata files; previously you'd get an UNKNOWN_EXCEPTION error. (GitHub issue [#1673](https://github.com/forcedotcom/cli/issues/1673), SDR PR [#705](https://github.com/forcedotcom/source-deploy-retrieve/pull/705))

## 7.168.0 (Sept 14, 2022)

* FIX: The `force:source:*` commands now support these metadata types:

    * ExternalClientApplication
    * ForecastingFilter
    * ForecastingFilterCondition
    * SchedulingObjective

## 7.167.2 (Sept 8, 2022)

* CHANGE: We continue on our [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) project with the packaging commands.  We've created these new beta commands in the new [plugin-packaging](https://github.com/salesforcecli/plugin-packaging) plug-in:

    * `force:package:beta:version:list`
    * `force:package:beta:version:update`
    * `force:package:beta:update`
 
    These beta commands work the same as their equivalent existing commands. Try out these beta commands before we make the open-source versions generally available.

* FIX: The `force:source:*` commands now support the MarketingAppExtension metadata type.

## 7.166.1 (Sept 1, 2022)

* CHANGE: Our journey to [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) is coming to an end; the finish line is in sight. This week we've created these beta commands in the new [plugin-packaging](https://github.com/salesforcecli/plugin-packaging) plug-in:

    * `force:package:beta:create`
    * `force:package:beta:delete`
    * `force:package:beta:install`
    * `force:package:beta:install:report`
    * `force:package:beta:installed:list`
    * `force:package:beta:list`
    * `force:package:beta:uninstall`
    * `force:package:beta:version:create`
    * `force:package:beta:version:create:list`
    * `force:package:beta:version:create:report`
    * `force:package:beta:version:delete`
    * `force:package:beta:version:promote`
    * `force:package:beta:version:report`
    * `force:package1:beta:version:create`
    * `force:package1:beta:version:create:get`
    * `force:package1:beta:version:display`
    * `force:package1:beta:version:list`
    
    These new beta commands work the same as their equivalent existing commands. Try out these beta commands before we make the open-source versions generally available.

## 7.165.0 (Aug 25, 2022)

* NEW: When we publish the `sfdx` executable of Salesforce CLI to npm, we lock down its dependencies. As a result, users installing `sfdx` from npm get immutable builds. See [Locking dependencies with npm shrinkwrap](https://github.com/forcedotcom/cli/issues/1678) for details. 

## 7.164.2 (Aug 18, 2022)

* NEW: Retrieve more records when running `force:data:soql:query` with the new `--bulk` parameter, which makes the command use Bulk API 2.0 for the SOQL query. Bulk API 2.0 has higher limits than the default API used by the command. The default maximum number of records returned by the command is 10,000, so use `--bulk` if your SOQL query returns more. When using `--bulk`, the command waits 3 minutes by default for the query to complete. Use the new `--wait` parameter to specify a different number of minutes to wait, or set it to 0 to immediately return control to the terminal. For example, to not wait for the query to complete:

    `sfdx force:data:soql:query --query <long-query> --bulk --wait 0`
    
    But hold on a second; if you don't wait for the query to complete, how do you get the results? We thought of that! The preceding command displays an ID that you then pass to the new `force:data:soql:bulk:report` command with the `--bulkqueryid` parameter. Use the optional `--resultformat` parameter to specify the format of the results, such as `csv` or `json`. For example:
    
    `sfdx force:data:soql:bulk:report --bulkqueryid 75000woohoo00XXX --resultformat json`

    Many thanks to [Colin Casey](https://github.com/colincasey) for contributing part of this cool new feature.  And to [Doug Ayers](https://github.com/forcedotcom/cli/issues/1223) for requesting it. 
    
* NEW: The new open-source `force:org:create` command, which lives in the [plugin-org](https://github.com/salesforcecli/plugin-org) plug-in, is now generally available. This means that the changes we made to the beta version (`force:org:beta:create`) are now in `force:org:create`. The functionality in the _old_ `force:org:create` is now in `force:org:legacy:create`. The new command is functionally the same as the old one. In the short term, you can use the `force:org:legacy:create` command if you run into issues with the new command. 

* CHANGE: The `force:source:*` commands no longer support these metadata types associated with Connect Center:

    * ConnectedSystem
    * DataMapping
    * DataMappingObjectDefinition
    * DataMappingSchema
    * DataMappingFieldDefinition
    * FederationDataMappingUsage
    
* FIX: (7.164.2) The `force:org:create` command supports mixed-case usernames when you pass them as org definition values at the command line. For example:

    `sfdx force:org:create username=MixedCaseName@mycompany.com --setdefaultusername -f config/project-scratch-def.json`

    In the first patch of this release candidate, the command returned a `No authorization information found` error. Big thanks to [David Esposito](https://github.com/daveespo) for finding and reporting the issue ([GH #1669](https://github.com/forcedotcom/cli/issues/1669)). This is a major reason we create release candidates: so the community can find these little regressions early, and we can fix 'em ([plugin-org](https://github.com/salesforcecli/plugin-org/pull/384)) before they make it into our stable release. Nice work everyone!

* FIX: Running the `force:source:push` command on a large project with many files no longer returns the `EMFILE: too many open files` error. A second happy result of this fix is better command performance. (GitHub issue [#1555](https://github.com/forcedotcom/cli/issues/1555), [SDR PR #683](https://github.com/forcedotcom/source-deploy-retrieve/pull/683))

* FIX: The `force:source:deploy` command works correctly during Salesforce release transition periods, such as the current transition from API version 55.0 to 56.0. (GitHub issue [#1656](https://github.com/forcedotcom/cli/issues/1656), [SDR PR #684](https://github.com/forcedotcom/source-deploy-retrieve/pull/684))

* FIX: The `force:source:status` command shows properly filtered results based on your `.forceignore` file. ([source-tracking PR #195](https://github.com/forcedotcom/source-tracking/pull/195))

## 7.163.0 (Aug 11, 2022)

* FIX: We fixed some under-the-hood bugs.

## 7.162.0 (Aug 4, 2022)

* NEW: Run large SOQL queries and avoid your operating system's command character limit with the new `--soqlqueryfile` parameter of the `force:data:soql:query` command. Create a text file that contains your SOQL query, then specify the file with the parameter. For example:

    `sfdx force:data:soql:query --soqlqueryfile query.txt -u my-org`
    
    (GitHub issue [#360](https://github.com/forcedotcom/cli/issues/360), [plugin-data PR #327](https://github.com/salesforcecli/plugin-data/pull/327))

* FIX: The `force:org:clone` command clones a sandbox org without errors. (GitHub issue [#1637](https://github.com/forcedotcom/cli/issues/1637), [sfdx-core PR #623](https://github.com/forcedotcom/sfdx-core/pull/623))

* FIX: The `force:mdapi:convert` command converts CustomLabels metadata types to source format. (GitHub issue [#1540](https://github.com/forcedotcom/cli/issues/1540), SDR PRs [#660](https://github.com/forcedotcom/source-deploy-retrieve/pull/660), [#666](https://github.com/forcedotcom/source-deploy-retrieve/pull/666))

* FIX: The `force:org:list` command displays scratch orgs that have additional users created in them. (GitHub issue [#1641](https://github.com/forcedotcom/cli/issues/1641), [plugin-org PR #359](https://github.com/salesforcecli/plugin-org/pull/359))

* FIX: The `force:data:tree:export` command no longer converts the SOQL query that you pass it with the `-q` parameter to lowercase. (GitHub issue [#1642](https://github.com/forcedotcom/cli/issues/1642), [plugin-data PR #330](https://github.com/salesforcecli/plugin-data/pull/330))

	Many thanks to [Anthony Heber](https://github.com/aheber) for your fix. Our community comes through again. Keep 'em coming!

## 7.161.0 (July 28, 2022)

* FIX: When `mdapi:deploy:report` and `source:deploy:report` exceed their `--wait` limit, they return a JSON error that contains the expected deploymet details. (GitHub issue [#1612](https://github.com/forcedotcom/cli/issues/1612), [plugin-source PR #538](https://github.com/salesforcecli/plugin-source/pull/538))

* FIX: The `force:org:beta:create` command sets aliases correctly. (GitHub issue [#1630](https://github.com/forcedotcom/cli/issues/1630), [sfdx-core PR #620](https://github.com/forcedotcom/sfdx-core/pull/620) and [plugin-org PR #357](https://github.com/salesforcecli/plugin-org/pull/357))

* FIX: The older `force:org:create` command was missing some error messages. (GitHub issue [#1638](https://github.com/forcedotcom/cli/issues/1638))

* FIX: Pushing invalid LWC templates with the `force:source:push` command to scratch orgs that have a namespace now returns proper errors. (GitHub issue [#1602](https://github.com/forcedotcom/cli/issues/1602), [SDR PR #669](https://github.com/forcedotcom/source-deploy-retrieve/pull/669))

* FIX: Authorizing orgs now works with either the HTTPS_PROXY or HTTP_PROXY environment variable. (Github issue [#1626](https://github.com/forcedotcom/cli/issues/1626), [jsforce PR #1256](https://github.com/jsforce/jsforce/pull/1256))

* FIX: The `force:source:*` commands now support these metadata types:

    * IdentityVerificationProcDef
    * ServiceAISetupDefinition
    * ServiceAISetupField

## 7.160.0 (July 21, 2022)

* FIX: Refreshing expired access tokens is working as expected. (GitHub issue [#1615](https://github.com/forcedotcom/cli/issues/1615), [sfdx-core PR #619](https://github.com/forcedotcom/sfdx-core/pull/619))

* FIX: The `force:source:*` commands now support these metadata types:

    * AIUsecaseDefinition
    * DataPackageKitDefinition
    * DataPackageKitObject
    * DataSourceBundleDefinition
    * DataSrcDataModelFieldMap
    * DataStreamTemplate

## 7.159.0 (July 14, 2022)

* FIX: The `force:org:beta:create` command creates a scratch org when the definition file contains an `objectSettings` entry. (GitHub issue #[1526](https://github.com/forcedotcom/cli/issues/1526))

* FIX: The `force:source:deploy` command respects the `restDeploy` configuration value. (GitHub issue #[1606](https://github.com/forcedotcom/cli/issues/1606))

* FIX: We've strengthened our proxy support so that commands run correctly when behind a company firewall or web proxy. (GitHub issue #[1597](https://github.com/forcedotcom/cli/issues/1597))

## 7.158.1 (July 7, 2022)

* FIX: The `force:org:open` command no longer times out while resolving the Lightning Experience-enabled custom domain in new sandboxes. (GitHub issue #[1556](https://github.com/forcedotcom/cli/issues/1556), #[1603](https://github.com/forcedotcom/cli/issues/1603))

* FIX: Authentication tokens are now consistently and correctly encrypted or decrypted. (GitHub issue #[1314](https://github.com/forcedotcom/cli/issues/1314))

* FIX: The `force:package1:version:list` command displays correct output. (GitHub issue #[1569](https://github.com/forcedotcom/cli/issues/1569))

## 7.157.0 (June 30, 2022)

* FIX: The `force:org:create` command no longer emits a warning about `rmdirSync` being deprecated. (Pull Request [salesforcecli/toolbelt#256](https://github.com/salesforcecli/toolbelt/pull/256))

* FIX: The `force:source:status` command now correctly respects all forceignored files when using the `--concise` parameter. (GitHub issue #[1545](https://github.com/forcedotcom/cli/issues/1545))

## 7.156.1 (June 23, 2022)

* FIX: The `force:data:soql:query` command no longer limits the number of returned records to 2000; it once again uses the default value of 10K. (GitHub issue #[1543](https://github.com/forcedotcom/cli/issues/1543))

* FIX: The `force:mdapi:deploy` command successfully deploys large metadata directories. (GitHub issue #[1531](https://github.com/forcedotcom/cli/issues/1531))

* FIX: You can now run the `force:mdapi:deploy` command on a production org without specifying the `--testlevel` parameter if your project doesn't contain any Apex classes. Previously it incorrectly failed with the error `INVALID_OPERATION: testLevel of NoTestRun cannot be used in production organizations`. (GitHub issue #[1542](https://github.com/forcedotcom/cli/issues/1542))

* FIX: Username aliases now resolve correctly. Previously, when using an alias instead of a username in some commands in certain conditions, you'd get errors such as:

    * `No authorization information found for <username>`
    * `ERROR running force:package:version:create: Missing config object`
 
   (GitHub issues #[1576](https://github.com/forcedotcom/cli/issues/1576) and #[1577](https://github.com/forcedotcom/cli/issues/1577))
   
## 7.155.1 (June 16, 2022)

* NEW: Org Shape for Scratch Orgs is generally available. Use these org shape commands to create a scratch org configuration (shape) based on a specific source org and then manage it:

     * `force:org:shape:create`
     * `force:org:shape:delete`
     * `force:org:shape:list`

     See [Create a Scratch Org Based on an Org Shape](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_shape_intro.htm) for details.
     
* FIX: We've improved the `auth:jwt:grant` command so that it succeeds more often on more types of orgs. 

* FIX: We've improved the `force:source` and `force:mdapi` commands so they catch a common Metadata API fault and then retry the deploy or retrieve if necessary. (GitHub issue #[1522](https://github.com/forcedotcom/cli/issues/1522))
 
## 7.154.0 (June 9, 2022)

* FIX: The package dependency keyword `LATEST` no longer resolves to a deleted package version. (GitHub issue [#1514](https://github.com/forcedotcom/cli/issues/1514))

## 7.153.0 (June 2, 2022)

* NEW: Get the results of your Apex tests in JUnit format, and code coverage results in a variety of formats, with three new parameters for these commands:

  * `force:source:deploy`
  * `force:source:deploy:report`
  * `force:mdapi:deploy`
  * `force:mdapi:deploy:report`

  Use the new Boolean `--junit` parameter to specify you want JUnit-style results of your Apex tests. Use `--coverageformatters` to specify one or more formats for the code coverage information; if you don't specify the parameter, no code coverage information is generated. The possible values for this flag are:
   
   * `clover`
   * `cobertura`
   * `html-spa`
   * `html`
   * `json`
   * `json-summary`
   * `lcovonly`
   * `none`
   * `teamcity`
   * `text`
   * `text-summary`
   
   Use the `--resultsdir` parameter to specify the name of the directory in which the results are written; the default value is the deployment ID. When the command completes, the results directory contains two subdirectories; `junit` and `coverage`. The `junit` directory contains a single file called `junit.xml` with the JUnit-formatted test results. The `coverage` directory contains files for each code coverage format you specified.  
   
   This example shows how to deploy the metadata source in the `force-app` directory and run all Apex tests in the org. When the depoy completes, the Apex test results are written in JUnit format to the `test-results/junit/junit.xml` file. Code coverage information is in two files: `test-results/coverage/clover.xml` and `test-results/coverage/cobertura.xml`.
   
   ```bash
   sfdx force:source:deploy -p force-app --testlevel RunAllTestsInOrg --junit --coverageformatters clover,cobertura --resultsdir test-results  
   ```  
* FIX: The `force:source:*` commands now support the BotTemplate metadata type.

## 7.152.0 (May 26, 2022)

* FIX: We fixed some under-the-hood bugs.

## 7.151.1 (May 19, 2022)

* CHANGE: The project to [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) continues to speed along. This week we moved these commands into their own plug-ins:

    * `force:org:snapshot:create|delete|get|list`: Moved to [plugin-signups](https://github.com/salesforcecli/plugin-signups).
    * `force:org:clone`: Moved to [plugin-org](https://github.com/salesforcecli/plugin-org).

    We've improved the stability of the `force:org:clone` command. All the commands work the same as before. 
    
* FIX: The `force:data:soql:query` command correctly displays the values from multiple relationship fields. (GitHub issue [#1473](https://github.com/forcedotcom/cli/issues/1473))

* FIX: The `force:data:soql:query -r csv -q` command returns a blank for null fields; previously the command return the `null` string. (GitHub issue [#1447](https://github.com/forcedotcom/cli/issues/1447))

* FIX: The `force:source:*` commands now support these metadata types:

    * AssessmentQuestion
    * AssessmentQuestionSet
    * DataWeaveResource

* FIX: Creating manifests with `force:source:manifest:create --fromorg` now works correctly when metadata components don't have a usable `path`. (Github issue [#1492](https://github.com/forcedotcom/cli/issues/1492)). This fix is a perfect example of why we're open-sourcing Salesforce CLI,  because the bug was:
    * related to a feature originally created by [Jochen Rinder](https://github.com/jayree)
    * found and reported by [Rupert Barrow](https://github.com/RupertBarrow)
    * replicated and fixed in a PR by [Anthony Heber](https://github.com/aheber)

* FIX: Passing `--wait -1` to certain `force:mdapi` commands now causes them to wait indefinitely for the operation to complete. This functionality matches that of the corresponding `force:mdapi:legacy` commands. (GitHub issues [#1508](https://github.com/forcedotcom/cli/issues/1508), [#1511](https://github.com/forcedotcom/cli/issues/1511), and [#1519](https://github.com/forcedotcom/cli/issues/1519))

* FIX: Using `debug` logs on `force:mdapi:deploy` no longer throws a `Converting circular structure to JSON` error. (GitHub issue [#1518](https://github.com/forcedotcom/cli/issues/1518))

## 7.150.0 (May 12, 2022)

* NEW: After a successful beta and incorporating feedback from our community, the following commands that used to be in the `force:mdapi:beta` topic are now generally available:

    * `force:mdapi:deploy`
    * `force:mdapi:retrieve`
    * `force:mdapi:deploy:report`
    * `force:mdapi:retrieve:report`
    * `force:mdapi:convert`

    What does this mean? The functionality we added to `force:mdapi:beta:deploy`, for example, is now in `force:mdapi:deploy`. The functionality in the _old_ `force:mdapi:deploy` is now in `force:mdapi:legacy:deploy`. In the short term, you can use these `force:mdapi:legacy` commands if you run into issues with the new commands. The new commands are open-source and live in the [plugin-source](https://github.com/salesforcecli/plugin-source) plug-in.

    These changes to `force:mdapi:beta` commands, mentioned in older release notes entries, now apply to their GA versions:
    
    * The `force:mdapi:retrieve` command now generates a correct `package.xml` file that you can then use for deploying. 
    * Get shorter JSON output from running the `force:mdapi:deploy` or `force:mdapi:deploy:report` commands by using the new `--concise` parameter with the `--json` parameter. The new parameter omits success messages from the JSON output. 
    * When running `force:mdapi:deploy`, specify that deleted components in the destructive changes manifest file are immediately eligible for deletion with the new `--purgeondelete` parameter. By default, deleted components are stored in the Recycle Bin. 
    * Automatically extract files from the retrieved `.zip` file with the new `--unzip` parameter of the `force:mdapi:retrieve` and `force:mdapi:retrieve:report` commands. Use the `--zipfilename` parameter to specify a name for the retrieved `.zip` file.
    * We've improved the performance of the `force:mdapi:convert` command and added a spinner that shows the progress of the conversion. 

* CHANGE: We updated the `force:package:version:report --verbose` command to display a list of Apex classes that aren't passing code coverage requirements. For more details see [Determine Which Apex Classes Have Insufficient Code Coverage](https://help.salesforce.com/s/articleView?id=release-notes.rn_packaging_apex_code_coverage.htm&type=5&release=238) in Salesforce Release Notes.

## 7.149.1 (May 5, 2022)

* CHANGE: We updated the command-line help of `force:org:list --clean` to explain that the command doesn't delete non-scratch orgs. Props to @jclark-dot-org for the [feedback](https://github.com/salesforcecli/plugin-org/pull/318). 

* FIX: `force:source:pull` now ignores certain files in your `.forceignore` when the files don't exist locally.  Thank you @ImJohnMDaniel for [reporting the issue](https://github.com/forcedotcom/cli/issues/1471) with an excellent repro!

* FIX: `force:source:pull` doesn't create duplicate files that you have in your default directory but not under `main/default`.  More credit to @ImJohnMDaniel for [noticing the problem](https://github.com/forcedotcom/cli/issues/1485).

* FIX: `force:source:push` correctly pushes LWC subfolders such as `force-app/lwc/foo/lwc/myLWC/**`. Thank you @yippie for [reporting](https://github.com/forcedotcom/cli/issues/1477) :bow:.

* FIX: Deploys that time out now [include the deploy ID](https://github.com/forcedotcom/source-deploy-retrieve/pull/614), making various automations possible that previously required workarounds.

* FIX: `force:data` commands no longer throw [schema validation errors](https://github.com/forcedotcom/cli/issues/1493) for npm-based installations. 

## 7.148.3 (April 29, 2022)

> Note: we normally release on Thursdays, so you'd expect this to say April 28.  But since that's also day 2 of TDX, so we'll do the normal release stuff on Friday this week.

* CHANGE: We no longer support v12 of Node.js because of its fast approaching end-of-life ([April 30, 2022](https://nodejs.org/en/about/releases/)). We bundle Node.js in each operating system-specific Salesforce CLI installer. We include the Active LTS version of Node.js and update it in tandem with the Node.js release schedule. If you prefer to install Salesforce CLI using `npm`, we recommend you also use the Active LTS version of Node.js.

* FIX: If you run `force:source:deploy` with the `--json` parameter and it times out, the JSON error now includes the deployment ID in the `data` property. Use this ID in your scripts to do fancy tricks to handle the timeout. Because we know our customers are experts at fancy tricks!

    ```bash
    {
      "data": {
        "id": "OAf7Q00000AfTMjSAN"
      }
    }
    ```

## 7.147.1 (April 21, 2022)

 * CHANGE: What's that sound, you ask? It's the whoosh of the [Salesforce CLI open-sourcing](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) train zipping along. This week we moved these commands into the [plugin-signups](https://github.com/salesforcecli/plugin-signups) plug-in:
 
    * `force:org:shape:create`
    * `force:org:shape:delete`
    * `force:org:shape:list`

    The [Org Shape for Scratch Orgs](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_shape_intro.htm) feature is still beta. The commands work the same as before they moved into their own plug-in. 
 
* FIX: The `force:org:create` command successfully creates a scratch org when the `sfdx-project.json` file contains any of these options in the `packageDirectories` section:
 
    * `"ancestorVersion":"HIGHEST|NONE"` 
    * `"ancestorId":"HIGHEST|NONE"`
    
    (GitHub issue [#1392](https://github.com/forcedotcom/cli/issues/1392))
    
* FIX: The `force:data:bulk:upsert` command now breaks up a batch if it exceeds the max limit of 10MB characters per batch, even if the batch is below the other limit of 10K records. This fix is particular helpful if your CSV file contains extra long lines, such as when upserting large text fields. 

    Many thanks to [Anthony Heber](https://github.com/aheber) who submitted the GitHub issue, and then went ahead and fixed it. Our awesome community comes through again! (GitHub issue [#1460](https://github.com/forcedotcom/cli/issues/1460))
   
* FIX: The URLs to download the release candidates of Salesforce CLI in `.tar.xz` format are now pointing to the most recent versions.  (GitHub issue [#1478](https://github.com/forcedotcom/cli/issues/1478))


## 7.146.0 (April 14, 2022)

* FIX: The `force:source:retrieve` and `force:source:pull` commands correctly handle these metadata types:

    * AppointmentAssignmentPolicy
    * AppointmentSchedulingPolicy
    * CustomSite
    * DataSource
    * FieldRestrictionRule
    * IndustriesManufacturingSettings
    * IntegrationHubSettings
    * ObjectHierarchyRelationship
    * RestrictionRule

    (GitHub issue [#1448](https://github.com/forcedotcom/cli/issues/1448))
 
 * FIX: The `force:source:deploy` and `force:source:push` commands correctly handle metadata files that contain CDATA sections, such as `        <value><![CDATA[<p>Hello</p>]]></value>`. (GitHub issue [#1467](https://github.com/forcedotcom/cli/issues/1467))

## 7.145.0 (April 7, 2022)

* FIX: Setting your default Dev Hub while authorizing it now immediately propagates to your whole CLI environment. As a result, valid scratch org deletions no longer occasionally fail with error `Unable to associate this scratch org with a DevHub`. (GitHub issue [#1423](https://github.com/forcedotcom/cli/issues/1423))

* FIX: The `force:source:*` commands now support these metadata types:

    * DecisionMatrixDefinition
    * DecisionMatrixDefinitionVersion
    * ExpressionSetDefinitionVersion
    * ExpressionSetDefinition

## 7.144.2 (March 31, 2022)

Before we describe the changes in this week's release candidate, we have an announcement for our plug-in developers. We published new major versions of the core Salesforce CLI npm packages `@salesforce/command` and `@salesforce/core`. We're slowly migrating the core Salesforce CLI plug-ins to these new npm package versions. The migration is strictly under-the-covers and won’t have any public-facing changes. To stay current, consider migrating your plug-ins soon too.

* [@salesforce/command](https://github.com/salesforcecli/command): Upgraded to version 5. Contains the `SfdxCommand` class, which is the base class that all Salesforce CLI commands extend to access useful CLI functionality. To be honest, there aren't many changes in this new version, we upgraded it mostly for bookkeeping purposes.

* [@salesforce/core](https://github.com/forcedotcom/sfdx-core/tree/v3): Upgraded to version 3. Library that provides client-side management of Salesforce DX projects, org authentication, connections to Salesforce APIs, and other core functionality. We've made lots of changes in version 3, see [this page](https://github.com/forcedotcom/sfdx-core/blob/v3/MIGRATING_V2-V3.md) for details. Note: As of today, version 3 is still in its own v3 branch and not yet merged into main, although we plan to merge it soon.

---

One more announcement, and then I promise we'll get to the new and changed features in this release. 

As a security best practice, we highly recommend that the refresh tokens in your authorized orgs expire after 90 days (max). You configure this expiration policy in the connected app you use when you authorize the org. 

* The recommended way to configure this policy is to [create your own connected app](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_connected_app.htm) and set the [Refresh Token Policy field](https://help.salesforce.com/s/articleView?id=sf.connected_app_manage_oauth.htm&type=5) to expire in 90 days or less. You then specify this connected app with the `--clientid` parameter when you authorize an org with either [auth:web:login](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm) or [auth:jwt:grant](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_jwt_flow.htm). 

* If you already authorized an org with `auth:web:login` and didn’t specify the `–clientid parameter`, we created a default connected app in the org called **Salesforce CLI**. However, its refresh tokens are set to _never_ expire. To continue using this default connected app in a secure way, first [install it](https://help.salesforce.com/s/articleView?id=sf.connected_app_how_to_install.htm&type=5), and then edit its policies. 

We're in the process of updating the [Authorization](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth.htm) documentation with these recommendations. Okay, now back to our regularly scheduled programming. 

---

* NEW: The following commands that used to be in the `force:source:beta` topic are now generally available:

    * `force:source:push`
    * `force:source:pull`
    * `force:source:status`
    * `force:source:tracking:clear`
    * `force:source:tracking:reset`

    See [these notes](./README.md#71400-march-3-2022) for details.

* CHANGE: As part of the fix for [GitHub issue #1408](https://github.com/forcedotcom/cli/issues/1408), Salesforce CLI now uses rotating log files. By default, every day at midnight the CLI makes a backup copy of the log file and then clears out its entries to start afresh. This new behavior ensures that the log file doesn't get too big. We keep backups for the past two days along with the current day’s logs. 

    Change the default behavior with these new environment variables:

    * SFDX_LOG_ROTATION_PERIOD: How often a new log file is created. For example, a value of `1d` means a new log file is created daily, at midnight. A value of `2w` creates a new file every 2 weeks. See the _period_ entry in [this table](https://github.com/forcedotcom/node-bunyan#stream-type-rotating-file) for other options. Default value is `1d`. 
    * SFDX_LOG_ROTATION_COUNT: Number of backup files to keep. Default value is `2`. 

    For example, if you choose a rotation period of 2 weeks and a count of 2, you always have backups for the four weeks before the first entry in the current log. 

    We're also changing the name and location of the log file from `HOME_DIR/.sfdx/sfdx.log` to `HOME_DIR/.sf/sf.log`. This change will happen gradually over the coming months as we update the core Salesforce CLI plug-ins to v3 of[@salesforce/core](https://github.com/forcedotcom/sfdx-core/tree/v3).

* FIX: The JSON output when a `force:source:beta:*` command encounters an error now matches the structure of the JSON output of their existing non-beta equivalents. (GitHub issue [#1431](https://github.com/forcedotcom/cli/issues/1431)).

* FIX: The `force:mdapi:beta:retrieve` command now generates a correct `package.xml` file that you can then use for deploying. Previously, the `package.xml` file sometimes included an incorrect `<fullname>undefined</fullname>` element; the element is now omitted unless it exists in the org. 

   [Jochen Rinder](https://github.com/jayree), you're going to put us out of work. Once again, you didn't just find and report the problem, you then jumped in and submitted a PR to fix it. Thanks a bunch!

## 7.143.0 (March 24, 2022)

* FIX: We improved the performance of the `force:source:beta:push` command when pushing a large set of files (many thousands). We also fixed the recent performance regression in the `force:source:tracking:reset` command. (GitHub issues [#1394](https://github.com/forcedotcom/cli/issues/1394), [#1427](https://github.com/forcedotcom/cli/issues/1427))

## 7.142.1 (March 17, 2022)

* FIX: We fixed some under-the-hood bugs.

## 7.141.1 (March 10, 2022)
 
 * CHANGE: Due to unexpected issues, we reverted the GA of the `force:source:beta:*` commands that we announced on [March 3, 2022](https://github.com/forcedotcom/cli/blob/main/releasenotes/sfdx/README.md#71400-march-3-2022-stable). As a result, for example:

    * `force:source:status` now uses the old pre-Beta functionality.
    * `force:source:legacy:status` also uses the old functionality.
    * We readded the `force:source:beta:status` command, which uses the new Beta functionality described in [this release note](https://github.com/forcedotcom/cli/blob/main/releasenotes/sfdx/README.md#71400-march-3-2022-stable).

    The same change applies to all of these commands:
    
    * `force:source:push`
    * `force:source:pull`
    * `force:source:status`
    * `force:source:tracking:clear`
    * `force:source:tracking:reset`

    We apologize for the inconvenience and confusion. (GitHub issue [#1431](https://github.com/forcedotcom/cli/issues/1431))

 * CHANGE: The project to [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) marches along. This week we moved the `force` command into the [plugin-info](https://github.com/salesforcecli/plugin-info) plug-in.

* FIX: The `force:source:*` commands now support these metadata types:

    * ActivationPlatform
    * AdvAcctForecastDimSource
    * ApplicationSubtypeDefinition
    * AppointmentAssignmentPolicy
    * BusinessProcessTypeDefinition
    * CareLimitType
    * DataConnectorIngestApi
    * DataSourceTenant
    * ESignatureConfig
    * ESignatureEnvelopeConfig
    * ExplainabilityActionDefinition
    * ExplainabilityActionVersion
    * InternalDataConnector
    * MobSecurityCertPinConfig
    * MobileSecurityAssignment
    * MobileSecurityPolicy
    * MobileSecurityPolicySet
    * OmniInteractionAccessConfig
    * ProductAttributeSet
    * RecordAlertCategory
    * RecordAlertDataSource
 
## 7.140.0 (March 3, 2022)

* NEW: After a successful beta and great feedback from our community, the following commands that used to be in the `force:source:beta` topic are now generally available: 

    * `force:source:push`
    * `force:source:pull`
    * `force:source:status`
    * `force:source:tracking:clear`
    * `force:source:tracking:reset`

    What does this mean? The functionality we added to `force:source:beta:push`, for example, is now in `force:source:push`. The functionality in the _old_  `force:source:push` is now in `force:source:legacy:push`. In the short term, you can use these `force:source:legacy` commands if you run into issues with the new commands. 

    The new commands continue to live in the open-source [plugin-source](https://github.com/salesforcecli/plugin-source) plug-in and use the open-source [source-tracking library](https://github.com/forcedotcom/source-tracking). This library provides direct interaction with your local source-tracking files using git. The commands also use the open-source and better-performing [source-deploy-retrieve](https://github.com/forcedotcom/source-deploy-retrieve) library, just like VSCode and the `force:source:deploy|retrieve` commands.

    A word of warning: we changed the format of the internal files the commands use to track your source. We also store them in different locations than the old commands. As a result, you can’t use the old source-tracking files with the new commands. You have a few options:

    * If you want to use the new commands with an existing scratch org or sandbox, run `force:source:legacy:tracking:clear` or `force:source:legacy:tracking:reset`. If you try to use an existing org without resetting or clearing its tracking files, we display an error and tell you which command to run. 
    * Create a scratch org or sandbox, which doesn’t have any associated source-tracking files yet.
    * Keep using the `force:source:legacy:*` commands until you’re ready to make the switch to the new commands using one of the preceding options. 

    We’ve regularly updated these release notes with other exciting changes to the beta commands. These changes now apply to their equivalent GA commands. Here’s a recap:

    * The commands support storing multiple `.gitignore` files in as many places in your packageDirectories as you want. 
    * The `force:source:status` command has a new `--concise` parameter to display terser output. For example, the output doesn't include ignored files. 
    * The `force:source:push|pull` commands are more tolerant when they encounter certain network problems, such as ETIMEDOUT, ECONNRESET, ENOTFOUND and 'socket hang up' errors. The commands now keep trying to connect, at least up to the time specified by the `--wait` parameter. They also display warnings and debugging information so the user knows what's going on. Previously the commands failed on the first connection problem. 
    * The `force:source:push` command uses a new `pushPackageDirectoriesSequentially` option in `sfdx-project.json` to push `packageDirectories` sequentially rather than in one transaction. This change unblocks certain complex deployments. See the [Beta announcement](https://github.com/forcedotcom/cli/issues/1258) for more details and a code example. 
    * The `force:source:push` command has a new `–quiet` parameter that suppresses the displayed list of successfully deployed metadata components. You still see all the error messages, don’t worry.  
    * The commands always check your `.forceignore` file and the package directories configured in your `sfdx-project.json` file and immediately pick up any changes.
    * We removed the `--all` parameter of `force:source:status`. We also no longer accept the combined use of the `--local` and `--remote` parameters. To view source changes in both your local project and an org, run the command with no parameters.
    * The `force:source:status` command now displays which changes, if any, are covered by your `.forceignore` file. These changes aren’t included in a push or pull.
    * One gotcha: Due to changes in the design and performance of the code for deploying and retrieving metadata, the Salesforce CLI-specific hooks have also changed. In particular, we've removed the redundant `postsourceupdate` hook; use `postretrieve` instead. Also, the hook result types have changed. We've updated the [sample repo](https://github.com/salesforcecli/plugin-metadata-hook-demo/blob/master/README.md) with the changes. We're currently updating the [Hooks topic of the Salesforce CLI Plug-In Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins_customize_hooks.htm) with the new information; check back soon for details. 

    We appreciate all your help in testing these beta commands. Thanks a bunch!

* NEW: Create a manifest file from all the metadata components in your org with the new `–fromorg` parameter of the `force:source:manifest:create` command. Set the parameter to the username or alias of your org. 

    By default, the command excludes metadata components contained in your org’s packages. To also include these components in your manifest, set the new `–includepackages` parameter to the type of package, either `managed`, `unlocked`, or both. 
    
    For example, to generate a manifest file that contains all metadata components in an org with alias `my-scratch` and the components defined in all unlocked and managed packages, run this command:
    
    `sfdx force:source:manifest:create –fromorg my-scratch –includepackages managed,unlocked`
    
    Many thanks to [Jochen Rinder](https://github.com/jayree) who thought of the nifty new feature and then submitted a PR with the code.

* FIX: The `force:source:*` commands now support these metadata types:

	* FlowTest
	* UiViewDefinition

* FIX: The `force:org:beta:create` command correctly sets the new org as your default when you specify the `-s|--setdefaultusername` parameter. (GitHub issue [#1400](https://github.com/forcedotcom/cli/issues/1400))
 
## 7.139.0 (Feb 24, 2022)

* NEW: We know you love the source-tracking feature of `force:source:push|pull`, and now you can use it with the `force:source:deploy|retrieve|delete` commands too!  We've added these Boolean parameters to the three commands:

    * `--tracksource` : Enable source-tracking for a single command run. 
    * `--forceoverwrite` : Ignore conflict warnings and overwrite source in the org (when deploying) or locally (when retrieving). 

    Think of all the exciting things you can now do:
    
    * **Deploy or retrieve only specified changes**. For example, retrieve a single Apex class and update your tracking files rather than having to retrieve _all_ the changes in your org with `force:source:pull`. 

         `sfdx force:source:retrieve -m ApexClass:MyFabClass --tracksource`

    * **Identify conflicts**. Let's say you want to deploy a single Apex class. If the command detects a conflict with the class in the org, the class isn't deployed and you get a message about the conflict. Then you can decide what to do, such as rerun the command with `--forceoverwrite` to overwrite the class in the org.

        `sfdx force:source:deploy -m ApexClass:MyFabClass --tracksource --forceoverwrite`

    * **Repair tracking files**. Let's say you start a deploy, but you lose your internet connection. The deploy eventually completes, but your local source tracking files are now incorrect. What to do?  Easy!  Run this command to make your local source look like your org and make all your source-tracking files correct again: 

        `sfdx force:source:retrieve -p <dirs> --tracksource --forceoverwrite`

    Keep these considerations in mind: 
    
    * We recommend that you keep using `force:source:push|pull` to sync all changes between your local source and org rather than specific changes.  
    * This new feature doesn't handle deletes. For example, if you delete a metadata component in your org and want to also delete it locally, you must use `force:source:push`. 
    * You can, however, delete local source by specifying the destructive changes parameters (`--postdestructivechanges` and `--predestructivechanges`) of `force:source:delete|deploy`.
    * **Important**: These new source-tracking flags are compatible only with the source-tracking files associated with the [new `force:source:beta:*` commands](https://github.com/forcedotcom/cli/issues/1258). You can't use these flags with source-tracking files associated with the non-beta commands, such as the current `force:source:push`. 

* CHANGE: We removed the `force:lightning:lint` command. We deprecated the command on [April 29, 2021](#7990-april-29-2021---salesforcedx-51100). Use the [eslint-plugin-aura npm package](https://github.com/forcedotcom/eslint-plugin-aura) instead.
    
* CHANGE: The `force:org:beta:create` command is more tolerant when it encounters certain network problems, such as ETIMEDOUT, ECONNRESET, ENOTFOUND and 'socket hang up' errors. The command now keeps trying to connect, at least up to the time specified by the `--wait` parameter. It also displays warnings and debugging information so the user knows what's going on. Previously the command failed on the first connection problem.

* FIX: The `force:source:beta:push` command now correctly handles failed deployments of `Settings` metadata component types.  (GitHub issue [#1401](https://github.com/forcedotcom/cli/issues/1401))

* FIX: The `force:source:beta:push` command correctly handles metadata types that are in folders, such as Document and EmailTemplate. (GitHub issue [#1398](https://github.com/forcedotcom/cli/issues/1398))

* FIX: We've improved the performance of the `force:source:beta:push` command. Special thanks to [mchadwickffdc](https://github.com/mchadwickffdc) and [David Esposito](https://github.com/daveespo) who found the issue and provided excellent data and feedback to help us fix it. Community beta-testing at its best! (GitHub issue [#1394](https://github.com/forcedotcom/cli/issues/1394))

* FIX: We've improved the performance of the `force:source:retrieve` command when deploying StaticResource metadata components. (GitHub issue [#1348](https://github.com/forcedotcom/cli/issues/1348))

## 7.138.1 (Feb 17, 2022)

* CHANGE: Vroom, vroom, the project to [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) continues to speed along! This week we moved these commands into the [plugin-community](https://github.com/salesforcecli/plugin-community) plug-in:

    * `force:community:create`
    * `force:community:publish`
    * `force:community:template:list`

    They all work the same as before. Go build a community. 
 
* CHANGE: If you specify an invalid scratch org definition file with the `force:org:beta:create` command, we now display more information in the error to help you troubleshoot the problem. When the beta command becomes generally available, the equivalent GA command `force:org:create` will also display the improved error message. 

* CHANGE: The `force:source:*` commands display a warning when they find a `.forceignore` file that incorrectly uses the backslash (`\`) as a folder separator. The correct syntax is to use the slash (`/`), same as the [`.gitignore` syntax](https://git-scm.com/docs/gitignore). While we currently accept both separators, we plan to stop supporting the backslash soon.   

* FIX: FIX: You can now successfully create an unlocked package version. Previously the command failed with an error about an invalid ancestor or an invalid subscriber package version ID. (GitHub issue [#1403](https://github.com/forcedotcom/cli/issues/1403))

* FIX: You can now run the `info:releasenotes:display` command from behind a Web proxy. (GitHub issue [#1378](https://github.com/forcedotcom/cli/issues/1378))

* FIX: The `force:source:*` commands support symlink (symbolic link) source paths.  (GitHub issue [#1375](https://github.com/forcedotcom/cli/issues/1375))

* FIX: When you create a user with the `force:user:create` command, Salesforce CLI now uses your MyDomain URL when it authenticates the new user. This change fixes an authentication error when running the command to create an Experience Cloud user on a preview (API version 54.0) scratch org when using JWT. (GitHub issue [#1365](https://github.com/forcedotcom/cli/issues/1365))

* FIX: When you run the `force:data:soql:query` command, and the SOQL query includes a field that contains JSON content, the results now display the actual JSON content. Previously the results would display the unhelpful `[object Object]` text. (GitHub issue [#1318](https://github.com/forcedotcom/cli/issues/1318))

* FIX: The `force:data:record:update` command properly parses JSON content when passed as a field value with the `-v` parameter. (GitHub issue [#72](https://github.com/forcedotcom/cli/issues/72))

## 7.137.1 (Feb 10, 2022)

* NEW: Quickly preview a Visualforce page in your browser by specifying the page to the `force:source:open` command. Visualforce pages have the `.page` suffix.  

    `sfdx force:source:open -f force-app/main/default/pages/StartVFPage.page`
    
    Many thanks to [Fodil Boudjedien](https://github.com/fodilo) for designing the new feature and then taking the initiative to submit a PR with the code. It even included tests -- awesome. Keep 'em coming, community! (GitHub issue [#1386](https://github.com/forcedotcom/cli/issues/1386))
    
* NEW: You're now required to set a package ancestor when you create a 2GP managed package version. To make it easier to increment your package ancestor version number, we added two keywords to the `packageDirectories` section of the `sfdx-project.json` file. We also added a parameter to the `force:package:version:create` command to override this requirement: `--skipancestorcheck`. Get all the details [here](https://help.salesforce.com/s/articleView?id=release-notes.rn_packaging_ancestor_enhancements.htm&type=5&release=236) and [here](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_dev2gp_config_ancestors.htm). 

* CHANGE: When running `force:package:version:create`, we now correctly fail to create the package version if we detect duplicate package dependencies in the `sfdx-project.json` file.

## 7.136.2 (Feb 3, 2022)

* NEW: Get shorter JSON output from running the `force:mdapi:beta:deploy` or `force:mdapi:beta:deploy:report` commands by using the new `--concise` parameter with the `--json` parameter. The new parameter omits success messages from the JSON output. When the two beta commands become generally available, the GA commands, such as `force:mdapi:deploy`, will also have the new parameter. 

* NEW: When running `force:source:deploy`, specify that deleted components in the destructive changes manifest file are immediately eligible for deletion with the new `--purgeondelete` parameter. By default, deleted components are stored in the Recycle Bin. The `force:mdapi:beta:deploy` command also has this new parameter, and we'll add it to `force:mdapi:deploy` when the beta version becomes generally available. 

* CHANGE: The [Salesforce CLI open-sourcing train](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) is speeding along and this week we've created the `force:org:beta:create` beta command in the [plugin-org](https://github.com/salesforcecli/plugin-org) plug-in. The command works the same as its equivalent existing one. Try out this beta command before we make the open-source version of `force:org:create` generally available.

* CHANGE: We now display a warning message when you run `sfdx update` and haven't yet [uninstalled](https://github.com/forcedotcom/cli/blob/main/releasenotes/sfdx/README.md#71063-june-17-2021) that pesky `salesforcedx` plug-in. Having it installed can cause unexpected behavior, so we really want it gone. First see if you still have it, and then uninstall it if you do:

    ```bash
    sfdx plugins --core
    sfdx plugins:uninstall salesforcedx
    sfdx update
    ```
    
    And pow, all those peculiar CLI issues you had are now solved. (GitHub issue [#1304](https://github.com/forcedotcom/cli/issues/1304))

* FIX: The `auth:accesstoken:store` command uses the correct short parameter name (`-d`) for setting your default Dev Hub org and now matches the other `auth` commands. Thanks to [Matthias Rolke](https://github.com/amtrack) for submitting [the fix](https://github.com/salesforcecli/plugin-auth/pull/359). PRs are even better than issues! 

* FIX: The `force:source:convert` command works correctly with object translations (CustomObjectTranslation metadata type). (GitHub issue [#1383](https://github.com/forcedotcom/cli/issues/1383))

* FIX: Deploying metadata with the REST API now automatically refreshes your authentication token when necessary. (GitHub issues [#899](https://github.com/forcedotcom/cli/issues/899), [#912](https://github.com/forcedotcom/cli/issues/912))

* FIX: We've updated the full Salesforce CLI Docker image on [Docker Hub](https://hub.docker.com/r/salesforce/salesforcedx/tags?page=1&ordering=last_updated) to use the latest LTS version of Node.js (v16.13.1). 

* FIX: The `force:source:*` commands now support the EmailTemplateFolder metadata type. (GitHub issue [#1345](https://github.com/forcedotcom/cli/issues/1345))


## 7.135.0 (Jan 27, 2022)

* CHANGE: Have we mentioned that we're [open-sourcing Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021)? This week we moved the `force:source:ignored:list` command into the [plugin-source](https://github.com/salesforcecli/plugin-source) plug-in. It works the same as before. 

* FIX: The `force:source:pull` and `force:source:retrieve` commands correctly retrieve and merge the CustomLabels metadata type. (GitHub issue [#1317](https://github.com/forcedotcom/cli/issues/1317))

* FIX: The `force:source:beta:*` commands support storing multiple `.gitignore` files in as many places in your `packageDirectories` as you want. Previously, the `.gitignore` files would affect source tracking and sometimes result in unexpected behavior. (GitHub issue [#1335](https://github.com/forcedotcom/cli/issues/1335))

## 7.134.0 (Jan 20, 2022)

* NEW: Display terser output by running the `force:source:beta:status` command with the new `--concise` parameter. For example, the output doesn't include ignored files. (GitHub issue [#1312](https://github.com/forcedotcom/cli/issues/1312))

* CHANGE: The project to [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021) is chugging along smoothly, and this week we've created these beta commands in the [plugin-source](https://github.com/salesforcecli/plugin-source) plug-in:

    * `force:mdapi:beta:retrieve`
    * `force:mdapi:beta:retrieve:report` 
    
    We also improved the commands by adding these two parameters to each one:
    
    * `--unzip`: Automatically extract files from the retrieved `.zip` file
    * `--zipfilename`: Specify a name for the retrieved `.zip` file

    Other than these new parameters, the commands work the same as their equivalent existing ones. Try out these beta commands before we make the open-source versions of `force:mdapi:retrieve` and `force:mdapi:retrieve:report` generally available.
    
* FIX: We've improved how the `force:source:beta:*` commands match package name directories. Previously, for example, `force:source:beta:deploy` deployed metadata in a directory that wasn't defined in `sfdx-project.json` if its name started with the same string as a legitimate package directory, such as `force-app-extra` and `force-app`. (GitHub issue [#1336](https://github.com/forcedotcom/cli/issues/1336))

* FIX: The `force:project:create` command creates a `sfdx-project.json` file with the correct `sourceApiVersion` (53.0). (GitHub issue [#1278](https://github.com/forcedotcom/cli/issues/1278))

## 7.133.0 (Jan 13, 2022)

Happy new year, Salesforce CLI community!

* NEW: We're pretty proud and excited about the new features and fixes we release in Salesforce CLI each week. And we want you to know about them! So when you run `sfdx update`, we now automatically display the release notes for the version you're updating to.  

    Under the covers, the update is simply running the [info:releasenotes:display](https://github.com/forcedotcom/cli/blob/main/releasenotes/sfdx/README.md#71301-dec-9-2021) (alias `whatsnew`) command, which you can run anytime to read the release notes again. Which I'm sure you're eager to do.  
    
    Configure this feature with these environment variables:
    
    * `SFDX_HIDE_RELEASE_NOTES`: Set to `true` to silence the automatic display of the release notes when you run sfdx update. Default value is `false`.
    * `SFDX_HIDE_RELEASE_NOTES_FOOTER`: Set to `true` to stop displaying the boilerplate footer. Default value is `false`.

* CHANGE: We continue on our journey of [open-sourcing Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021), and this week we've created these beta commands in the [plugin-source](https://github.com/salesforcecli/plugin-source) plug-in:

    * `force:mdapi:beta:deploy`
    * `force:mdapi:beta:deploy:report` 
    
    Both beta commands work the same as their equivalent existing commands. Try out these beta commands before we make the open-source versions of `force:mdapi:deploy` and `force:mdapi:deploy:report` generally available.

* CHANGE: If the `info:releasenotes:display` command can't find an exact match of the installed CLI version in the release notes, the command displays the notes for the closest version. The command behaves the same way if it can't find the exact version specified by the `–version` parameter in the release notes. 

* FIX: We've changed the polling frequency of the `force:source` commands based on the size of the deployment. In general, we poll more frequently when the deployment is small and less frequently when it's large. This new behavior results in quicker-feeling smaller deployments, and reduces the API requests, and thus network traffic, for large deployments. 

* FIX: We've improved the error message when Salesforce CLI encounters invalid XML, such as a badly formed metadata source file during a deployment. (GitHub issue [#1261](https://github.com/forcedotcom/cli/issues/1261))

* FIX: The command `force:source:retrieve -m CustomFieldTranslation` correctly retrieves the field translation source files, even if there's no parent CustomObjectTranslation in the org. In this case, the command generates an empty CustomObjectTranslation source file. Previously the command retrieved only the CustomFieldTranslation source files, which are invalid by themselves without a CustomObjectTranslation parent file. (GitHub issues [#1233](https://github.com/forcedotcom/cli/issues/1233), [#1241](https://github.com/forcedotcom/cli/issues/1241), [#1262](https://github.com/forcedotcom/cli/issues/1262)) 

* FIX: If you run the `force:data:record:update` command but submit invalid data that violates a validation rule, the command now returns the actual validation error from the org. (GitHub issue [#1327](https://github.com/forcedotcom/cli/issues/1327))

* FIX: We've improved the error message when the command `force:org:create` is unable to reset the source tracking after creating the scratch org and deploying the settings. (GitHub issue [#1337](https://github.com/forcedotcom/cli/issues/1337))


## 7.132.0 (Dec 23, 2021)

NOTE: Because of the holidays, we're not publishing a new `stable-rc` release today or next week (Dec 30, 2021). We'll return to our regular weekly release schedule on Jan 6, 2022. (Yikes, it's almost 2022. How did that happen?) We hope you have a joyful and peaceful holiday season, and see you in the new year! 

* CHANGE: The `force:source:deploy|retrieve|convert` and `force:source:beta:push|pull` commands are more tolerant when they encounter certain network problems, such as ETIMEDOUT, ECONNRESET, ENOTFOUND and 'socket hang up' errors. The commands now keep trying to connect, at least up to the time specified by the `--wait` parameter. They also display warnings and debugging information so the user knows what's going on. Previously the commands failed on the first connection problem. (GitHub issues [#529](https://github.com/forcedotcom/cli/issues/529), [#1007](https://github.com/forcedotcom/cli/issues/1007), [#1301](https://github.com/forcedotcom/cli/issues/1301))

* FIX: The `force:org:create` command no longer returns the error `ERROR running force:org:create: Unrecognized option: cookiesAllowAllPaths`. This error occurred only on npm-based installations of Salesforce CLI running version 7.120.0 or earlier. (GitHub issue [#1323](https://github.com/forcedotcom/cli/issues/1323))

* FIX: The command `force:data:soql:query` correctly runs SOQL queries that use the `count()` aggregate function without a field name, such as `SELECT COUNT() FROM Account WHERE Name LIKE 'a%'`.  Previously the command showed 0 records returned and displayed the erroneous `Warning: The query result is missing YY records due to a ZZ record limit.` (GitHub issue [#1320](https://github.com/forcedotcom/cli/issues/1320))

## 7.131.0 (Dec 16, 2021) 

* CHANGE: Installing the `sfdx` executable with the `npm install sfdx-cli -g` command no longer installs the `@salesforce/cli` package, which corresponds to the `sf` executable. 

   To install `sf` via npm, run this command: `npm install @salesforce/cli -g`. 
   
   Installing Salesforce CLI with the installers and TAR files hasn't changed; they still install both the `sfdx` and `sf` executables.
   
## 7.130.1 (Dec 9, 2021)

* NEW: Assign permission set licenses to users with the new `force:user:permsetlicense:assign` command. The command works similarly to the existing `force:user:permset:assign` command. This example shows how to assign the permission set license named `DreamHouse` to a user with username `me@my.org`:

    ```bash
    sfdx force:user:permsetlicense:assign -n DreamHouse -u me@my.org
    ```

* NEW:  Quickly catch up on the new and changed features in any Salesforce CLI release with the new `info:releasenotes:display` command (alias `whatsnew`). By default, the command displays the release notes for the Salesforce CLI version that's currently installed. Use the `--version|-v` parameter to specify a specific CLI version or a tag, such as `stable-rc`. For example:

    ```bash
    sfdx whatsnew
    sfdx whatsnew --version stable-rc
    sfdx whatsnew -v 7.127.0 
    ```
* NEW: Find out who created a package, package version, or package version creation request with the updated output of the following commands, which now includes a `Created By` property:

    * `force:package:list --verbose`
    * `force:package:version:list --verbose`
    * `force:package:version:report`
    * `force:package:version:create:list`
    * `force:package:version:create:report`

* NEW: The `force:source:beta:push` command uses a new `pushPackageDirectoriesSequentially` option in `sfdx-project.json` to push packageDirectories sequentially rather than in one transaction.  This should unblock certain complex deployments.  See the [Beta announcement](https://github.com/forcedotcom/cli/issues/1258) for more details and a code example. (GitHub issue [#1269](https://github.com/forcedotcom/cli/issues/1269))

* CHANGE: For security reasons, we no longer display the URL by default in the terminal or command window when you run `force:org:open`. We continue to display the URL when you specify either the `--urlonly` or `--json` parameters, but we also show a security warning about displaying sensitive information. 

* CHANGE: We continue to [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021), and this week we moved the `force:org:delete` command into the [plugin-org](https://github.com/salesforcecli/plugin-org) plug-in. The command works the same as before.

* FIX: We updated the `--help` of the `auth:sfdxurl:store` command to better explain the format of the SFDX auth URL. We also added that you can't obtain the URL from `force:org:display` if you authorized the org using the JWT bearer flow.  (GitHub issues [#1297](https://github.com/forcedotcom/cli/issues/1297) and [#1298](https://github.com/forcedotcom/cli/issues/1298)). 

* FIX: The `force:mdapi:listmetadata -m MDType` command correctly returns properties of metadata components. Previously it returned the error `No metadata for type: MDType`. (GitHub issue [#1285](https://github.com/forcedotcom/cli/issues/1285))

* FIX: Successfully ignore children of decomposed metadata types when you deploy or retrieve by adding the children to the `.forceignore` file.  For example, if you add `**/Account/listViews/**` to your `.forceignore` file and then run `force:source:retrieve -m CustomObject:Account`, the command doesn't retrieve any list views for the Account object. Previously the command would incorrectly retrieve them.  (GitHub issue [#938](https://github.com/forcedotcom/cli/issues/938))

## 7.129.0 (Dec 2, 2021)

* NOTE: Because of the Thanksgiving holiday, we didn't publish a release candidate last Thursday. As a result, this week's `stable` release is the same as last week's (Nov 25, 2021).  

* CHANGE: We continue to [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021), and this week we've moved these commands into the [plugin-source](https://github.com/salesforcecli/plugin-source) plug-in:

    * `force:mdapi:deploy:cancel`: Works the same as before.
    * `force:mdapi:beta:convert`: This command is the beta version of `force:mdapi:convert`. We've improved the performance and added a spinner that shows the progress of the conversion. Try out the beta version before we move the `force:mdapi:convert` command into plugin-source and make it generally available.

## 7.127.0 (Nov 18, 2021)

* CHANGE: We continue to [open-source Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021), and this week we've moved the `force:mdapi:listmetadata` and `force:mdapi:describemetadata` commands into the [plugin-source](https://github.com/salesforcecli/plugin-source) plug-in. The commands work the same as before, except for an improvement in the JSON output.

    Previously, if you ran `force:mdapi:describemetadata` with both `--resultfile` and `--json` parameters, the `message` property of the JSON output included only the name of the result file. We now include the actual information that's in the result file. We made a similar change to `force:mdapi:listmetadata`, where we also made the JSON output consistent regardless of the number of returned metadata properties. Previously, the JSON output was different depending on the number of returned properties.
   
## 7.126.0 (Nov 11, 2021)

* CHANGE: We're deprecating the `--all` parameter of `force:source:status`. We're also deprecating the combined use of the `--local` and `--remote` parameters. To view source changes in both your local project and an org, run the command with no parameters.

* FIX: The `force:source:deploy|retrieve|convert` commands are smarter about classifying metadata. Previously, for example, the commands naively classified the metadata file `classes/foo/objects/myClass.cls` as a CustomObject simply because the word `objects` was in the directory path. The commands now determine the actual metadata type, such as an ApexClass. 

* FIX: We've improved Salesforce CLI's internal metadata registry so it better handles the Workflow and SharingRules metadata types.

    Thank you, [Jochen Rinder](https://github.com/jayree), for contributing the code for this fix. We love that you, and our awesome community, take the time and initiative to improve the CLI. It keeps us on our toes too. Keep those contributions coming!

* FIX: We fixed a bug where the CLI confused SiteDotCom and CustomSite and would fail with `Expected source files for type 'SiteDotCom'`

## 7.125.0 (Nov 4, 2021)

* NEW: We've greatly improved the source tracking commands, and we'd love you to try out the beta versions before we make them generally available.  

    We're doing something different this time: rather than provide the beta commands in a separate plug-in, we're including them right in this release. The beta command names are similar to the existing ones, but are in the `force:source:beta` topic:
    
	* `force:source:beta:pull`
	* `force:source:beta:push`
	* `force:source:beta:status`
	* `force:source:beta:tracking:clear`
	* `force:source:beta:tracking:reset`

    The existing commands, such as `force:source:pull`, continue to work as before. Check out [Source Tracking Beta](https://github.com/forcedotcom/cli/issues/1258) for additional details and gotchas.

* NEW: Specify the browser to use with the `force:org:open` command with the new `--browser|-b` parameter. Supported browsers are `chrome`, `edge`, and `firefox`. If you don't specify `--browser`, the org opens in your default browser. For example, to open an org in Firefox:

    `sfdx force:org:open --browser firefox`
    
    Thank you, [Todd Halfpenny](https://github.com/toddhalfpenny), for [requesting the nifty new feature](https://github.com/forcedotcom/cli/issues/1015), and then taking the initiative and contributing the code yourself. We love contributions from the community, and look forward to many more!
    
* FIX: We fixed a bug that prevented `sfdx update` from also updating `sf` to its latest version.

* FIX: The `force:source:retrieve` command correctly retrieves CustomObjectTranslation metadata types into new projects. Previously you'd get the error `ERROR running force:source:retrieve: Metadata API request failed: Component conversion failed`.  ([GitHub issue #1233](https://github.com/forcedotcom/cli/issues/1233))

* FIX: We restarted publishing the full versions of the Salesforce CLI Docker container images on [Docker Hub](https://hub.docker.com/r/salesforce/salesforcedx/tags?page=1&ordering=last_updated).  ([GitHub issue #1249](https://github.com/forcedotcom/cli/issues/1249))

## 7.124.0 (Oct 28, 2021)

* NEW: Delete metadata components in your org at the same time you run `force:source:deploy --manifest` with the new `--predestructivechanges` and `--postdestructivechanges` parameters. Similar to how the `--manifest` parameter works, set the new parameters to a manifest file. But rather than deploy the components in the file, the command deletes them from your org. Depending on the parameter, the delete executes either before (`pre`) or after (`post`) the deploy. 
 
     For example, this command deletes the components in the `preDestruct.xml` manifest file before you deploy the components in the `package.xml` file:

    `sfdx force:source:deploy --manifest package.xml --predestructivechanges preDestruct.xml`
    
    Don't have a manifest file handy?  No problem, run the `force:source:manifest:create` command to create one! This example shows how to create a file that you can use to delete the `NoLongerNeededClass` Apex class:
    
    `sfdx force:source:manifest:create -m ApexClass:NoLongerNeededClass --manifestname preDestruct.xml`
    
    See [Deleting Components from an Org](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_deleting_files.htm) in the Metadata API Developer Guide for more information about using destructive change manifest files. 

## 7.123.0 (Oct 21, 2021) 

* FIX: The `force:source:deploy|retrieve|convert|delete` commands support the `EclairGeoData` metadata type again.

* FIX: The `force:org:display --json` command displays in the JSON output the security warning about exposing sensitive information, consistent with the other commands. ([GitHub issue #1229](https://github.com/forcedotcom/cli/issues/1229))

* FIX: The `force:org:open` command correctly opens sandboxes in the `.mil` domain. Previously the command tried to open a different domain. 

## 7.122.1 (Oct 14, 2021)

* NEW: The `force:source:deploy|retrieve|convert|delete` commands support these Slack-related metadata types that are new in the Winter '22 Salesforce release: `ViewDefinition` and `SlackApp`.

* FIX: The `force:source:deploy|retrieve|convert|delete` commands support the `SharingGuestRule` metadata type again. ([GitHub issue #1199](https://github.com/forcedotcom/cli/issues/1199))

* FIX: The `force:source:delete` command no longer fails when you try to delete metadata types that are in the org, but not in your local project directory. Previously you'd get the error `Entity of type MD-Type named MD-Type-Name cannot be found`.  ([GitHub issue #1203](https://github.com/forcedotcom/cli/issues/1203))


## 7.121.8 (Oct 7, 2021)

* CHANGE: As we announced on [March 18, 2021](./README.md#5140-march-18-2021---cli-7920), the `--json` output of the `force:org:list` command no longer returns the property `connectedStatus` for scratch orgs. We've also removed the warning. 

* FIX: When you delete a scratch org with the `force:org:delete` command, we now ensure that the associated Dev Hub org always deletes the corresponding record from the ActiveScratchOrg object. Previously, in certain circumstances, the record wasn't deleted, which could cause you to incorrectly exceed over your scratch org limit. ([GitHub issue #1155](https://github.com/forcedotcom/cli/issues/1155))

* FIX: The `force:source:convert` command correctly converts the `CustomFieldTranslation` metadata type.

## 7.120.0 (Sept 30, 2021)

* NEW: Some commands (`force:org:open`, `force:org:display`, `force:user:display`, `force:source:open`) display tokens and URLs with tokens embedded in them.  They now include a warning about the risks of sharing that sensitive information. 

* NEW: We've added a warning and additional information to explain why the command `force:source:retrieve -m CustomField` succeeds but returns no results, even when your org contains custom fields. This behavior is expected because the Metadata API never returns results if you retrieve the `CustomField` type on its own without also retrieving `CustomObject`. If you want to retrieve all your custom fields, try this command instead: `force:source:retrieve -m CustomField,CustomObject`.

    You get the same behavior if you run `force:source:retrieve -x manifest` and your manifest file contains a `CustomField` entry with an `*` to retrieve all custom fields, but no `CustomObject` entry. Check out the new warning for hints to actually retrieve your custom fields.

* NEW: Specify the level of deployment tests to run when you delete metadata source files with the new `--testlevel` parameter of `force:source:delete`. The new parameter works the same as the `--testlevel` parameter of `force:source:deploy`, although the list of valid values is shorter: `NoTestRun`, `RunLocalTests`, and `RunAllTestsInOrg`. See the [CLI Reference guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_source.htm#cli_reference_force_source_deploy) for more information about each value. 

    For example, to run all org tests when you delete the MyMetadataType type from both your local project and the org, run this command:
    
    `sfdx force:source:delete --metadata MyMetadataType --testlevel RunAllTestsInOrg`
    
    As a result of this new feature, [GitHub issue #971](https://github.com/forcedotcom/cli/issues/971) is fixed.
    
* CHANGE: As we [warned last year](./v50.md#5020-october-22-2020---cli-7771), the `force:source:*` commands no longer support the old format of the `.forceignore` file. When parsing the `.forceignore` file, the commands now always use the same rules and patterns as [git uses with the `.gitignore` file](https://git-scm.com/docs/gitignore). 
 
* FIX: The `force:source:deploy|retrieve|convert` commands now support the Reports, Dashboards, Documents, and EmailTemplates metadata types when they're nested in directories of more than one level. (GitHub issues [#1112](https://github.com/forcedotcom/cli/issues/1112) and [#1173](https://github.com/forcedotcom/cli/issues/1173))

* FIX: The `force:source:deploy` command provides more failure details in situations where it previously reported the un-helpful `Deploy Failed`

* FIX: The `force:org:create` command now uses only polling, and not the Streaming API, to listen for updates about the scratch org creation. As a result, you no longer get the error `Socket timeout occurred while listening for results` if the scratch org creation takes a long time. ([GitHub issue #1149](https://github.com/forcedotcom/cli/issues/1149))

## 7.119.2 (Sept 24, 2021)

* FIX: The `force:mdapi:deploy:cancel` command no longer fails with the error `TypeError: MdapiCancelCommandImpl is not a constructor`.

* FIX: The `force:source:deploy|retrieve|convert` commands now support the ManagedTopics metadata type. ([GitHub issue #1192](https://github.com/forcedotcom/cli/issues/1192))

* FIX: The `force:source:deploy|retrieve|convert` commands now support the Reports, Dashboards, Documents, and EmailTemplates metadata types. Note that these types don't yet work when nested in directories more than one level. We're working on the fix. (GitHub issues [#1165](https://github.com/forcedotcom/cli/issues/1165) and [#1180](https://github.com/forcedotcom/cli/issues/1180))

* FIX: `plugins:install` no longer fails for Windows users (Github issue [#1198](https://github.com/forcedotcom/cli/issues/1198)) as part of the change to support plugins in private npm packages and private registries.

## 7.118.1 (Sept 16, 2021)

* FIX: The `force:source:deploy|retrieve|convert` commands now support the SharingCriteriaRule, SharingOwnerRule, AutoResponseRule, and AssignmentRule metadata types. ([GitHub issue #833](https://github.com/forcedotcom/cli/issues/833))

## 7.117.0 (Sept 9, 2021)

* FIX: The `force:source:deploy|retrieve|convert` commands now support the RestrictionRule metadata type. ([GitHub issue #1158](https://github.com/forcedotcom/cli/issues/1158))
    
* FIX: As a result of a recent Salesforce CLI bug fix, the `force:source:deploy|retrieve|convert` commands incorrectly started including the CustomFieldTranslation metadata type in the manifest when handling CustomObjectTranslation types. Because the Metadata API doesn't support CustomFieldTranslation, deploys and retrieves resulted in the error `Unknown type name 'CustomFieldTranslation' specified in package.xml` The commands no longer include the CustomFieldTranslation type in the manifest. (GitHub issues [1135](https://github.com/forcedotcom/cli/issues/1135) and [1161](https://github.com/forcedotcom/cli/issues/1161)) 

* FIX: We’ve improved the error when the `force:source:deploy|retrieve|convert` commands encounter an Aura metadata type, such as AuraDefinitionBundle, within a custom object folder in your project. The new error (`Unexpected child metadata [/path/to/child/metadata] found for parent type [Parent]`) provides more information about the problem than the old error (`ERROR running force:source:retrieve: Cannot read property 'id' of undefined`). ([GitHub issue #1148](https://github.com/forcedotcom/cli/issues/1148))

* FIX: The command `force:org:create` successfully creates a scratch org when `sfdx-project.json` configures [package ancestors](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_dev2gp_config_ancestors.htm).

## 7.116.2 (Sep 2, 2021)

* FIX: When running `force:source:deploy -m`, you can now include a space when specifying the metadata type, as long as you enclose the parameter value in double quotes. Previously, including a space, such as `-m "ApexClass: MyClass"` returned the error `No source backed components present in the package.` ([GitHub issue #1151](https://github.com/forcedotcom/cli/issues/1151))

* FIX: The `force:source:*` commands now support the InboundCertificate metadata type. ([GitHub issue #995](https://github.com/forcedotcom/cli/issues/995))

* FIX: The `force:source:deploy` command correctly deploys the IndustriesManufacturingSettings metadata type.  Previously it returned the error `Unknown type name 'IndustriesManufacturingSettings' specified in package.xml`. ([GitHub issue #866](https://github.com/forcedotcom/cli/issues/866))

* FIX: The `force:source:convert` command now includes child elements in the `package.xml` manifest file, such as custom fields of a custom object. Previously the command didn't include them in the manifest, which caused deployments to packaging orgs to fail with an error such as `UNKNOWN_EXCEPTION: Unable to handle <element>. filepath not expected`. ([GitHub issue #1115](https://github.com/forcedotcom/cli/issues/1115))

* FIX: The `force:source:deploy|retrieve|convert` commands support the Territory2 metadata types. ([GitHub issue #1147](https://github.com/forcedotcom/cli/issues/1147))


## 7.115.1 (Aug 26, 2021)

* NEW:  Check out the new `sf` CLI! Update `sfdx` to this week's release and you automatically get the beta version of `sf`. 

    ```bash
    $ sfdx update
    $ sf help
    ```
    Read the [Getting Started guide](https://github.com/salesforcecli/cli/wiki), give the commands a try, and let us know what you think.
 
 * FIX: The `force:source:*` commands correctly deploy, retrieve, and convert big object indexes. ([GitHub issue #1141](https://github.com/forcedotcom/cli/issues/1141))

* FIX: The `force:source:deploy` command correctly deploys a custom label. Previously it failed with the error `Not in package.xml`. ([GitHub issue #1133](https://github.com/forcedotcom/cli/issues/1133))

* FIX: The `force:source:deploy` command correctly deploys custom objects that use field history tracking. Previously it failed with the error `Component conversion failed: group.push is not a function`.  ([GitHub issue #1119](https://github.com/forcedotcom/cli/issues/1119))

* FIX: We’ve improved the error when the `force:source:*` commands encounter an unexpected metadata child type, such as an Apex class within a custom object. The new error (`Unexpected child metadata [/path/to/child/metadata] found for parent type [Parent]`) provides more information about the problem than the old error (`TypeError: Cannot set property 'content' of undefined at DecomposedSourceAdapter.populate`). ([GitHub issue #1106](https://github.com/forcedotcom/cli/issues/1106))

* FIX: The command `force:org:list --json` consistently includes namespace prefixes for scratch orgs that have them. ([GitHub issue #1146](https://github.com/forcedotcom/cli/issues/1146))

## 7.114.0 (Aug 19, 2021)

* NEW: Create a project manifest that lists the metadata components you want to deploy, retrieve, or delete with the new `force:source:manifest:create` command. 

    Use the `--sourcepath` or `--metadata` parameters to specify the source files or metadata components to include in the manifest. Use the `--manifesttype` parameter to create a specific type of manifest with a prescribed name, such as the default `package.xml` or one that adds or deletes components, such as `destructiveChangesPost.xml`. Here are the valid parameter values and the corresponding created filenames:

    * `package`  :  `package.xml` (default)
    * `pre`  :  `destructiveChangesPre.xml`
    * `post` : `destructiveChangesPost.xml`
    * `destroy` : `destructiveChanges.xml`

    Alternatively, use the `--manifestname` parameter to create a manifest with a custom name. See the Metadata API Developer Guide for information about the [package.xml manifest file](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy.htm) and the [destructive changes manifest files](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_deleting_files.htm). 
  
    This example creates a default `package.xml` file that contains all the Apex classes in your project:

    ```sfdx force:source:manifest:create -m ApexClass```

    This example creates a `destructiveChanges.xml` manifest file that contains the `MyApexClass` metadata component:

    ```sfdx force:source:manifest:create --metadata ApexClass:MyApexClass --manifesttype destroy```

    This example creates a custom file called `myNewManifest.xml` that contains all the source in the `force-app` directory:

    ```sfdx force:source:manifest:create --sourcepath force-app --manifestname myNewManifest```

* CHANGE: We no longer publish Docker container images called `salesforce/salesforcedx:latest` on Docker Hub. Instead we publish two flavors of the Salesforce CLI release and release candidate: slim and full. For example, to pull the slim version of the latest Salesforce CLI, run:

    ```docker pull salesforce/salesforcedx:latest-slim```
    
    See [Run Salesforce CLI Using a Docker Image](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_docker.htm) for more information. 

* FIX: The `force:source:convert --packagename <packagename> --outputdir <dir>` now works almost the same as before we broke out the deploy-retrieve code into its [own plug-in](https://github.com/salesforcecli/plugin-source). For a brief period, the command incorrectly created a `<packagename>` subdirectory under the output directory; now it correctly stores the converted files in the output directory as before. However, due to another bug, custom fields, list views, record types, compact layouts, and other metadata components aren't included in the `package.xml`. The fix will be available as soon as possible. ([GitHub issue #1115](https://github.com/forcedotcom/cli/issues/1115))

* FIX: Static resource compression when deploying with `force:source:deploy` now works the same as before we broke out the deploy-retrieve code into its [own plug-in](https://github.com/salesforcecli/plugin-source). For a brief period, the compression algorithm changed, which resulted in large static resources close to the 5-MB limit no longer deploying.  ([GitHub issue #1098](https://github.com/forcedotcom/cli/issues/1098))

## 7.113.0 (August 12, 2021)

* FIX: We fixed some under-the-hood bugs.
<!-- testing html comment -->

## 7.112.0 (August 4, 2021)

* NEW: We [announced it back in June](https://github.com/forcedotcom/cli/issues/1057), and now it's a reality: we've greatly improved the performance and reliability of these commands:

    * `force:source:convert`
    * `force:source:deploy`
    * `force:source:deploy:cancel`
    * `force:source:deploy:report`
    * `force:source:open`
    * `force:source:retrieve`

    Want to see what we did? We created a [new plug-in](https://github.com/salesforcecli/plugin-source) that's bundled with Salesforce CLI. The deploy-retrieve code itself is [here](https://github.com/forcedotcom/source-deploy-retrieve). Go ahead, give the updated commands a try; they work so fast, you can now leave work a little early and go surfing. Or bake banana bread. Or take a nap. The possibilities are endless.  
    
    But there's more! We also added these new parameters:
    
    * `force:source:deploy:report --verbose` 
    * `force:source:deploy --soapdeploy`
 
    One gotcha: Due to changes in the design and performance of the core code, the Salesforce CLI-specific hooks aren't backwards compatible. For example, the `postretrieve` hook replaces the `postsourceupdate` hook for retrieves, and the hook result types have changed. We're updating the [Hooks topic of the Salesforce CLI Plug-In Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/cli_plugins_customize_hooks_list.htm) with all the new information; check back soon for details.
    
* NEW: Increase the strength of the password generated by the `force:user:password:generate` command with the `--complexity|-c` and `--length|-l` parameters. 

    Set the `--complexity` parameter to an integer between 0 and 5 to specify the set of characters used in the generated password:

    * 0 - lower case letters only
    * 1 - lower case letters and numbers only
    * 2 - lower case letters and symbols only
    * 3 - lower and upper case letters and numbers only
    * 4 - lower and upper case letters and symbols only
    * 5 - lower and upper case letters and numbers and symbols (default)

    Set the `--length` parameter to specify the number of characters in the password. Valid values are between 8 and 1000, default value is 13.

    For example, to generate a password with complexity 4 and length 15 for your default username:

    `sfdx force:user:password:generate --complexity 4 --length 15`
    
* FIX: The command `force:org:open --urlonly --json` no longer prints the error `JsonParseError: Unexpected end of JSON input` after the JSON output when you've also set the SFDX_LOG_LEVEL environment variable to `debug`. ([GitHub sfdx-core repo, issue #153](https://github.com/forcedotcom/sfdx-core/issues/153))

* FIX: When the `force:org:create` command finishes executing, the command cleans up after itself by removing the temporary folder it created called `shape`, including if the command fails. The command also uses a separate and uniquely named temporary folder for each execution; the folder is called `shape_<timestamp>`, such as `shape_1628100694156`. Previously, the command didn't remove the folder, which sometimes interfered with subsequent scratch org creates. If you want the folder to remain after the command finishes, set the SFDX_MDAPI_TEMP_DIR environment variable to the root folder where you want the `shape_<timestamp>` to live.

## July 29, 2021

* We aren't releasing a Salesforce CLI patch this week. The latest version of Salesforce CLI remains 7.110.0.
 
## July 22, 2021

* We aren't releasing a Salesforce CLI patch this week. The latest version of Salesforce CLI remains 7.110.0.

## 7.110.0 (July 15, 2021)

* NEW: The `force:source:*` commands support these metadata types:
 
    * ConnectedSystem
    * DataMappingSchema
    * DataMapping
    * FederationDataMappingUsage
    * WaveComponent

## 7.109.0 (July 8, 2021)

* FIX: We fixed some under-the-hood bugs.

## 7.108.0 (July 1, 2021)

* NEW: Run Salesforce CLI using Docker container images that we publish on [Docker Hub](https://hub.docker.com/r/salesforce/salesforcedx). 

    We follow the same release process as our installers and npm packages. Each week we publish a Docker container image for that week’s release candidate (`latest-rc`). The following week we retag the image as `latest`. You can run the `latest` or `latest-rc` CLI versions, or a specific numbered version. 

    For each version we provide two flavors:

    * **slim**: Just the CLI installed on Linux plus OpenJDK 11. 
    * **full**: The CLI installed with npm on a full Node.js installation, plus OpenJDK 11 and additional utilities such as jq.

    Use [this Web page](https://hub.docker.com/r/salesforce/salesforcedx/tags?page=1&ordering=last_updated) or this table to determine the name of the image you want to use.

    |CLI Version Type|Docker Hub Image Name|
    |-------------------------------------|------------------------------------|
    |Slim latest release|`salesforce/salesforcedx:latest-slim`|
    |Full latest release|`salesforce/salesforcedx:latest-full`|
    |Slim release candidate|`salesforce/salesforcedx:latest-rc-slim`|
    |Full release candidate|`salesforce/salesforcedx:latest-rc-full`|
    |Slim specific version, such as 7.107.0|`salesforce/salesforcedx:7.107.0-slim`|
    |Full specific version, such as 7.107.0|`salesforce/salesforcedx:7.107.0-full`|

    For example, to pull and run the slim CLI release candidate image:

    ```bash
    docker pull salesforce/salesforcedx:latest-rc-slim
    docker run -it salesforce/salesforcedx:latest-rc-slim 
    ```
    Then you can run Salesforce CLI commands, such as:

    `sfdx version` 

    To exit the Salesforce CLI Docker container:

    `exit`

    You can also remotely execute commands from outside the container once you have it running and know the container ID:
    
    ```bash
    docker exec -it 8b1e2696a243 bin/bash sfdx version
    ```
    
* NEW: Get detailed CLI version information in JSON format with just a single command. Use the new `--json` parameter of `sfdx version` to get JSON output. Use the new `--verbose` parameter to get detailed information, such as the full list of installed plug-ins. Use them together to easily gather your environment details for us when you report an issue:

	`sfdx version --json --verbose`
	
* NEW: Authorize an org using an existing Salesforce access token with the new `auth:accesstoken:store` command. You're required to use the `--instanceurl` parameter to specify the instance that hosts your org. By default, the command runs interactively and asks you for the access token. If you've previously authorized the org, the command prompts whether you want to overwrite the local authentication file. Specify the `--noprompt` parameter to not be prompted about this overwrite.
 
     To use the command in a CI/CD script, set the new SFDX_ACCESS_TOKEN environment variable to the access token. Then run the command with the `--noprompt` parameter. For example, if your access token is `00D1234!XYZ` (usually much longer!):

    ```bash
    export SFDX_ACCESS_TOKEN='00D1234!XYZ'
    sfdx auth:accesstoken:store --instanceurl https://mycompany.my.salesforce.com --noprompt
    ```

## 7.107.0 (June 24, 2021)

* FIX: Salesforce CLI honors the `instanceUrl` config value and corresponding `SFDX_INSTANCE_URL` environment variable when the `sfdx-project.json` file doesn't contain the `sfdcLoginUrl` property. Previously the CLI ignored them and instead used the default value of `sfdcLoginUrl` (https://login.salesforce.com). ([GitHub issue #616](https://github.com/forcedotcom/cli/issues/616))

* FIX: Let's say you log in to an org with `auth:web:login` and set an alias, and then rerun the same command with the same username but set a different alias. The `force:org:list|display` commands show the most recent alias for that username. Previously the commands continued to display the first alias. ([GitHub issue #1031](https://github.com/forcedotcom/cli/issues/1031))

## 7.106.3 (June 17, 2021)

* NEW: We've removed the `salesforcedx` plug-in from Salesforce CLI. Don't worry, we haven't removed any functionality. The `salesforcedx` plug-in never did much; it simply aggregated other ones that contain the commands to create scratch orgs, deploy source, and so on. The CLI itself (`sfdx-cli`) is already an aggregator plug-in. 

    We [announced this change](https://github.com/forcedotcom/cli/issues/1016) a month ago. If you didn't follow the steps to prepare, do them now:

    - If you previously installed a tagged version of `salesforcedx` with the `sfdx plugins:install` command, uninstall it:

        `sfdx plugins:uninstall salesforcedx`
	
    - Update the CLI as usual:

         `sfdx update` 
	 
    - Remove the `sfdx plugins:install salesforcedx` command from your scripts.

    Going forward, don't manually install the `salesforcedx` plug-in. If you do you'll no longer automatically get the latest versions of the other plug-ins. We know there are still ways to install it, but just don't. Really.  

    As of June 16, 2021, all orgs have been updated to the Summer '21 release (API Version 52.0). Most CLI commands also default to 52.0. But if you find a command that hasn't yet been updated, set the `apiVersion` config value. 

    `sfdx config:set apiVersion=52.0 --global`

   Finally, as a result of removing the `salesforcedx` plug-in, we've also simplified how we version Salesforce CLI. Starting today, the CLI's version reflects the version of the `sfdx-cli` plug-in (such as 7.106.3). Previously we also referenced the `salesforcedx` plug-in version (such as 51.16.0), which was a tad confusing. Your work life just got a tiny bit easier. How great is that?

## 7.105.0 (June 10, 2021) - (salesforcedx 51.16.0) 

* FIX: We fixed some under-the-hood bugs.

## 7.104.0 (June 3, 2021) - (salesforcedx 51.15.0)

* FIX: We fixed some under-the-hood bugs.
 
## 7.103.0 (May 27, 2021) - (salesforcedx 51.14.0) 

* NEW: We recommend that you always use the latest version or release candidate of Salesforce CLI. However, if you absolutely _must_ install an older version, we still have your back! 

    We now publish JSON files that list the URLs to download recent versions of the installers and TAR files for each supported operating system. Each week we'll add the latest released version; versions will remain on the list for 20 weeks. We'll keep the TAR and installer files themselves for 40 weeks minimum. 

    **NOTE**: We continue to keep all old versions of the [sfdx-cli npm package](https://www.npmjs.com/package/sfdx-cli). 

    |Operating System| File Type|TAR Compression Type | Link to JSON File|
    |----------------|-----------------------|------------------------|---------------------|
    |Linux ARM |TAR |gz |[sfdx-linux-arm-tar-gz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-linux-arm-tar-gz.json)|
    |Linux ARM |TAR |xz |[sfdx-linux-arm-tar-xz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-linux-arm-tar-xz.json)|
    |Linux 64 |TAR |gz |[sfdx-linux-x64-tar-gz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-linux-x64-tar-gz.json)|
    |Linux 64 |TAR |xz |[sfdx-linux-x64-tar-xz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-linux-x64-tar-xz.json)|
    |Windows 64 |TAR |gz |[sfdx-win32-x64-tar-gz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-win32-x64-tar-gz.json)|
    |Windows 64 |TAR |xz |[sfdx-win32-x64-tar-xz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-win32-x64-tar-xz.json)|
    |Windows x86 |TAR |gz |[sfdx-win32-x86-tar-gz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-win32-x86-tar-gz.json)|
    |Windows x86 |TAR |xz |[sfdx-win32-x86-tar-xz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-win32-x86-tar-xz.json)|
    |macOS |TAR |gz |[sfdx-darwin-x64-tar-gz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-darwin-x64-tar-gz.json)|
    |macOS |TAR |xz |[sfdx-darwin-x64-tar-xz.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-darwin-x64-tar-xz.json)|
    |Windows 64 |Installer | |[sfdx-x64-exe.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-x64-exe.json)|
    |Windows x86 |Installer | |[sfdx-x86-exe.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-x86-exe.json)|
    |macOS |Installer | |[sfdx-pkg.json](https://developer.salesforce.com/media/salesforce-cli/sfdx/versions/sfdx-pkg.json)|

* NEW: When you authenticate into a scratch org that wasn't created on your computer, the CLI correctly identifies it as a scratch org and associates it with its Dev Hub. This feature requires that your computer is authenticated to the Dev Hub that created the scratch org. With the Dev Hub properly identified, commands like `force:org:list` and `force:org:delete` work as expected. ([GitHub issue #398](https://github.com/forcedotcom/cli/issues/398)).  

* NEW: Specify more than one permission set when you use the `-n | --permsetname` parameter of the `force:user:permset:assign` command. Separate multiple names with a comma and enclose them in quotes. For example:

    `sfdx force:user:permset:assign -n "DreamHouse, NightmareHouse"`

    Thank you, [Luke Cotter, for submitting this new feature request](https://github.com/forcedotcom/cli/issues/463) and then [writing most of the code](https://github.com/salesforcecli/plugin-user/pull/102). We love that you thought of an excellent CLI improvement, and then you took the initiative and implemented the new feature yourself. We hope to see many more contributions like this from you and the community. 

* FIX: We've improved the warning that's displayed when you run one of the `force:source` commands and you're still using the old version of the `.forceignore` parser. ([GitHub issue #916](https://github.com/forcedotcom/cli/issues/916))

* FIX: The CLI recognizes scratch orgs created after authenticating to a Dev Hub with the `auth:jwt:grant` command. ([GitHub issue #949](https://github.com/forcedotcom/cli/issues/949))

## 7.102.0 (May 20, 2021) - (salesforcedx 51.13.0)

* FIX: We fixed some under-the-hood bugs.

## 7.101.0 (May 13, 2021) - (salesforcedx 51.12.0) 

* NEW: Are you a Salesforce CLI plug-in developer looking to create tests beyond simple unit tests? We've got you covered. Check out our new [@salesforce/cli-plugins-testkit](https://github.com/salesforcecli/cli-plugins-testkit) library that provides utilities for writing integration, smoke, and end-to-end tests. We also describe common use cases with associated sample code. And we link to other public GitHub repos that use the testkit so you can see the library in action. Go forth and test!

* NEW: Get an approximate count of the records in standard or custom objects in your org with the new `force:limits:recordcounts:display` command. The counts are approximate because the org calculates them asynchronously and periodically rather than immediately. 

    This example returns an approximate count of the records in the Account, Contact, Lead, and Opportunity standard objects.

    `sfdx force:limits:recordcounts:display -s Account,Contact,Lead,Opportunity`

    Thank you, [mkreth, for submitting this new feature request](https://github.com/forcedotcom/cli/issues/978) and then writing the code. We’re delighted with your solution to a real-world problem and hope to see many more contributions from you and the community. 
    
* FIX: The `force:package:version:create` command outputs correct JSON when run with the `--json` parameter. Previously the command incorrectly included console logging messages in the JSON output. ([GitHub issue #1003](https://github.com/forcedotcom/cli/issues/1003))
  
* FIX: We've improved the error message that's displayed when you run the `force:package:version:create` command and it can't find a file. The error now correctly describes the problem and shows the directory that's missing the file.

* FIX: FIX: The `force:project:create` command generates an `.eslintignore` file that contains `**/aura/**/*.app` for Lighting Aura apps. ([GitHub issue #1004](https://github.com/forcedotcom/cli/issues/1004))

## 7.100.0 (May 6, 2021) - (salesforcedx 51.11.0) 

* FIX: We fixed some under-the-hood bugs. 

## 7.99.0 (April 29, 2021) - (salesforcedx 51.10.0)

* NEW: Use a `.tar` file to install the Salesforce CLI release candidate. The download URL is similar to the URL for installing the current release, but uses the `stable-rc` channel instead of `stable`. For example, use this `wget` command to get the Linux release candidate `.tar` file:

    `wget https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable-rc/sfdx-linux-x64.tar.xz`

    Then install the release candidate the same way you [install the current version](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli_linux). 

* NEW: If you’ve already installed the current version of Salesforce CLI using the installers, run this command to switch to the release candidate:

    `sfdx update stable-rc`

    When the update completes, the core Salesforce CLI plug-ins, such as `salesforcedx`, are also updated to the release candidate version. Previously you could use only npm to install the CLI release candidate. Run this command to return to the current release:

    `sfdx update stable`

* CHANGE: We [deprecated](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_deprecation.htm) the `force:lightning:lint` command and plan to remove it in v53.0. Use the [eslint-plugin-aura](https://github.com/forcedotcom/eslint-plugin-aura) npm package instead. 

* FIX: The `force:org:list` command no longer returns the error `MissingMessageError - Missing message list:noResultsFound for locale en_US` when it doesn't find non-scratch orgs in certain use cases. 

## 7.98.0 (April 22, 2021) - (salesforcedx 51.9.1)

* FIX: Running a Quick Deploy on a package with recently validated components no longer fails. Previously, running the command `force:source:deploy` with the `-q | --validateddeployrequestid` parameter returned the error `Unexpected element {http://soap.sforce.com/2006/04/metadata}id during simple type deserialization`. (GitHub issues [#877](https://github.com/forcedotcom/cli/issues/877) and [#876](https://github.com/forcedotcom/cli/issues/876))

## 7.97.0 (April 15, 2021) - (salesforcedx# 51.8.0)

* FIX: We fixed some under-the-hood bugs.

## 7.96.1 (April 8, 2021) - (salesforcedx 51.7.1)

Before we describe the changes in this week's release, here's a quick update on open-sourcing Salesforce CLI since we published [this blog post](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021.html) in February 2021.

* We've created two new public GitHub repositories and broken out the [force:data](https://github.com/salesforcecli/data) and some of the [force:org](https://github.com/salesforcecli/plugin-org) commands into their own plug-ins.
* At the same time we open-sourced these plug-ins, we also fixed a bunch of GitHub issues. For example, [these issues](https://github.com/forcedotcom/cli/issues?q=is%3Aissue+is%3Aclosed+%22I+think+this+is+fixed+in+the+new+data+plugin%22) were fixed in the new data repository. 

  Check out the [status page](https://github.com/salesforcecli/status) to get a bird’s eye view of the project. 

---
 
* NEW: Get more granular information about the code coverage results of your Apex test runs with the new `--detailedcoverage` parameter of the `force:apex:test:run` command. We've also greatly improved the code coverage results and output of the `force:apex:test:run` and `force:apex:test:report` commands. 
 
    Check out the [Clearer Apex Commands](https://developer.salesforce.com/blogs/2021/04/clearer-apex-commands.html) blog post for more information and a preview of more exciting changes coming soon. Note that the upcoming improvements to the command output might break your existing scripts. 

* CHANGE: We changed the URLs we use to distribute the TAR files for installing Salesforce CLI. Don't worry, the URLs listed in this [manifest](https://developer.salesforce.com/media/salesforce-cli/manifest.json) still work, but starting this week we'll no longer update them to point to the latest releases. If you use these URLs in your CI/CD jobs, update your scripts with the new URLs to ensure you install the latest Salesforce CLI release. 

    This table lists the new unversioned URLs for the TAR files (`.tar.gz` or `.tar.xz`) for each operating system. When we release a new version of Salesforce CLI every week, we also update these URLs so they point to the most up-to-date version. 
    
    | Operating System | TAR Files                |
    |------------------|--------------------------|
    |Linux| [sfdx-linux-x64.tar.gz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-linux-x64.tar.gz)|
    ||[sfdx-linux-x64.tar.xz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-linux-x64.tar.xz)|
    ||[sfdx-linux-arm.tar.gz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-linux-arm.tar.gz)|
    ||[sfdx-linux-arm.tar.xz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-linux-arm.tar.xz)|
    |macOS|[sfdx-darwin-x64.tar.gz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-darwin-x64.tar.gz)|
    ||[sfdx-darwin-x64.tar.xz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-darwin-x64.tar.xz)|
    |Windows*|[sfdx-win32-x64.tar.gz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-win32-x64.tar.gz)|
    | |[sfdx-win32-x64.tar.xz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-win32-x64.tar.xz)|
    | |[sfdx-win32-x86.tar.gz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-win32-x86.tar.gz)|
    ||[sfdx-win32-x86.tar.xz](https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable/sfdx-win32-x86.tar.xz)|

    * WINDOWS NOTE: Installing Salesforce CLI with a TAR file on Windows requires a separate program, such as 7Zip, to extract the contents. We highly recommend you use the [Windows installers](https://developer.salesforce.com/tools/sfdxcli).

    We also removed the `install` script from the new TAR files. The existing TAR files listed in this [manifest](https://developer.salesforce.com/media/salesforce-cli/manifest.json) still contain the `install` script. You had to have administrator privileges to run the script, and it wasn’t necessary to install Salesforce CLI anyway. We now recommend that you simply unpack the TAR file into a directory of your choice and update your PATH environment variable appropriately. 

    We’ll update the [documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli_linux) soon. 

* CHANGE: We've rolled back the change we announced on [February 22, 2021](./README.md#new-parameters) where some commands (`force:org:create`, `force:source:*`, and `force:mdapi:*`) use REST API by default when deploying source. These commands use SOAP API by default again. 

    If you want to use REST for deployment, set the `restDeploy` config value or `SFDX_REST_DEPLOY` environment variable to `true`. For example, to set it globally with the config variable:

	`$ sfdx config:set restDeploy=true --global`

    To set it for just your project, don’t use the `--global` flag. We’ll update the [documentation](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_config_values.htm) soon.

## 7.94.3 (April 1, 2021) - (salesforcedx 51.6.0)

* NEW: Get a list of files in your project that the `force:source:*` commands ignore with the new `force:source:ignored:list` command. The command refers to the `.forceignore` file to determine the list of ignored files. Run the command without any parameters to get a list of all the files in all package directories that are ignored. Use the `--sourcepath` parameter to limit the check to a specific file or directory. If you specify a directory, the command checks all subdirectories recursively. For example, run this command to check if a particular file is ignored:

    `sfdx force:source:ignored:list --sourcepath=package.xml`

    Run this command to get a list of all ignored files in a specific directory:
	
    `sfdx force:source:ignored:list --sourcepath=force-app/main/default`
    
* NEW: Here at Salesforce, we love metadata! We're always looking for ways to improve moving it between orgs. And we feel like we haven't provided you with enough ways to deploy and retrieve it. So we're excited to introduce these new commands that provide true flexibility and power to your workflows:
  * `force:tooling:deploy|retrieve`
  * `force:source:transfer`
  * `force:mdapi:stash:push|pop`
  * `force:code:shove|wrest`

  Enjoy! 

## 7.93.1 (March 25, 2021) - (salesforcedx 51.5.0)

* FIX: The `auth:sfdxurl:store` command executes correctly when you specify a `.json` file to the `---sfdxurlfile` parameter. We also improved the command so that you can pass it the `.json` output of the `force:org:display` command. For example:

	```bash
    sfdx force:org:display -u <DevHub> --verbose --json > authFile.json
	sfdx auth:sfdxurl:store --sfdxurlfile authFile.json
    ```
* CHANGE: We've removed the `force:project:upgrade` command after deprecating it in v50. 

## 7.92.0 (March 18, 2021) - (salesforcedx 51.4.0)

* NEW:  Use the `--setuniqueusername` flag of `force:user:create` to force the newly created username, if specified in the definition file or at the command line, to be unique by appending the org ID. This feature is particularly useful in CI scripts that run multiple times.

    For example, let’s say your user definition file contains a `Username` attribute:

    ```bash
    {
        "Username": "tester@sfdx.org",
        "LastName": "Hobbs",
        ...
    }
    ```

    The username `tester@sfdx.org` must be unique across the entire Salesforce ecosystem; otherwise, the `force:user:create` command fails. But if you use the same user definition file for each CI run, the command definitely fails on the second run. To ensure success, specify the `--setuniqueusername` parameter so that the resulting username looks something like `tester@sfdx.org.00D123456123456123`. Because org IDs are always unique, the username is also always unique.  

    Thank you, Fabien Taillon, for submitting this [new feature request](https://github.com/salesforcecli/plugin-user/pull/50) and then writing most of the code. You're our first community member to contribute a feature that we then merged into our code and released. We're thrilled with your elegant solution to a real-world problem and hope to see many more contributions from you and the community. 

As part of [open-sourcing Salesforce CLI](https://developer.salesforce.com/blogs/2021/02/open-sourcing-salesforce-cli-update-feb-2021.html), we've broken out the source for some of the org commands (`force:org:open|list|display`) into their own [GitHub repo](https://github.com/salesforcecli/plugin-org). These commands are still in the `force` namespace and bundled in the `salesforcedx` plug-in, and they work the same as before.  

We don't normally announce when we open-source commands that remain in the `force` namespace. But because we made so many exciting changes this release, we thought we'd give you a few details. 

  * NEW: The `force:org:display` command displays the scratch org’s namespace. Many thanks to Todd Halfpenny for requesting this new feature. (GitHub issue [#422](https://github.com/forcedotcom/cli/issues/422))

  * CHANGE: Starting in version 52.0 of Salesforce CLI, the `--json` output of the `force:org:list` command no longer returns the property `connectedStatus` for scratch orgs. The `force:org:list` command displays a warning about this upcoming change, but be sure to update your CI/CD scripts now if they currently use this property.

  * FIX: GitHub issues [#361](https://github.com/forcedotcom/cli/issues/361), [#456](https://github.com/forcedotcom/cli/issues/456), [#482](https://github.com/forcedotcom/cli/issues/482), [#637](https://github.com/forcedotcom/cli/issues/637), [#666](https://github.com/forcedotcom/cli/issues/666), [#719](https://github.com/forcedotcom/cli/issues/719), [#724](https://github.com/forcedotcom/cli/issues/724) 


## 7.91.0 (March 11, 2021) - (salesforcedx 51.3.0) 

* FIX: The `force:mdapi:deploy --runtests` command now runs the specified tests.
* FIX: When you run the `force:mdapi:deploy` command with the `--json` parameter and the command fails, it returns the exit code 1. Previously it returned 0.


## 7.90.2  (March 4, 2021) - (salesforcedx 51.2.2)

* CHANGE: As of v51, all `force:source` and `force:mdapi` commands use REST API by default to deploy. Previously they used SOAP API by default. Set the `restDeploy` config value or `SFDX_REST_DEPLOY` environment variable to false to switch back to SOAP. (GitHub Issues [#860](https://github.com/forcedotcom/cli/issues/860), [#870](https://github.com/forcedotcom/cli/issues/870), [#872](https://github.com/forcedotcom/cli/issues/872), [#884](https://github.com/forcedotcom/cli/issues/884))
* FIX: You no longer get the error FILE HAS NO CONTENT when you run any command after authenticating to an org with the `auth:jwt:grant` command. (GitHub Issue [#867](https://github.com/forcedotcom/cli/issues/867))
* FIX: The force:user:password:generate and force:user:create commands generate valid passwords. (GitHub Issue [#858](https://github.com/forcedotcom/cli/issues/858))
* FIX: The force:project:create command now generates a scratch org definition file with EnableSetPasswordInApi as a scratch org feature rather than a security setting. This change is a result of the field [Settings.securitySettings.passwordPolicies.enableSetPasswordInApi](https://help.salesforce.com/articleView?id=release-notes.rn_api_meta.htm&type=5&release=230) being removed in version 51.0 of the Metadata API.
* FIX: When authorizing an org with `auth:web:login`, the browser no longer hangs after allowing access. (GitHub Issue [#890](https://github.com/forcedotcom/cli/issues/890))

## 7.89.2 (February 25, 2021) - (salesforcedx 51.1.1)

* FIX: The command `force:user:create` properly authenticates to a connected app authenticated with Web Flow login.

## 7.88.4 (February 22, 2021) - (salesforcedx 51.0.4)

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

  The `--soapdeploy` parameter causes the metadata deploy to use the SOAP API. Starting in v51, the `force:mdapi:deploy` command uses REST by default; previously it used SOAP. All other commands continue to use SOAP by default.

* `force:package:create --orgdependent`

  For unlocked packages only, allows the package to depend on unpackaged metadata in the installation org. This parameter is now GA; it was Beta in v50.

### Removed Parameters

* `force:org:shape:create --definitionfile`

  The `definitionfile` parameter has been removed from this command. This parameter is part of the org shape feature which is currently in beta. We removed the parameter based on feedback from users that they preferred storing the org shape in the shape source org rather than in a scratch definition file.

### Second-Generation Managed Packaging

* The `force:pacakge:version:report --verbose` command displays the release version stamped on a package version.

* We've enhanced the package version CLI commands to support component deletion.
  * If `force:package:version:create` completes successfully, and metadata has been removed from the package version as compared to its ancestor, the command displays a generic warning message about the removed metadata.
  * The command `force:package:version:list --verbose` displays whether metadata was removed.
  * The command `force:package:version:report` displays whether metadata was removed.
  * The command `force:package:version:promote` displays a warning if components have been removed from the version being promoted and `--noprompt` isn't specified.
  * The `--orgdependent` parameter of `force:package:create` is GA. The parameter was beta in v50."

### Other Changes

* FIX: We've improved the error message returned when you run `force:user:password:generate` using API version 51.0 and EnableSetPasswordInApi is configured as a security setting in your scratch org definition file. EnableSetPasswordInApi is now a scratch org feature instead of a Metadata API setting. Here's an example of configuring it as a feature in your scratch org definition file:

  `"features": ["EnableSetPasswordInApi","MultiCurrency"],`

  This change is a result of the field `Settings.securitySettings.passwordPolicies.enableSetPasswordInApi` being [removed in version 51.0 of the Metadata API](https://help.salesforce.com/articleView?id=release-notes.rn_api_meta.htm&type=5&release=230).  (GitHub issue [#798](https://github.com/forcedotcom/cli/issues/798))

* FIX: The command `force:user:password:generate` no longer fails when generating a password for a user that doesn't have access to the Profile standard object.

* FIX: The output of `force:user:create --json` now matches the output from previous versions.

* FIX: The command `force:source:deploy` no longer fails with "The org cannot be found" after a successful login.

* FIX: The command `force:user:password:generate` no longer fails when generating a password for a user that doesn't have access to the Profile standard object.
