import { Page } from "@playwright/test";

export class MessagePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getMessages(): Promise<string[]> {
        return this.page.locator('app-messages li').allTextContents();
    }
}