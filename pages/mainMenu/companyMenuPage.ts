import { expect, Locator, Page } from "@playwright/test";

export class CompanyMenuPage {
  private readonly contactButton: Locator;

  constructor(public readonly page: Page) {
    this.contactButton = page.getByRole("link", {
      name: "Contact us Do you have a question about synthetic data? Send us a message",
    });
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
