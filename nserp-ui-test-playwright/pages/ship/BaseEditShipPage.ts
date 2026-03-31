import { Locator, Page } from "@playwright/test";
import { DisplayMessages } from "@ui-test/utils";
import { QueryPoPage } from "@ui-test/pages";

export abstract class BaseEditShipPage {
    readonly page: Page;
    readonly queryPage: QueryPoPage;

    protected readonly Labels = DisplayMessages.ship.DisplayNames;

    constructor(page: Page) {
        this.page = page;        
        this.queryPage = new QueryPoPage(page);
    }

    async enterShipName(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.ShipName })
            .fill(value);
    }

    async enterShipDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.ShipDate });
        await datepicker.fill(dateString);
    }
    
    async enterDepartDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.DepartDate });
        await datepicker.fill(dateString);
    }    

    async selectShipVia(value: string) {
        const selector = this.page.locator('.header').getByRole('combobox', { name: this.Labels.ShipVia });
        await selector.waitFor({ state: 'visible' });
        await selector.click();
        const option = selector.getByRole('option', { name: value });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }    

    async enterBrokerInvoice(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.BrokerInvoice });
        await datepicker.fill(dateString);
    }      

    async enterShipAmount(value: string) {
        await this.page.getByRole('spinbutton', { name: this.Labels.ShipAmount }).fill(value);
    }

    async getShipAmount(): Promise<string> {
        return await this.page.getByRole('spinbutton', { name: this.Labels.ShipAmount }).inputValue();
    }

    async enterHeaderMemo(value: string) {
        await this.page.locator('.header').getByRole('textbox', { name: DisplayMessages.common.DisplayNames.Memo })
            .fill(value);
    } 
    
    async selectHeaderStatus(value: string) {
        const headerStatusSelector = this.page.locator('.header').getByRole('combobox', { name: DisplayMessages.common.DisplayNames.Status });
        await headerStatusSelector.waitFor({ state: 'visible' });
        await headerStatusSelector.click();
        const option = headerStatusSelector.getByRole('option', { name: value });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }    

    async clickAddDetailButton(waitForQueryPage = true) {
        await this.page.getByRole('button', { name: DisplayMessages.ship.InsertDetail }).click();
        if (waitForQueryPage) {
            await this.queryPage.waitForPageLoad();
        }
    }    

    protected async waitForTr(index: number): Promise<Locator> {
        await this.page.getByTestId('details').waitFor({ state: 'visible' });
        const tbody = this.page.getByTestId('details').locator('tbody');
        const tr = tbody.locator('tr').nth(index);
        await tr.waitFor({ state: 'visible' });
        return tr;
    }

    async getDetailParty(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('partyId').textContent();
    }

    async getDetailPoNumber(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('poNumber').textContent();
    }

    async getDetailPartNumber(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('partNumber').textContent();
    }

    async getDetailProductNameEn(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('productNameEn').textContent();
    }

    async getDetailProductNameCn(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('productNameCn').textContent();
    }

    async enterDetailPrice(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('price').getByRole('spinbutton').fill(value);
    }

    async enterDetailQty(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('qty').getByRole('spinbutton').fill(value);
    }

    async getDetailAmount(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('amount').textContent();
    }

    async selectDetailStatus(index: number, value: string) {
        const tr = await this.waitForTr(index);
        const statusSelector = tr.getByTestId('status').getByRole('combobox');
        await statusSelector.waitFor({ state: 'visible' });
        await statusSelector.click();
        const option = statusSelector.getByRole('option', { name: value });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async enterDetailMemo(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('memo').getByRole('textbox').fill(value);
    }

    async clickDetailDeleteButton(index: number, confirmAction = true) {
        if (confirmAction) {
            this.page.once('dialog', dialog => dialog.accept());
        }
        const tr = await this.waitForTr(index);
        await tr.getByTestId('action').getByRole('button').click();
    }

    async clickSaveButton(confirmAction = true) {
        if (confirmAction) {
            this.page.once('dialog', dialog => dialog.accept());
        }

        await this.page.getByTestId('btnSave').click();
    }

    async clickDeleteButton(confirmAction = true) {
        if (confirmAction) {
            this.page.once('dialog', dialog => dialog.accept());
        }

        await this.page.getByTestId('btnDelete').click();
    }

    async clickSwitchViewButton() {
        await this.page.getByTestId('btnSwitchView').click();
    }

}