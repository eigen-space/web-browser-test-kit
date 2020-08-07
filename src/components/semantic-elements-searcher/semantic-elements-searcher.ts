import * as puppeteer from 'puppeteer';
import { ElementHandle } from 'puppeteer';
import { PageElementsUtils } from '../../utils/page-elements/page-elements.utils';
import { SelectorInjectorUtils } from '../../utils/selector-injector/selector-injector.utils';

export class SemanticElementsSearcher {

    static async getSelectorOfExistingElement(page: puppeteer.Page, selector: string): Promise<string | undefined> {
        const selectors = SelectorInjectorUtils.getAllSelectors(selector);
        for (const sel of selectors) {
            if (await PageElementsUtils.isExist(page, sel)) {
                return sel;
            }
        }

        return undefined;
    }

    static find(page: puppeteer.Page, selector: string): Promise<ElementHandle | undefined> {
        return PageElementsUtils.find(page, ...SelectorInjectorUtils.getAllSelectors(selector));
    }
}
