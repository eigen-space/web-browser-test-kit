export class SelectorInjectorUtils {
    private static QUERY_SELECTORS = [
        '[placeholder=":selector"]',
        '[title=":selector"]',
        '[name=":selector"]',
        '[id=":selector"]'
    ];

    private static XPATH_SELECTORS = ['//*[text()=":selector"]'];

    static getAllSelectors(value: string): string[] {
        return SelectorInjectorUtils.getAppliedSelectors(
            [...SelectorInjectorUtils.QUERY_SELECTORS, ...SelectorInjectorUtils.XPATH_SELECTORS],
            value
        );
    }

    static getQuerySelectors(value: string): string[] {
        return SelectorInjectorUtils.getAppliedSelectors(
            SelectorInjectorUtils.QUERY_SELECTORS,
            value
        );
    }

    private static getAppliedSelectors(list: string[], selector: string): string[] {
        return list.map(item => item.replace(':selector', selector));
    }
}
