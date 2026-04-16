import { Page, Locator } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { QueryPaymentPage, PartySelectComponent } from "@ui-test/pages";

export class EditPaymentPage {

    readonly page: Page;
    private readonly partySelect: PartySelectComponent;
    readonly queryPage: QueryPaymentPage;
    protected readonly Labels = DisplayMessages.payment.DisplayNames;

    constructor(page: Page) {
        this.page = page;
        this.partySelect = new PartySelectComponent(page);
        this.queryPage = new QueryPaymentPage(page);
    }

    async goto(id: number) {
        if (id) {
            await this.page.goto(BASE_URL + '/pay/edit/' + id);
        } else {
            await this.page.goto(BASE_URL + '/pay/create');
        }
    }

    async selectParty(party: string) {
        await this.partySelect.selectParty(party);
        await this.page.locator('#viewFullName').waitFor({ state: 'visible' });
    }

    async enterPayDocNum(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.PayDocNum })
            .fill(value);
    }

    async enterPayDocDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.PayDocDate });
        await datepicker.fill(dateString);
    }

    async enterDepositDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.DepositDate });
        await datepicker.fill(dateString);
    }

    async enterCommissionDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.CommissionDate });
        await datepicker.fill(dateString);
    }

    async enterPayAmount(value: string) {
        await this.page.getByRole('spinbutton', { name: this.Labels.PayAmount }).fill(value);
    }

    async getPayAmount(): Promise<string> {
        return await this.page.getByRole('spinbutton', { name: this.Labels.PayAmount }).inputValue();
    }

    async enterHeaderMemo(value: string) {
        await this.page.locator('.header').getByRole('textbox', { name: DisplayMessages.common.DisplayNames.Memo })
            .fill(value);
    }

    async selectPayType(value: string) {
        const selector = this.page.locator('.header').getByRole('combobox', { name: this.Labels.PayType });
        await selector.waitFor({ state: 'visible' });
        await selector.click();
        const option = selector.getByRole('option', { name: value, exact: true });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }    

    async selectHeaderStatus(value: string) {
        const headerStatusSelector = this.page.locator('.header').getByRole('combobox', { name: DisplayMessages.common.DisplayNames.Status });
        await headerStatusSelector.waitFor({ state: 'visible' });
        await headerStatusSelector.click();
        const option = headerStatusSelector.getByRole('option', { name: value });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async clickAddRegularDetailButton(waitForQueryPage = true) {
        await this.page.getByRole('button', { name: DisplayMessages.payment.InsertRegularPayment }).click();
        if (waitForQueryPage) {
            await this.queryPage.waitForPageLoad();
        }
    }

    async clickAddSpecialDetailButton() {
        await this.page.getByRole('button', { name: DisplayMessages.payment.InsertSpecialPayment }).click();
    }

    protected async waitForTr(index: number): Promise<Locator> {
        await this.page.getByTestId('details').waitFor({ state: 'visible' });
        const tbody = this.page.getByTestId('details').locator('tbody');
        const tr = tbody.locator('tr').nth(index);
        await tr.waitFor({ state: 'visible' });
        return tr;
    }

    async getDetailInvoiceNumber(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('invNumber').textContent();
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

    async enterDetailPayItem(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('payItem').getByRole('textbox').fill(value);
    }

    async getDetailPayItem(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('payItem').getByRole('textbox').inputValue();
    }    

    async enterDetailAmount(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('amount').getByRole('spinbutton').fill(value);
    }

    async getDetailAmount(index: number): Promise<string> {
        const tr = await this.waitForTr(index);
        return await tr.getByTestId('amount').getByRole('spinbutton').inputValue();
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