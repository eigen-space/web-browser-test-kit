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
        // This is a way to trigger input simulated event of React
        // By default when we just use DOM API or setValue of wdio
        // ... it just doesn't work.

        // So here we have to get setter of value not from ReactDOM but from default HTML Input element
        // .. for some reasons using custom setter doesn't trigger React onChange event
        // When we got it we call this setter for our target input element and after trigger event
        return `
            browser.$('${args.targetSelector}').scrollIntoView();
            browser.execute(
                item => {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLInputElement.prototype,
                        'value'
                    )!.set;
                    nativeInputValueSetter!.call(item, '${args.value}');

                    const event = new Event('input', { bubbles: true });
                    item.dispatchEvent(event);
                },
                browser.$('${args.targetSelector}')
            );
        `;
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
            expect({ url: '${args.url}', method: '${args.method}' }).toBeRequestWithValidBody();
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
            import { expect } from '@cybernated/web-wdio-browser-test-kit';
            
            describe('${args.title}', () => {
                expect.setState({ testPath: __dirname });

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
