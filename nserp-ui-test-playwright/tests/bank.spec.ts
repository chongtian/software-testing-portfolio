import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, LocalTestDataFilePath } from "@ui-test/utils";
import { ViewBankPage, ListBankPage } from "@ui-test/pages";
import { ImportBankPage } from "@ui-test/pages/bank/ImportBankPage";
import { ApiHelper } from "@ui-test/utils/api-helper";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Bank', () => {

    test('User queries Bank by year', async ({ page }) => {
        const listPage = new ListBankPage(page);
        await listPage.goto();
        await listPage.enterTrnYear('2022');
        await listPage.clickSearchButton();
        const bank = await listPage.getBankInfo(3);
        expect(bank.TrnDate.trim()).toBe('12/6/2022');
    });

    test('User can query Bank by entering url query', async ({ page }) => {
        const listPage = new ListBankPage(page);
        await listPage.goto('?year=2022');
        const bank = await listPage.getBankInfo(0);
        expect(bank.TrnAmount.trim()).toBe('$21.93');
    });

    test('User navigats to a Bank from Browse Bank', async ({ page }) => {
        const listPage = new ListBankPage(page);
        const viewPage = new ViewBankPage(page);
        await listPage.goto();
        await listPage.enterTrnYear('2022');
        await listPage.clickSearchButton();
        await listPage.clickBankRecord(2);
        await expect(page).toHaveURL(/bank\/view\/932/);
        const bank = await viewPage.getBankInfo();
        expect(bank.TrnDesc.trim()).toBe('WF Bus Credit AUTO PAY 221209 90225602962337 TAN');
    });

});

test.describe('Import Bank', () => {

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
        expect(importedBankInfo[0].TrnDate.trim()).toBe('3/11/2026');
        expect(importedBankInfo[0].TrnDesc.trim()).toBe('MOBILE DEPOSIT : REF NUMBER :808110XXXXXX');
        expect(importedBankInfo[0].TrnAmount.trim()).toBe('$1,012.00');
        expect(importedBankInfo[0].TrnType.trim()).toBe('客户收款');
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
        expect(bank.TrnDate.trim()).toBe('3/2/2025');
        expect(bank.TrnDesc.trim()).toBe('RECURRING TRANSFER TO T L REF #OP0XXXXXX EVERYDAY CHECKING L SALARY');
        expect(bank.TrnAmount.trim()).toBe('-$5,500.00');

        // rollback the imported data
        const apiHelper = await ApiHelper.create();
        for (const bankID of bankIDs) {
            await apiHelper.delete(`/api/bank/${bankID}`);
        }
        await apiHelper.dispose();
    });

});