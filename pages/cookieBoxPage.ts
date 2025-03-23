import { Locator, Page } from "@playwright/test";

export class CookieBoxPage {
  private readonly acceptButton: Locator;
  private readonly declineButton: Locator;

  constructor(private readonly page: Page) {
    this.acceptButton = this.page.getByRole("button", { name: "ACCEPT" });
    this.declineButton = this.page.getByRole("button", { name: "DECLINE" });
  }

  async clickAcceptButton() {
    await this.acceptButton.click();
  }

  async clickDeclineButton() {
    await this.declineButton.click();
  }
}
