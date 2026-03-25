import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { PoInfo } from "@ui-test/models";

export class ViewPoPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id: number) {
        await this.page.goto(BASE_URL + '/po/view/' + id);
    }

    /**
     * getPoInfo() returns a list of PoInfo. 
     * The first element in the list is the Header.
     * The following elements in the list are Details.
     * It is possible that there is no Detail.
     */
    async getPoInfo(): Promise<PoInfo[]> {
        const list: PoInfo[] = [];

        // Header
        const header = new PoInfo();
        header.PartyName = await this.page.locator('#viewPartyName').textContent();
        header.PoNumber = await this.page.locator('#viewPoNumber').textContent();
        header.PoDate = await this.page.locator('#viewPoDate').textContent();
        header.PoAmount = await this.page.locator('#viewPoAmount').textContent();
        header.HeaderStatus = await this.page.locator('#viewStatus').textContent();
        header.HeaderMemo = await this.page.locator('#viewMemo').textContent();
        list.push(header);

        // Details
        const details = this.page.getByTestId('details');
        await details.waitFor({ state: 'visible' });
        for (const loc of await details.locator('tbody tr').all()) {
            const detail = new PoInfo();
            detail.PartNumber = await loc.getByTestId('partNumber').textContent();
            detail.ProductNameEn = await loc.getByTestId('productNameEn').textContent();
            detail.ProductNameCn = await loc.getByTestId('productNameCn').textContent();
            detail.Price = await loc.getByTestId('price').textContent();
            detail.Qty = await loc.getByTestId('qty').textContent();
            detail.Amount = await loc.getByTestId('amount').textContent();
            detail.ReqDate = await loc.getByTestId('reqDate').textContent();
            detail.PoType = await loc.getByTestId('poType').textContent();
            detail.DetailStatus = await loc.getByTestId('status').textContent();
            detail.DetailMemo = await loc.getByTestId('memo').textContent();
            list.push(detail);
        }

        return list;

    }

    async clickProductRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('partNumber')
            .getByRole('link');
        await link.click();
    }

}