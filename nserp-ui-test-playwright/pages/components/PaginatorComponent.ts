import { expect, Locator, Page } from "@playwright/test";

export class PaginatorComponent {
    readonly page: Page;
    readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = page.locator('mat-paginator');
    }

    async ClickFirstPageButton() {
        const btn = this.root.getByRole('button', { name: 'First page' });
        await expect(btn).toBeVisible();
        if (await btn.isEnabled()) {
            await btn.click();
        }
    }

    async ClickPreviousPageButton() {
        const btn = this.root.getByRole('button', { name: 'Previous page' });
        await expect(btn).toBeVisible();
        if (await btn.isEnabled()) {
            await btn.click();
        }
    }

    async ClickNextPageButton() {
        const btn = this.root.getByRole('button', { name: 'Next page' });
        await expect(btn).toBeVisible();
        if (await btn.isEnabled()) {
            await btn.click();
        }
    }

    async ClickLastPageButton() {
        const btn = this.root.getByRole('button', { name: 'Last page' });
        await expect(btn).toBeVisible();
        if (await btn.isEnabled()) {
            await btn.click();
        }
    }

    async GetStatusText(): Promise<string> {
        const status = this.root.getByRole('status');
        return await status.textContent();
    }
}