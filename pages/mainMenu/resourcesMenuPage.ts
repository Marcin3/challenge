import { expect, Locator, Page } from "@playwright/test";

export class ResourcesMenuPage {
  private readonly resourcesOverviewButton: Locator;

  constructor(private readonly page: Page) {
    this.resourcesOverviewButton = this.page.getByRole("link", {
      name: "Podcast Get insights from industry pioneers",
    });
  }

  async checkIfBookmarkResourcesIsVisible() {
    await expect(
      this.resourcesOverviewButton,
      "Bookmarks resources should be visible"
    ).toBeVisible();
  }
}
