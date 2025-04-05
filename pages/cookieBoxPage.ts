import {Locator, Page} from "@playwright/test";

export class CookieBoxPage {
    private readonly acceptButton: Locator;
    private readonly declineButton: Locator;

    constructor(private readonly page: Page) {
        this.acceptButton = this.page.getByRole("button", {name: "Accept All"});
        this.declineButton = this.page.getByRole('button', { name: 'Reject All' });
    }

    async clickAcceptButton() {
        await this.acceptButton.click();
    }

    async clickDeclineButton() {
        await this.declineButton.click();
    }

    async cookiesLocatorHandler() {
        await this.page.addLocatorHandler(this.acceptButton, async locator => {
            await locator.click();
        }, {times: 1});
    }
}
