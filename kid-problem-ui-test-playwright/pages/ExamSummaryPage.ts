import { type Locator, type Page } from '@playwright/test';
import { BASE_URL } from '../utils/constants';
import { waitForNoMatProgressBar } from '../utils/waitForNoMatProgressBar';

export class ExamSummaryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto(`${BASE_URL}/summary/exam`);
        await waitForNoMatProgressBar(this.page);
    }

    async getTableHeaders(): Promise<string> {
        const thead = this.page.locator(`thead`);
        const heads = await thead.textContent();
        return heads;
        // Problem Category Answered By  Count of All  Correct Guess Guess Correct Avg. Duration (s)
    }

    getTableRows(): Locator {
        const trs = this.page.locator(`tbody tr`);
        return trs;
    }


}