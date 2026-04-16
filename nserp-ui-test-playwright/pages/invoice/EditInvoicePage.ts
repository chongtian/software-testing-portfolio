import { Page, Locator } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { QueryInvoicePage, PartySelectComponent } from "@ui-test/pages";

export class EditInvoicePage {

    readonly page: Page;
    private readonly partySelect: PartySelectComponent;
    readonly queryPage: QueryInvoicePage;
    protected readonly Labels = DisplayMessages.invoice.DisplayNames;

    constructor(page: Page) {
        this.page = page;
        this.partySelect = new PartySelectComponent(page);
        this.queryPage = new QueryInvoicePage(page);
    }

    async goto(id: number) {
        if (id) {
            await this.page.goto(BASE_URL + '/inv/edit/' + id);
        } else {
            await this.page.goto(BASE_URL + '/inv/create');
        }
    }

    async selectParty(party: string) {
        await this.partySelect.selectParty(party);
        await this.page.locator('#viewFullName').waitFor({ state: 'visible' });
    }

    async enterInvoiceNumber(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.InvNumber })
            .fill(value);
    }

    async enterInvoiceDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.InvDate });
        await datepicker.fill(dateString);
    }

    async enterSentDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.SentDate });
        await datepicker.fill(dateString);
    }

    async enterInvoiceAmount(value: string) {
        await this.page.getByRole('spinbutton', { name: this.Labels.InvAmount }).fill(value);
    }

    async getInvoiceAmount(): Promise<string> {
        return await this.page.getByRole('spinbutton', { name: this.Labels.InvAmount }).inputValue();
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

    async clickAddNormalDetailButton(waitForQueryPage = true) {
        await this.page.getByRole('button', { name: DisplayMessages.invoice.InsertProductInvoice }).click();
        if (waitForQueryPage) {
            await this.queryPage.waitForPageLoad();
        }
    }

    async clickAddCreditDetailButton(waitForQueryPage = true) {
        await this.page.getByRole('button', { name: DisplayMessages.invoice.InsertCreditInvoice }).click();
        if (waitForQueryPage) {
            await this.queryPage.waitForPageLoad();
        }
    }

    async clickAddMiscDetailButton() {
        await this.page.getByRole('button', { name: DisplayMessages.invoice.InsertMiscInvoice }).click();
    }

    protected async waitForTr(index: number): Promise<Locator> {
        await this.page.getByTestId('details').waitFor({ state: 'visible' });
        const tbody = this.page.getByTestId('details').locator('tbody');
        const tr = tbody.locator('tr').nth(index);
        await tr.waitFor({ state: 'visible' });
        return tr;
    }

    async getDetailShipName(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('shipName').textContent();
    }

    async getDetailShipDate(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('shipDate').textContent();
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

    async enterDetailContent(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('content').getByRole('textbox').fill(value);
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