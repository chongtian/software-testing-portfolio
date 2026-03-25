import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { BaseListPage } from "@ui-test/pages";
import { BankInfo } from "@ui-test/models";

export class ListBankPage extends BaseListPage {

    constructor(page: Page) {
        super(page);
    }

    async goto(query: string = '') {
        await this.page.goto(BASE_URL + '/bank' + query);
    }

    async enterTrnYear(year: string) {
        const acctYear = this.page.locator('input[name="trnYear"]');
        await acctYear.waitFor({ state: 'visible' });
        await acctYear.fill(year);
    }

    async getBankInfo(index: number): Promise<BankInfo> {
        await this.page.getByRole('table').waitFor({ state: 'visible' });
        const row = this.page.getByRole('table').locator(`tbody tr:nth-child(${index + 1})`);
        await row.waitFor({ state: 'visible' });
        const ret = new BankInfo();
        ret.TrnDate = await row.getByTestId('TrnDate').textContent();
        ret.TrnType = await row.getByTestId('TrnType').textContent();
        ret.TrnDesc = await row.getByTestId('TrnDesc').textContent();
        ret.TrnAmount = await row.getByTestId('TrnAmount').textContent();
        ret.Memo = await row.getByTestId('Memo').textContent();
        return ret;
    }

}