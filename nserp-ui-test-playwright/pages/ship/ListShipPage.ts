import { Page } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { PartySelectComponent, PaginatorComponent, BaseListPage } from "@ui-test/pages";
import { ShipInfo } from "@ui-test/models";

export class ListShipPage extends BaseListPage {

    constructor(page: Page) {
        super(page);
    }

    async goto(query: string = '') {
        await this.page.goto(BASE_URL + '/ship' + query);
    }

    async enterShipYear(year: string) {
        await super.enterAcctYear(year);
    }

    async getShipInfo(index: number): Promise<ShipInfo> {
        await this.page.getByRole('table').waitFor({ state: 'visible' });
        const row = this.page.getByRole('table').locator(`tbody tr:nth-child(${index + 1})`);
        await row.waitFor({ state: 'visible' });
        const ret: ShipInfo = {};

        // if keyword is entered, it returns records with detail information
        const keywordEl = this.page.getByRole('searchbox', { name: DisplayMessages.common.Keyword });
        const keyword = await keywordEl.inputValue();
        const showHeaderOnly = !keyword || keyword.trim().length === 0;

        if (showHeaderOnly) {
            ret.ShipName = await row.getByTestId('ShipName').textContent();
            ret.ShipDate = await row.getByTestId('ShipDate').textContent();
            ret.DepartDate = await row.getByTestId('DepartDate').textContent();
            ret.BrokerInvoice = await row.getByTestId('BrokerInvoice').textContent();
            ret.HeaderMemo = await row.getByTestId('Memo').textContent();
            ret.HeaderStatus = await row.getByTestId('Status').textContent();
        } else {
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
        }
        return ret;
    }

}