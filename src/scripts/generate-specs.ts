import { SpecGenerator } from '@arrival/web-e2e-spec-creator';
import * as path from 'path';
import { ArgumentParser } from '@eigenspace/argument-parser';
import { WebDriverIoActionGenerator } from '..';

const parser = new ArgumentParser();
const args = parser.get(process.argv.slice(2));

const cwd = process.cwd();
const outputDir = args.get('outputDir') as string || path.join(cwd, './e2e/specs');
const runner = new SpecGenerator(new WebDriverIoActionGenerator(), outputDir);

const configsPath = args.get('configDir') as string || path.join(cwd, './e2e/configs');
runner.run(configsPath);