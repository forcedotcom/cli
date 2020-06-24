# Salesforce CLI v48 Release Notes

Here are the new and changed features in recent updates of Salesforce CLI and the `salesforcedx` plug-in.

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx plugins --core` to display the version of the installed `salesforcedx` plug-in.

Run `sfdx update` to update both the CLI and the `salesforcedx` plug-in to the latest available version.

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update the `salesforcedx` plug-in to ensure that autocomplete works correctly on any new commands.

[Click here for the v47 release notes.](./v47.md)

## 48.20.0 (June 25, 2020)

* We aren't releasing a Salesforce CLI patch this week. 

Join us at [TrailheadDX 2020](https://www.salesforce.com/trailheadx/) to find out what's new in Salesforce developer tooling. 

## 48.19.0 (June 18, 2020)

* FIX: We fixed some under-the-hood bugs.

## 48.18.1 (June 11, 2020)

* NEW: We introduced a new topic (`cmdt`) and five new commands in this topic for managing custom metadata types.

   * `force:cmdt:create`. Creates a custom metadata type in the current project.
   * `force:cmdt:field:create`. Generates a custom metadata field based on the provided field type.
   * `force:cmdt:generate`. Generates a custom metadata type and all its records for the provided sObject.
   * `force:cmdt:record:create`. Creates a record for a given custom metadata type in the current project.
   * `force:cmdt:record:insert`. Creates custom metadata type records from a comma-separated values (CSV) file.

To learn more about custom metadata types, read our [documentation](https://help.salesforce.com/articleView?id=custommetadatatypes_overview.htm).

## 48.17.0 (June 4, 2020)

* FIX: We've improved the error message when running `force:source:deploy` and your manifest file (`package.xml`) contains an incorrect entry for the Workflow or WorkflowFieldUpdate metadata type. An example of an incorrect entry is a reference to a local file that doesn't exist. The command now prompts you to review your `package.xml` file for user errors. Previously it returned the error `RangeError: Maximum call stack size exceeded`. ([GitHub issue #280](https://github.com/forcedotcom/cli/issues/280))

## 48.16.2 (May 28, 2020)

* FIX: The ExperienceBundle metadata type works correctly when running `force:mdapi:convert`.  The [E-Bikes Lightning Web Components Sample Application](https://github.com/trailheadapps/ebikes-lwc) no longer throws this error:

   ```bash
   ERROR running force:mdapi:convert:  Expected content file(s) at path(s): /Users/jdoe/sfdx/ebikes-lwc/converted/experiences/E_Bikes1.site
   ```

* FIX: The `force:org:list` command displays correct information immediately after you run `force:org:create` to create a scratch org. In particular, we display correct alias information and no longer display refresh tokens.
* FIX: The `force:user:display` command correctly displays the user's plain text password rather than its hashed value. ([GitHub issue #417](https://github.com/forcedotcom/cli/issues/417))

## 48.15.0 (May 21, 2020)

* CHANGE: We aren't able to calculate code coverage for the `force:package:version:list` and `force:package:version:report` commands. We're working on a fix and will tell you when that feature is available again.

## 48.14.3 (May 14, 2020)

* FIX: We've standardized character encoding across the `force:mdapi:retrieve` and `force:source:retrieve` results sets. You'll now see apostrophes displayed as `&amp;apos`.
* FIX: Running `force:user:display -u | --targetusername` automatically refreshes an expired token and displays a new one.
* FIX: Running `force:data:record:update -t | --usetoolingapi` successfully updates the record.

## 48.13.1 (May 7, 2020)

* FIX: The `force:org:list` command no longer throws unexpected errors.

## 48.12.0 (April 30, 2020)

* NEW: We added a parameter, `--skipconnectionstatus`, to the `force:org:list` command. Use this parameter to remove the Connected Status column from the org list output and to improve performance.

## 48.11.0 (April 23, 2020)

* We aren't releasing a Salesforce CLI patch this week.

## 48.10.1 (April 16, 2020)

* FIX: We fixed some under-the-hood bugs.

## 48.9.0 (April 9, 2020)

* We aren't releasing a Salesforce CLI patch this week.

## 48.8.0 (April 2, 2020)

* FIX: We fixed some under-the-hood bugs.

## 48.7.0 (March 26, 2020)

* FIX: We fixed some under-the-hood bugs.

## 48.6.0 (March 19, 2020)

* We aren't releasing a Salesforce CLI patch this week.

## 48.5.1 (March 12, 2020)

* FIX: When running `force:data:record:update`, you can update a date field to a null value.
* FIX: Apex unit test failures appear in the output when you run `force:source:deploy --testlevel`.

## 48.4.1 (March 5, 2020)

* NEW: We added a `package.json` file to the standard and analytics Salesforce DX templates. To create these templates, run `force:project:create --template=standard`  or `force:project:create --template=analytics`.
* CHANGE: We are deprecating `force:doc:commands:list` and `force:doc:commands:display`. We will remove these commands in v49.0. Instead, run `sfdx commands`, which produces similar output.
* FIX: We fixed `force:user:create --json` so it works as expected when assigning `permsets`.

## 48.3.1 (February 27, 2020)

* FIX: We fixed some under-the-hood bugs.

## 48.2.0 (February 20, 2020)

* NEW: We introduced three new commands to offer you Lightning Web Components test functionality.

   * `force:lightning:lwc:test:create`. Creates a Lightning Web Components test with boilerplate code inside a `__tests__` directory.
   * `force:lightning:lwc:test:setup`. Installs Jest unit testing tools for Lightning Web Components.
   * `force:lightning:lwc:test:run`. Invokes Lightning Web Components Jest unit tests.

   To learn more about testing Lightning Web Components, read our [documentation](https://developer.salesforce.com/docs/component-library/documentation/en/48.0/lwc/lwc.testing).

* FIX: When deploying source with the `-c | --checkonly` flag, errors once again display to the console.

## 48.1.5 (February 18, 2020)

* FIX: We fixed the `npm install sfdx-cli` error. ([Github issue #304](https://github.com/forcedotcom/cli/issues/304)).

## 48.1.4 (February 17, 2020)

* FIX: Deployments to production using `force:mdapi:deploy` or `force:source:deploy` complete as expected. ([Github issue #305](https://github.com/forcedotcom/cli/issues/305)).

## 48.1.2 (February 15, 2020)

Welcome to the first release of version 48 of the `salesforcedx` CLI plug-in in Spring '20.

* CHANGE: Now all JSON output will be sent to `stdout`. Over a year ago we introduced an environment variable, `SFDX_JSON_TO_STDOUT`, to move all JSON output to `stdout` when `true`. This functionality is now the default. If you rely on parsing errors from `stderr` when using `--json`, update your tools and scripts to `stdout` or set `SFDX_JSON_TO_STDOUT` to `false`. You can expect more warnings and errors to be sent to `stderr` even with `--json` set. Learn more about this change in our [blog post.](https://developer.salesforce.com/blogs/2020/02/using-salesforce-cli-output-and-scripting.html?utm_campaign=February_2020&amp;utm_source=release_notes&amp;utm_medium=)

### Installation Notes

We're still working on creating `salesforcedx` v48 installers. However, you can easily update Salesforce CLI to v48 by running `sfdx update` or any CLI command. If you are installing Salesforce CLI for the first time, see [Install Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli) to install the CLI for your operating system, then run `sfdx update`.

### Uninstall the Pre-Release Version of the `salesforcedx` CLI Plug-In

If you installed the pre-release version 48 of the `salesforcedx` plug-in, uninstall it, then run the update command.

```bash
sfdx plugins:uninstall salesforcedx
sfdx update
```

### New Commands

* `force:analytics:template:create`. Allows you to create a simple analytics template in a specified directory.
* `force:community:create`. Creates a community using a template.
* `force:community:publish`. Publishes your Lightning community to make it live. Each time you publish, you update the live community with the most recent updates.
* `force:community:template:list`. Retrieves the list of templates available in your org for creating a community.

### New Parameters

* `force:package:version:create --skipvalidation`. Skips validation during package version creation. Skipping validation allows you to create package versions faster, but you can’t promote a package version that was created without validation.
* `force:source:delete --checkonly`. Performs a test deployment (validation) in the non-sourced-tracked org without deleting the metadata. After the validation passes, you can safely delete the metadata using this command.

### Changed Commands

* `force:package:version:list`. Displays columns that indicate if the package version has passed code coverage, and the code coverage percentage. We also added columns to indicate the ancestor ID and ancestor version number for the package version's ancestor. Ancestor ID and version number display for package versions created in Spring '20 and later.

### Changed Parameters

These parameters were added to the `force:source:convert` and `force:mdapi:convert` commands in a weekly release of `salesforcedx`.

* `-x | --manifest`. Specifies the complete path to the manifest (`package.xml`) file that specifies the metadata types to convert.
* `-m | --metadata`. Specifies a comma-separated list of metadata component names to convert.
* `-p | --sourcepath`. Specifies a comma-separated list of paths to the local source files to convert (`force:source:convert`).
* `-p | --metadatapath`. Specifies a comma-separated list of paths to the local source files to convert (`force:mdapi:convert`).

### Deprecated Parameters

We removed the `-a` short version of the `--apiversion` parameter. The following commands were affected:

* `force:apex:class:create`
* `force:apex:trigger:create`
* `force:lightning:app:create`
* `force:lightning:component:create`
* `force:lightning:event:create`
* `force:lightning:interface:create`
* `force:visualforce:component:create`
* `force:visualforce:page:create`
