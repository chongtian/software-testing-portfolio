import { test, expect } from '@playwright/test';
import {HOME_URL, adminAuthDataFilePath} from '../utils/constants'

test.use({ storageState: adminAuthDataFilePath });

test('admin user can see dashboard', async ({ page }) => {
    await page.goto(HOME_URL);
    await expect(page.getByText('List Exam Summaries')).toBeVisible();
}); 

test('admin user can see Create Problem menu item', async ({ page }) => {
    await page.goto(HOME_URL);
    await page.getByRole('button', { name: 'Problems' }).click();

    await expect(page.getByRole('menuitem', { name: 'Create Problem' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Create Problem' }).click();
    await expect(page).toHaveURL(/problem\/create/);
    await expect(page.getByText('Problem Editor')).toBeVisible();
}); 