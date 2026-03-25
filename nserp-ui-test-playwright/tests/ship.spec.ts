import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath } from "@ui-test/utils";
import { ViewShipPage, ListShipPage } from "@ui-test/pages";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Ship', () => {

    test('User queries ship by year', async ({ page }) => {
        const listPage = new ListShipPage(page);
        await listPage.goto();
        await listPage.enterShipYear('2022');
        await listPage.clickSearchButton();
        const ship = await listPage.getShipInfo(3);
        expect(ship.ShipName.trim()).toBe('22H14 海运发货清单-Lindsay');
    });

    test('User queries ship by party and keyword', async ({ page }) => {
        const listPage = new ListShipPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('LFP - Lindsay');
        await listPage.enterKeyword('4.5');
        await listPage.clickSearchButton();
        const ship = await listPage.getShipInfo(1);
        expect(ship.ProductNameEn.trim()).toBe('HOLDER 4.5 Machine LH');
    });

    test('User can query ship by entering url query', async ({ page }) => {
        const listPage = new ListShipPage(page);
        await listPage.goto('?party=9&keyword=LTK&year=');
        const ship = await listPage.getShipInfo(0);
        expect(ship.Amount.trim()).toBe('$4,500.00');
    });

    test('User navigats to a ship from Browse Ship', async ({ page }) => {
        const listPage = new ListShipPage(page);
        const viewPage = new ViewShipPage(page);
        await listPage.goto('?party=&keyword=C&year=2022');
        await listPage.clickShipRecord(1);
        await expect(page).toHaveURL(/ship\/view\/588/);
        const ship = await viewPage.getShipInfo();
        expect(ship.length).toBeGreaterThan(1);
        expect(ship[0].BrokerInvoice.trim()).toBe('22H17');
    });

});