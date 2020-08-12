# About

This project contains the configuration and the adapter that implements an **ActionGenerator** interface 
for generating specifications using 
the [web-browser-test-creator](https://github.com/cybernated/web-browser-test-creator) utility.

# Requirements

* node >= 10.12.0

# Install

To install this package, you should have an access to the registry https://artifacts.arrival.services.

`yarn add --dev @cybernated/web-browser-test-kit`

# How to run

## Setting up a test environment

The instrument requires the Selenoid server. To set it up please read 
[the instruction from the official documentation](https://aerokube.com/selenoid/latest/#_option_1_you_have_a_workstation_virtual_machine_or_server).

## Generating specs

1. Add all required folders to tsconfig `include` section:
    ```
    ...
    "include": [
        "ui-specs",
        "node_modules/@wdio/sync/webdriverio-core.d.ts",
        "node_modules/@wdio/sync/webdriverio.d.ts",
        ...
    ]
    ```
2. Run
    `node PATH/TO/web-wdio-e2e-kit/scripts/generate-specs.js --outputDir=pathToDir --configDir=pathToDir`
    
    | Parameter | Type | Required | Default | Description |
    | ------ | ------ | ------ | ------ | ------ |
    | outputDir | string | false | <cwd>/ui-specs/specs | output directory for generating specs |
    | configDir | string | false | <cwd>/ui-specs/configs | directory with scenario configs |

## Running tests

Just run `yarn jest`
   
# Why do we have that dependencies?

* `@cybernated/web-browser-test-creator` - used to generate specs in human understandable language.
* `@eigenspace/argument-parser` - used to parse arguments.
* `chromedriver` - chromium webdriver implementation.
* `expect` - used as assert library .
* `ts-node` - used to enable wdio to work with ts files.
* `tsconfig-paths` - used to resolve ts files.
* `webdriverio` - used for Selenoid remote connection.
* `jest-diff` - used for comparing two objects in the results and outputting differences.
* `jest-image-snapshot` - used for comparing actual and result images and outputting differences.

# Why do we have that dev dependencies?

* `@types/*` - contains type definitions for a specific library.
* `@eigenspace/codestyle` - includes lint rules, config for typescript.
* `@eigenspace/common-types` - includes common types.
* `@eigenspace/helper-scripts` - helps us deploy the package.
* `eslint-plugin-eigenspace-script` - Includes set of script linting rules and configuration for them.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
* `husky` - used for configure git hooks.
* `lint-staged` - used for configure linters against staged git files.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `jest` - spec runner.
* `ts-jest` - it lets you use Jest to test projects written in TypeScript.
