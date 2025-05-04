import {expect, test} from "@playwright/test";
import * as fs from 'fs';

test('should route requests with regex pattern and fulfill with mocked data', async ({page}) => {
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
    await page.goto('https://jsonplaceholder.typicode.com/posts');
    await expect(page.getByText('Avia 3')).toBeVisible();
})

test('should create and validate HAR file for regex route', async ({page}) => {
    const harPath = './hars/post/createRegex/1.har';
    await page.routeFromHAR(harPath, {
        url: /.*\/posts(\?.*)?\$/,
        update: true,
    });

    await page.goto('https://jsonplaceholder.typicode.com/posts?userId=1');
    await expect(page.getByText('qui est esse')).toBeVisible();

    // Validate that the HAR file has `entries` that are not empty
    const harContent = JSON.parse(fs.readFileSync(harPath, 'utf-8'));
    const entries = harContent.log.entries;

    expect(entries).toBeInstanceOf(Array);
    expect(entries.length).toBeGreaterThan(0);
});

test('should use HAR file for requests matching regex', async ({page}) => {
    // I have har with 3 users
    const harPath = './hars/post/all/post.har';
    await page.routeFromHAR(harPath, {
        url: /.*\/posts(\?.*)?\$/
    });
    await page.goto('https://jsonplaceholder.typicode.com/posts?userId=1');
    await expect(page.getByText('har for regex Url')).toBeVisible();
});
