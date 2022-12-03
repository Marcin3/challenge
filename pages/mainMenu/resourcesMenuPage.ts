import { expect, Locator, Page } from "@playwright/test";

export class ResourcesMenuPage {
  private readonly resourcesOverviewButton: Locator;

  constructor(public readonly page: Page) {
    this.resourcesOverviewButton = page.getByRole("link", {
      name: "Resources overview",
    });
  }

  async checkIfBookmarkResourcesIsVisible() {
    await expect(
      this.resourcesOverviewButton,
      "Bookmarks resources should be visible"
    ).toBeVisible();
  }
}
