import { remote as originRemote } from 'webdriverio';

declare module 'webdriverio' {

    interface DesiredCapabilities {
        browserName: string,
        browserVersion: string,
        'selenoid:options'?: { enableVNC?: boolean, enableVideo?: boolean }
    }

    interface RemoteOptions {
        capabilities: DesiredCapabilities;
    }

    function remote(
        options?: RemoteOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        modifier?: (...args: any[]) => any
    ): Promise<BrowserObject>;

    interface BrowserObject extends WebDriver.ClientOptions, WebDriver.ClientAsync {}
}

export const remote = originRemote;
