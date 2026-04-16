import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { InvoiceInfo } from "@ui-test/models";

export class ViewInvoicePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id: number) {
        await this.page.goto(BASE_URL + '/inv/view/' + id);
    }

    /**
     * getInvoiceInfo() returns a list of InvoiceInfo. 
     * The first element in the list is the Header.
     * The following elements in the list are Details.
     * It is possible that there is no Detail.
     */
    async getInvoiceInfo(): Promise<InvoiceInfo[]> {
        const list: InvoiceInfo[] = [];

        // Header
        const header: InvoiceInfo = {};
        header.PartyName = await this.page.locator('#viewPartyName').textContent();
        header.InvNumber = await this.page.locator('#viewInvNumber').textContent();
        header.InvDate = await this.page.locator('#viewInvDate').textContent();
        header.SentDate = await this.page.locator('#viewSentDate').textContent();
        header.InvAmount = await this.page.locator('#viewInvAmount').textContent();
        header.HeaderStatus = await this.page.locator('#viewStatus').textContent();
        header.HeaderMemo = await this.page.locator('#viewMemo').textContent();
        list.push(header);

        // Details
        const details = this.page.getByTestId('details');
        await details.waitFor({ state: 'visible' });
        for (const loc of await details.locator('tbody tr').all()) {
            const detail: InvoiceInfo = {};
            detail.ShipName = await loc.getByTestId('shipName').textContent();
            detail.ShipDate = await loc.getByTestId('shipDate').textContent();
            detail.PoNumber = await loc.getByTestId('poNumber').textContent();
            detail.PartNumber = await loc.getByTestId('partNumber').textContent();
            detail.ProductNameEn = await loc.getByTestId('productNameEn').textContent();
            detail.Content = await loc.getByTestId('content').textContent();
            detail.Price = await loc.getByTestId('price').textContent();
            detail.Qty = await loc.getByTestId('qty').textContent();
            detail.Amount = await loc.getByTestId('amount').textContent();
            detail.DetailStatus = await loc.getByTestId('status').textContent();
            detail.DetailMemo = await loc.getByTestId('memo').textContent();
            list.push(detail);
        }

        return list;

    }

    async clickShipRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('shipName')
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