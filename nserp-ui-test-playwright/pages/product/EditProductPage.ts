import { Locator, Page } from "@playwright/test";
import { BASE_URL, DisplayMessages } from "@ui-test/utils";
import { PartySelectComponent } from "@ui-test/pages";

export class EditProductPage {
    readonly page: Page;
    private readonly partySelect: PartySelectComponent;
    private readonly Labels = DisplayMessages.product.DisplayNames;

    constructor(page: Page) {
        this.page = page;
        this.partySelect = new PartySelectComponent(page);
    }

    async goto(id?: number | undefined) {
        if (id) {
            await this.page.goto(BASE_URL + '/product/edit/' + id);
        } else {
            await this.page.goto(BASE_URL + '/product/create');
        }
    }

    async selectParty(party: string) {
        await this.partySelect.selectParty(party);
    }

    async enterProductGroupName(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.GroupName })
            .fill(value);
    }

    async enterHtsCode(value: string) {
        await this.page.getByRole('textbox', { name: this.Labels.HtsCode })
            .fill(value);
    }

    async enterHeaderMemo(value: string) {
        await this.page.locator('.header').getByRole('textbox', { name: this.Labels.Memo })
            .fill(value);
    }

    async clickAddDetailButton() {
        await this.page.getByRole('button', { name: DisplayMessages.product.InsertDetail }).click();
    }

    private async waitForTr(index: number): Promise<Locator> {
        await this.page.getByTestId('details').waitFor({ state: 'visible' });
        const tbody = this.page.getByTestId('details').locator('tbody');
        const tr = tbody.locator('tr').nth(index);
        await tr.waitFor({ state: 'visible' });
        return tr;
    }

    async enterDetailPartNumber(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('partNumber').getByRole('textbox').fill(value);
    }

    async enterDetailProductNameEn(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('productNameEn').getByRole('textbox').fill(value);
    }

    async enterDetailProductNameCn(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('productNameCn').getByRole('textbox').fill(value);
    }

    async enterDetailVersion(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('version').getByRole('textbox').fill(value);
    }

    async enterDetailWeight(index: number, value: string) {
        const tr = await this.waitForTr(index);
        await tr.getByTestId('weight').getByRole('textbox').fill(value);
    }

    async selectDetailProductType(index: number, value: string) {
        const tr = await this.waitForTr(index);
        const productTypeSelector = tr.getByTestId('productType').getByRole('combobox');
        await productTypeSelector.waitFor({ state: 'visible' });
        await productTypeSelector.click();
        const option = productTypeSelector.getByRole('option', { name: value });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async selectDetailStatus(index: number, value: string) {
        const tr = await this.waitForTr(index);
        const productTypeSelector = tr.getByTestId('status').getByRole('combobox');
        await productTypeSelector.waitFor({ state: 'visible' });
        await productTypeSelector.click();
        const option = productTypeSelector.getByRole('option', { name: value });
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