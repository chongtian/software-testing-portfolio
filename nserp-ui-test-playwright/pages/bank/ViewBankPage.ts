import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { BankInfo } from "@ui-test/models";

export class ViewBankPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id: number) {
        await this.page.goto(BASE_URL + '/bank/view/' + id);
    }

    async getBankInfo(): Promise<BankInfo> {        
        const header = new BankInfo();
        header.TrnAccount = await this.page.locator('#viewTrnAccount').textContent();
        header.TrnDate = await this.page.locator('#viewTrnDate').textContent();
        header.TrnType = await this.page.locator('#viewTrnType').textContent();
        header.TrnDesc = await this.page.locator('#viewTrnDesc').textContent();
        header.TrnAmount = await this.page.locator('#viewTrnAmount').textContent();
        header.Memo = await this.page.locator('#viewMemo').textContent();
        return header;

    }

}