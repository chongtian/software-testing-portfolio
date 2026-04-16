import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, LocalTestDataFilePath, waitForNoOverlay } from "@ui-test/utils";
import { ViewProductPage, ListProductPage, EditProductPage } from "@ui-test/pages";
import { ApiHelper } from "@ui-test/utils/api-helper";
import * as fs from 'fs';

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Product', () => {

    test('User queries products', async ({ page }) => {
        const listPage = new ListProductPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('ZII - ZACKLIFT');
        await listPage.clickSearchButton();
        const product = await listPage.getProductInfo(4);
        expect(product.PartNumber!.trim()).toBe('Z04-20a');
    });

    test('User sees products on the last page in Browse Product', async ({ page }) => {
        const listPage = new ListProductPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('ZII - ZACKLIFT');
        await listPage.clickSearchButton();
        await listPage.paginator.ClickLastPageButton();
        const product = await listPage.getProductInfo(0);
        expect(product.PartNumber!.trim()).toBe('Z1304-9X4');
    });

    test('User can query products by keyword', async ({ page }) => {
        const listPage = new ListProductPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('ZII - ZACKLIFT');
        await listPage.enterKeyword('J-Lock');
        await listPage.clickSearchButton();
        const product = await listPage.getProductInfo(0);
        expect(product.PartNumber!.trim()).toBe('Z30-22');
    });

    test('User can query products by entering url query', async ({ page }) => {
        const listPage = new ListProductPage(page);
        await listPage.goto('?party=25&keyword=J-Lock');
        const product = await listPage.getProductInfo(0);
        expect(product.PartNumber!.trim()).toBe('Z30-22');
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
        expect(product[1].PartNumber!.trim()).toBe('830300');
    });

});

test.describe('Create and Update Product', () => {

    test('User creates a Product', async ({ page }) => {
        const editPage = new EditProductPage(page);
        await editPage.goto();

        await editPage.selectParty('Sunkist Growers Inc.');
        await editPage.enterProductGroupName('SGI-TEST-001');
        await editPage.enterHtsCode('8000.4321.01');
        await editPage.enterHeaderMemo('UI TEST');
        await editPage.clickAddDetailButton();

        await editPage.enterDetailPartNumber(0, 'SGI-TEST-001');
        await editPage.enterDetailProductNameEn(0, 'TEST PRODUCT 001');
        await editPage.enterDetailProductNameCn(0, 'THIS IS NOT CHINESE');
        await editPage.enterDetailVersion(0, '1');
        await editPage.enterDetailWeight(0, '0.5');
        await editPage.selectDetailProductType(0, '普通产品');
        await editPage.selectDetailStatus(0, '新产品');
        await editPage.enterDetailMemo(0, 'UI TEST - DETAIL');

        await editPage.clickSaveButton();

        await expect(page).toHaveURL(/product\/edit\/\d+/);

        // rollback
        const newId = page.url().split('/').pop();
        const apiHelper = await ApiHelper.create();
        await apiHelper.delete(`/api/product/${newId}`);
        await apiHelper.dispose();

    });

    test('User updates a Product', async ({ page }) => {
        const editPage = new EditProductPage(page);
        await editPage.goto(782);

        await editPage.enterProductGroupName('SGI-TEST-002');
        await editPage.enterHtsCode('8000.4321.02');
        await editPage.enterHeaderMemo('UI TEST UPDATE');

        await editPage.enterDetailPartNumber(0, 'SGI-TEST-002');
        await editPage.enterDetailProductNameEn(0, 'TEST PRODUCT TOOLING');
        await editPage.enterDetailProductNameCn(0, 'THIS IS STILL NOT CHINESE');
        await editPage.enterDetailVersion(0, '2');
        await editPage.enterDetailWeight(0, '50.5');
        await editPage.selectDetailProductType(0, '工装模具');
        await editPage.selectDetailStatus(0, '等待批准');
        await editPage.enterDetailMemo(0, 'UPDATE DETAIL');

        await editPage.clickSaveButton();
        await waitForNoOverlay(page);

        // assert through API
        const apiHelper = await ApiHelper.create();
        const product = await apiHelper.get(`/api/product/782`);

        // rollback
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/product_rollback_edit.json', 'utf8'));
        await apiHelper.put('/api/product/782', jsonPayload);

        expect(product.GroupName).toBe('SGI-TEST-002');
        expect(product.Products[0].PartNumber).toBe('SGI-TEST-002');
        expect(product.Products[0].ProductType).toBe('T');
        expect(product.Products[0].Status).toBe('WAP');

        await apiHelper.dispose();

    });

});