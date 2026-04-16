import { Page } from "@playwright/test";
import { PaymentInfo } from "@ui-test/models";
import { BaseQueryPage } from "@ui-test/pages";

export class QueryPaymentPage extends BaseQueryPage {

    constructor(page: Page) {
        super(page, 'ns-query-pay');
    }

    async getInvoicePartyName(): Promise<string> {
        return await this._rootElement.getByTestId('partyName').textContent();
    }

    async getPaymentInfo(index: number): Promise<PaymentInfo> {
        await this._rootElement.getByRole('table').waitFor({ state: 'visible' });
        const row = this._rootElement.getByRole('table').locator('tbody tr').nth(index);
        await row.waitFor({ state: 'visible' });

        const ret: PaymentInfo = {};
        ret.InvNumber = await row.getByTestId('InvNumber').textContent();
        ret.PoNumber = await row.getByTestId('PoNumber').textContent();
        ret.PartNumber = await row.getByTestId('PartNumber').textContent();
        ret.PayItem = await row.getByTestId('PayItem').textContent();
        ret.Amount = await row.getByTestId('Amount').textContent();
        ret.DetailMemo = await row.getByTestId('Memo').textContent();

        return ret;
    }

}