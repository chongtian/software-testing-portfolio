import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath } from "@ui-test/utils";
import { ViewInvoicePage, ListInvoicePage } from "@ui-test/pages";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Invoice', () => {

    test('User queries invoice by party only', async ({ page }) => {
        const listPage = new ListInvoicePage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('HFM - HYDRO FITTING MFG CORP.');
        await listPage.clickSearchButton();
        const invoice = await listPage.getInvoiceInfo(3);
        expect(invoice.InvNumber.trim()).toBe('NS200514-HFM');
    });

    test('User queries ship by party and keyword', async ({ page }) => {
        const listPage = new ListInvoicePage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('HFM - HYDRO FITTING MFG CORP.');
        await listPage.enterKeyword('1070');
        await listPage.clickSearchButton();
        const invoice = await listPage.getInvoiceInfo(1);
        expect(invoice.PoNumber.trim()).toBe('45117');
    });

    test('User can query invoice by entering url query', async ({ page }) => {
        const listPage = new ListInvoicePage(page);
        await listPage.goto('?party=8&keyword=1070');
        const invoice = await listPage.getInvoiceInfo(0);
        expect(invoice.Qty.trim()).toBe('9,875');
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
        expect(invoice[0].InvNumber.trim()).toBe('NS150603-HFM');
    });

});