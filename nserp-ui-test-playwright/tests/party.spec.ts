import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath } from "@ui-test/utils";
import { ViewPartyPage, ListPartyPage } from "@ui-test/pages";

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Party', () => {

    test('User sees parties in Browse Parties', async ({ page }) => {
        test.slow();
        const partyPage = new ListPartyPage(page);
        await partyPage.goto();
        const party = await partyPage.getPartyInfo(1);
        expect(party.ShortAlpha!.trim()).toBe('CTI');
    });

    test('User sees parties on the last page in Browse Parties', async ({ page }) => {
        test.slow();
        const partyPage = new ListPartyPage(page);
        await partyPage.goto();
        await partyPage.paginator.ClickLastPageButton();
        const party = await partyPage.getPartyInfo(0);
        expect(party.ShortAlpha!.trim()).toBe('SGI');
    });

    test('User filters in Browse Parties', async ({ page }) => {
        test.slow();
        const partyPage = new ListPartyPage(page);
        await partyPage.goto();
        await partyPage.filter('CTI');
        const party = await partyPage.getPartyInfo(0);
        expect(party.ShortAlpha!.trim()).toBe('CTI');
        expect(await partyPage.paginator.GetStatusText()).toContain('1 – 1 of 1');
    });

    test('User navigats to a party from Browse Parties', async ({ page }) => {
        test.slow();
        const partyPage = new ListPartyPage(page);
        const partyDetailPage = new ViewPartyPage(page);
        await partyPage.goto();
        await partyPage.clickRecord(1);
        await expect(page).toHaveURL(/party\/view\/3/);
        const party = await partyDetailPage.getPartyInfo();
        expect(party.ShortName!.trim()).toBe('Champion');
    });

});