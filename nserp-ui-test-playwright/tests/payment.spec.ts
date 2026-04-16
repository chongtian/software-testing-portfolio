import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, ApiHelper, LocalTestDataFilePath, waitForNoMatProgressBar } from "@ui-test/utils";
import { ViewPaymentPage, ListPaymentPage, EditPaymentPage } from "@ui-test/pages";
import * as fs from "fs";

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

test.describe('Create and Update Payment', () => {

    test('User creates a payment', async ({ page }) => {
        const apiHelper = await ApiHelper.create();
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/pay_setup_create.json', 'utf8'));
        await apiHelper.put('/api/inv/887', jsonPayload);

        const editPage = new EditPaymentPage(page);
        await editPage.goto(null);

        await editPage.selectParty('Lindsay Forest Products PTLD');
        await editPage.enterPayDocNum('56789');
        await editPage.enterPayDocDate('2/3/2024');
        await editPage.selectPayType('支票');
        await editPage.selectHeaderStatus('开放');
        await editPage.enterHeaderMemo('UI TEST');

        await editPage.clickAddRegularDetailButton();
        await waitForNoMatProgressBar(page);
        await editPage.queryPage.clickSelectAllToggle();
        await editPage.queryPage.clickSelectButton();
        await editPage.queryPage.waitForPageUnload();

        expect(await editPage.getDetailInvoiceNumber(0)).toContain('NS240102-LFP');
        expect(await editPage.getDetailPoNumber(0)).toContain('103087/01');
        expect(await editPage.getDetailPartNumber(0)).toContain('HHFWL Machine');
        expect(await editPage.getDetailPayItem(0)).toContain('HHFWL Machine');
        await editPage.enterDetailMemo(0, 'UI DETAIL TEST');
        expect(await editPage.getDetailAmount(0)).toContain('22098');
        expect(await editPage.getPayAmount()).toContain('52655.3');

        await editPage.clickSaveButton();

        await expect(page).toHaveURL(/pay\/edit\/\d+/);

        // rollback
        const newId = page.url().split('/').pop();
        await apiHelper.delete(`/api/pay/${newId}`);
        await apiHelper.dispose();

    });  

});
