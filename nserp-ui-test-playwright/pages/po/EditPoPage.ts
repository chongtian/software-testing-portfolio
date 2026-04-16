import { Locator, Page } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { PartySelectComponent, QueryProductPage } from "@ui-test/pages";

export class EditPoPage {
    readonly page: Page;
    readonly queryPage: QueryProductPage;
    private readonly partySelect: PartySelectComponent;
    private readonly Labels = DisplayMessages.po.DisplayNames;

    constructor(page: Page) {
        this.page = page;
        this.partySelect = new PartySelectComponent(page);
        this.queryPage = new QueryProductPage(page);
    }

    async goto(id?: number | undefined) {
        if (id) {
            await this.page.goto(BASE_URL + '/po/edit/' + id);
        } else {
            await this.page.goto(BASE_URL + '/po/create');
        }
    }

    async selectParty(party: string) {
        await this.partySelect.selectParty(party);
        await this.page.locator('#viewFullName').waitFor({ state: 'visible' });
    }

    async enterPoNumber(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.PoNumber })
            .fill(value);
    }

    async enterPoDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.PoDate });
        await datepicker.fill(dateString);
    }

    async enterPoAmount(value: string) {
        await this.page.getByRole('spinbutton', { name: this.Labels.PoAmount }).fill(value);
    }

    async getPoAmount(): Promise<string> {
        return await this.page.getByRole('spinbutton', { name: this.Labels.PoAmount }).inputValue();
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
        await this.page.getByRole('button', { name: DisplayMessages.po.InsertDetail }).click();
        if (waitForQueryPage) {
            await this.queryPage.waitForPageLoad();
        }
    }

    private async waitForTr(index: number): Promise<Locator> {
        await this.page.getByTestId('details').waitFor({ state: 'visible' });
        const tbody = this.page.getByTestId('details').locator('tbody');
        const tr = tbody.locator('tr').nth(index);
        await tr.waitFor({ state: 'visible' });
        return tr;
    }

    async getDetailPartNumber(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        const value = await tr.getByTestId('partNumber').textContent();
        return value ?? '';
    }

    async getDetailProductNameEn(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        const value = await tr.getByTestId('productNameEn').textContent();
        return value ?? '';
    }

    async getDetailProductNameCn(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        const value = await tr.getByTestId('productNameCn').textContent();
        return value ?? '';
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
        const value = await tr.getByTestId('amount').textContent();
        return value ?? '';
    }

    async enterDetailReqDate(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('reqDate').getByRole('textbox').fill(value);
    }

    async getDetailPoType(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        const value = await tr.getByTestId('poType').textContent();
        return value ?? '';
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