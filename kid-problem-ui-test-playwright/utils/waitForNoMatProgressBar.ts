import { expect, type Locator, type Page } from '@playwright/test';

export async function waitForNoMatProgressBar(page: Page, timeout = 15_000) {
  const animated = page.locator('mat-progress-bar');
  await Promise.resolve(expect(animated).toBeHidden({ timeout }));
}