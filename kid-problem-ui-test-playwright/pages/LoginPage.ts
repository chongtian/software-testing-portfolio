import { expect, type Locator, type Page } from '@playwright/test';
import { adminAuthDataFilePath, LOGIN_URL } from '../utils/constants'

export class LoginPage {

    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByLabel('User Name');
        this.passwordField = page.getByLabel('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async goto() {
        await this.page.goto(LOGIN_URL);
    }

    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.signInButton.click();
        await expect(this.page).toHaveURL(/home/);
        await expect(this.page.getByText('List Exam Summaries')).toBeVisible();

        // End of authentication steps.
        const authFile = adminAuthDataFilePath
        await this.page.context().storageState({ path: authFile });
    }
}