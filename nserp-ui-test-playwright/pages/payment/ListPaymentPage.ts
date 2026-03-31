import { Page } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { BaseListPage } from "@ui-test/pages";
import { PaymentInfo } from "@ui-test/models";

export class ListPaymentPage extends BaseListPage {

    constructor(page: Page) {
        super(page);
    }

    async goto(query: string = '') {
        await this.page.goto(BASE_URL + '/pay' + query);
    }

    async getPaymentInfo(index: number): Promise<PaymentInfo> {
        await this.page.getByRole('table').waitFor({ state: 'visible' });
        const row = this.page.getByRole('table').locator(`tbody tr:nth-child(${index + 1})`);
        await row.waitFor({ state: 'visible' });
        const ret:PaymentInfo = {};

        // if keyword is entered, it returns records with detail information
        const keywordEl = this.page.getByRole('searchbox', { name: DisplayMessages.common.Keyword });
        const keyword = await keywordEl.inputValue();
        const showHeaderOnly = !keyword || keyword.trim().length === 0;

        if (showHeaderOnly) {
            ret.PayDocNum = await row.getByTestId('PayDocNum').textContent();
            ret.PayDocDate = await row.getByTestId('PayDocDate').textContent();
            ret.DepositDate = await row.getByTestId('DepositDate').textContent();
            ret.CommissionDate = await row.getByTestId('CommissionDate').textContent();
            ret.PayAmount = await row.getByTestId('PayAmount').textContent();
            ret.PayType = await row.getByTestId('PayType').textContent();
            ret.HeaderMemo = await row.getByTestId('Memo').textContent();
            ret.HeaderStatus = await row.getByTestId('Status').textContent();
        } else {
            ret.PayDocNum = await row.getByTestId('PayDocNum').textContent();
            ret.PayDocDate = await row.getByTestId('PayDocDate').textContent();
            ret.DepositDate = await row.getByTestId('DepositDate').textContent();
            ret.InvNumber = await row.getByTestId('InvNumber').textContent();
            ret.PoNumber = await row.getByTestId('PoNumber').textContent();
            ret.PartNumber = await row.getByTestId('PartNumber').textContent();
            ret.PayItem = await row.getByTestId('PayItem').textContent();
            ret.Amount = await row.getByTestId('Amount').textContent();
            ret.DetailMemo = await row.getByTestId('Memo').textContent();
            ret.DetailStatus = await row.getByTestId('Status').textContent();
        }
        return ret;
    }

}