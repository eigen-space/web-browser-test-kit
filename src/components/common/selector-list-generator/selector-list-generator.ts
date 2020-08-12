export class SelectorListGenerator {
    private static QUERY_SELECTORS = [
        '[placeholder=":selector"]',
        '[title=":selector"]',
        '[name=":selector"]',
        '[id=":selector"]'
    ];

    private static XPATH_SELECTORS = ['//*[text()=":selector"]'];

    static getAllSelectors(value: string): string[] {
        return SelectorListGenerator.getAppliedSelectors(
            [...SelectorListGenerator.QUERY_SELECTORS, ...SelectorListGenerator.XPATH_SELECTORS],
            value
        );
    }

    // noinspection JSUnusedGlobalSymbols
    static getQuerySelectors(value: string): string[] {
        return SelectorListGenerator.getAppliedSelectors(SelectorListGenerator.QUERY_SELECTORS, value);
    }

    private static getAppliedSelectors(list: string[], selector: string): string[] {
        return list.map(item => item.replace(':selector', selector));
    }
}
