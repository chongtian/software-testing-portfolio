import { expect, type Locator, type Page } from '@playwright/test';
import { BASE_URL } from '../utils/constants';
import { waitForNoMatProgressBar } from '../utils/waitForNoMatProgressBar';
import { selectMatOption } from '../utils/selectMatOption';

export class ProblemSummaryQueryPage {
    readonly page: Page;

    readonly MAX_LOAD_ATTEMPTS = 20;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto(`${BASE_URL}/summary/problem`);
        await waitForNoMatProgressBar(this.page);
    }

    async query(examCategoryIndex: number, answerByIndex: number | null, trueCorrectRate: string | null, keyword: string | null, keepLoading = false) {

        const examCategorySelect = this.page.locator('mat-select[name="category"]');
        await expect(examCategorySelect).toBeEnabled();
        await selectMatOption(this.page, examCategorySelect, examCategoryIndex);

        if (answerByIndex !== null) {
            const answerBySelect = this.page.locator('mat-select[name="answerBy"]');
            await expect(answerBySelect).toHaveCount(1);
            await expect(answerBySelect).toBeEnabled();
            await selectMatOption(this.page, answerBySelect, answerByIndex);
        }

        if (trueCorrectRate !== null) {
            const trueCorrectRateRng = this.page.locator('input[name="trueCorrectRateRng"]');
            await expect(trueCorrectRateRng).toBeEditable();
            await trueCorrectRateRng.fill(trueCorrectRate);
        }

        if (keyword !== null) {
            const keywordField = this.page.locator('input[name="keyword"]');
            await expect(keywordField).toBeEditable();
            await keywordField.fill(keyword);
        }

        const searchButton = this.page.locator('form button');
        await expect(searchButton).toBeEnabled();
        await searchButton.click();
        await waitForNoMatProgressBar(this.page);

        if (keepLoading) {
            const loadMoreButton = this.page.locator("button[mattooltip='Load More']");
            var attempt = 0;
            while (attempt < this.MAX_LOAD_ATTEMPTS) {
                if (await loadMoreButton.isVisible()) {
                    await loadMoreButton.click();
                    await waitForNoMatProgressBar(this.page);
                    attempt++;
                } else {
                    break;
                }
            }
        }
    }

    getPaginatorRange(): Locator {
        return this.page.locator(".mat-mdc-paginator-range-label");
    }

}