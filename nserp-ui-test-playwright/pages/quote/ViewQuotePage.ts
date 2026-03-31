import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { QuoteInfo } from "@ui-test/models";

export class ViewQuotePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id: number) {
        await this.page.goto(BASE_URL + '/quote/view/' + id);
    }

    /**
     * getQuoteInfo() returns a list of QuoteInfo. 
     * The first element in the list is the Header.
     * The following elements in the list are Details.
     * It is possible that there is no Detail.
     */
    async getQuoteInfo(): Promise<QuoteInfo[]> {
        const list: QuoteInfo[] = [];

        // Header
        const header: QuoteInfo = {};
        header.PartyName = await this.page.locator('#viewPartyName').textContent();
        header.QuoteDate = await this.page.locator('#viewQuoteDate').textContent();
        header.QuoteName = await this.page.locator('#viewQuoteName').textContent();
        header.ExchgRate = await this.page.locator('#viewExchgRate').textContent();
        header.HeaderMemo = await this.page.locator('#viewMemo').textContent(); 
        list.push(header);

        // Details
        const details = this.page.getByTestId('details');
        await details.waitFor({ state: 'visible' });
        for(const loc of await details.locator('tbody tr').all()) {
            const detail: QuoteInfo = {};
            detail.PartNumber = await loc.getByTestId('partNumber').textContent();
            detail.ProductNameEn = await loc.getByTestId('productNameEn').textContent();
            detail.ProductNameCn = await loc.getByTestId('productNameCn').textContent();
            detail.Weight = await loc.getByTestId('weight').textContent();            
            detail.Qty = await loc.getByTestId('qty').textContent();
            detail.BasicCost = await loc.getByTestId('basicCost').textContent();
            detail.ExtraCost = await loc.getByTestId('extraCost').textContent();
            detail.FreightCost = await loc.getByTestId('freightCost').textContent();
            detail.DutyCost = await loc.getByTestId('dutyCost').textContent();
            detail.Price = await loc.getByTestId('price').textContent();
            detail.Leadtime = await loc.getByTestId('leadtime').textContent();
            detail.Status = await loc.getByTestId('status').textContent();
            detail.DetailMemo = await loc.getByTestId('memo').textContent();
            list.push(detail);
        }

        return list;

    }
}