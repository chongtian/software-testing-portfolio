import { Page } from "@playwright/test";
import { InvoiceInfo } from "@ui-test/models";
import { BaseQueryPage } from "@ui-test/pages";

export class QueryInvoicePage extends BaseQueryPage {

    constructor(page: Page) {
        super(page, 'ns-query-inv');
    }

    async getInvoicePartyName(): Promise<string> {
        return await this._rootElement.getByTestId('partyName').textContent();
    }

    async getInvoiceInfo(index: number): Promise<InvoiceInfo> {
        await this._rootElement.getByRole('table').waitFor({ state: 'visible' });
        const row = this._rootElement.getByRole('table').locator('tbody tr').nth(index);
        await row.waitFor({ state: 'visible' });

        const ret: InvoiceInfo = {};
        ret.PoNumber = await row.getByTestId('PoNumber').textContent();
        ret.PartNumber = await row.getByTestId('PartNumber').textContent();
        ret.ProductNameEn = await row.getByTestId('ProductNameEn').textContent();
        ret.ProductNameCn = await row.getByTestId('ProductNameCn').textContent();
        ret.Qty = await row.getByTestId('Qty').textContent();
        ret.Price = await row.getByTestId('Price').textContent();
        ret.Amount = await row.getByTestId('Amount').textContent();
        ret.DetailMemo = await row.getByTestId('Memo').textContent();

        return ret;
    }

}