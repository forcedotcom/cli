# Salesforce CLI Release Notes (sf Commands)

Here are the new and changed features in recent updates of the `sf` executable of Salesforce CLI.

We publish a new stable version of `sf` on Wednesday; this version is installed automatically when you install or update `sfdx`. At the same time we also publish an `sf` release candidate that contains changes that we plan to include in next week's `sf` release.

Run `sf version` to display the version installed on your computer. Run `sfdx update` to update to the latest available stable version. 

Run `sfdx update stable-rc` to update to the release candidate for both `sf` and `sfdx`. To return to the stable version, run `sfdx update stable`.

[Click here for the release notes for the `sfdx` executable.](../sfdx/README.md)

## 1.24.0 (April 21, 2022) [stable-rc]

Starting today, `sf` commands that we're actively working on, but are publicly available, are marked with a beta tag. We can update these beta commands in any future release. While we try not make any breaking changes in these beta commands, we reserve the right to do so without warning. This process allows us to iteratively build `sf` and get feedback from you as we go. 

As soon as we've finished working on a beta command, and we've provided ample time for improvements based on your feedback, we'll remove the beta tag. At that point, the command is GA and follows our [deprecation policy](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/sfdx_dev_cli_deprecation.htm).

A few additional notes:

* All beta `sf` commands have a corresponding `sfdx` command. 
* We don't recommend that you use the beta commands in your CI/CD scripts. 
* We do recommend that you use and test the beta commands in your day to day CLI work and give us feedback early and often by entering [GitHub issues](https://github.com/forcedotcom/cli/issues). 
* `sf` commands that support GA products and have no `sfdx` equivalents, such as Salesforce Functions, will never be marked as beta. These commands are GA from the moment the product itself goes GA and are subject to our [deprecation policy](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/sfdx_dev_cli_deprecation.htm).
* New `sf` commands are marked with a beta tag by default. 

--- 

These changes are in the Salesforce CLI release candidate. We plan to include these changes in next week's official release. This list isn't final and is subject to change.

* CHANGE: These commands are now marked beta; they behave the same as before:

    * `sf deploy metadata`
    * `sf retrieve metadata`

## 1.23.0 (April 14, 2022) [stable]

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
