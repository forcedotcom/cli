Hello @THE_AUTHOR :wave: It looks like you're using an outdated version of the CLI.

`sfdx` version 7 is in "maintenance mode" as of July 12, 2023

Please migrate from `sfdx` version 7 to `sf` version 2.0.0 or later.

Migrating to `sf` from `sfdx` is incredibly easy and can be done in two commands.
You can find more information [here](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_move_to_sf_v2.htm).

After upgrading to the latest version of the `@salesforce/cli` please try running the command again and providing the output of `sf version --verbose --json`.
