import { Page, Locator } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";

export class EditBankPage {

    readonly page: Page;
    protected readonly Labels = DisplayMessages.bank.DisplayNames;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(id?: number | undefined) {
        if (id) {
            await this.page.goto(BASE_URL + '/bank/edit/' + id);
        } else {
            await this.page.goto(BASE_URL + '/bank/create');
        }
    }

    async enterTrnAccount(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.TrnAccount })
            .fill(value);
    }

    async getTrnAccount(): Promise<string> {
        return this.page.getByRole('textbox', { name: this.Labels.TrnAccount }).inputValue();
    }

    async enterTrnDate(dateString: string) {
        const datepicker = this.page.getByRole('textbox', { name: this.Labels.TrnDate });
        await datepicker.fill(dateString);
    }

    async getTrnDate(): Promise<string> {
        return this.page.getByRole('textbox', { name: this.Labels.TrnDate }).inputValue();
    }

    async selectTrnType(value: string) {
        const select = this.page.getByRole('combobox', { name: this.Labels.TrnType });
        await select.waitFor({ state: 'visible' });
        await select.click();
        const option = select.getByRole('option', { name: value });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async getTrnType(): Promise<string> {
        const value = await this.page.getByRole('combobox', { name: this.Labels.TrnType }).textContent();
        return value ?? '';
    }

    async enterMemo(value: string) {
        await this.page.getByRole('textbox', { name: DisplayMessages.common.DisplayNames.Memo })
            .fill(value);
    }

    async getMemo(): Promise<string> {
        return this.page.getByRole('textbox', { name: DisplayMessages.common.DisplayNames.Memo }).inputValue();
    }

    async enterTrnAmount(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.TrnAmount }).fill(value);
    }

    async getTrnAmount(): Promise<string> {
        return this.page.getByRole('textbox', { name: this.Labels.TrnAmount }).inputValue();
    }

    async enterTrnDesc(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.TrnDesc }).fill(value);
    }

    async getTrnDesc(): Promise<string> {
        return this.page.getByRole('textbox', { name: this.Labels.TrnDesc }).inputValue();
    }

    async clickSaveButton(confirmAction = true) {
        if (confirmAction) {
            this.page.once('dialog', dialog => dialog.accept());
        }

        await this.page.getByTestId('saveBank').click();
    }

    async clickDeleteButton(confirmAction = true) {
        if (confirmAction) {
            this.page.once('dialog', dialog => dialog.accept());
        }

        await this.page.getByTestId('deleteBank').click();
    }

    async clickSwitchViewButton() {
        await this.page.getByTestId('switchView').click();
    }

}