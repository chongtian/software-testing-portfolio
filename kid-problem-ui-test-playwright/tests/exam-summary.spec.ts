import { test, expect } from '@playwright/test';
import { adminAuthDataFilePath } from '../utils/constants'
import { ExamSummaryPage } from '../pages/ExamSummaryPage';

test.describe('Exam Summary', () => {

    test.use({ storageState: adminAuthDataFilePath });

    test('Exam Summary table shows correct heads', async ({ page }) => {
        const examSummaryPage = new ExamSummaryPage(page);
        await examSummaryPage.goTo();
        const expetedHeads = 'Problem Category Answered By  Count of All  Correct Guess Guess Correct Avg. Duration (s)';
        expect(await examSummaryPage.getTableHeaders()).toEqual(expetedHeads);
    });

    test('Exam Summary table return correct records', async ({ page }) => {
        const examSummaryPage = new ExamSummaryPage(page);
        await examSummaryPage.goTo();
        await expect(examSummaryPage.getTableRows()).toHaveCount(3);
    });

});