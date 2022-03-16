# Salesforce CLI Release Notes (sf Commands)

Here are the new and changed features in recent updates of the `sf` executable of Salesforce CLI.

We publish a new stable version of `sf` on Wednesday; this version is installed automatically when you install or update `sfdx`. At the same time we also publish an `sf` release candidate that contains changes that we plan to include in next week's `sf` release.

Run `sf version` to display the version installed on your computer. Run `sfdx update` to update to the latest available stable version. 

Run `sfdx update stable-rc` to update to the release candidate for both `sf` and `sfdx`. To return to the stable version, run `sfdx update stable`.

[Click here for the release notes for the `sfdx` executable.](../sfdx/README.md)

## 1.18.0 (March 17, 2022) [stable]

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
    NOTE: These update changes apply only if you installed Salesforce CLI with an installer, not `npm`.

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
