import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath } from "@ui-test/utils";
import { ViewPoPage, ListPoPage } from "@ui-test/pages";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Po', () => {

    test('User queries po by year', async ({ page }) => {
        const listPage = new ListPoPage(page);
        await listPage.goto();
        await listPage.enterPoYear('2022');
        await listPage.clickSearchButton();
        const po = await listPage.getPoInfo(3);
        expect(po.PoNumber.trim()).toBe('54834');
    });

    test('User queries po by party only with load more data', async ({ page }) => {
        test.slow();
        const listPage = new ListPoPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('MVP - MAGNUM');
        await listPage.clickSearchButton();
        await listPage.loadMoreData();
        await listPage.paginator.ClickLastPageButton();
        const po = await listPage.getPoInfo(0);
        expect(po.PoNumber.trim()).toBe('42983');
    });

    test('User queries po by party and keyword', async ({ page }) => {
        const listPage = new ListPoPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('MVP - MAGNUM');
        await listPage.enterKeyword('37');
        await listPage.clickSearchButton();
        const po = await listPage.getPoInfo(1);
        expect(po.ProductNameEn.trim()).toBe('Casting - Base Plate');
    });

    test('User can query po by entering url query', async ({ page }) => {
        test.slow();
        const listPage = new ListPoPage(page);
        await listPage.goto('?party=8&keyword=&year=');
        const po = await listPage.getPoInfo(0);
        expect(po.PoAmount.trim()).toBe('$10,700.00');
    });

    test('User navigats to a po from Browse Po', async ({ page }) => {
        const listPage = new ListPoPage(page);
        const viewPage = new ViewPoPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('MVP - MAGNUM');
        await listPage.clickSearchButton();
        await listPage.clickPoRecord(1);
        await expect(page).toHaveURL(/po\/view\/796/);
        const po = await viewPage.getPoInfo();
        expect(po.length).toBeGreaterThan(1);
        expect(po[0].PoNumber.trim()).toBe('123679');
    });

});