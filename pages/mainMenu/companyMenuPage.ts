import { expect, Locator, Page } from "@playwright/test";

export class CompanyMenuPage {
  private readonly contactButton: Locator;

  constructor(public readonly page: Page) {
    this.contactButton = page.locator('a[href="https://mostly.ai/contact"]').first();
  } 

  async clickContact() {
    await this.contactButton.click();
  }

  async checkIfBookmarkCompanyIsVisible() {
    await expect(
      this.contactButton,
      "Bookmarks company should be visible"
    ).toBeVisible();
  }
}
