import { Page } from "@playwright/test";
import { BASE_URL } from "../utils/constants";
import { waitForNoMatProgressBar } from "../utils/waitForNoMatProgressBar";
import { Assignment } from "../models/Assignment";

export class AssignmentViewPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo(uid: string) {
        await this.page.goto(`${BASE_URL}/assignment/view/${uid}`);
        await waitForNoMatProgressBar(this.page);
    }

    async getAssignment(): Promise<Assignment> {
        const ret = new Assignment();
        ret.ExamCategory = await this.page.locator("mat-list:nth-child(1) mat-list-item:nth-child(1) span:nth-child(2)").textContent();
        ret.ExamTitle = await this.page.locator("mat-list:nth-child(1) mat-list-item:nth-child(2) span:nth-child(2)").textContent();
        ret.CreateTime = await this.page.locator("mat-list:nth-child(1) mat-list-item:nth-child(3) span:nth-child(2)").textContent();
        ret.Memo = await this.page.locator("mat-list:nth-child(1) mat-list-item:nth-child(4) span:nth-child(2)").textContent();
        ret.Completed = await this.page.locator("mat-list:nth-child(1) mat-list-item:nth-child(5) span:nth-child(2)").textContent();
        ret.ExamRuns = await this.page.locator("mat-list:nth-child(4) mat-list-item").allTextContents();
        return ret;
    }


}



