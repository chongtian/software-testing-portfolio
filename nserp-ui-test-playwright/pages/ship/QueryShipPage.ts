import { Page } from "@playwright/test";
import { ShipInfo } from "@ui-test/models";
import { BaseQueryPage } from "@ui-test/pages";

export class QueryShipPage extends BaseQueryPage {

    constructor(page: Page) {
        super(page, 'ns-query-ship');
    }

    async getShipInfo(index: number): Promise<ShipInfo> {
        await this._rootElement.getByRole('table').waitFor({ state: 'visible' });
        const row = this._rootElement.getByRole('table').locator('tbody tr').nth(index);
        await row.waitFor({ state: 'visible' });

        const ret: ShipInfo = {};
        ret.ShipName = await row.getByTestId('ShipName').textContent();
        ret.ShipDate = await row.getByTestId('ShipDate').textContent();
        ret.PartyName = await row.getByTestId('PartyName').textContent();
        ret.PoNumber = await row.getByTestId('PoNumber').textContent();
        ret.PartNumber = await row.getByTestId('PartNumber').textContent();
        ret.ProductNameEn = await row.getByTestId('ProductNameEn').textContent();
        ret.ProductNameCn = await row.getByTestId('ProductNameCn').textContent();
        ret.Qty = await row.getByTestId('Qty').textContent();
        ret.Price = await row.getByTestId('Price').textContent();
        ret.Amount = await row.getByTestId('Amount').textContent();
        ret.DetailMemo = await row.getByTestId('Memo').textContent();
        ret.DetailStatus = await row.getByTestId('Status').textContent();

        return ret;
    }

}