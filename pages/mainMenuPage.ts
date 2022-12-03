import { expect, Locator, Page } from "@playwright/test";

export class MainMenuPage {
  private readonly companyButton: Locator;
  private readonly platformButton: Locator;
  private readonly resourcesButton: Locator;
  private readonly searchButton: Locator;
  private readonly searchField: Locator;
  private readonly searchResult: Locator;
  private readonly syntheticDataButton: Locator;

  constructor(public readonly page: Page) {
    this.companyButton = page.getByRole("button", { name: "Company" });
    this.platformButton = page.getByRole("button", { name: "Platform" });
    this.resourcesButton = page.getByRole("button", { name: "Resources" });
    this.searchButton = page.getByRole("button", { name: "Open search" });
    this.searchField = page.getByTitle("Search for:");
    this.searchResult = page.locator("h1");
    this.syntheticDataButton = page.getByRole("button", {
      name: "Synthetic Data",
    });
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

  async clickOnSyntheticDataButton() {
    await this.syntheticDataButton.click();
  }

  async fillSearchFiled(value: string) {
    await this.searchField.fill(value);
  }

  async hoverOverCompanyButton() {
    await this.companyButton.hover();
  }

  async pressEnterButtonOnSearchFiled() {
    await this.searchField.press("Enter");
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
