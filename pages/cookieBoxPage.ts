import { expect, Locator, Page } from "@playwright/test";

export class CookieBoxPage {
  private readonly acceptButton: Locator;
  private readonly declineButton: Locator;

  constructor(public readonly page: Page) {
    this.acceptButton = page.getByRole("button", { name: "ACCEPT" });
    this.declineButton = page.getByRole("button", { name: "DECLINE" });
  }

  async clickAcceptButton() {
    await this.acceptButton.click();
  }

  async clickDeclineButton() {
    await this.declineButton.click();
  }
}
