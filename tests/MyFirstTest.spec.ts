import {test, expect} from '@playwright/test';

test ('MyFistTest' , async({page}) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle('Google');
});