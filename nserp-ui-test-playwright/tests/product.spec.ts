import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath } from "@ui-test/utils";
import { ViewProductPage, ListProductPage } from "@ui-test/pages";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Product', () => {

    test('User queries products', async ({ page }) => {
        const listPage = new ListProductPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('ZII - ZACKLIFT');
        await listPage.clickSearchButton();
        const product = await listPage.getProductInfo(4);
        expect(product.PartNumber.trim()).toBe('Z04-20a');
    });

    test('User sees products on the last page in Browse Product', async ({ page }) => {
        const listPage = new ListProductPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('ZII - ZACKLIFT');
        await listPage.clickSearchButton();
        await listPage.paginator.ClickLastPageButton();
        const product = await listPage.getProductInfo(0);
        expect(product.PartNumber.trim()).toBe('Z1304-9X4');
    });

    test('User can query products by keyword', async ({ page }) => {
        const listPage = new ListProductPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('ZII - ZACKLIFT');
        await listPage.enterKeyword('J-Lock');
        await listPage.clickSearchButton();
        const product = await listPage.getProductInfo(0);
        expect(product.PartNumber.trim()).toBe('Z30-22');
    });

    test('User can query products by entering url query', async ({ page }) => {
        const listPage = new ListProductPage(page);
        await listPage.goto('?party=25&keyword=J-Lock');
        const product = await listPage.getProductInfo(0);
        expect(product.PartNumber.trim()).toBe('Z30-22');
    });

    test('User navigats to a product from Browse Product', async ({ page }) => {
        const listPage = new ListProductPage(page);
        const viewPage = new ViewProductPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('CTI - Champion');
        await listPage.clickSearchButton();
        await listPage.clickProductRecord(1);
        await expect(page).toHaveURL(/product\/view\/342/);
        const product = await viewPage.getProductInfo();
        expect(product.length).toBe(2);
        expect(product[1].PartNumber.trim()).toBe('830300');
    });


});