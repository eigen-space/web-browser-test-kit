declare module '@wdio/cli' {

    export default class Launcher {
        constructor(confPath: string);
        run(): Promise<number>;
    }
}