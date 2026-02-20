import { expect, Locator, type Page } from '@playwright/test';
import { fail } from 'assert';

export async function selectMatOption(page: Page, selectEl: Locator, itemIndex: number, maxAttempts = 10, timeout = 500) {

  const selectOption = page.locator(`.cdk-overlay-pane mat-option:nth-child(${itemIndex + 1})`);
  const overlayEl = page.locator('.cdk-overlay-pane');

  // the mat options are loaded by an API call. Keep clicking the mat select until the options are loaded
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      await selectEl.click({ timeout: timeout });
      await expect(await overlayEl.count()).toBeGreaterThanOrEqual(1);
    }
    catch {
      attempts++;
    }
  }

  if (attempts >= maxAttempts && await overlayEl.count() == 0) {
    fail('Failed to load mat select options.');
  }

  await expect(selectOption).toHaveCount(1, { timeout: timeout });
  await selectOption.click({ timeout: timeout });
  await expect(overlayEl).toHaveCount(0, { timeout: timeout });

}