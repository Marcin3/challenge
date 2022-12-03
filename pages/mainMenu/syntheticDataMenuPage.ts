import { expect, Locator, Page } from "@playwright/test";

export class SyntheticDataMenuPage {
  private readonly syntheticDataOverviewButton: Locator;

  constructor(public readonly page: Page) {
    this.syntheticDataOverviewButton = page.getByRole("link", {
      name: "Synthetic data overview",
    });
  }

  async checkIfBookmarkSyntheticDataIsVisible() {
    await expect(
      this.syntheticDataOverviewButton,
      "Bookmarks synthetic data should be visible"
    ).toBeVisible();
  }
}
