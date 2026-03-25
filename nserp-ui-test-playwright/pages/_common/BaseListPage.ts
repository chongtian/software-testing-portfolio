import { Page } from "@playwright/test";
import { DisplayMessages } from "@ui-test/utils";
import { PartySelectComponent, PaginatorComponent } from "@ui-test/pages";

export abstract class BaseListPage {
    readonly page: Page;
    readonly paginator: PaginatorComponent;
    readonly partySelect: PartySelectComponent;

    constructor(page: Page) {
        this.page = page;
        this.paginator = new PaginatorComponent(page);
        this.partySelect = new PartySelectComponent(page);
    }

    protected async enterAcctYear(year: string) {
        const acctYear = this.page.locator('input[name="acctYear"]');
        await acctYear.waitFor({ state: 'visible' });
        await acctYear.fill(year);
    }

    async enterKeyword(keyword: string) {
        const keywordEl = this.page.getByRole('searchbox', { name: DisplayMessages.common.Keyword });
        await keywordEl.fill(keyword);
    }

    async clickSearchButton() {
        const btn = this.page.getByTestId('btnSearch');
        await btn.click();
    }

    async clickBankRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('TrnDate')
            .getByRole('link');
        await link.click();
    }    

    async clickPaymentRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('PayDocNum')
            .getByRole('link');
        await link.click();
    }     

    async clickInvoiceRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('InvNumber')
            .getByRole('link');
        await link.click();
    }    

    async clickShipRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('ShipName')
            .getByRole('link');
        await link.click();
    }

    async clickPoRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('PoNumber')
            .getByRole('link');
        await link.click();
    }

    async clickProductRecord(index: number) {
        const link = this.page.getByRole('table')
            .locator(`tbody tr:nth-child(${index + 1})`)
            .getByTestId('PartNumber')
            .getByRole('link');
        await link.click();
    }

    async clickLoadMoreButton() {
        const btn = this.page.getByTestId('btnLoadMore');
        await btn.click();
    }

    async loadMoreData() {
        const MAX_ATTEMPTS = 10;
        const btn = this.page.getByTestId('btnLoadMore');
        // if a test calls this method, it expects the button LoadMore shall be visible
        await btn.waitFor({ state: 'visible' });

        let i = 0;
        while (i < MAX_ATTEMPTS) {
            i++;
            await btn.click();
            await this.page.locator('.global-overlay').waitFor({ state: 'hidden' });
            if (!(await btn.isVisible())) {
                break;
            }
        }

    }

}