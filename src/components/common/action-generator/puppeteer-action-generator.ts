// noinspection JSUnusedGlobalSymbols
import { ActionGenerator } from '@cybernated/web-browser-test-creator';
import { environment } from '../../../environment/environment';

export class PuppeteerActionGenerator implements ActionGenerator {

    wrapToHeaderSpec(args: { title: string, scenarios: string }): string {
        return `
            import * as puppeteer from 'puppeteer-core';
            import {
                remote,
                expect,
                Browser,
                Devtools,
                SemanticElementsSearcher
            } from '@cybernated/web-browser-test-kit';

            describe('${args.title}', () => {
                jest.setTimeout(30000);

                let browser: Browser;
                let devtools: Devtools;
            
                beforeAll(async (done) => {
                    browser = await remote({
                        hostname: ${environment.selenoidHost},
                        path: '/wd/hub',
                        capabilities: {
                            browserName: 'chrome',
                            browserVersion: '83.0',
                            'selenoid:options': { enableVNC: true, enableVideo: false }
                        }
                    });
                    browser.setWindowSize(1280, 840);
            
                    devtools = await puppeteer.connect(
                        { browserWSEndpoint: \`ws://${environment.selenoidHost}:4444/devtools/\${browser.sessionId}\` }
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
            await page.setRequestInterception(true);

            const requests: puppeteer.Request[] = [];
            page.on('request', interceptedRequest => {
                interceptedRequest.continue();
                requests.push(interceptedRequest);
            });
        `;
    };

    inputValueBySelector(args: { value: string, targetSelector: string }): string {
        // This is a way to trigger input simulated event of React
        // By default when we just use DOM API or setValue of wdio
        // ... it just doesn't work.

        // 1. So here we have to get setter of value not from ReactDOM but from default HTML Input element
        // ... for some reasons using custom setter doesn't trigger React onChange event
        // When we got it we call this setter for our target input element and after trigger event
        //
        // 2. We aren't able to use any reusable code inside the evaluate callback function here because we
        // ... lose the all clojure inside so that we can't use any functions here at all,
        // ... even imported ones.
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
                await SemanticElementsSearcher.getSelectorOfExistingElement(page, '${args.targetSelector}'),
                { visible: true }
           ));
           (await SemanticElementsSearcher.find(page, '${args.targetSelector}'))!.click();
        `;
    };

    pressOnElement(args: { data: string }): string {
        return `
            (await page.waitFor(
                await SemanticElementsSearcher.getSelectorOfExistingElement(page, '${args.data}'),
                { visible: true }
             ));
            await (await SemanticElementsSearcher.find(page, '${args.data}'))!.click();
        `;
    }

    checkRequest(args: { method: string, url: string, bodyPath: string }): string {
        return `
            expect({ url: '${args.url}', method: '${args.method}', requests }).toBeRequestWithValidBody();
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
                await SemanticElementsSearcher.getSelectorOfExistingElement(page, '${args.data}'),
                { visible: true }
            ));
            (await SemanticElementsSearcher.find(page, '${args.data}')).scrollIntoView();
        `;
    }
}
