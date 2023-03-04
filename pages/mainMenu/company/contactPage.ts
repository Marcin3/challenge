import { expect, Locator, Page } from "@playwright/test";

export class ContactPage {
  private readonly askUsAnythingHeadline: Locator;
  private readonly countryRegionCombobox: Locator;
  private readonly descriptionField: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly mobilePhoneNumberInput: Locator;
  private readonly marketingOffersAndUpdatesCheckbox: Locator;
  private readonly sendMessage: Locator;
  private readonly yourBusinessEmailInput: Locator;
  private readonly yourOrganizationInput: Locator;

  constructor(public readonly page: Page) {
    this.askUsAnythingHeadline = page.getByText("Ask us anything!");
    this.countryRegionCombobox = page.getByRole("combobox", {
      name: "Country/Region*",
    });
    this.descriptionField = page.getByPlaceholder(
      "How can we help you? Drop us a few lines so we can put you in touch with our specialist on your topic."
    );
    this.firstNameInput = page.getByLabel("First Name*");
    this.lastNameInput = page.getByLabel("Last Name*");
    this.marketingOffersAndUpdatesCheckbox = page.getByLabel(
      "Marketing offers and updates.*"
    );
    this.mobilePhoneNumberInput = page.getByLabel("Mobile phone number*");
    this.sendMessage = page.getByRole("button", { name: "SEND MESSAGE" });
    this.yourBusinessEmailInput = page.getByPlaceholder(
      "john.smith@company.com"
    );
    this.yourOrganizationInput = page.getByLabel("Your Organization*");
  }

  async checkMarketingOffersAndUpdatesCheckbox() {
    await this.marketingOffersAndUpdatesCheckbox.check();
  }

  async fillFields(user: User) {
    await this.askUsAnythingHeadline.click();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.yourBusinessEmailInput.fill(user.yourBusinessEmail);
    await this.mobilePhoneNumberInput.fill(user.mobilePhoneNumber.toString());
    await this.yourOrganizationInput.fill(user.yourOrganization);
    await this.countryRegionCombobox.selectOption(user.countryRegion);
    await this.descriptionField.fill(user.descriptionField);
  }

  async hoverSendMessageButton() {
    await this.sendMessage.hover();
  }
}

export interface User {
  firstName: string;
  lastName: string;
  yourBusinessEmail: string;
  mobilePhoneNumber: number;
  yourOrganization: string;
  countryRegion: "Austria" | "Poland";
  descriptionField: string;
  marketingOffersAndUpdates: boolean;
}
