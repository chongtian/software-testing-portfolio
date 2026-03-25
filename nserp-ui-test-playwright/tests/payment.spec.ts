import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath } from "@ui-test/utils";
import { ViewPaymentPage, ListPaymentPage } from "@ui-test/pages";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Payment', () => {

    test('User queries Payment by party only', async ({ page }) => {
        const listPage = new ListPaymentPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('HFM - HYDRO FITTING MFG CORP.');
        await listPage.clickSearchButton();
        const payment = await listPage.getPaymentInfo(3);
        expect(payment.PayDocNum.trim()).toBe('089335');
    });

    test('User queries ship by party and keyword', async ({ page }) => {
        const listPage = new ListPaymentPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('HFM - HYDRO FITTING MFG CORP.');
        await listPage.enterKeyword('1070');
        await listPage.clickSearchButton();
        const payment = await listPage.getPaymentInfo(1);
        expect(payment.PoNumber.trim()).toBe('54834');
    });

    test('User can query Payment by entering url query', async ({ page }) => {
        const listPage = new ListPaymentPage(page);
        await listPage.goto('?party=8&keyword=1070');
        const payment = await listPage.getPaymentInfo(0);
        expect(payment.Amount.trim()).toBe('$11,128.00');
    });

    test('User navigats to a Payment from Browse Payment', async ({ page }) => {
        const listPage = new ListPaymentPage(page);
        const viewPage = new ViewPaymentPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('HFM - HYDRO FITTING MFG CORP.');
        await listPage.enterKeyword('1070');
        await listPage.clickSearchButton();
        await listPage.clickPaymentRecord(2);
        await expect(page).toHaveURL(/pay\/view\/576/);
        const payment = await viewPage.getPaymentInfo();
        expect(payment.length).toBeGreaterThan(1);
        expect(payment[0].PayDocNum.trim()).toBe('090550');
    });

});