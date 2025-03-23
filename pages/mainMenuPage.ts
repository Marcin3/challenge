import { expect, Locator, Page } from "@playwright/test";

export class MainMenuPage {
  private readonly companyButton: Locator;
  private readonly platformButton: Locator;
  private readonly resourcesButton: Locator;
  private readonly searchButton: Locator;
  private readonly searchField: Locator;
  private readonly searchResult: Locator;

  constructor(private readonly page: Page) {
    this.companyButton = this.page.getByRole("button", { name: "Company" });
    this.platformButton = this.page.getByRole("button", { name: "Platform" });
    this.resourcesButton = this.page.getByRole("button", { name: "Resources" });
    this.searchButton = this.page.getByRole("button", { name: "Open search" });
    this.searchField = this.page.getByTitle("Search for:");
    this.searchResult = this.page.locator("h1");
  }

  async clickOnCompanyButton() {
    await this.companyButton.click();
  }

  async clickOnPlatformButton() {
    await this.platformButton.click();
  }

  async clickOnResourcesButton() {
    await this.resourcesButton.click();
  }

  async clickOnSearchButton() {
    await this.searchButton.click();
  }

  async fillSearchFiled(value: string) {
    await this.searchField.fill(value);
  }

 async submitSearch(value?: string) {
      const waitResponse = value && this.page.waitForResponse(res =>
          res.url().includes(`/?s=${encodeURIComponent(value)}`) && res.status() === 200
      );

      await this.searchField.press("Enter");
      if (waitResponse) await waitResponse;
    }

    async checkSearchResult(
    firstExpectedValue: string,
    secondExpectedValue: string
  ) {
    expect(await this.searchResult.first().textContent()).toBe(
      firstExpectedValue
    );
    expect(await this.searchResult.nth(1).innerText()).toBe(
      secondExpectedValue
    );
  }
}
