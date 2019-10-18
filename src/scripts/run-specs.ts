import Launcher from '@wdio/cli';
import { ArgumentParser } from '@eigenspace/argument-parser';
import * as path from 'path';

const parser = new ArgumentParser();
const args = parser.get(process.argv.slice(2));

const pathToConf = args.get('configPath') as string | undefined || path.join(__dirname, '../configs/wdio/wdio.conf.js');
const wdio = new Launcher(pathToConf);

wdio.run().then((code) => {
    process.exit(code);
}, (error) => {
    // eslint-disable-next-line no-console
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
});