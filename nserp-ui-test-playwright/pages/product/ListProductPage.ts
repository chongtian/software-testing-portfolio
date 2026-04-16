import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { BaseListPage } from "@ui-test/pages";
import { ProductInfo } from "@ui-test/models";

export class ListProductPage extends BaseListPage {

    constructor(page: Page) {
        super(page);
    }

    async goto(query: string = '') {
        this.page.goto(BASE_URL + '/product' + query);
    }

    async getProductInfo(index: number): Promise<ProductInfo> {
        const row = this.page.getByRole('table').locator(`tbody tr:nth-child(${index + 1})`);
        await row.waitFor({ state: 'visible' });

        const ret: ProductInfo = {};
        ret.PartNumber = await row.getByTestId('PartNumber').textContent();
        ret.ProductNameEn = await row.getByTestId('ProductNameEn').textContent();
        ret.ProductNameCn = await row.getByTestId('ProductNameCn').textContent();
        ret.Version = await row.getByTestId('Version').textContent();
        ret.Weight = await row.getByTestId('Weight').textContent();
        ret.ProductType = await row.getByTestId('ProductType').textContent();
        ret.DetailMemo = await row.getByTestId('Memo').textContent();
        ret.Status = await row.getByTestId('Status').textContent();
        return ret;
    }

}