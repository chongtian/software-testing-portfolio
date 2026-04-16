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
        const partyName = await this.page.locator('#viewPartyName').textContent();
        const groupName = await this.page.locator('#viewGroupName').textContent();
        const htsCode = await this.page.locator('#viewHtsCode').textContent();
        const headerMemo = await this.page.locator('#viewMemo').textContent();

        const header: ProductInfo = {
            PartyName: partyName,
            GroupName: groupName,
            HtsCode: htsCode,
            HeaderMemo: headerMemo
        };

        list.push(header);

        // Details
        const details = this.page.getByTestId('details');
        await details.waitFor({ state: 'visible' });
        for (const loc of await details.locator('tbody tr').all()) {
            const partNumber = await loc.getByTestId('partNumber').textContent();
            const productNameEn = await loc.getByTestId('productNameEn').textContent();
            const productNameCn = await loc.getByTestId('productNameCn').textContent();
            const version = await loc.getByTestId('version').textContent();
            const weight = await loc.getByTestId('weight').textContent();
            const productType = await loc.getByTestId('productType').textContent();
            const status = await loc.getByTestId('status').textContent();
            const detailMemo = await loc.getByTestId('memo').textContent();
            const detail: ProductInfo = {
                PartNumber: partNumber,
                ProductNameEn: productNameEn,
                ProductNameCn: productNameCn,
                Version: version,
                Weight: weight,
                ProductType: productType,
                Status: status,
                DetailMemo: detailMemo
            };
            list.push(detail);
        }

        return list;

    }

    async clickSwitchViewButton() {
        await this.page.getByTestId('btnSwitchView').click();
    }

}