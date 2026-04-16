import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, LocalTestDataFilePath, waitForNoOverlay } from "@ui-test/utils";
import { ViewBankPage, ListBankPage } from "@ui-test/pages";
import { ImportBankPage } from "@ui-test/pages/bank/ImportBankPage";
import { ApiHelper } from "@ui-test/utils/api-helper";
import { EditBankPage } from "@ui-test/pages/bank/EditBankPage";
import * as fs from "fs";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Bank Transactions', () => {

    test('User queries Bank Transactions by year', async ({ page }) => {
        const listPage = new ListBankPage(page);
        await listPage.goto();
        await listPage.enterTrnYear('2022');
        await listPage.clickSearchButton();
        const bank = await listPage.getBankInfo(3);
        expect(bank.TrnDate!.trim()).toBe('12/6/2022');
    });

    test('User can query Bank Transactions by entering url query', async ({ page }) => {
        const listPage = new ListBankPage(page);
        await listPage.goto('?year=2022');
        const bank = await listPage.getBankInfo(0);
        expect(bank.TrnAmount!.trim()).toBe('$21.93');
    });

    test('User navigats to a Bank Transaction from Browse screen', async ({ page }) => {
        const listPage = new ListBankPage(page);
        const viewPage = new ViewBankPage(page);
        await listPage.goto();
        await listPage.enterTrnYear('2022');
        await listPage.clickSearchButton();
        await listPage.clickBankRecord(2);
        await expect(page).toHaveURL(/bank\/view\/932/);
        const bank = await viewPage.getBankInfo();
        expect(bank.TrnDesc!.trim()).toBe('WF Bus Credit AUTO PAY 221209 90225602962337 TAN');
    });

});


test.describe('Import Bank Transactions', () => {

    test('Verify the default import configs', async ({ page }) => {
        const importPage = new ImportBankPage(page);
        await importPage.goto();
        const configs = await importPage.getConfigs();
        expect(configs[0]).toBe('1');
        expect(configs[1]).toBe('1');
        expect(configs[2]).toBe('1');
        expect(configs[3]).toBe('2');
        expect(configs[4]).toBe('5');
    });

    test('User import bank transactions', async ({ page }) => {
        const importPage = new ImportBankPage(page);
        await importPage.goto();
        await importPage.selectFile(LocalTestDataFilePath + '/bank_import_1.csv');
        await importPage.clickImportButton();
        const importedBankInfo = await importPage.getImportedBankInfo();
        expect(importedBankInfo.length).toBe(3);
        expect(importedBankInfo[0].TrnDate!.trim()).toBe('3/11/2026');
        expect(importedBankInfo[0].TrnDesc!.trim()).toBe('MOBILE DEPOSIT : REF NUMBER :808110XXXXXX');
        expect(importedBankInfo[0].TrnAmount!.trim()).toBe('$1,012.00');
        expect(importedBankInfo[0].TrnType!.trim()).toBe('客户收款');
    });

    test('User import and save bank transactions', async ({ page }) => {
        const importPage = new ImportBankPage(page);
        await importPage.goto();
        await importPage.selectFile(LocalTestDataFilePath + '/bank_import_2.csv');
        await importPage.clickImportButton();
        await importPage.deleteRow(0);
        await importPage.selectTrnTypeByRow(2, '通讯');
        await importPage.enterMemoByRow(2, 'Test Memo');
        await importPage.clickSaveButton();
        const bankIDs = await importPage.getBankIDsAfterImport();
        expect(bankIDs.length).toBe(3);

        // verify the imported data is correct
        const viewPage = new ViewBankPage(page);
        await viewPage.goto(Number(bankIDs[0]));
        const bank = await viewPage.getBankInfo();
        expect(bank.TrnDate!.trim()).toBe('3/2/2025');
        expect(bank.TrnDesc!.trim()).toBe('RECURRING TRANSFER TO T L REF #OP0XXXXXX EVERYDAY CHECKING L SALARY');
        expect(bank.TrnAmount!.trim()).toBe('-$5,500.00');

        // rollback the imported data
        const apiHelper = await ApiHelper.create();
        for (const bankID of bankIDs) {
            await apiHelper.delete(`/api/bank/${bankID}`);
        }
        await apiHelper.dispose();
    });

});


test.describe('Update and Delete Bank Transactions', () => {

    test('User creates a Bank Transaction record', async ({ page }) => {
        const editPage = new EditBankPage(page);
        await editPage.goto();

        // verify default values
        expect(await editPage.getTrnAccount()).toBe('TX');
        expect(await editPage.getTrnType()).toBe('其他');

        await editPage.enterTrnDate('2/1/2022');
        await editPage.selectTrnType('客户收款');
        await editPage.enterMemo('UI TEST');
        await editPage.enterTrnAmount('5000');
        await editPage.enterTrnDesc('Test Bank Transaction');
        await editPage.clickSaveButton();

        await expect(page).toHaveURL(/bank\/view\/\d+/);

        const apiHelper = await ApiHelper.create();
        const newId = page.url().split('/').pop();
        const record = await apiHelper.get(`/api/bank/${newId}`);

        // rollback first
        await apiHelper.delete(`/api/bank/${newId}`);
        await apiHelper.dispose();

        // assert 
        expect(record.TrnAccount).toBe('TX');
        expect(record.TrnYear).toBe(2022);
        expect(record.TrnDate).toBe('2022-02-01');
        expect(record.TrnType).toBe('11');
        expect(record.TrnDesc).toBe('Test Bank Transaction');
        expect(record.TrnAmount).toBe(5000);
        expect(record.Memo).toBe('UI TEST');

    });

    test('User updates a Bank Transaction record', async ({ page }) => {
        const editPage = new EditBankPage(page);
        await editPage.goto(927);

        await editPage.enterTrnDate('2/1/2022');
        await editPage.selectTrnType('客户收款');
        await editPage.enterMemo('UI TEST');
        await editPage.enterTrnAmount('5000');
        await editPage.enterTrnDesc('Test Bank Transaction');
        await editPage.clickSaveButton();
        await waitForNoOverlay(page);

        const apiHelper = await ApiHelper.create();
        const record = await apiHelper.get(`/api/bank/927`);

        // rollback first
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/bank_rollback_edit.json', 'utf8'));
        await apiHelper.put('/api/bank/927', jsonPayload);
        await apiHelper.dispose();

        // assert 
        expect(record.TrnAccount).toBe('TX');
        expect(record.TrnYear).toBe(2022);
        expect(record.TrnDate).toBe('2022-02-01');
        expect(record.TrnType).toBe('11');
        expect(record.TrnDesc).toBe('Test Bank Transaction');
        expect(record.TrnAmount).toBe(5000);
        expect(record.Memo).toBe('UI TEST');

    });

    test('User deletes a Bank Transaction record', async ({ page }) => {
        const apiHelper = await ApiHelper.create();
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/bank_setup.json', 'utf8'));
        const record = await apiHelper.post('/api/bank', jsonPayload);

        const editPage = new EditBankPage(page);
        await editPage.goto(record.TrnId);

        await editPage.clickDeleteButton();
        await waitForNoOverlay(page);
        await expect(page).toHaveURL(/bank$/);
        expect(await apiHelper.get(`/api/bank/{record.TrnId}`)).toBeNull();

        await apiHelper.dispose();
    });

});