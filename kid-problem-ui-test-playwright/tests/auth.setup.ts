import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminAuthDataFilePath, ChildAuthDataFilePath, TEST_CHILD_PASSWORD, TEST_CHILD_USERNAME, TEST_USER_PASSWORD, TEST_USER_USERNAME } from '../utils/constants';

setup('authenticate admin user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_USER_USERNAME, TEST_USER_PASSWORD, AdminAuthDataFilePath);
});

setup('authenticate child user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(TEST_CHILD_USERNAME, TEST_CHILD_PASSWORD, ChildAuthDataFilePath);
});

