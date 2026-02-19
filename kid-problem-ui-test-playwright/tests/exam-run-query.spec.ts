import { test, expect } from '@playwright/test';
import { adminAuthDataFilePath } from '../utils/constants'
import { ExamRunQueryPage } from '../pages/ExamRunQueryPage';

test.describe('Exam Run Query', () => {

    test.use({ storageState: adminAuthDataFilePath });

    test('User queries in Exam Run Query', async ({ page }) => {
        const examRunQueryPage = new ExamRunQueryPage(page);
        await examRunQueryPage.goTo();
        const startTime = '8/1/2023';
        const endTime = '8/15/2023';
        await examRunQueryPage.query(startTime, endTime);
        await expect(examRunQueryPage.getExamTitleFromQueryResult(0)).toHaveText('AMC10 Review 147 529');
    });

    test('User navigates to detail from Exam Runs', async ({ page }) => {
        const examRunQueryPage = new ExamRunQueryPage(page);
        await examRunQueryPage.goTo();
        const startTime = '8/1/2023';
        const endTime = '8/15/2023';
        await examRunQueryPage.query(startTime, endTime);
        await expect(examRunQueryPage.getExamTitleFromQueryResult(9)).toHaveText('AMC10 Review 140 520');
        await examRunQueryPage.clickExamTitleInQueryResults(9);
        await expect(page).toHaveURL(/examrun\/view\/5423ac10-eec6-4555-8faa-3096d878018a/);
    });

    test('User queries and go to next page in Exam Run Query', async ({ page }) => {
        const examRunQueryPage = new ExamRunQueryPage(page);
        await examRunQueryPage.goTo();
        const startTime = '8/1/2023';
        const endTime = '8/15/2023';
        await examRunQueryPage.query(startTime, endTime);
        await examRunQueryPage.clickNextPage();
        await expect(examRunQueryPage.getExamTitleFromQueryResult(0)).toHaveText('AMC10 Review 139 519');
    });

});