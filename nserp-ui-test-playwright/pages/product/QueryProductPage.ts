import { Page } from "@playwright/test";
import { ProductInfo } from "@ui-test/models";
import { BaseQueryPage } from "@ui-test/pages";

export class QueryProductPage extends BaseQueryPage {

    constructor(page: Page) {
        super(page, 'ns-query-product');
    }

    async getProductInfo(index: number): Promise<ProductInfo> {
        await this._rootElement.getByRole('table').waitFor({ state: 'visible' });
        const row = this._rootElement.getByRole('table').locator('tbody tr').nth(index);
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