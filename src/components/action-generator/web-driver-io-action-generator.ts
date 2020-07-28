// noinspection JSUnusedGlobalSymbols
import { ActionGenerator } from '@cybernated/web-browser-test-creator';

export class WebDriverIoActionGenerator implements ActionGenerator {

    openPage(args: { url: string }): string {
        return `
            browser.url('${args.url}');
            browser.setupInterceptor();
        `;
    };

    inputValueBySelector(args: { value: string, targetSelector: string }): string {
        return `browser.$('${args.targetSelector}').setValue('${args.value}');`;
    };

    pressOnButtonBySelector(args: { targetSelector: string }): string {
        return `browser.$('${args.targetSelector}').click();`;
    };

    pressOnElement(args: { data: string }): string {
        return `
            [\`//*[text()="${args.data}"]\`, \`[placeholder="${args.data}"]\`, \`[title="${args.data}"]\`]
                .map(selector => browser.$(selector))
                .filter(elem => elem.isExisting())[0]!
                .click();
        `;
    }

    checkRequest(args: { method: string, url: string, bodyPath: string }): string {
        return `
            // @ts-ignore
            expect(NetworkUtils.getRequestBody(browser.getRequests(), '${args.url}', '${args.method}'))
                .toEqual(FsUtils.getJsonContent(\`\${__dirname}/${args.bodyPath}\`));
        `;
    }

    checkPageScreen(args: { title: string }): string {
        // TODO Add wdio image comprase typings
        return `
            // @ts-ignore
            expect(browser.checkFullPageScreen('${args.title}')).toEqual(0);
        `;
    };

    pause(args: { duration: string }): string {
        return `browser.pause(${args.duration});`;
    }

    scrollToElementBySelector(args: { targetSelector: string }): string {
        return `browser.$('${args.targetSelector}').scrollIntoView();`;
    }

    scrollToElement(args: { data: string }): string {
        return `
            [\`//*[text()="${args.data}"]\`, \`[placeholder="${args.data}"]\`, \`[title="${args.data}"]\`]
                .map(selector => browser.$(selector))
                .filter(elem => elem.isExisting())[0]!
                .scrollIntoView();
        `;
    }

    wrapToHeaderSpec(args: { title: string, scenarios: string }): string {
        return `
            import * as expect from 'expect';
            // @ts-ignore
            import { FsUtils, NetworkUtils } from '@cybernated/web-wdio-browser-test-kit';
            
            describe('${args.title}', () => {
                ${args.scenarios}
            });
        `;
    };

    wrapToItemSpec(args: { title: string, steps: string }): string {
        return `
            it('${args.title}', () => {
                ${args.steps}
            });
        `;
    };
}
