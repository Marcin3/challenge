import { expect, Page, test } from "@playwright/test";
import { CompanyMenuPage } from "../pages/mainMenu/companyMenuPage";
import { ContactPage, User } from "../pages/mainMenu/company/contactPage";
import { CookieBoxPage } from "../pages/cookieBoxPage";
import { MainMenuPage } from "../pages/mainMenuPage";
import { PlatformMenuPage } from "../pages/mainMenu/platformMenuPage";
import { ResourcesMenuPage } from "../pages/mainMenu/resourcesMenuPage";
import { SyntheticDataMenuPage } from "../pages/mainMenu/syntheticDataMenuPage";

test("Step 1", async ({ page }) => {
  const mainMenuPage = new MainMenuPage(page);

  await test.step(`1. Go to page https://mostly.ai/`, async () => {
    await page.goto("");
    expect(page).toHaveURL("");
    await acceptCookies(page);
  });

  await test.step(`2. Verify if following bookmarks are being visible – Platform, Synthetic data, Resources, Company`, async () => {
    await mainMenuPage.clickOnCompanyButton();
    const companyMenuPage = new CompanyMenuPage(page);
    await companyMenuPage.checkIfBookmarkCompanyIsVisible();

    await mainMenuPage.clickOnPlatformButton();
    const platformMenuPage = new PlatformMenuPage(page);
    await platformMenuPage.checkIfBookmarkPlatformIsVisible();

    await mainMenuPage.clickOnResourcesButton();
    const resourcesMenuPage = new ResourcesMenuPage(page);
    await resourcesMenuPage.checkIfBookmarkResourcesIsVisible();

    await mainMenuPage.clickOnSyntheticDataButton();
    const syntheticDataMenuPage = new SyntheticDataMenuPage(page);
    await syntheticDataMenuPage.checkIfBookmarkSyntheticDataIsVisible();
  });
});

test("Step 2", async ({ page }) => {
  const wrongWord = "sythetic";
  const mainMenuPage = new MainMenuPage(page);

  await test.step(`1. Go to page https://mostly.ai/`, async () => {
    await page.goto("");
    expect(page).toHaveURL("");
  });

  await test.step(`2. Click the “Search” button`, async () => {
    await mainMenuPage.clickOnSearchButton();
  });

  await test.step(`3. Type “sythetic” (wrong spelling of synthetic) in search field`, async () => {
    await mainMenuPage.fillSearchFiled(wrongWord);
  });

  await test.step(`4. Press Enter`, async () => {
    await mainMenuPage.pressEnterButtonOnSearchFiled();
  });

  await test.step(`5. Verify if the following information is displayed “Sorry, no results for: sythetic”`, async () => {
    const firstPart = `Sorry, no results for:`;
    await mainMenuPage.checkSearchResult(firstPart, wrongWord);
  });
});

test("Step 3", async ({ page }) => {
  const contactPage = new ContactPage(page);
  const mainMenuPage = new MainMenuPage(page);
  const user: User = {
    firstName: "Jan",
    lastName: "Nowak",
    yourBusinessEmail: "jan.nowak@example.org",
    mobilePhoneNumber: 123456789,
    yourOrganization: "example",
    countryRegion: "Poland",
    descriptionField: "test 123",
    marketingOffersAndUpdates: true,
  };

  await test.step(`1. Go to page https://mostly.ai/`, async () => {
    await page.goto("");
    expect(page).toHaveURL("");
    await acceptCookies(page);
  });

  await test.step(`2. Click “Contact” item under the “Company” bookmark`, async () => {
    await mainMenuPage.clickOnCompanyButton();
    const companyMenuPage = new CompanyMenuPage(page);
    await companyMenuPage.clickContact();
  });

  await test.step(`3. Fill following fields: First Name, Last Name,Your Business Email, Mobile Phone Number, Your Organization, Country/Region, Description Field`, async () => {
    await contactPage.fillFields(user);
  });

  await test.step(`4. Check “Marketing offers and updates” checkbox`, async () => {
    await contactPage.checkMarketingOffersAndUpdatesCheckbox();
  });

  await test.step(`5. Hover over “Send Message” button, but do not click it`, async () => {
    await contactPage.hoverSendMessageButton();
  });
});

/**
 * To show cookies on page, test needs to click on search button.
 * Normally I will report it as bug, or ask for website without cookies menu. *
 */
async function acceptCookies(page: Page) {
  const mainMenuPage = new MainMenuPage(page);
  await mainMenuPage.clickOnSearchButton();
  await mainMenuPage.fillSearchFiled("dsd");
  await mainMenuPage.pressEnterButtonOnSearchFiled();
  const cookieBoxPage = new CookieBoxPage(page);
  await cookieBoxPage.clickAcceptButton();
}
