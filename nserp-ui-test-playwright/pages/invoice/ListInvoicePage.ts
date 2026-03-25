import { Page } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { BaseListPage } from "@ui-test/pages";
import { InvoiceInfo } from "@ui-test/models";

export class ListInvoicePage extends BaseListPage {

    constructor(page: Page) {
        super(page);
    }

    async goto(query: string = '') {
        await this.page.goto(BASE_URL + '/inv' + query);
    }

    async getInvoiceInfo(index: number): Promise<InvoiceInfo> {
        await this.page.getByRole('table').waitFor({ state: 'visible' });
        const row = this.page.getByRole('table').locator(`tbody tr:nth-child(${index + 1})`);
        await row.waitFor({ state: 'visible' });
        const ret = new InvoiceInfo();

        // if keyword is entered, it returns records with detail information
        const keywordEl = this.page.getByRole('searchbox', { name: DisplayMessages.common.Keyword });
        const keyword = await keywordEl.inputValue();
        const showHeaderOnly = !keyword || keyword.trim().length === 0;

        if (showHeaderOnly) {
            ret.InvNumber = await row.getByTestId('InvNumber').textContent();
            ret.InvDate = await row.getByTestId('InvDate').textContent();
            ret.SentDate = await row.getByTestId('SentDate').textContent();
            ret.InvAmount = await row.getByTestId('InvAmount').textContent();
            ret.HeaderMemo = await row.getByTestId('Memo').textContent();
            ret.HeaderStatus = await row.getByTestId('Status').textContent();
        } else {
            ret.InvNumber = await row.getByTestId('InvNumber').textContent();
            ret.InvDate = await row.getByTestId('InvDate').textContent();
            ret.PoNumber = await row.getByTestId('PoNumber').textContent();
            ret.PartNumber = await row.getByTestId('PartNumber').textContent();
            ret.ProductNameEn = await row.getByTestId('ProductNameEn').textContent();
            ret.ProductNameCn = await row.getByTestId('ProductNameCn').textContent();
            ret.Content = await row.getByTestId('Content').textContent();
            ret.Qty = await row.getByTestId('Qty').textContent();
            ret.Price = await row.getByTestId('Price').textContent();
            ret.Amount = await row.getByTestId('Amount').textContent();
            ret.DetailMemo = await row.getByTestId('Memo').textContent();
            ret.DetailStatus = await row.getByTestId('Status').textContent();
        }
        return ret;
    }

}