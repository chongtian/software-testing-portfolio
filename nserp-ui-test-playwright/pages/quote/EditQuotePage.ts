import { Locator, Page } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { PartySelectComponent, QueryProductPage } from "@ui-test/pages";

export class EditQuotePage {
    readonly page: Page;
    readonly queryPage: QueryProductPage;
    private readonly partySelect: PartySelectComponent;
    private readonly Labels = DisplayMessages.quote.DisplayNames;

    constructor(page: Page) {
        this.page = page;
        this.partySelect = new PartySelectComponent(page);
        this.queryPage = new QueryProductPage(page);
    }

    async goto(id?: number | undefined) {
        if (id) {
            await this.page.goto(BASE_URL + '/quote/edit/' + id);
        } else {
            await this.page.goto(BASE_URL + '/quote/create');
        }
    }

    async selectParty(party: string) {
        await this.partySelect.selectParty(party);
        await this.page.locator('#viewFullName').waitFor({ state: 'visible' });
    }

    async enterQuoteDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.QuoteDate });
        await datepicker.fill(dateString);
    }

    async enterQuoteName(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.QuoteName })
            .fill(value);
    }

    async enterExchangeRate(value: string) {
        await this.page.getByRole('spinbutton', { name: this.Labels.ExchgRate }).fill(value);
    }

    async enterHeaderMemo(value: string) {
        await this.page.locator('.header').getByRole('textbox', { name: DisplayMessages.common.DisplayNames.Memo })
            .fill(value);
    }

    async clickAddDetailButton(waitForQueryPage = true) {
        await this.page.getByRole('button', { name: DisplayMessages.quote.InsertDetail }).click();
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

    async enterDetailWeight(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('weight').getByRole('textbox').fill(value);
    }

    async enterDetailQty(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('qty').getByRole('textbox').fill(value);
    }

    async enterDetailBasicCost(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('basicCost').getByRole('spinbutton').fill(value);
    }

    async enterDetailExtraCost(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('extraCost').getByRole('spinbutton').fill(value);
    }

    async enterDetailFreightCost(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('freightCost').getByRole('spinbutton').fill(value);
    }

    async enterDetailDutyCost(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('dutyCost').getByRole('spinbutton').fill(value);
    }

    async enterDetailProfitRate(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('profitRate').getByRole('spinbutton').fill(value);
    }

    async enterDetailPrice(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('price').getByRole('spinbutton').fill(value);
    }

    async getDetailPrice(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('price').getByRole('spinbutton').inputValue();
    }

    async enterDetailLeadtime(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('leadtime').getByRole('textbox').fill(value);
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