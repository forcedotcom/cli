# Salesforce CLI Release Notes (sfdx Commands)

Here are the new and changed features in recent updates of the `sfdx` executable of Salesforce CLI.

We publish a new `stable` version of `sfdx` on Thursdays. At the same time we also publish the `stable-rc` release candidate. The release candidate contains changes that will likely be in the final weekly version.

Run `sfdx version` to display the version installed on your computer. Run `sfdx update` to update to the latest available version. 

Run `sfdx update stable-rc` to update to the release candidate. To return to the stable version, run `sfdx update stable`. 

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update Salesforce CLI to ensure that autocomplete works correctly on any new commands.

[Click here for the previous sfdx release notes.](./v50.md)

Want to check out the new `sf` executable of Salesforce CLI? [Click here for the release notes.](../sf/README.md)

## 7.142.1 (March 17, 2022) [stable]

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

These changes are in the Salesforce CLI (`sfdx` executable) release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

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
