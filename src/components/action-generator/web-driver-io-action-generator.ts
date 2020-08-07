// noinspection JSUnusedGlobalSymbols
import { ActionGenerator } from '@cybernated/web-browser-test-creator';

export class WebDriverIoActionGenerator implements ActionGenerator {

    wrapToHeaderSpec(args: { title: string, scenarios: string }): string {
        return `
            import * as puppeteer from 'puppeteer-core';
            import {
                remote,
                expect,
                Browser,
                Devtools,
                SemanticElementsSearcher
            } from '@cybernated/web-wdio-browser-test-kit';

            describe('${args.title}', () => {
                jest.setTimeout(30000);

                let browser: Browser;
                let devtools: Devtools;
            
                beforeAll(async (done) => {
                    browser = await remote({
                        hostname: 'localhost',
                        path: '/wd/hub',
                        capabilities: {
                            browserName: 'chrome',
                            browserVersion: '83.0',
                            'selenoid:options': { enableVNC: true, enableVideo: false }
                        }
                    });
                    browser.setWindowSize(1280, 840);
            
                    devtools = await puppeteer.connect(
                        { browserWSEndpoint: \`ws://localhost:4444/devtools/\${browser.sessionId}\` }
                    );
            
                    done();
                });
            
                afterAll(async (done) => {
                    await devtools.close();
                    await browser.deleteSession();
                    done();
                });

                ${args.scenarios}
            });
        `;
    };

    wrapToItemSpec(args: { title: string, steps: string }): string {
        return `
            it('${args.title}', async () => {
                ${args.steps}
            });
        `;
    };

    openPage(args: { url: string }): string {
        return `
            const page = await devtools.newPage();
            await page.setViewport({ width: 1280, height: 1000 });
            await page.goto('${args.url}');
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
            await page.evaluate(
                () => {
                    const selectors = [
                        '[placeholder=":selector"]',
                        '[title=":selector"]',
                        '[name=":selector"]',
                        '[value=":selector"]',
                        '[id=":selector"]'
                    ];
                    const elements = selectors.map(item => item.replace(':selector', '${args.targetSelector}'));
                    const item = elements
                        .map(el => document.querySelector(el))
                        .find(el => el)!;
                    item.scrollIntoView();
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLInputElement.prototype,
                        'value'
                    )!.set;
                    nativeInputValueSetter!.call(item, '${args.value}');
    
                    const event = new Event('input', { bubbles: true });
                    item.dispatchEvent(event);
                }
            );
        `;
    };

    pressOnButtonBySelector(args: { targetSelector: string }): string {
        return `
           (await page.waitFor(
                await SemanticElementsSearcher.getSelectorOfExistingElement(page, '${args.targetSelector}') || '',
                { visible: true }
           ));
           (await SemanticElementsSearcher.find(page, '${args.targetSelector}'))!.click();
        `;
    };

    pressOnElement(args: { data: string }): string {
        return `
            (await page.waitFor(
                await SemanticElementsSearcher.getSelectorOfExistingElement(page, '${args.data}') || '',
                { visible: true }
             ));
            await (await SemanticElementsSearcher.find(page, '${args.data}'))!.click();
        `;
    }

    checkRequest(args: { method: string, url: string, bodyPath: string }): string {
        return `
            expect({ url: '${args.url}', method: '${args.method}' }).toBeRequestWithValidBody();
        `;
    }

    checkPageScreen(): string {
        return 'expect(await page.screenshot()).toMatchImageSnapshot();';
    };

    pause(args: { duration: string }): string {
        return `await page.waitFor(${args.duration});`;
    }

    scrollToElement(args: { data: string }): string {
        return `
            (await page.waitFor(
                await SemanticElementsSearcher.getSelectorOfExistingElement(page, '${args.data}') || '',
                { visible: true }
            ));
            (await SemanticElementsSearcher.find(page, '${args.data}')).scrollIntoView();
        `;
    }
}
