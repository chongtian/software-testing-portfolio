import { expect, Locator, Page } from "@playwright/test";
import { BASE_URL } from "../utils/constants";
import { waitForNoMatProgressBar } from "../utils/waitForNoMatProgressBar";

export class ExamRunnerPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // this is a shortcut to Exam Runner page for test only. 
    async goTo(uid: string) {
        await this.page.goto(`${BASE_URL}/examrun/run/${uid}`);
        await this.waitForLoading();
        // await waitForNoMatProgressBar(this.page);

        // // this page has an embedded component which has its own progress bar
        // const animated = this.page.locator('app-problem-detail-view mat-progress-bar');
        // await expect(animated).toBeHidden();
    }

    async waitForLoading() {
        await waitForNoMatProgressBar(this.page);

        // this page has an embedded component which has its own progress bar
        const animated = this.page.locator('app-problem-detail-view mat-progress-bar');
        await expect(animated).toBeHidden();
    }

    getExamRunTitle(): Locator {
        return this.page.locator('app-exam-runner > h3');
    }

    getCurrentProblemTitle(): Locator {
        return this.page.locator('mat-card-subtitle:nth-child(1)');
    }

    // the logic of locating buttons is too ugly. I need to add better UI identify into my client solution

    async clickAnswerButton(index: number) {
        const btn = this.page.locator(`mat-card-actions div.w3-container:nth-child(${index + 1}) button`);
        await btn.click();
    }

    getAnswerButton(index: number): Locator {
        const btn = this.page.locator(`mat-card-actions div.w3-container:nth-child(${index + 1}) button`);
        return btn;
    }

    async clickDeleteMyAnswerButton(confirm = true) {
        if (confirm) {
            this.page.once('dialog', dialog => dialog.accept());
        }

        // wait until the first button is visible
        await expect(this.page.locator(`mat-card-actions div.w3-container:nth-child(1) button`)).toBeVisible();

        const countOfButtons = (await this.page.locator('mat-card-actions button').all()).length;
        const btn = this.page.locator(`mat-card-actions div.w3-container:nth-child(${countOfButtons - 3}) button`);
        await btn.click();
    }

    async clickGuessedButton() {
        // wait until the first button is visible
        await expect(this.page.locator(`mat-card-actions div.w3-container:nth-child(1) button`)).toBeVisible();

        const countOfButtons = (await this.page.locator('mat-card-actions button').all()).length;
        const btn = this.page.locator(`mat-card-actions div.w3-container:nth-child(${countOfButtons - 2}) button`);
        await btn.click();
    }

    async clickSubmitAndNextButton() {
        // wait until the first button is visible
        await expect(this.page.locator(`mat-card-actions div.w3-container:nth-child(1) button`)).toBeVisible();

        const countOfButtons = (await this.page.locator('mat-card-actions button').all()).length;
        const btn = this.page.locator(`mat-card-actions div.w3-container:nth-child(${countOfButtons - 1}) button`);
        await btn.click();
        await this.waitForLoading();
    }

    async clickCompleteButton(confirm = true) {
        if (confirm) {
            this.page.once('dialog', dialog => dialog.accept());
        }

        // wait until the first button is visible
        await expect(this.page.locator(`mat-card-actions div.w3-container:nth-child(1) button`)).toBeVisible();

        const countOfButtons = (await this.page.locator('mat-card-actions button').all()).length;
        const btn = this.page.locator(`mat-card-actions div.w3-container:nth-child(${countOfButtons}) button`);
        await btn.click();
    }

    async clickProblemNavigateButton(index: number) {
        const btn = this.page.locator(`mat-card-footer button:nth-child(${index + 1})`);
        await btn.click();
        await this.waitForLoading();
    }

    getProblemNavigateButton(index: number): Locator {
        const btn = this.page.locator(`mat-card-footer button:nth-child(${index + 1})`);
        return btn;
    }

    async clickSummaryPanelHeader() {
        const summaryHeader = this.page.locator("mat-expansion-panel-header");
        await summaryHeader.click();
    }

    getSummaryTable(): Locator {
        return this.page.locator('mat-expansion-panel table');
    }

    getConfirmCompleteExamButton(): Locator {
        return this.page.locator(".mat-expansion-panel-body > button").last();
    }

    getCancelCompleteExamButton(): Locator {
        return this.page.locator(".mat-expansion-panel-body > button").first();
    }
}