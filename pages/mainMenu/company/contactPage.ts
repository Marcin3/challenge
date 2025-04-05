import { Locator, Page } from "@playwright/test";

export class ContactPage {
  private readonly countryRegionCombobox: Locator;
  private readonly yourMessageField: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly marketingOffersAndUpdatesCheckbox: Locator;
  private readonly sendMessage: Locator;
  private readonly yourBusinessEmailInput: Locator;
  private readonly yourOrganizationInput: Locator;

  constructor(private readonly page: Page) {
    this.countryRegionCombobox = this.page.locator('input[name="your-country"]');
    this.yourMessageField = this.page.locator('textarea[name="your-message"]')
    this.firstNameInput = this.page.locator('input[name="your-firstname"]');
    this.lastNameInput = this.page.locator('input[name="your-lastname"]');
    this.marketingOffersAndUpdatesCheckbox = this.page.locator('input[type="checkbox"]');
    this.sendMessage = this.page.getByRole("button", { name: "SEND MESSAGE" });
    this.yourBusinessEmailInput = this.page.locator('input[name="your-email"]');
    this.yourOrganizationInput = this.page.locator('input[name="your-organization"]');
  }

  async checkMarketingOffersAndUpdatesCheckbox() {
    await this.marketingOffersAndUpdatesCheckbox.click()
  }

  async fillFields(user: User) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.yourBusinessEmailInput.fill(user.yourBusinessEmail);
    await this.yourOrganizationInput.fill(user.yourOrganization);
    await this.countryRegionCombobox.fill(user.countryRegion);
    await this.yourMessageField.fill(user.yourMessage);
  }

  async hoverSendMessageButton() {
    await this.sendMessage.hover();
  }
}

export interface User {
  firstName: string;
  lastName: string;
  yourBusinessEmail: string;
  mobilePhoneNumber: string;
  yourOrganization: string;
  countryRegion: string;
  yourMessage: string;
  marketingOffersAndUpdates: boolean;
}
