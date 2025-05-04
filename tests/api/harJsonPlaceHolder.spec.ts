import {expect, test} from "@playwright/test";

test('should work with regex from route', async ({page}) => {
    await page.route(/.*\/posts(\?.*)?$/, async route => {
        const json =   [{
            "userId": 1,
            "id": 3,
            "title": "Avia 3",
            "body": "fks 3"
        }];
        await route.fulfill({ json });
    });

    await page.goto('https://jsonplaceholder.typicode.com/posts?userId=1');
    await expect(page.getByText('Avia 3')).toBeVisible();
})

