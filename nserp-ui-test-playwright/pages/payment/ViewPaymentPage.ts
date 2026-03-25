import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { PaymentInfo } from "@ui-test/models";

export class ViewPaymentPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id: number) {
        await this.page.goto(BASE_URL + '/pay/view/' + id);
    }

    /**
     * getPaymentInfo() returns a list of PaymentInfo. 
     * The first element in the list is the Header.
     * The following elements in the list are Details.
     * It is possible that there is no Detail.
     */
    async getPaymentInfo(): Promise<PaymentInfo[]> {
        const list: PaymentInfo[] = [];

        // Header
        const header = new PaymentInfo();
        header.PartyName = await this.page.locator('#viewPartyName').textContent();
        header.PayDocNum = await this.page.locator('#viewPayDocNum').textContent();
        header.PayDocDate = await this.page.locator('#viewPayDocDate').textContent();
        header.DepositDate = await this.page.locator('#viewDepositDate').textContent();
        header.CommissionDate = await this.page.locator('#viewCommissionDate').textContent();
        header.PayAmount = await this.page.locator('#viewPayAmount').textContent();
        header.HeaderStatus = await this.page.locator('#viewStatus').textContent();
        header.HeaderMemo = await this.page.locator('#viewMemo').textContent();
        list.push(header);

        // Details
        const details = this.page.getByTestId('details');
        await details.waitFor({ state: 'visible' });
        for (const loc of await details.locator('tbody tr').all()) {
            const detail = new PaymentInfo();
            detail.InvNumber = await loc.getByTestId('invNumber').textContent();
            detail.PoNumber = await loc.getByTestId('poNumber').textContent();
            detail.PartNumber = await loc.getByTestId('partNumber').textContent();
            detail.ProductNameEn = await loc.getByTestId('productNameEn').textContent();
            detail.PayItem = await loc.getByTestId('payItem').textContent();
            detail.Amount = await loc.getByTestId('amount').textContent();
            detail.DetailMemo = await loc.getByTestId('memo').textContent();
            list.push(detail);
        }

        return list;

    }

    async clickInvoiceRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('invNumber')
            .getByRole('link');
        await link.click();
    }

    async clickPoRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('poNumber')
            .getByRole('link');
        await link.click();
    }

    async clickProductRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('partNumber')
            .getByRole('link');
        await link.click();
    }

}