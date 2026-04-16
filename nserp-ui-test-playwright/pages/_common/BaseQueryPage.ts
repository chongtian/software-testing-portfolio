import { Page, Locator } from "@playwright/test";
import { DisplayMessages, waitForNoMatProgressBar } from "@ui-test/utils";
import { PaginatorComponent } from "../components/PaginatorComponent";

export abstract class BaseQueryPage {
    protected readonly page: Page;
    readonly paginator: PaginatorComponent;
    protected readonly _rootElement: Locator;

    constructor(page: Page, rootSelector: string) {
        this.page = page;
        this.paginator = new PaginatorComponent(page);
        this._rootElement = this.page.locator(rootSelector);
    }

    async waitForPageLoad() {
        await this._rootElement.getByRole('heading').last().waitFor({ state: 'visible' });
    }

    async waitForPageUnload() {
        await this._rootElement.getByRole('heading').last().waitFor({ state: 'detached' });
    }

    async getTitle(): Promise<string> {
        return await this._rootElement.getByRole('heading').first().textContent();
    }

    async enterKeyword(value: string) {
        await this._rootElement.locator('input[name="keyword"]').fill(value);
    }

    async clickSearchButton() {
        await this._rootElement.getByRole('button', { name: DisplayMessages.common.Search }).click();
        await waitForNoMatProgressBar(this.page);
    }

    async clickSelectButton(requireSelection = true) {
        // for debugging:
        // if (requireSelection) {
        //     const checkboxes = this._rootElement.locator('tbody').getByRole('checkbox');
        //     const count = await checkboxes.count();
        //     let isAnyChecked = false;
        //     for (let i = 0; i < count; i++) {
        //         if (await checkboxes.nth(i).isChecked()) {
        //             isAnyChecked = true;
        //             break;
        //         }
        //     }
        //     if (!isAnyChecked) {
        //         throw new Error('No record is selected, but clickSelectButton is called with requireSelection = true');
        //     }
        // }
        await this._rootElement.getByRole('button', { name: DisplayMessages.common.Select }).click();
    }

    async clickCancelButton() {
        await this._rootElement.getByRole('button', { name: DisplayMessages.common.Cancel }).click();
    }

    async clickSelectAllToggle() {
        await this._rootElement.getByTestId('toggleAll').click();
    }

    async clickRecords(indexes: number[]) {
        await this._rootElement.locator('tbody').waitFor({ state: 'visible' });
        for (let i of indexes) {
            await this._rootElement.locator('tbody').getByRole('checkbox').nth(i).check();
        }

    }

}