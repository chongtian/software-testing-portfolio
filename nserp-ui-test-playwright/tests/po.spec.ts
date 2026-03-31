import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, LocalTestDataFilePath, waitForNoOverlay } from "@ui-test/utils";
import { ViewPoPage, ListPoPage, EditPoPage } from "@ui-test/pages";
import { ApiHelper } from "@ui-test/utils/api-helper";
import * as fs from "fs";

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

test.describe('Create and Update Po', () => {

    test('User creates a po', async ({ page }) => {
        const editPage = new EditPoPage(page);
        await editPage.goto(null);

        await editPage.selectParty('Sunkist Growers Inc.');
        await editPage.enterPoNumber('TEST SGI PO 001');
        await editPage.enterPoDate('5/25/2020');
        await editPage.enterHeaderMemo('UI TEST');
        await editPage.selectHeaderStatus('待定');

        await editPage.clickAddDetailButton();
        await editPage.queryPage.enterKeyword('04A');
        await editPage.queryPage.clickSearchButton();
        await editPage.queryPage.clickRecords([0]);
        await editPage.queryPage.clickSelectButton();
        await editPage.queryPage.waitForPageUnload();

        expect(await editPage.getDetailPartNumber(0)).toContain('04A-CF');
        expect(await editPage.getDetailProductNameEn(0)).toContain('04A-CF STRAINER WITH QUICK PULL OF TABS');
        expect(await editPage.getDetailProductNameCn(0)).toContain('新网罩');
        expect(await editPage.getDetailPoType(0)).toContain('普通订单');
        await editPage.enterDetailPrice(0, '50');
        await editPage.enterDetailQty(0, '1000');
        await editPage.enterDetailReqDate(0, '10/5/2020');
        await editPage.enterDetailMemo(0, 'UI DETAIL TEST');
        expect(await editPage.getDetailAmount(0)).toContain('50,000');
        expect(await editPage.getPoAmount()).toContain('50000');

        await editPage.clickSaveButton();

        await expect(page).toHaveURL(/po\/edit\/\d+/);

        // rollback
        const newId = page.url().split('/').pop();
        const apiHelper = await ApiHelper.create();
        await apiHelper.delete(`/api/po/${newId}`);
        await apiHelper.dispose();

    });

    test('User updated a po', async ({ page }) => {
        const editPage = new EditPoPage(page);
        await editPage.goto(801);

        await editPage.enterPoNumber('TEST SGI PO 002');
        await editPage.enterPoDate('5/15/2020');
        await editPage.enterHeaderMemo('UPDATE TEST');
        await editPage.selectHeaderStatus('待定');

        await editPage.enterDetailPrice(0, '50');
        await editPage.enterDetailQty(0, '2000');
        await editPage.enterDetailReqDate(0, '11/5/2020');
        await editPage.enterDetailMemo(0, 'UPDATE DETAIL TEST');
        expect(await editPage.getDetailAmount(0)).toContain('100,000');
        expect(await editPage.getPoAmount()).toContain('100000');

        await editPage.clickSaveButton();
        await waitForNoOverlay(page);

        // assert through API
        const apiHelper = await ApiHelper.create();
        const po = await apiHelper.get(`/api/po/801`);

        // rollback first so that even the assertion fails,
        // the test data will be reverted to the original values
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/po_rollback_edit.json', 'utf8'));
        await apiHelper.put('/api/po/801', jsonPayload);

        expect(po.PoDate).toBe('2020-05-15');
        expect(po.PoNumber).toBe('TEST SGI PO 002');
        expect(po.Status).toBe('PENDING');
        expect(po.PoAmount).toBe(100000);
        expect(po.Memo).toBe('UPDATE TEST');
        expect(po.Pos[0].Price).toBe(50);
        expect(po.Pos[0].Qty).toBe(2000);
        expect(po.Pos[0].ReqDate).toBe('2020-11-05');
        expect(po.Pos[0].Amount).toBe(100000);
        expect(po.Pos[0].Memo).toBe('UPDATE DETAIL TEST');
        expect(po.Pos[0].Status).toBe('PENDING');

        await apiHelper.dispose();

    });

});
