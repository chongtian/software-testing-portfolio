import { test, expect } from '@playwright/test';
import { adminAuthDataFilePath } from '../utils/constants'
import { ExamRunQueryPage } from '../pages/ExamRunQueryPage';

test.describe('Exam Run Query', () => {

    test.use({ storageState: adminAuthDataFilePath });

    test('User queries in Exam Run Query', async ({ page }) => {
        const examRunQueryPage = new ExamRunQueryPage(page);
        await examRunQueryPage.goTo();
        const startTime = '8/1/2025';
        const endTime = '9/1/2025';
        await examRunQueryPage.query(startTime, endTime);
        await expect(examRunQueryPage.getExamTitleFromQueryResult(0)).toHaveText('AMC10 2019 Wrong Practice 01');
    });

    test('User navigates to detail from Exam Runs', async ({ page }) => {
        const examRunQueryPage = new ExamRunQueryPage(page);
        await examRunQueryPage.goTo();
        const startTime = '8/1/2025';
        const endTime = '9/1/2025';
        await examRunQueryPage.query(startTime, endTime);
        await expect(examRunQueryPage.getExamTitleFromQueryResult(9)).toHaveText('AMC10 Practice wrong problem 01');
        await examRunQueryPage.clickExamTitleInQueryResults(9);
        await expect(page).toHaveURL(/examrun\/view\/47446d46-c603-4540-bbdb-f0290d768522/);
    });

});