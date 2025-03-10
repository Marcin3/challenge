import { expect, Page, test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CompanyMenuPage } from "../../pages/mainMenu/companyMenuPage";
import { ContactPage, User } from "../../pages/mainMenu/company/contactPage";
import { CookieBoxPage } from "../../pages/cookieBoxPage";
import { MainMenuPage } from "../../pages/mainMenuPage";
import { PlatformMenuPage } from "../../pages/mainMenu/platformMenuPage";
import { ResourcesMenuPage } from "../../pages/mainMenu/resourcesMenuPage";
import { SyntheticDataMenuPage } from "../../pages/mainMenu/syntheticDataMenuPage";

test("User can see bookmarks", async ({ page }) => {
  const mainMenuPage = new MainMenuPage(page);

  await test.step(`Given User is on page https://mostly.ai/`, async () => {
    await page.goto("");
    expect(page).toHaveURL("");
    await acceptCookies(page);
  });

  await test.step(`Then User can see following bookmarks: Platform, Resources, Company`, async () => {
    await mainMenuPage.clickOnCompanyButton();
    const companyMenuPage = new CompanyMenuPage(page);
    await companyMenuPage.checkIfBookmarkCompanyIsVisible();

    await mainMenuPage.clickOnPlatformButton();
    const platformMenuPage = new PlatformMenuPage(page);
    await platformMenuPage.checkIfBookmarkPlatformIsVisible();

    await mainMenuPage.clickOnResourcesButton();
    const resourcesMenuPage = new ResourcesMenuPage(page);
    await resourcesMenuPage.checkIfBookmarkResourcesIsVisible();
  });
});

test("Search wrong word", async ({ page }) => {
  const wrongWord = "sythetic";
  const mainMenuPage = new MainMenuPage(page);

  await test.step(`Given User is on page https://mostly.ai/`, async () => {
    await page.goto("");
    await expect(page).toHaveURL("");
  });

  await test.step(`When User click the “Search” button`, async () => {
    await mainMenuPage.clickOnSearchButton();
  });

  await test.step(`And type “sythetic” (wrong spelling of synthetic) in search field`, async () => {
    await mainMenuPage.fillSearchFiled(wrongWord);
  });

  await test.step(`And press Enter`, async () => {
    await mainMenuPage.pressEnterButtonOnSearchFiled();
  });

  await test.step(`Then User can see following information: “Sorry, no results for: sythetic”`, async () => {
    const firstPart = `Sorry, no results for:`;
    await mainMenuPage.checkSearchResult(firstPart, wrongWord);
  });
});

test("User can send message using contact", async ({ page }) => {
  const contactPage = new ContactPage(page);
  const mainMenuPage = new MainMenuPage(page);
  const user: User = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    yourBusinessEmail: faker.internet.email(),
    mobilePhoneNumber: faker.phone.number(),
    yourOrganization: "example",
    countryRegion: faker.address.country(),
    yourMessage: "playwright test",
    marketingOffersAndUpdates: true,
  };

  await test.step(`Given User is on page https://mostly.ai/`, async () => {
    await page.goto("");
    expect(page).toHaveURL("");
    await acceptCookies(page);
  });

  await test.step(`When User click “Contact” item under the “Company” bookmark`, async () => {
    await mainMenuPage.clickOnCompanyButton();
    const companyMenuPage = new CompanyMenuPage(page);
    await companyMenuPage.clickContact();
  });

  await test.step(`And fill following fields: First Name, Last Name,Your Business Email, Your Organization, Country/Region, Your Message Field`, async () => {
    await contactPage.fillFields(user);
  });

  await test.step(`And check “Marketing offers and updates” checkbox`, async () => {
    await contactPage.checkMarketingOffersAndUpdatesCheckbox();
  });

  await test.step(`Then User can hover over “Send Message” button, but do not click it`, async () => {
    await contactPage.hoverSendMessageButton();
  });
});

/**
 * To show cookies on page, test needs to click on search button.
 */
async function acceptCookies(page: Page) {
  const mainMenuPage = new MainMenuPage(page);
  await mainMenuPage.clickOnSearchButton();
  await mainMenuPage.fillSearchFiled("text to show cookies");
  await mainMenuPage.pressEnterButtonOnSearchFiled();
  const cookieBoxPage = new CookieBoxPage(page);
  await cookieBoxPage.clickAcceptButton();
}
