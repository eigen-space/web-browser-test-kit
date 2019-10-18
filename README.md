# About

This project contains wdio configuration and an adapter that implements an **ActionGenerator** interface for generating specifications using the [web-e2e-spec-creator](https://github.com/cybernated/web-e2e-spec-creator) utility

# Requirements

* node >= 10.12.0

# Install

To install this package, you should have access to registry https://artifacts.arrival.services.

`yarn add --dev @arrival/web-wdio-e2e-kit`

# How to run

## Generating specs

1. Just run
    `node PATH/TO/web-wdio-e2e-kit/scripts/generate-specs.js --outputDir=pathToDir --configDir=pathToDir`
    
    | Parameter | Type | Required | Default | Description |
    | ------ | ------ | ------ | ------ | ------ |
    | outputDir | string | false | <cwd>/e2e/specs | output directory for generating specs |
    | configDir | string | false | <cwd>/e2e/configs | directory with scenario configs |

2. Enjoy

## Running tests

1. Just run
    `node PATH/TO/web-wdio-e2e-kit/scripts/run-specs.js --outputDir=pathToDir --configDir=pathToDir`
    
    | Parameter | Type | Required | Default | Description |
    | ------ | ------ | ------ | ------ | ------ |
    | configPath | string | false | <package>/configs/wdio/wdio.conf.js | directory with wdio config |

2. Enjoy

# Why do we have that dependencies?

* `@arrival/web-e2e-spec-creator` - used to generate specs.
* `@eigenspace/argument-parser` - used to parse arguments.
* `@wdio/local-runner` - used to run tests locally.
* `@wdio/spec-reporter` - used to report in spec style .
* `@wdio/mocha-framework` - used as moca adapter.
* `@wdio/sync` - used to enable sync mode of e2e spec.
* `@wdio/cli` - just wdio cli.
* `chromedriver` - chromium webdriver implementation.
* `expect` - used as assert library .
* `ts-node` - used to enable wdio to work with ts files.
* `tsconfig-paths` - used to resolve ts files .
* `wdio-chromedriver-service` - used to run chromedriver via wdio.
* `wdio-image-comparison-service` - used to make and compare screenshots.

# Why do we have that dev dependencies?

* `@eigenspace/codestyle` - includes lint rules, config for typescript.
* `@eigenspace/helper-scripts` - hepls us deploy the package.
* `eslint-plugin-eigenspace-script` - Includes set of script linting rules and configuration for them.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
* `husky` - used for configure git hooks.
* `lint-staged` - used for configure linters against staged git files.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
