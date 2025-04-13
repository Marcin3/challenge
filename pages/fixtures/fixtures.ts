import { expect as baseExpect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';

export { test } from '@playwright/test';

export const expect = baseExpect.extend({
    async toHaveAmount(locator: Locator, expected: number, options?: { timeout?: number }) {
        const assertionName = 'toHaveAmount';
        let pass: boolean;
        let matcherResult: any;
        try {
            await baseExpect(locator).toHaveAttribute('data-amount', String(expected), options);
            pass = true;
        } catch (e: any) {
            matcherResult = e.matcherResult;
            pass = false;
        }

        const message = pass
            ? () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
                '\n\n' +
                `Locator: ${locator}\n` +
                `Expected: not ${this.utils.printExpected(expected)}\n` +
                (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '')
            : () =>  this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
                '\n\n' +
                `Locator: ${locator}\n` +
                `Expected: ${this.utils.printExpected(expected)}\n` +
                (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '');

        return {
            message,
            pass,
            name: assertionName,
            expected,
            actual: matcherResult?.actual,
        };
    },
});