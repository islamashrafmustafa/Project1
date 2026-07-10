import { Page } from "@playwright/test";
import { test,expect } from "../fixtures/fixture";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/productPage/productPage";
import * as testData from "./testData/testData.json"

let page: Page;
let loginPage:LoginPage;
let productPage:ProductPage;

test.beforeEach(async({browser})=>{
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await page.goto("https://www.saucedemo.com/");
})

test.afterEach(async()=>{
    await page.waitForTimeout(3000);
    await page.close();
})

test('E2E', async({})=>{

    await loginPage.enterUsername(testData.username);
    await loginPage.enterPassword(testData.password);
    await loginPage.clickOnLoginBtn();

    await productPage.clickOnAddToCartBtn();
    await productPage.clickOnToCartBtn();
    
})