import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, waitForNoMatProgressBar, ApiHelper, waitForNoOverlay, LocalTestDataFilePath } from "@ui-test/utils";
import { ViewInvoicePage, ListInvoicePage, EditInvoicePage } from "@ui-test/pages";
import * as fs from "fs";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Invoice', () => {

    test('User queries invoice by party only', async ({ page }) => {
        const listPage = new ListInvoicePage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('HFM - HYDRO FITTING MFG CORP.');
        await listPage.clickSearchButton();
        const invoice = await listPage.getInvoiceInfo(3);
        expect((invoice.InvNumber ?? '').trim()).toBe('NS200514-HFM');
    });

    test('User queries ship by party and keyword', async ({ page }) => {
        const listPage = new ListInvoicePage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('HFM - HYDRO FITTING MFG CORP.');
        await listPage.enterKeyword('1070');
        await listPage.clickSearchButton();
        const invoice = await listPage.getInvoiceInfo(1);
        expect((invoice.PoNumber ?? '').trim()).toBe('45117');
    });

    test('User can query invoice by entering url query', async ({ page }) => {
        const listPage = new ListInvoicePage(page);
        await listPage.goto('?party=8&keyword=1070');
        const invoice = await listPage.getInvoiceInfo(0);
        expect((invoice.Qty ?? '').trim()).toBe('9,875');
    });

    test('User navigats to a invoice from Browse Invoice', async ({ page }) => {
        const listPage = new ListInvoicePage(page);
        const viewPage = new ViewInvoicePage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('HFM - HYDRO FITTING MFG CORP.');
        await listPage.enterKeyword('NS150603-HFM');
        await listPage.clickSearchButton();
        await listPage.clickInvoiceRecord(1);
        await expect(page).toHaveURL(/inv\/view\/461/);
        const invoice = await viewPage.getInvoiceInfo();
        expect(invoice.length).toBeGreaterThan(1);
        expect((invoice[0].InvNumber ?? '').trim()).toBe('NS150603-HFM');
    });

});

test.describe('Create and Update Invoice', () => {

    test('User creates an invoice', async ({ page }) => {
        const apiHelper = await ApiHelper.create();
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/invoice_setup_create.json', 'utf8'));
        await apiHelper.put('/api/ship/613', jsonPayload);

        const editPage = new EditInvoicePage(page);
        await editPage.goto();

        await editPage.selectParty('Sunkist Growers Inc.');
        await editPage.enterInvoiceNumber('NS201203-SGI');
        await editPage.enterInvoiceDate('12/3/2020');
        await editPage.enterSentDate('12/4/2020');
        await editPage.selectHeaderStatus('开放');
        await editPage.enterHeaderMemo('UI TEST');

        await editPage.clickAddNormalDetailButton();
        await waitForNoMatProgressBar(page);
        await editPage.queryPage.clickRecords([0]);
        await editPage.queryPage.clickSelectButton();
        await editPage.queryPage.waitForPageUnload();

        expect(await editPage.getDetailShipName(0)).toContain('20H09');
        expect(await editPage.getDetailShipDate(0)).toContain('9/1/2020');
        expect(await editPage.getDetailPoNumber(0)).toContain('PL FOR SHP 001');
        expect(await editPage.getDetailPartNumber(0)).toContain('STRAINER');
        expect(await editPage.getDetailProductNameEn(0)).toContain('STRAINER');

        await editPage.enterDetailContent(0, 'STRAINER (Partial)');
        await editPage.enterDetailMemo(0, 'UI DETAIL TEST');
        expect(await editPage.getDetailAmount(0)).toContain('10,500');
        expect(await editPage.getInvoiceAmount()).toContain('10500');

        await editPage.clickSaveButton();

        await expect(page).toHaveURL(/inv\/edit\/\d+/);

        // rollback
        const newId = page.url().split('/').pop();
        await apiHelper.delete(`/api/inv/${newId}`);
        await apiHelper.dispose();

    });

    test('User updated an invoice', async ({ page }) => {
        const editPage = new EditInvoicePage(page);
        await editPage.goto(890);

        await editPage.enterInvoiceNumber('NS201116-SGI');
        await editPage.enterInvoiceDate('1/16/2020');
        await editPage.enterSentDate('1/16/2020');
        await editPage.enterHeaderMemo('UPDATE TEST');

        await editPage.enterDetailContent(0, 'STRAINER (PARTIAL SHIPMENT)');
        await editPage.enterDetailMemo(0, 'UPDATE DETAIL TEST');
        await editPage.enterDetailPrice(0, '35.5');
        expect(await editPage.getDetailAmount(0)).toContain('3,550');
        expect(await editPage.getInvoiceAmount()).toContain('3550');

        await editPage.clickSaveButton();
        await waitForNoOverlay(page);

        // assert through API
        const apiHelper = await ApiHelper.create();
        const invoice = await apiHelper.get(`/api/inv/890`);

        // rollback first so that even the assertion fails,
        // the test data will be reverted to the original values
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/invoice_rollback_edit.json', 'utf8'));
        await apiHelper.put('/api/inv/890', jsonPayload);

        expect(invoice.InvNumber).toBe('NS201116-SGI');
        expect(invoice.InvDate).toBe('2020-01-16');
        expect(invoice.SentDate).toBe('2020-01-16');
        expect(invoice.InvAmount).toBe(3550);
        expect(invoice.Memo).toBe('UPDATE TEST');
        expect(invoice.Invoices[0].Price).toBe(35.5);
        expect(invoice.Invoices[0].Content).toBe('STRAINER (PARTIAL SHIPMENT)');
        expect(invoice.Invoices[0].Amount).toBe(3550);
        expect(invoice.Invoices[0].Memo).toBe('UPDATE DETAIL TEST');

        await apiHelper.dispose();

    });

});