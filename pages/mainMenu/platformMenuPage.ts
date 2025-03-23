import { expect, Locator, Page } from "@playwright/test";

export class PlatformMenuPage {
  private readonly platformOverviewButton: Locator;

  constructor(private readonly page: Page) {
    this.platformOverviewButton = this.page.getByRole("link", {
      name: "What is synthetic data and its benefits Introduction to synthetic data",
    });
  }

  async checkIfBookmarkPlatformIsVisible() {
    await expect(
      this.platformOverviewButton,
      "Bookmarks platform should be visible"
    ).toBeVisible();
  }
}
