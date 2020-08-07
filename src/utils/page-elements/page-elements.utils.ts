import { ElementHandle } from 'puppeteer-core';
import * as puppeteer from 'puppeteer';

export class PageElementsUtils {
    private static XPATH_INDICATOR = '//';

    static async find(page: puppeteer.Page, ...value: string[]): Promise<ElementHandle | undefined> {
        const foundItems = await Promise.all(
            value.map(selector => PageElementsUtils.getBySelector(page, selector))
        );

        return foundItems.find(item => item);
    }

    static async isExist(page: puppeteer.Page, value: string): Promise<boolean> {
        return Boolean(await PageElementsUtils.getBySelector(page, value));
    }

    private static async getBySelector(page: puppeteer.Page, selector: string): Promise<ElementHandle | undefined> {
        if (selector.startsWith(PageElementsUtils.XPATH_INDICATOR)) {
            const items = await page.$x(selector);
            return items[0];
        }

        const itemFromDomQuery = await page.$(selector);
        return itemFromDomQuery ? itemFromDomQuery : undefined;
    }
}
