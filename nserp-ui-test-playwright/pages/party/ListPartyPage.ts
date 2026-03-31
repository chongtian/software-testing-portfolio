import { Page } from "@playwright/test";
import { BASE_URL } from "@ui-test/utils";
import { PartyInfo } from "@ui-test/models";
import { PaginatorComponent } from "@ui-test/pages";

export class ListPartyPage {
    readonly page: Page;
    readonly paginator: PaginatorComponent;

    constructor(page: Page) {
        this.page = page;
        this.paginator = new PaginatorComponent(page);
    }

    async goto() {
        await this.page.goto(BASE_URL + '/party');
    }

    async getPartyInfo(index: number): Promise<PartyInfo> {
        const row = this.page.getByRole('table').locator(`tbody tr:nth-child(${index + 1})`);
        await row.waitFor({ state: 'visible' });
        
        const ret:PartyInfo = {};
        ret.ShortAlpha = await row.getByTestId('ShortAlpha').textContent();
        ret.ShortName = await row.getByTestId('ShortName').textContent();
        ret.PartyType = await row.getByTestId('PartyType').textContent();
        ret.PayTerm = await row.getByTestId('PayTerm').textContent();
        ret.ChargeDeliver = await row.getByTestId('ChargeDeliver').textContent();
        ret.ShipTerm = await row.getByTestId('ShipTerm').textContent();
        ret.ShipPort = await row.getByTestId('ShipPort').textContent();
        ret.Memo = await row.getByTestId('Memo').textContent();
        ret.Status = await row.getByTestId('Status').textContent();
        return ret;
    }

    async clickRecord(index: number) {
        const link = this.page.getByRole('table')
        .locator(`tbody tr:nth-child(${index + 1})`)
        .getByTestId('ShortAlpha')
        .getByRole('link');
        await link.click();
    }

    async filter(keyword: string) {
        const filterEl = this.page.locator('#filter_input');
        await filterEl.waitFor({state:'visible'});
        await filterEl.pressSequentially(keyword);
    }
}