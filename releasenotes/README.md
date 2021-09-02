# Salesforce CLI Release Notes

Here are the new and changed features in recent updates of Salesforce CLI.

We publish a new `stable` version of the CLI on Thursdays. At the same time we also publish the `stable-rc` release candidate CLI version. The release candidate contains changes that will likely be in the final weekly version.

Run `sfdx version` to display the version of Salesforce CLI installed on your computer. Run `sfdx update` to update the CLI to the latest available version. 

Run `sfdx update stable-rc` to update the CLI to the release candidate. To return to the stable version, run `sfdx update stable`. 

If you use [autocomplete](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_autocomplete.htm), run `sfdx autocomplete --refresh-cache` after you update Salesforce CLI to ensure that autocomplete works correctly on any new commands.

[Click here for the previous release notes.](./v50.md)

## Sept 9, 2021

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

* FIX: The `force:source:deploy|retrieve|convert` commands correctly support these metadata types:
   
    * AssignmentRule
    * AuraDefinitionBundle
    * AutoResponseRule
    * RestrictionRule 
    * SharingCriteriaRule
    * SharingOwnerRule

    (GitHub issues [#1115](https://github.com/forcedotcom/cli/issues/1115) and [#1158](https://github.com/forcedotcom/cli/issues/1158))
    
* FIX: As a result of a recent Salesforce CLI bug fix, the `force:source:deploy|retrieve|convert` commands incorrectly started including the CustomFieldTranslation metadata type in the manifest when handling CustomObjectTranslation types. Because the Metadata API doesn't support CustomFieldTranslation, deploys and retrieves resulted in the error `Unknown type name 'CustomFieldTranslation' specified in package.xml` The commands no longer include the CustomFieldTranslation type in the manifest. (GitHub issues [1135](https://github.com/forcedotcom/cli/issues/1135) and [1161](https://github.com/forcedotcom/cli/issues/1161)) 

* FIX: We’ve improved the error when the `force:source:deploy|retrieve|convert` commands encounter an Aura metadata type, such as AuraDefinitionBundle, within a custom object folder in your project. The new error (`Unexpected child metadata [/path/to/child/metadata] found for parent type [Parent]`) provides more information about the problem than the old error (`ERROR running force:source:retrieve: Cannot read property 'id' of undefined`). ([GitHub issue #1148](https://github.com/forcedotcom/cli/issues/1148))

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

## 51.16.0 (June 10, 2021) - CLI 7.105.0

* FIX: We fixed some under-the-hood bugs.

## 51.15.0 (June 3, 2021) - CLI 7.104.0

* FIX: We fixed some under-the-hood bugs.
 
## 51.14.0 (May 27, 2021) - CLI 7.103.0

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

## 51.13.0 (May 20, 2021) - CLI 7.102.0

* FIX: We fixed some under-the-hood bugs.

## 51.12.0 (May 13, 2021) - CLI 7.101.0

* NEW: Are you a Salesforce CLI plug-in developer looking to create tests beyond simple unit tests? We've got you covered. Check out our new [@salesforce/cli-plugins-testkit](https://github.com/salesforcecli/cli-plugins-testkit) library that provides utilities for writing integration, smoke, and end-to-end tests. We also describe common use cases with associated sample code. And we link to other public GitHub repos that use the testkit so you can see the library in action. Go forth and test!

* NEW: Get an approximate count of the records in standard or custom objects in your org with the new `force:limits:recordcounts:display` command. The counts are approximate because the org calculates them asynchronously and periodically rather than immediately. 

    This example returns an approximate count of the records in the Account, Contact, Lead, and Opportunity standard objects.

    `sfdx force:limits:recordcounts:display -s Account,Contact,Lead,Opportunity`

    Thank you, [mkreth, for submitting this new feature request](https://github.com/forcedotcom/cli/issues/978) and then writing the code. We’re delighted with your solution to a real-world problem and hope to see many more contributions from you and the community. 
    
* FIX: The `force:package:version:create` command outputs correct JSON when run with the `--json` parameter. Previously the command incorrectly included console logging messages in the JSON output. ([GitHub issue #1003](https://github.com/forcedotcom/cli/issues/1003))
  
* FIX: We've improved the error message that's displayed when you run the `force:package:version:create` command and it can't find a file. The error now correctly describes the problem and shows the directory that's missing the file.

* FIX: FIX: The `force:project:create` command generates an `.eslintignore` file that contains `**/aura/**/*.app` for Lighting Aura apps. ([GitHub issue #1004](https://github.com/forcedotcom/cli/issues/1004))

## 51.11.0 (May 6, 2021) - CLI 7.100.0

* FIX: We fixed some under-the-hood bugs. 

## 51.10.0 (April 29, 2021) - CLI 7.99.0

* NEW: Use a `.tar` file to install the Salesforce CLI release candidate. The download URL is similar to the URL for installing the current release, but uses the `stable-rc` channel instead of `stable`. For example, use this `wget` command to get the Linux release candidate `.tar` file:

    `wget https://developer.salesforce.com/media/salesforce-cli/sfdx/channels/stable-rc/sfdx-linux-x64.tar.xz`

    Then install the release candidate the same way you [install the current version](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm#sfdx_setup_install_cli_linux). 

* NEW: If you’ve already installed the current version of Salesforce CLI using the installers, run this command to switch to the release candidate:

    `sfdx update stable-rc`

    When the update completes, the core Salesforce CLI plug-ins, such as `salesforcedx`, are also updated to the release candidate version. Previously you could use only npm to install the CLI release candidate. Run this command to return to the current release:

    `sfdx update stable`

* CHANGE: We [deprecated](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_dev_cli_deprecation.htm) the `force:lightning:lint` command and plan to remove it in v53.0. Use the [eslint-plugin-aura](https://github.com/forcedotcom/eslint-plugin-aura) npm package instead. 

* FIX: The `force:org:list` command no longer returns the error `MissingMessageError - Missing message list:noResultsFound for locale en_US` when it doesn't find non-scratch orgs in certain use cases. 

## 51.9.1 (April 22, 2021) - CLI 7.98.0

* FIX: Running a Quick Deploy on a package with recently validated components no longer fails. Previously, running the command `force:source:deploy` with the `-q | --validateddeployrequestid` parameter returned the error `Unexpected element {http://soap.sforce.com/2006/04/metadata}id during simple type deserialization`. (GitHub issues [#877](https://github.com/forcedotcom/cli/issues/877) and [#876](https://github.com/forcedotcom/cli/issues/876))

## 51.8.0 (April 15, 2021) - CLI 7.97.0

* FIX: We fixed some under-the-hood bugs.

## 51.7.1 (April 8, 2021) - CLI 7.96.1

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

## 51.6.0 (April 1, 2021) - CLI 7.94.3

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

## 51.5.0 (March 25, 2021) - CLI 7.93.1

* FIX: The `auth:sfdxurl:store` command executes correctly when you specify a `.json` file to the `---sfdxurlfile` parameter. We also improved the command so that you can pass it the `.json` output of the `force:org:display` command. For example:

	```bash
    sfdx force:org:display -u <DevHub> --verbose --json > authFile.json
	sfdx auth:sfdxurl:store --sfdxurlfile authFile.json
    ```
* CHANGE: We've removed the `force:project:upgrade` command after deprecating it in v50. 

## 51.4.0 (March 18, 2021) - CLI 7.92.0

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


## 51.3.0 (March 11, 2021) - CLI 7.91.0

* FIX: The `force:mdapi:deploy --runtests` command now runs the specified tests.
* FIX: When you run the `force:mdapi:deploy` command with the `--json` parameter and the command fails, it returns the exit code 1. Previously it returned 0.


## 51.2.2 (March 4, 2021) - CLI 7.90.2

* CHANGE: As of v51, all `force:source` and `force:mdapi` commands use REST API by default to deploy. Previously they used SOAP API by default. Set the `restDeploy` config value or `SFDX_REST_DEPLOY` environment variable to false to switch back to SOAP. (GitHub Issues [#860](https://github.com/forcedotcom/cli/issues/860), [#870](https://github.com/forcedotcom/cli/issues/870), [#872](https://github.com/forcedotcom/cli/issues/872), [#884](https://github.com/forcedotcom/cli/issues/884))
* FIX: You no longer get the error FILE HAS NO CONTENT when you run any command after authenticating to an org with the `auth:jwt:grant` command. (GitHub Issue [#867](https://github.com/forcedotcom/cli/issues/867))
* FIX: The force:user:password:generate and force:user:create commands generate valid passwords. (GitHub Issue [#858](https://github.com/forcedotcom/cli/issues/858))
* FIX: The force:project:create command now generates a scratch org definition file with EnableSetPasswordInApi as a scratch org feature rather than a security setting. This change is a result of the field [Settings.securitySettings.passwordPolicies.enableSetPasswordInApi](https://help.salesforce.com/articleView?id=release-notes.rn_api_meta.htm&type=5&release=230) being removed in version 51.0 of the Metadata API.
* FIX: When authorizing an org with `auth:web:login`, the browser no longer hangs after allowing access. (GitHub Issue [#890](https://github.com/forcedotcom/cli/issues/890))

## 51.1.1 (February 25, 2021) - CLI 7.89.2

* FIX: The command `force:user:create` properly authenticates to a connected app authenticated with Web Flow login.

## 51.0.4 (February 22, 2021) - CLI 7.88.4

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
