import { SpecGenerator } from '@cybernated/web-browser-test-creator';
import * as path from 'path';
import { ArgumentParser } from '@eigenspace/argument-parser';
import { PuppeteerActionGenerator } from '..';

const parser = new ArgumentParser();
const args = parser.get(process.argv.slice(2));

const cwd = process.cwd();
const outputDir = args.get('outputDir') as string || path.join(cwd, './ui-specs/specs');
const runner = new SpecGenerator(new PuppeteerActionGenerator(), outputDir);

const configsPath = args.get('configDir') as string || path.join(cwd, './ui-specs/configs');
runner.run(configsPath);
