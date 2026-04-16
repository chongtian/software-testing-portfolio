import { test, expect } from '@playwright/test';
import { HOME_URL, AdminAuthDataFilePath, DisplayMessages } from '@ui-test/utils'
import { MenuBarComponent } from '@ui-test/pages';

test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('Menu Bar', () => {

    test('user navigates to Global Search', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickSearch();
        await expect(page).toHaveURL(/search/);
        const pageTitle = `${DisplayMessages.common.GlobalSearch}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Browse Party', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickBrowseParty();
        await expect(page).toHaveURL(/party/);
        await expect(page.getByText(DisplayMessages.party.ListLabel)).toBeVisible();
    });

    test('user navigates to Browse Product', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickBrowseProduct();
        await expect(page).toHaveURL(/product/);
        await expect(page.getByText(DisplayMessages.product.ListLabel)).toBeVisible();
    });

    test('user navigates to Browse Quote', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickBrowseQuote();
        await expect(page).toHaveURL(/quote/);
        await expect(page.getByText(DisplayMessages.quote.ListLabel)).toBeVisible();
    });

    test('user navigates to Browse Po', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickBrowsePo();
        await expect(page).toHaveURL(/po/);
        await expect(page.getByText(DisplayMessages.po.ListLabel)).toBeVisible();
    });

    test('user navigates to Browse Ship', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickBrowseShip();
        await expect(page).toHaveURL(/ship/);
        await expect(page.getByText(DisplayMessages.ship.ListLabel)).toBeVisible();
    });

    test('user navigates to Browse Invoice', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickBrowseInvoice();
        await expect(page).toHaveURL(/inv/);
        await expect(page.getByText(DisplayMessages.invoice.ListLabel)).toBeVisible();
    });

    test('user navigates to Browse Payment', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickBrowsePayment();
        await expect(page).toHaveURL(/pay/);
        await expect(page.getByText(DisplayMessages.payment.ListLabel)).toBeVisible();
    });

    test('user navigates to Browse Bank', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickBrowseBank();
        await expect(page).toHaveURL(/bank/);
        await expect(page.getByText(DisplayMessages.bank.ListLabel)).toBeVisible();
    });

    test('user navigates to Create Party', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickCreateParty();
        await expect(page).toHaveURL(/party\/create/);
        const pageTitle = `${DisplayMessages.common.Edit} ${DisplayMessages.party.ModuleName}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Create Product', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickCreateProduct();
        await expect(page).toHaveURL(/product\/create/);
        const pageTitle = `${DisplayMessages.common.Edit} ${DisplayMessages.product.ModuleName}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Create Quote', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickCreateQuote();
        await expect(page).toHaveURL(/quote\/create/);
        const pageTitle = `${DisplayMessages.common.Edit} ${DisplayMessages.quote.ModuleName}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Create Po', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickCreatePo();
        await expect(page).toHaveURL(/po\/create/);
        const pageTitle = `${DisplayMessages.common.Edit} ${DisplayMessages.po.ModuleName}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Create Ship', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickCreateShip();
        await expect(page).toHaveURL(/ship\/create/);
        const pageTitle = `${DisplayMessages.common.Edit} ${DisplayMessages.ship.ModuleName}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Create Invoice', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickCreateInvoice();
        await expect(page).toHaveURL(/inv\/create/);
        const pageTitle = `${DisplayMessages.common.Edit} ${DisplayMessages.invoice.ModuleName}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Create Payment', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickCreatePayment();
        await expect(page).toHaveURL(/pay\/create/);
        const pageTitle = `${DisplayMessages.common.Edit} ${DisplayMessages.payment.ModuleName}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Create Bank', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickCreateBank();
        await expect(page).toHaveURL(/bank\/create/);
        const pageTitle = `${DisplayMessages.common.Edit} ${DisplayMessages.bank.ModuleName}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Import Ship', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickImportShip();
        await expect(page).toHaveURL(/ship\/import/);
        const pageTitle = `${DisplayMessages.ship.ImportLabel}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Import Bank', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickImportBank();
        await expect(page).toHaveURL(/bank\/import/);
        const pageTitle = `${DisplayMessages.bank.ImportLabel}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Deposit Payment', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickDepositPayment();
        await expect(page).toHaveURL(/pay\/deposit/);
        const pageTitle = `${DisplayMessages.payment.DepositLabel}`;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });

    test('user navigates to Annual Report', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickReportAnnual();
        await expect(page).toHaveURL(/report\/annual/);
        await expect(page.locator(".page-title")).toHaveText(DisplayMessages.report.AnnualReport);
    });

    test('user navigates to Open Report Tooling', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickOpenReportTooling();
        await expect(page).toHaveURL(/report\/open\/product/);
        await expect(page.locator(".page-title")).toHaveText(DisplayMessages.report.OpenEntityReport.product);
    });

    test('user navigates to Open Report Po', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickOpenReportPo();
        await expect(page).toHaveURL(/report\/open\/po/);
        await expect(page.locator(".page-title")).toHaveText(DisplayMessages.report.OpenEntityReport.po);
    });

    test('user navigates to Open Report Ship', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickOpenReportShip();
        await expect(page).toHaveURL(/report\/open\/ship/);
        await expect(page.locator(".page-title")).toHaveText(DisplayMessages.report.OpenEntityReport.ship);
    });

    test('user navigates to Open Report Invoice', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickOpenReportInvoice();
        await expect(page).toHaveURL(/report\/open\/invoice/);
        await expect(page.locator(".page-title")).toHaveText(DisplayMessages.report.OpenEntityReport.invoice);
    });

    test('user navigates to Leadtime Report', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponent(page);
        await menu.ClickReportLeadtime();
        await expect(page).toHaveURL(/report\/leadtime/);
        await expect(page.locator(".page-title")).toHaveText(DisplayMessages.report.LeadTimeReport);
    });

});

test.describe('Dashboard', () => {

    test('Global Search is available', async ({ page }) => {
        await page.goto(HOME_URL);
        const pageTitle = DisplayMessages.common.GlobalSearch;
        await expect(page.locator(".page-title")).toHaveText(pageTitle);
    });
});