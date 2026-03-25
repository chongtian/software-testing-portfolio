import { expect, type Page } from '@playwright/test';
import { DisplayMessages } from '@ui-test//utils';

export class MenuBarComponent {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async ClickSearch() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.common.GlobalSearch;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }    

    async ClickBrowseParty() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.party.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickBrowseProduct() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.product.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickBrowseQuote() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.quote.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickBrowsePo() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.po.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickBrowseShip() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.ship.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickBrowseInvoice() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.invoice.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickBrowsePayment() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.payment.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickBrowseBank() {
        const lv1Menu = DisplayMessages.common.Browse;
        const lv2Menu = DisplayMessages.bank.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickCreateParty() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.party.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickCreateProduct() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.product.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickCreateQuote() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.quote.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickCreatePo() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.po.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickCreateShip() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.ship.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickImportShip() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.ship.ImportLabel;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickCreateInvoice() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.invoice.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickCreatePayment() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.payment.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickDepositPayment() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.payment.DepositLabel;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickCreateBank() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.bank.ModuleName;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickImportBank() {
        const lv1Menu = DisplayMessages.common.Create;
        const lv2Menu = DisplayMessages.bank.ImportLabel;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickReportAnnual() {
        const lv1Menu = DisplayMessages.report.ModuleName;
        const lv2Menu = DisplayMessages.report.AnnualReport;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickOpenReportTooling() {
        const lv1Menu = DisplayMessages.report.ModuleName;
        const lv2Menu = DisplayMessages.report.OpenEntityReport.product;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickOpenReportPo() {
        const lv1Menu = DisplayMessages.report.ModuleName;
        const lv2Menu = DisplayMessages.report.OpenEntityReport.po;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickOpenReportShip() {
        const lv1Menu = DisplayMessages.report.ModuleName;
        const lv2Menu = DisplayMessages.report.OpenEntityReport.ship;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickOpenReportInvoice() {
        const lv1Menu = DisplayMessages.report.ModuleName;
        const lv2Menu = DisplayMessages.report.OpenEntityReport.invoice;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    async ClickReportLeadtime() {
        const lv1Menu = DisplayMessages.report.ModuleName;
        const lv2Menu = DisplayMessages.report.LeadTimeReport;
        await this.ClickMenu(lv1Menu, lv2Menu);
    }

    private async ClickMenu(lv1Menu: string, lv2Menu: string) {
        await expect(this.page.getByRole('button', { name: lv1Menu, exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu, exact: true }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu, exact: true })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu, exact: true }).click();
    }

}