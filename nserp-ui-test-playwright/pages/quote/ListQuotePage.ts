import { Page } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { BaseListPage } from "@ui-test/pages";
import { QuoteInfo } from "@ui-test/models";

export class ListQuotePage extends BaseListPage {

    constructor(page: Page) {
        super(page);
    }

    async goto(query: string = '') {
        await this.page.goto(BASE_URL + '/quote' + query);
    }

    async enterStartQuoteDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: DisplayMessages.quote.StartQuoteDate });
        await datepicker.fill(dateString);
    }

    async getQuoteInfo(index: number): Promise<QuoteInfo> {
        const row = this.page.getByRole('table').locator(`tbody tr:nth-child(${index + 1})`);
        await row.waitFor({ state: 'visible' });
        
        const ret = new QuoteInfo();
        ret.QuoteDate = await row.getByTestId('QuoteDate').textContent();
        ret.PartNumber = await row.getByTestId('PartNumber').textContent();
        ret.ProductNameEn = await row.getByTestId('ProductNameEn').textContent();
        ret.ProductNameCn = await row.getByTestId('ProductNameCn').textContent();
        ret.Qty = await row.getByTestId('Qty').textContent();
        ret.Price = await row.getByTestId('Price').textContent();
        ret.DetailMemo = await row.getByTestId('Memo').textContent();
        ret.Status = await row.getByTestId('Status').textContent();
        return ret;
    }

    // this method is only used by ListQuotePage
    async clickQuoteRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('QuoteDate')
            .getByRole('link');
        await link.click();
    }

}