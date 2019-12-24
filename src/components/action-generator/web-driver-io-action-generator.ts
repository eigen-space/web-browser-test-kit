// noinspection JSUnusedGlobalSymbols
import { ActionGenerator } from '@cybernated/web-e2e-spec-creator';

export class WebDriverIoActionGenerator implements ActionGenerator {

    openPage(args: { url: string }): string {
        return `browser.url('${args.url}');`;
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