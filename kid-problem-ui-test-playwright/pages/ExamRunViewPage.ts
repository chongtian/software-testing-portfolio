import { expect, Locator, Page } from "@playwright/test";
import { BASE_URL } from "../utils/constants";
import { waitForNoMatProgressBar } from "../utils/waitForNoMatProgressBar";
import { ExamRun, ExamRunDetail } from "../models/ExamRun";

export class ExamRunViewPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo(uid: string) {
        await this.page.goto(`${BASE_URL}/examrun/view/${uid}`);
        await waitForNoMatProgressBar(this.page);
    }

    async getExamRun(): Promise<ExamRun> {
        await waitForNoMatProgressBar(this.page);

        const ret = new ExamRun();
        ret.ExamCategory = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(2)"));
        ret.ExamTitle = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(3)"));
        ret.AnsweredBy = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(4)"));
        ret.StartTime = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(5)"));
        ret.CompleteTime = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(6)"));
        ret.TotalDuration = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(7)"));
        ret.TotalCount = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(8)"));
        ret.CorrectCount = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(9)"));
        ret.GuessCount = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(10)"));
        ret.GuessCorrectCount = await this.getValueFromField(this.page.locator("div.w3-cell:nth-child(11)"));

        const examDetailsEl = this.page.locator("tbody tr");
        const cnt = await examDetailsEl.count();
        ret.ExamDetails = new Array(cnt);
        for (let i = 0; i < cnt; i++) {
            ret.ExamDetails[i] = new ExamRunDetail();
            ret.ExamDetails[i].ProblemTitle = (await this.page.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(1)`).textContent()).trim();
            ret.ExamDetails[i].UserAnswer = (await this.page.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(2)`).textContent()).trim();
            ret.ExamDetails[i].Correct = (await this.page.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(3)`).textContent()).trim();
            ret.ExamDetails[i].Guess = (await this.page.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(4)`).textContent()).trim();
            ret.ExamDetails[i].Duration = (await this.page.locator(`tbody tr:nth-child(${i + 1}) td:nth-child(5)`).textContent()).trim();
        }

        return ret;
    }

    private async getValueFromField(el: Locator): Promise<string> {
        await expect(el).toBeVisible();
        const hasValue = await el.locator('span:nth-child(2)').isVisible();

        if (hasValue) {
            return await el.locator('span:nth-child(2)').textContent();
        }
        return null;
    }

}