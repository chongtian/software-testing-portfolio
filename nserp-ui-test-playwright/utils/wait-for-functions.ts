// placeholder. To Do: update locator
import { type Page } from '@playwright/test';

// not implemented yet
export const waitForNoMatProgressBar = async (page: Page) => {
  const progressBar = page.getByTestId('loading').first();
  await progressBar.waitFor({state:'hidden'});
};

export const waitForNoOverlay = async (page: Page) => {
  const overlay = page.locator('.global-overlay').first();
  await overlay.waitFor({state:'hidden'});
}