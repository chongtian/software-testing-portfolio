import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { ProductInfo } from "@ui-test/models";

export class ViewProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id: number) {
        await this.page.goto(BASE_URL + '/product/view/' + id);
    }

    /**
     * getProductInfo() returns a list of ProductInfo. 
     * The first element in the list is the ProductHeader.
     * The following elements in the list are ProductDetail.
     * It is possible that there is no ProductDetail.
     */
    async getProductInfo(): Promise<ProductInfo[]> {
        const list: ProductInfo[] = [];

        // Header
        const header = new ProductInfo();
        header.PartyName = await this.page.locator('#viewPartyName').textContent();
        header.GroupName = await this.page.locator('#viewGroupName').textContent();
        header.HtsCode = await this.page.locator('#viewHtsCode').textContent();
        header.HeaderMemo = await this.page.locator('#viewMemo').textContent(); 
        list.push(header);

        // Details
        const details = this.page.getByTestId('details');
        await details.waitFor({ state: 'visible' });
        for(const loc of await details.locator('tbody tr').all()) {
            const detail = new ProductInfo();
            detail.PartNumber = await loc.getByTestId('partNumber').textContent();
            detail.ProductNameEn = await loc.getByTestId('productNameEn').textContent();
            detail.ProductNameCn = await loc.getByTestId('productNameCn').textContent();
            detail.Version = await loc.getByTestId('version').textContent();
            detail.Weight = await loc.getByTestId('weight').textContent();
            detail.ProductType = await loc.getByTestId('productType').textContent();
            detail.Status = await loc.getByTestId('status').textContent();
            detail.DetailMemo = await loc.getByTestId('memo').textContent();
            list.push(detail);
        }

        return list;

    }
}