import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, LocalTestDataFilePath, waitForNoOverlay } from "@ui-test/utils";
import { ViewProductPage, ViewQuotePage, ListQuotePage, EditQuotePage } from "@ui-test/pages";
import { ApiHelper } from "@ui-test/utils/api-helper";
import * as fs from 'fs';

// test.describe.configure({ mode: 'parallel' });
test.use({ storageState: AdminAuthDataFilePath });

test.describe('View Quote', () => {

    test('User queries quotes', async ({ page }) => {
        const listPage = new ListQuotePage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('KKI - Key Knife');
        await listPage.enterKeyword('10');
        await listPage.enterStartQuoteDate('01/01/2022');
        await listPage.clickSearchButton();
        const product = await listPage.getQuoteInfo(4);
        expect(product.Price!.trim()).toBe('$56.90');
    });

    test('User sees quotes on the last page in Browse Quote', async ({ page }) => {
        const listPage = new ListQuotePage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('KKI - Key Knife');
        await listPage.enterKeyword('Hand');
        await listPage.enterStartQuoteDate('01/01/2022');
        await listPage.clickSearchButton();
        await listPage.paginator.ClickLastPageButton();
        const product = await listPage.getQuoteInfo(0);
        expect(product.Qty!.trim()).toBe('30');
    });

    test('User can query quotes by entering url query', async ({ page }) => {
        const listPage = new ListQuotePage(page);
        await listPage.goto('?party=28&keyword=10&startQuoteDate=1%2F1%2F2022');
        const product = await listPage.getQuoteInfo(0);
        expect(product.PartNumber!.trim()).toBe('10501');
    });

    test('User navigats to a quote from Browse Quote', async ({ page }) => {
        const listPage = new ListQuotePage(page);
        const viewPage = new ViewQuotePage(page);
        await listPage.goto();
        await listPage.partySelect.selectParty('KKI - Key Knife');
        await listPage.enterKeyword('10');
        await listPage.enterStartQuoteDate('01/01/2022');
        await listPage.clickSearchButton();
        await listPage.clickQuoteRecord(1);
        await expect(page).toHaveURL(/quote\/view\/186/);
        const quote = await viewPage.getQuoteInfo();
        expect(quote.length).toBeGreaterThan(1);
        expect(quote[0].ExchgRate!.trim()).toBe('7.08');
    });

    test('User navigats to a product from Browse Quote', async ({ page }) => {
        const listPage = new ListQuotePage(page);
        const viewPage = new ViewProductPage(page);
        await listPage.goto('?party=28&keyword=10&startQuoteDate=1%2F1%2F2022');
        await listPage.clickProductRecord(1);
        await expect(page).toHaveURL(/product\/view\/780/);
        const product = await viewPage.getProductInfo();
        expect(product.length).toBeGreaterThan(1);
        expect(product[1].PartNumber!.trim()).toBe('10501');
    });

});

test.describe('Create and Update Quote', () => {

    test('User creates a quote', async ({ page }) => {
        const editPage = new EditQuotePage(page);
        await editPage.goto();

        await editPage.selectParty('Sunkist Growers Inc.');
        await editPage.enterQuoteDate('3/25/2020');
        await editPage.enterQuoteName('TEST SGI QUOTE 001');
        await editPage.enterExchangeRate('6.8');
        await editPage.enterHeaderMemo('UI TEST');
        await editPage.clickAddDetailButton();

        await editPage.queryPage.enterKeyword('04A');
        await editPage.queryPage.clickSearchButton();
        await editPage.queryPage.clickRecords([0]);
        await editPage.queryPage.clickSelectButton();
        await editPage.queryPage.waitForPageUnload();

        expect(await editPage.getDetailPartNumber(0)).toContain('04A-CF');
        expect(await editPage.getDetailProductNameEn(0)).toContain('04A-CF STRAINER WITH QUICK PULL OF TABS');

        await editPage.enterDetailWeight(0, '0.2');
        await editPage.enterDetailQty(0, '1000');
        await editPage.enterDetailBasicCost(0, '100');
        await editPage.enterDetailExtraCost(0, '10');
        await editPage.enterDetailFreightCost(0, '15');
        await editPage.enterDetailDutyCost(0, '800');
        await editPage.enterDetailProfitRate(0, '0.35');
        await editPage.enterDetailLeadtime(0, '120');
        await editPage.enterDetailMemo(0, 'UI DETAIL TEST');

        expect(await editPage.getDetailPrice(0)).toBe('839.89');

        await editPage.clickSaveButton();

        await expect(page).toHaveURL(/quote\/view\/\d+/);

        // rollback
        const newId = page.url().split('/').pop();
        const apiHelper = await ApiHelper.create();
        await apiHelper.delete(`/api/quote/${newId}`);
        await apiHelper.dispose();

    });

    test('User updated a quote', async ({ page }) => {
        const editPage = new EditQuotePage(page);
        await editPage.goto(196);

        await editPage.enterQuoteDate('3/25/2020');
        await editPage.enterQuoteName('TEST SGI QUOTE 002');
        await editPage.enterExchangeRate('7.0');
        await editPage.enterHeaderMemo('UPDATE TEST');

        await editPage.enterDetailWeight(0, '0.3');
        await editPage.enterDetailQty(0, '2000');
        await editPage.enterDetailFreightCost(0, '10');
        await editPage.enterDetailProfitRate(0, '0.35');
        await editPage.enterDetailLeadtime(0, '150');
        await editPage.enterDetailMemo(0, 'UI DETAIL UPDATE');
        await editPage.selectDetailStatus(0, '锁定');
        await editPage.enterDetailPrice(0, '840');

        await editPage.clickSaveButton();
        await waitForNoOverlay(page);

        // assert through API
        const apiHelper = await ApiHelper.create();
        const quote = await apiHelper.get(`/api/quote/196`);

        // rollback first so that even the assertion fails,
        // the test data will be reverted to the original values
        const jsonPayload = JSON.parse(fs.readFileSync(LocalTestDataFilePath + '/quote_rollback_edit.json', 'utf8'));
        await apiHelper.put('/api/quote/196', jsonPayload);

        expect(quote.QuoteDate).toBe('2020-03-25');
        expect(quote.QuoteName).toBe('TEST SGI QUOTE 002');
        expect(quote.ExchgRate).toBe(7);
        expect(quote.Memo).toBe('UPDATE TEST');
        expect(quote.Quotes[0].Weight).toBe('0.3');
        expect(quote.Quotes[0].Qty).toBe(2000);
        expect(quote.Quotes[0].FreightCost).toBe(10);
        expect(quote.Quotes[0].Price).toBe(840);
        expect(quote.Quotes[0].Leadtime).toBe('150');
        expect(quote.Quotes[0].Memo).toBe('UI DETAIL UPDATE');
        expect(quote.Quotes[0].Status).toBe('LOCKED');

        await apiHelper.dispose();

    });

});