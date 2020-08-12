import * as puppeteer from 'puppeteer';
import { ElementHandle } from 'puppeteer';
import { PageElementsUtils } from '../../../utils/page-elements/page-elements.utils';
import { SelectorListGenerator } from '../../..';

export class SemanticElementsSearcher {

    static async getSelectorOfExistingElement(page: puppeteer.Page, selector: string): Promise<string> {
        const selectors = SelectorListGenerator.getAllSelectors(selector);
        for (const sel of selectors) {
            if (await PageElementsUtils.isExist(page, sel)) {
                return sel;
            }
        }

        throw new Error('There are no any existing selectors');
    }

    static find(page: puppeteer.Page, selector: string): Promise<ElementHandle | undefined> {
        return PageElementsUtils.find(page, ...SelectorListGenerator.getAllSelectors(selector));
    }
}
