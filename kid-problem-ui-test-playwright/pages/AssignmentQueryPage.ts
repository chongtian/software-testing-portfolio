import { expect, Locator, Page } from "@playwright/test";
import { BASE_URL } from "../utils/constants";
import { waitForNoMatProgressBar } from "../utils/waitForNoMatProgressBar";

export class AssignmentQueryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto(`${BASE_URL}/assignments/all`);
        await waitForNoMatProgressBar(this.page);
    }

    async query(startTime: string | null, endTime: string | null) {
        if (startTime !== null) {
            await this.page.getByPlaceholder('Start Date').fill(startTime);
        }

        if (endTime !== null) {
            await this.page.getByPlaceholder('End Date').fill(endTime);
        }

        await this.page.locator('app-assignment-list-view form button:nth-child(2)').click();
    }

    getAssignmentTitleFromQueryResult(index: number): Locator {
        return this.page.locator(`app-assignment-list-view tbody tr:nth-child(${index + 1}) > td:nth-child(2)`);
    }

    async clickAssignmentTitleInQueryResults(index: number) {
        const link = this.page.locator(`app-assignment-list-view tbody tr:nth-child(${index + 1}) td:nth-child(2) a`);
        await expect(link).toBeVisible();
        await link.click();
        await waitForNoMatProgressBar(this.page);
    }

    async clickDoAssignmentInQueryResults(index: number) {
        const btn = this.page.locator(`app-assignment-list-view tbody tr:nth-child(${index + 1}) button`);
        await expect(btn).toBeVisible();
        await btn.click();
        await waitForNoMatProgressBar(this.page);
    }

    getCountOfQueryResultsField(): Locator {
        const countField = this.page.locator('app-assignment-list-view .w3-cell-row div.w3-cell:not(.w3-container)');
        return countField;
    }
}