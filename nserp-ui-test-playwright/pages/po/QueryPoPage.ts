import { Page } from "@playwright/test";
import { PoInfo } from "@ui-test/models";
import { BaseQueryPage } from "@ui-test/pages";
import { DisplayMessages } from "@ui-test/utils";

export class QueryPoPage extends BaseQueryPage {

    constructor(page: Page) {
        super(page, 'ns-query-po');
    }

    async selectParty(value: string) {
        const partySelector = this._rootElement.getByRole('combobox', { name: DisplayMessages.party.DisplayNames.ShortName });
        await partySelector.waitFor({ state: 'visible' });
        await partySelector.click();
        const option = partySelector.getByRole('option', { name: value });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async getPoInfo(index: number): Promise<PoInfo> {
        await this._rootElement.getByRole('table').waitFor({ state: 'visible' });
        const row = this._rootElement.getByRole('table').locator('tbody tr').nth(index);
        await row.waitFor({ state: 'visible' });

        const ret: PoInfo = {};
        ret.PartyName = await row.getByTestId('PartyName').textContent();
        ret.PoNumber = await row.getByTestId('PoNumber').textContent();
        ret.PoDate = await row.getByTestId('PoDate').textContent();
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