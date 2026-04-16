import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, LocalTestDataFilePath, waitForNoOverlay } from "@ui-test/utils";
import { ApiHelper } from "@ui-test/utils/api-helper";
import { ViewShipPage, ListShipPage, EditShipPage, ImportShipPage } from "@ui-test/pages";
import * as fs from "fs";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Ship', () => {

    test('User queries ship by year', async ({ page }) => {
        const listPage = new ListShipPage(page);
        await listPage.goto();
        await listPage.enterShipYear('2022');
        await listPage.clickSearchButton();
        const ship = await listPage.getShipInfo(3);
        expect(ship.ShipName!.trim()).toBe('22H14 海运发货清单-Lindsay');
    });

    test('User queries ship by party and keyword', async ({ page }) => {
        const listPage = new ListShipPage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('LFP - Lindsay');
        await listPage.enterKeyword('4.5');
        await listPage.clickSearchButton();
        const ship = await listPage.getShipInfo(1);
        expect(ship.ProductNameEn!.trim()).toBe('HOLDER 4.5 Machine LH');
    });

    test('User can query ship by entering url query', async ({ page }) => {
        const listPage = new ListShipPage(page);
        await listPage.goto('?party=9&keyword=LTK&year=');
        const ship = await listPage.getShipInfo(0);
        expect(ship.Amount!.trim()).toBe('$4,500.00');
    });

    test('User navigats to a ship from Browse Ship', async ({ page }) => {
        const listPage = new ListShipPage(page);
        const viewPage = new ViewShipPage(page);
        await listPage.goto('?party=&keyword=C&year=2022');
        await listPage.clickShipRecord(1);
        await expect(page).toHaveURL(/ship\/view\/588/);
        const ship = await viewPage.getShipInfo();
        expect(ship.length).toBeGreaterThan(1);
        expect(ship[0].BrokerInvoice!.trim()).toBe('22H17');
    });

});

test.describe('Create and Update Ship', () => {

    test('User creates a ship', async ({ page }) => {

        const editPage = new EditShipPage(page);
        await editPage.goto();

        await editPage.enterShipName('TEST SHIP 001');
        await editPage.enterShipDate('10/15/2020');
        await editPage.enterDepartDate('10/25/2020');
        await editPage.selectShipVia('空运');
        await editPage.enterBrokerInvoice('20A01');
        await editPage.enterHeaderMemo('UI TEST');

        await editPage.clickAddDetailButton();
        await editPage.queryPage.selectParty('Sunkist');
        await editPage.queryPage.enterKeyword('PL FOR SHP 001');
        await editPage.queryPage.clickSearchButton();
        await editPage.queryPage.clickRecords([0]);
        await editPage.queryPage.clickSelectButton();
        await editPage.queryPage.waitForPageUnload();

        expect(await editPage.getDetailParty(0)).toContain('Sunkist');
        expect(await editPage.getDetailPoNumber(0)).toContain('PL FOR SHP 001');
        expect(await editPage.getDetailProductNameEn(0)).toContain('STRAINER');
        expect(await editPage.getDetailProductNameCn(0)).toContain('网罩');

        await editPage.enterDetailQty(0, '1000');
        await editPage.enterDetailMemo(0, 'UI DETAIL TEST');
        expect(await editPage.getDetailAmount(0)).toContain('35,000');
        expect(await editPage.getShipAmount()).toContain('35000');

        await editPage.clickSaveButton();

        await expect(page).toHaveURL(/ship\/edit\/\d+/);

        // rollback
        const apiHelper = await ApiHelper.create();
        const newId = page.url().split('/').pop();
        await apiHelper.delete(`/api/ship/${newId}`);
        await apiHelper.dispose();

    });

    test('User updated a ship', async ({ page }) => {
        const editPage = new EditShipPage(page);
        await editPage.goto(611);

        await editPage.enterShipName('TEST SHIP 002');
        await editPage.enterShipDate('2/1/2020');
        await editPage.enterDepartDate('2/15/2020');
        await editPage.enterHeaderMemo('UPDATE TEST');

        await editPage.enterDetailQty(0, '300');
        await editPage.enterDetailMemo(0, 'UPDATE DETAIL TEST');
        expect(await editPage.getDetailAmount(0)).toContain('10,500');
        expect(await editPage.getShipAmount()).toContain('10500');

        await editPage.clickSaveButton();
        await waitForNoOverlay(page);

        // assert through API
        const apiHelper = await ApiHelper.create();
        const ship = await apiHelper.get(`/api/ship/611`);

        // rollback first so that even the assertion fails,
        // the test data will be reverted to the original values
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/ship_rollback_edit.json', 'utf8'));
        await apiHelper.put('/api/ship/611', jsonPayload);

        expect(ship.ShipDate).toBe('2020-02-01');
        expect(ship.DepartDate).toBe('2020-02-15');
        expect(ship.ShipName).toBe('TEST SHIP 002');
        expect(ship.Status).toBe('OPEN');
        expect(ship.ShipAmount).toBe(10500);
        expect(ship.Memo).toBe('UPDATE TEST');
        expect(ship.Ships[0].Price).toBe(35);
        expect(ship.Ships[0].Qty).toBe(300);
        expect(ship.Ships[0].Amount).toBe(10500);
        expect(ship.Ships[0].Memo).toBe('UPDATE DETAIL TEST');
        expect(ship.Ships[0].Status).toBe('OPEN');

        await apiHelper.dispose();

    });

    test('User imports a ship', async ({ page }) => {
        const importPage = new ImportShipPage(page);
        await importPage.goto();

        await importPage.selectFile(LocalTestDataFilePath + '/ship_import_template.xlsx');
        await importPage.clickImportButton();
        await waitForNoOverlay(page);

        await importPage.clickValidateAllButton();
        await waitForNoOverlay(page);

        const shipInfoList = await importPage.getImportedShipInfo();
        expect(shipInfoList.length).toBe(2);
        expect(shipInfoList[0].ShipName!.trim()).toBe('ship_import_template');
        expect(shipInfoList[0].ShipVia!.trim()).toBe('海运');
        expect(shipInfoList[0].BrokerInvoice!.trim()).toBe('24A12');
        expect(shipInfoList[0].ShipAmount!.trim()).toBe('10500');


        expect(shipInfoList[1].PartyName!.trim()).toBe('Sunkist');
        expect(shipInfoList[1].PoNumber!.trim()).toBe('PL FOR SHP 001');
        expect(shipInfoList[1].ProductNameEn!.trim()).toBe('STRAINER');
        expect(shipInfoList[1].ProductNameCn!.trim()).toBe('网罩');
        expect(shipInfoList[1].Price!.trim()).toBe('35');
        expect(shipInfoList[1].Qty!.trim()).toBe('300');
        expect(shipInfoList[1].Amount!.trim()).toBe('$10,500.00');

        // this test does not save and not commit to database, so no need to do rollback

    });

});
