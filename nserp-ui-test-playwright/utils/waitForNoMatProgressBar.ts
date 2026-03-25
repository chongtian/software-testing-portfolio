// placeholder. To Do: update locator
import { type Page } from '@playwright/test';

export async function waitForNoMatProgressBar(page: Page, timeout = 15_000) {
  const progressBar = page.getByTestId('data-testid').first();
  await progressBar.waitFor({state:'hidden'});
}