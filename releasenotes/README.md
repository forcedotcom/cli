# Salesforce CLI v49 Release Notes

Here are the new and changed features in recent updates of Salesforce CLI and the `salesforcedx` plug-in.

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx plugins --core` to display the version of the installed `salesforcedx` plug-in.

Run `sfdx update` to update both the CLI and the `salesforcedx` plug-in to the latest available version.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update the `salesforcedx` plug-in to ensure that autocomplete works correctly on any new commands.

[Click here for the v48 release notes.](./v48.md)

## 49.12.0 (September 24, 2020)

* We aren't releasing a Salesforce CLI patch this week.

## 49.11.0 (September 17, 2020)

* We aren't releasing a Salesforce CLI patch this week.

## 49.10.0 (September 10, 2020)

* CHANGE: You can use the `force:source:deploy`, `force:source:retrieve`, and `force:source:delete` commands on metadata files stored in multiple package directories instead of just the default package directory. Multiple package directories help you organize your local source code into logical units. ([GitHub issue #379](https://github.com/forcedotcom/cli/issues/379))

    Each package directory must adhere to the [standard Salesforce DX project structure](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_source_file_format.htm). List the package directories in your `sfdx-project.json` file in the order you want the packaged metadata deployed to your org.  See [Multiple Package Directories](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_mpd.htm). 

* CHANGE: Now that the alias commands (`alias:set`, `alias:list`, `alias:unset`) are in their own [GitHub repo](https://github.com/salesforcecli/plugin-alias), they no longer show up in the `sfdx help force` output. Run `sfdx help alias` instead.  The [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm) also lists the commands only in the `alias` namespace. 
	
    **NOTE**: The `force:alias` commands will continue to work until we [deprecate](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/sfdx_dev_cli_deprecation.htm) them. We'll announce it ahead of time so you can prepare.

* FIX: The `sfdx plugins:install` command works correctly when installing unsigned plug-ins. ([GitHub issue #592](https://github.com/forcedotcom/cli/issues/592))

* FIX: The  `force:source:retrieve` command no longer returns the intermittent error `ERROR running force:source:retrieve: Cannot read property 'getWorkspaceElements' of undefined` in certain circumstances. ([GitHub issue #345](https://github.com/forcedotcom/cli/issues/345))

## 49.9.2 (September 3, 2020)

* NEW: As part of [open-sourcing Salesforce CLI](https://developer.salesforce.com/blogs/2020/05/open-sourcing-salesforce-cli.html), we've broken out the source for the alias commands (`force:alias:set` and `force:alias:list`) into their own [GitHub repo](https://github.com/salesforcecli/plugin-alias). As a result, the commands are now in the `alias` namespace, and no longer in the `force` namespace. For example:

    `$ sfdx alias:set myscratchorg=username@example.com`

    But don't worry, the current way to run the commands, such as `force:alias:set`, still works. We plan to deprecate the `force` version of the commands in the future. But for now, your existing workflow and CI/CD jobs will continue working.

     We've also added the `alias:unset` command to easily unset an alias. This new command is only in the `alias` namespace. 

    `$ sfdx alias:unset myscratchorg`

* NEW: Store the output of the `force:apex:log:get` command in a directory with the new `--outputdir` (`-d`) parameter. 

* CHANGE: Now that the config commands (`config:set`, `config:get`, `config:list`, and `config:unset`) are in their own [GitHub repo](https://github.com/salesforcecli/plugin-config), they no longer show up in the `sfdx help force` output. Run `sfdx help config` instead.  The [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm) will soon list the commands only in the `config` namespace. 
	
	**NOTE**: We continue to alias the `config` commands to their `force:config` equivalents. So, for example, `force:config:set` continues to work. We'll announce when we plan to deprecate the `force` versions of these commands. 

* CHANGE: We've removed the `--color` (`-c`) parameter of the `force:apex:log:get` command. Colors are displayed by default. 

* FIX: When you run the `force:mdapi:deploy` command but then cancel the deployment, the CLI now correctly returns a non-zero status to indicate that the deployment didn't succeed. Previously it returned a zero status, which incorrectly indicated that the deployment succeeded. ([GitHub issue #37](../../../issues/37))

* FIX: The `force:package:version:command` no longer fails with the error `typesArr.filter is not a function`. ([GitHub issue #594](../../../issues/594))


## 49.8.0 (August 27, 2020)

* NEW: As part of [open-sourcing Salesforce CLI](https://developer.salesforce.com/blogs/2020/05/open-sourcing-salesforce-cli.html), we’ve broken out the source for the config commands (`force:config:set`, `force:config:get`, `force:config:list`) into [their own GitHub repo](https://github.com/salesforcecli/plugin-config). As a result, the commands are now in the `config` namespace and no longer in the `force` namespace. For example:

	 `$ sfdx config:set apiVersion=50.0`

    But don’t worry, the current way to run the commands, such as `force:config:set`, still works. We plan to deprecate the `force` version of the commands in the future. But for now, your existing workflow and CI/CD jobs will continue working.

    We’ve also added the `config:unset` command to unset a configuration value. This new command is only in the `config` namespace. 

    `$ sfdx config:unset apiVersion`

* NEW: Disable polling of your org's SourceMember object when you run the `force:source:push|pull` commands by setting the SFDX_DISABLE_SOURCE_MEMBER_POLLING environment variable to TRUE. 

    The commands poll the SourceMember object to track what's changed between your local source and the org after the push or pull completes. If you have a large metadata deployment, however, the polling can take a while, or even time out. Sometimes you don't require source tracking at all, such as in a CI/CD job. These use cases are good candidates for setting this environment variable. 

    The environment variable works with both scratch orgs and sandboxes. 

    `$ export SFDX_DISABLE_SOURCE_MEMBER_POLLING=true`

    **WARNING**: When you disable SourceMember polling, the CLI's internal tracking of what's changed between your local source and org metadata gets out of sync. As a result, subsequent runs of the `force:source:push|pull|status` commands are unreliable, and it's up to you to synchronize your source. To reset source tracking, use the `force:source:tracking:reset` command.

* CHANGE: We’ve changed the name of the [local file that prevents Salesforce CLI](https://developer.salesforce.com/blogs/2017/10/salesforce-dx-cli-plugin-update.html) from prompting you about trusting an unsigned plugin when you try to install it. The file is now called `unsignedPluginAllowList.json`, previously called `unsignedPluginWhiteList.json`. The file with the old name will continue to work for a while, but we recommend you change the name after you install this week's release. 

## 49.7.0 (August 20, 2020)

* FIX: We fixed more regressions related to multiple package directory listings in `sfdx-project.json` that point to the same path. ([July 14, 2020 fix](./v48.md#48228-july-14-2020), [GitHub issue #468](../../../issues/468))

## 49.6.1 (August 13, 2020)

* NEW: Increase the number of Salesforce records that a CLI command returns with the new `maxQueryLimit` config value. The default value is 10,000. For example, if your Salesforce org contains 15,000 roles, and you run `sfdx force:mdapi:listmetadata -m Role`, the command returns only 10,000 roles by default. The CLI command warns you that it hasn't returned all the records. Set the config value to see all the roles:

  `$ sfdx force:config:set maxQueryLimit=20000`
  
  The corresponding environment variable is SFDX_MAX_QUERY_LIMIT.

* CHANGE: We've upgraded the CLI's version of Node.js to 12.18.3.

* FIX: The Salesforce CLI installer works as expected on macOS Catalina (10.15) and later. Double-click the `*.pkg` file and you're off!  ([Github issue #359](../../../issues/359))

## 49.5.0 (August 6, 2020)

* NEW: Create a hook to customize the behavior of some Salesforce CLI commands. A hook is a piece of code that runs at a specific lifecycle event during command execution. For example, create a hook for `force:source:push` to make IDs in source files unique after they've been converted to metadata format but before they're sent to the org. 

  You can create hooks that trigger during these Salesforce CLI lifecycle events:

  * `predeploy`: After the CLI has converted your source files to Metadata API format but before it sends the files to the org. 
  * `postdeploy`: After the CLI has sent the metadata to the org and the org has sent back a confirmation. 
  * `preretrieve`: Before the CLI sends a request to the org to fetch files.
  * `postretrieve`: After the CLI has retrieved the metadata from the org. The metadata has not yet been converted to source format. 
  * `postsourceupdate`: After the CLI has converted the files it fetched from the org to source format.
  * `postorgcreate`: Immediately after a new scratch org or sandbox is created. You can access the org from the hook. 

  Salesforce also supports all the [oclif hooks](https://oclif.io/docs/hooks#lifecycle-events).

  Documentation about creating hooks will be available in the [Salesforce CLI Plug-In Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_plugins.meta/sfdx_cli_plugins/) soon.

* FIX: We've restored the display of code coverage data in the `force:package:version:list` and `force:package:version:report` commands. ([See v48.15.0 release note](./v48.md#48150-may-21-2020))

## 49.4.1 (July 30, 2020)

* FIX: You can pass an access token as a username (with the` -u` parameter) to the `force:user:permset:assign` and `force:user:password:generate` commands. Previously you'd get an error such as `The username <username> was not found for scratch org <scratchorgid>`.
* FIX: You can run the `force:source:push|deploy|convert` commands from subdirectories of the project directory. Previously you'd get `ERROR running force:source:deploy: Cannot read property 'path' of undefined`. ([GitHub issue #488 ](../../../issues/488 ))

## 49.3.0 (July 23, 2020)

* We aren't releasing a Salesforce CLI patch this week.

## 49.2.3 (July 18, 2020) 

Welcome to the first release of version 49 of the `salesforcedx` CLI plug-in in Summer '20. 

### Installation Notes

Update Salesforce CLI to v49 by running `sfdx update` or any CLI command.

```bash
$ sfdx update
```

If you are installing Salesforce CLI for the first time, see [Install Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli) to install the CLI for your operating system, then run `sfdx update`.

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx plugins --core` to display the version of the installed `salesforcedx` plug-in.

```bash
$ sfdx plugins --core
@oclif/plugin-autocomplete 0.1.5 (core)
@oclif/plugin-commands 1.3.0 (core)
@oclif/plugin-help 3.0.1 (core)
@oclif/plugin-not-found 1.2.4 (core)
@oclif/plugin-plugins 1.7.10 (core)
@oclif/plugin-update 1.3.10 (core)
@oclif/plugin-warn-if-update-available 1.7.0 (core)
@oclif/plugin-which 1.0.3 (core)
@salesforce/sfdx-trust 3.0.7 (core)
analytics 1.12.0 (core)
generator 1.1.3 (core)
salesforcedx 49.2.3                  // salesforcedx plug-in version
├─ salesforcedx-templates 48.32.0
├─ custom-metadata 1.0.7
├─ salesforce-alm 49.3.0
└─ @salesforce/sfdx-plugin-lwc-test 0.1.7
sfdx-cli 7.66.2 (core)               // CLI version
```

### Uninstall the Pre-Release Version of the salesforcedx CLI Plug-In

If you installed the pre-release version of the `salesforcedx` v49 plug-in to test the next version of Salesforce CLI, uninstall it and update the CLI. We’re no longer updating the pre-release v49 plug-in.

```bash
$ sfdx plugins:uninstall salesforcedx
$ sfdx update
```

### New Parameter

* `force:package:create --orgdependent` (beta)

  For unlocked packages only, allows the package to depend on unpackaged metadata in the installation org.

  **Note**: As a beta feature, Org-Dependent Unlocked Packages is a preview and isn’t part of the “Services” under your master subscription agreement with Salesforce. Use this feature at your sole discretion, and make your purchase decisions only on the basis of generally available products and features. Salesforce doesn’t guarantee general availability of this feature within any particular time frame or at all, and we can discontinue it at any time. This feature is for evaluation purposes only, not for production use. It’s offered as is and isn’t supported, and Salesforce has no liability for any harm or damage arising out of or in connection with it. All restrictions, Salesforce reservation of rights, obligations concerning the Services, and terms for related Non-Salesforce Applications and Content apply equally to your use of this feature. You can provide feedback and suggestions for Org-Dependent Unlocked Packages in the [Trailblazer Community](https://success.salesforce.com/_ui/core/chatter/groups/GroupProfilePage?g=0F93A000000Lg5USAS).

### Deprecated Commands

These commands are deprecated in v49. Use the `force:lightning:lwc:test:*` commands instead.

* `force:lightning:test:create`
* `force:lightning:test:install`
* `force:lightning:test:run`

These commands continue to be deprecated in v49; they were first deprecated in v48 and will be removed in a future release. Use `sfdx commands` instead, which produces similar output.

* `force:doc:commands:list`
* `force:doc:commands:display`

## Other Changes

* We've upgraded the CLI's version of Node.js to 12.13.0.
* The `force:org:clone` and `force:org:status` sandbox CLI commands are generally available. The commands were beta in v48.
