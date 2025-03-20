import {test as base} from "@playwright/test"
import {CompanyMenuPage} from "./mainMenu/companyMenuPage";
import {ResourcesMenuPage} from "./mainMenu/resourcesMenuPage";
import {MainMenuPage} from "./mainMenuPage";
import {PlatformMenuPage} from "./mainMenu/platformMenuPage";

type MyFixtures = {
    companyMenuPage: CompanyMenuPage,
    platformMenuPage: PlatformMenuPage,
    mainMenuPage: MainMenuPage,
    resourcesMenuPage: ResourcesMenuPage,
}

export const test = base.extend<MyFixtures>({
    companyMenuPage: async ({page}, use) => {
        await use(new CompanyMenuPage(page))
    },
    platformMenuPage: async ({page}, use) => {
        await use(new PlatformMenuPage(page))
    },
    mainMenuPage: async ({page}, use) => {
        await use(new MainMenuPage(page))

    },
    resourcesMenuPage: async ({page}, use) => {
        await use(new ResourcesMenuPage(page))
    },
})

export {expect} from "@playwright/test"