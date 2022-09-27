# Salesforce CLI Release Notes (sf Commands)

Here are the new and changed features in recent updates of the `sf` executable of Salesforce CLI.

We publish a new stable version of `sf` on Wednesday. At the same time we also publish an `sf` release candidate that contains changes that we plan to include in next week's `sf` release.

Run `sf version` to display the version of `sf` installed on your computer. 

**Installation**: If you installed Salesforce CLI with the `sfdx` [installers](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm), then `sf` is also installed automatically. If you installed `sfdx` via `npm` then you must install `sf` separately by running `npm install @salesforce/cli -g`. 

**Update**: If you installed `sf` with the `sfdx` installers, run `sfdx update` to update to the latest available stable version. Run `sfdx update stable-rc` to update to the release candidate. To return to the stable version, run `sfdx update stable`.

If you installed `sf` with `npm`, run `npm install @salesforce/cli@latest-rc -g` to update to the release candidate. To return to the stable version, run `npm install @salesforce/cli@latest -g`. 

[Click here for the release notes for the `sfdx` executable.](../sfdx/README.md)

## 1.48.0 (Oct 5, 2022) [stable-rc]

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change. 

* FIX: We fixed some under-the-hood bugs. 

## 1.47.0 (Sept 28, 2022) [stable]

* FIX: We fixed some under-the-hood bugs. 

## 1.46.0 (Sept 21, 2022)

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

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
