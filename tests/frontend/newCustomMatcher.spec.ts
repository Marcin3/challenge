import {test, expect} from "../../pages/fixtures/newFixtures";

test("New custom matcher", async ({page}) => {

    await page.setContent(`
        <div>
          <div class='base-amount' data-amount='2'></div>
        </div>
      `);

    await expect(page.locator('div.base-amount')).toHaveAmount(2, {timeout: 1000});
    await expect(page.locator('div.base-amount')).not.toHaveAmount(3, {timeout: 5000});
});