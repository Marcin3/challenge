import {expect, test} from "@playwright/test";
import * as fs from 'fs';

test('should route requests using HAR file with modified query parameters', async ({page}) => {
    // I have har with 3 users
    const harPath = './hars/post/all/post.har';
    const queryParams = new Map<string, string>([['userId', '1']]);
    await updateHarWithQueryParams(harPath, queryParams);

    await page.routeFromHAR(harPath, {
        url: '*/**/posts?userId=1'
    });
    await page.goto('https://jsonplaceholder.typicode.com/posts?userId=1');
    await expect(page.getByText('har for regex Url')).toBeVisible();
});


/**
 * Updates a HAR file with specified query parameters
 * @param harPath - Path to the HAR file
 * @param queryParams - Map of query parameter names and values
 */
async function updateHarWithQueryParams(harPath: string, queryParams: Map<string, string>): Promise<void> {
    // Parse the HAR file
    const harContent = JSON.parse(fs.readFileSync(harPath, 'utf-8'));

    // Generate query string for URL
    let queryString = '';
    const queryStringArray: Array<{name: string, value: string}> = [];

    // Process all query parameters
    queryParams.forEach((value, name) => {
        if (queryString) {
            queryString += '&';
        } else {
            queryString = '?';
        }
        queryString += `${name}=${value}`;
        queryStringArray.push({ name, value });
    });

    // Modify each entry in the HAR file
    harContent.log.entries.forEach((entry: any) => {
        // Update URL with query parameters
        const baseUrl = entry.request.url.split('?')[0]; // Remove any existing query
        entry.request.url = baseUrl + queryString;

        // Update the :path header
        const pathHeaderIndex = entry.request.headers.findIndex((h: any) => h.name === ":path");
        const basePath = entry.request.headers[pathHeaderIndex]?.value.split('?')[0] || '/posts';

        if (pathHeaderIndex !== -1) {
            entry.request.headers[pathHeaderIndex].value = basePath + queryString;
        } else {
            entry.request.headers.push({ "name": ":path", "value": basePath + queryString });
        }

        // Add queryString parameters
        entry.request.queryString = queryStringArray;
    });

    // Write the modified HAR content back to the file
    fs.writeFileSync(harPath, JSON.stringify(harContent, null, 2), 'utf-8');
}


