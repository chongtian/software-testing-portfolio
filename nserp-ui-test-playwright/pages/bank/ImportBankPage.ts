import { Page } from "@playwright/test";
import { BankInfo } from "@ui-test/models";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";

export class ImportBankPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(BASE_URL + '/bank/import');
    }

    async getConfigs(): Promise<string[]> {
        const configs: string[] = [];
        const sheetNumber = await this.page.locator('#SheetNumber').inputValue();
        const detailsStartRowNumber = await this.page.locator('#DetailsStartRowNumber').inputValue();
        const tranDateColNumber = await this.page.locator('#TranDateColNumber').inputValue();
        const tranAmountColNumber = await this.page.locator('#TranAmountColNumber').inputValue();
        const tranDescColNumber = await this.page.locator('#TranDescColNumber').inputValue();
        configs.push(sheetNumber, detailsStartRowNumber, tranDateColNumber, tranAmountColNumber, tranDescColNumber);
        return configs;
    }

    async selectFile(filePath: string) {
        await this.page.getByRole('button', { name: 'Choose File' }).click();
        await this.page.getByRole('button', { name: 'Choose File' }).setInputFiles(filePath);
    }

    async clickImportButton() {
        await this.page.getByTestId('btnImport').click();
    }

    async getAccount(): Promise<string> {
        return await this.page.getByRole('textbox', { name: DisplayMessages.bank.DisplayNames.TrnAccount, exact: true }).inputValue();
    }

    async getImportedBankInfo(): Promise<BankInfo[]> {
        const table = this.page.getByRole('table');
        await table.waitFor({ state: 'visible' });
        const trs = table.locator('tbody tr');
        const rowCount = await trs.count();
        const bankInfoList: BankInfo[] = [];

        for (let i = 0; i < rowCount; i++) {
            const tr = trs.nth(i);
            const bankInfo: BankInfo = {
                TrnDate: await tr.getByTestId('trnDate').nth(0).innerText(),
                TrnDesc: await tr.getByTestId('trnDesc').nth(0).innerText(),
                TrnAmount: await tr.getByTestId('trnAmount').nth(0).innerText(),
                TrnType: await tr.getByTestId('trnType').nth(0).textContent(),
                Memo: await tr.getByTestId('trnMemo').nth(0).innerText()
            };
            bankInfoList.push(bankInfo);
        }
        return bankInfoList;
    }

    async clickSaveButton(confirmAction = true) {
        if (confirmAction) {
            this.page.once('dialog', dialog => dialog.accept());
        }
        await this.page.getByRole('button', { name: DisplayMessages.common.Save }).click();
    }

    async deleteRow(index: number) {
        const deleteButton = this.page.locator('button[name="delete"]').nth(index);
        await deleteButton.click();
    }

    async selectTrnTypeByRow(index: number, trnType: string) {
        const partySelector = this.page.getByTestId('trnType').getByRole('combobox').nth(index);
        await partySelector.waitFor({ state: 'visible' });
        await partySelector.click();
        const option = partySelector.getByRole('option', { name: trnType });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async enterMemoByRow(index: number, memo: string) {
        const memoInput = this.page.getByTestId('trnMemo').getByRole('textbox').nth(index);
        await memoInput.waitFor({ state: 'visible' });
        await memoInput.fill(memo);
    }

    async getBankIDsAfterImport(): Promise<string[]> {
        await this.page.locator('.global-overlay').waitFor({ state: 'hidden' });
        const table = this.page.getByRole('table');
        await table.waitFor({ state: 'visible' });
        const trs = table.locator('tbody tr');
        const rowCount = await trs.count();
        const ids: string[] = [];

        for (let i = 0; i < rowCount; i++) {
            const tr = trs.nth(i);
            const url = await tr.getByTestId('trnDate').getByRole('link').getAttribute('href');
            ids.push(url.split('/').pop() || '');
        }
        return ids;
    }

}