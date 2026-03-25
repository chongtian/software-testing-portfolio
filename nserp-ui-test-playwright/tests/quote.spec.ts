import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath } from "@ui-test/utils";
import { ViewProductPage, ViewQuotePage, ListQuotePage } from "@ui-test/pages";

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
        expect(product.Price.trim()).toBe('$56.90');
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
        expect(product.Qty.trim()).toBe('30');
    });

    test('User can query quotes by entering url query', async ({ page }) => {
        const listPage = new ListQuotePage(page);
        await listPage.goto('?party=28&keyword=10&startQuoteDate=1%2F1%2F2022');
        const product = await listPage.getQuoteInfo(0);
        expect(product.PartNumber.trim()).toBe('10501');
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
        expect(quote[0].ExchgRate.trim()).toBe('7.08');
    });

    test('User navigats to a product from Browse Quote', async ({ page }) => {
        const listPage = new ListQuotePage(page);
        const viewPage = new ViewProductPage(page);
        await listPage.goto('?party=28&keyword=10&startQuoteDate=1%2F1%2F2022');
        await listPage.clickProductRecord(1);
        await expect(page).toHaveURL(/product\/view\/780/);
        const product = await viewPage.getProductInfo();
        expect(product.length).toBeGreaterThan(1);
        expect(product[1].PartNumber.trim()).toBe('10501');
    });


});