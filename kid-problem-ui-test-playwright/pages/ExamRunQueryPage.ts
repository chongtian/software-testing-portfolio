import { expect, type Locator, type Page } from '@playwright/test';
import { BASE_URL } from '../utils/constants';
import { waitForNoMatProgressBar } from '../utils/waitForNoMatProgressBar';

export class ExamRunQueryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto(`${BASE_URL}/examruns/all`);
        await waitForNoMatProgressBar(this.page);
    }

    async query(startTime: string | null, endTime: string | null) {
        if (startTime !== null) {
            await this.page.getByPlaceholder('Start Date').fill(startTime);
        }

        if (endTime !== null) {
            await this.page.getByPlaceholder('End Date').fill(endTime);
        }

        await this.page.locator('app-exam-run-list-view form button:nth-child(2)').click();
    }

    getExamTitleFromQueryResult(index: number): Locator {
        return this.page.locator(`app-exam-run-list-view tbody tr:nth-child(${index + 1}) > td:nth-child(2)`);
    }

    async clickExamTitleInQueryResults(index: number) {
        const link = this.page.locator(`app-exam-run-list-view tbody tr:nth-child(${index + 1}) a`);
        await expect(link).toBeVisible();
        await link.click();
    }

}