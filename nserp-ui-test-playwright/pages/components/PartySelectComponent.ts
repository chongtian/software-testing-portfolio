import { Page } from "@playwright/test";
import { DisplayMessages } from "@ui-test/utils";

export class PartySelectComponent {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectParty(value: string) {
        const partySelector = this.page.getByRole('combobox', { name: DisplayMessages.party.DisplayNames.FullName });
        await partySelector.waitFor({ state: 'visible' });
        await partySelector.click();
        const option = partySelector.getByRole('option', { name: value });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }
}