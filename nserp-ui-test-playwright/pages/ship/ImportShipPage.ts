import { Page } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { BaseEditShipPage } from "@ui-test/pages/ship/BaseEditShipPage";
import { ShipInfo } from "@ui-test/models";

export class ImportShipPage extends BaseEditShipPage {

    private readonly ImportLabels = DisplayMessages.ship.Import.DefLables;

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto(BASE_URL + '/ship/import');
    }

    async getConfigs(): Promise<string[]> {
        const configs: string[] = [];
        const c1 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.SheetNumber }).inputValue();
        const c2 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.DetailsStartRowNumber }).inputValue();
        const c3 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.BrokerInvoiceRowNumber }).inputValue();
        const c4 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.BrokerInvoiceColNumber }).inputValue();
        const c5 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.PartyNameColNumber }).inputValue();
        const c6 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.PoNumberColNumber }).inputValue();
        const c7 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.PartNumberColNumber }).inputValue();
        const c8 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.WeightColNumber }).inputValue();
        const c9 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.QtyColNumber }).inputValue();
        const c10 = await this.page.getByRole('spinbutton', { name: this.ImportLabels.PriceColNumber }).inputValue();
        configs.push(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10);
        return configs;
    }

    async selectFile(filePath: string) {
        await this.page.getByRole('button', { name: 'Choose File' }).click();
        await this.page.getByRole('button', { name: 'Choose File' }).setInputFiles(filePath);
    }

    async clickImportButton() {
        await this.page.locator('#btnImport').click();
    }

    async clickValidateButton(index: number) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('action').getByTestId('btnValidate').click();
    }

    async clickValidateAllButton() {
        await this.page.getByRole('button', { name: DisplayMessages.ship.ValidateLabel }).click();
    }

    /**
        * getImportedShipInfo() returns a list of ShipInfo. 
        * The first element in the list is the Header.
        * The following elements in the list are Details.
        * It is possible that there is no Detail.
        */
    async getImportedShipInfo(): Promise<ShipInfo[]> {
        const list: ShipInfo[] = [];

        // Header
        const header: ShipInfo = {};
        header.ShipName = await this.page.getByRole('textbox', { name: this.Labels.ShipName }).inputValue();
        header.ShipDate = await this.page.getByRole('textbox', { name: this.Labels.ShipDate }).inputValue();
        header.DepartDate = await this.page.getByRole('textbox', { name: this.Labels.DepartDate }).inputValue();
        header.ShipVia = await this.page.getByRole('combobox', { name: this.Labels.ShipVia }).textContent();
        header.BrokerInvoice = await this.page.getByRole('textbox', { name: this.Labels.BrokerInvoice }).inputValue();
        header.ShipAmount = await this.page.getByRole('spinbutton', { name: this.Labels.ShipAmount }).inputValue();
        header.HeaderMemo = await this.page.getByRole('textbox', { name: DisplayMessages.common.DisplayNames.Memo }).inputValue();
        list.push(header);

        // Details
        const details = this.page.getByTestId('details');
        await details.waitFor({ state: 'visible' });
        for (const loc of await details.locator('tbody tr').all()) {
            const detail: ShipInfo = {};
            detail.PartyName = await loc.getByTestId('partyId').textContent();
            detail.PoNumber = await loc.getByTestId('poNumber').textContent();
            detail.PartNumber = await loc.getByTestId('partNumber').textContent();
            detail.ProductNameEn = await loc.getByTestId('productNameEn').textContent();
            detail.ProductNameCn = await loc.getByTestId('productNameCn').textContent();
            detail.Price = await loc.getByTestId('price').getByRole('spinbutton').inputValue();
            detail.Qty = await loc.getByTestId('qty').getByRole('spinbutton').inputValue();
            detail.Amount = await loc.getByTestId('amount').textContent();
            detail.DetailMemo = await loc.getByTestId('memo').getByRole('textbox').inputValue();
            list.push(detail);
        }

        return list;

    }

}