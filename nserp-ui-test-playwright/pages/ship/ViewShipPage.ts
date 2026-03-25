import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { ShipInfo } from "@ui-test/models";

export class ViewShipPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id: number) {
        await this.page.goto(BASE_URL + '/ship/view/' + id);
    }

    /**
     * getShipInfo() returns a list of ShipInfo. 
     * The first element in the list is the Header.
     * The following elements in the list are Details.
     * It is possible that there is no Detail.
     */
    async getShipInfo(): Promise<ShipInfo[]> {
        const list: ShipInfo[] = [];

        // Header
        const header = new ShipInfo();
        header.ShipName = await this.page.locator('#viewShipName').textContent();
        header.ShipDate = await this.page.locator('#viewShipDate').textContent();
        header.DepartDate = await this.page.locator('#viewDepartDate').textContent();
        header.ShipVia = await this.page.locator('#viewShipVia').textContent();
        header.BrokerInvoice = await this.page.locator('#viewBrokerInvoice').textContent();
        header.ShipAmount = await this.page.locator('#viewShipAmount').textContent();
        header.HeaderStatus = await this.page.locator('#viewStatus').textContent();
        header.HeaderMemo = await this.page.locator('#viewMemo').textContent();
        list.push(header);

        // Details
        const details = this.page.getByTestId('details');
        await details.waitFor({ state: 'visible' });
        for (const loc of await details.locator('tbody tr').all()) {
            const detail = new ShipInfo();
            detail.PartyName = await loc.getByTestId('partyId').textContent();
            detail.PoNumber = await loc.getByTestId('poNumber').textContent();
            detail.PartNumber = await loc.getByTestId('partNumber').textContent();
            detail.ProductNameEn = await loc.getByTestId('productNameEn').textContent();
            detail.ProductNameCn = await loc.getByTestId('productNameCn').textContent();
            detail.Price = await loc.getByTestId('price').textContent();
            detail.Qty = await loc.getByTestId('qty').textContent();
            detail.Amount = await loc.getByTestId('amount').textContent();
            detail.DetailStatus = await loc.getByTestId('status').textContent();
            detail.DetailMemo = await loc.getByTestId('memo').textContent();
            list.push(detail);
        }

        return list;

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