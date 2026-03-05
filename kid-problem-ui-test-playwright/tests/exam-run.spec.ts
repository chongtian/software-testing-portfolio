import { test, expect } from '@playwright/test';
import { AdminAuthDataFilePath } from '../utils/constants'
import { ExamRunQueryPage } from '../pages/ExamRunQueryPage';
import { ExamRunViewPage } from '../pages/ExamRunViewPage';

test.describe('Exam Run Query', () => {

    test.use({ storageState: AdminAuthDataFilePath });

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

test.describe('Exam Run View', () => {
    test.use({ storageState: AdminAuthDataFilePath });

    test('User open Exam Run View', async ({ page }) => {
        const uid = "688fb869-5d8e-49d5-b092-13caf69c8fc7";
        const examRunViewPage = new ExamRunViewPage(page);
        await examRunViewPage.goTo(uid);

        const examRun = await examRunViewPage.getExamRun();
        expect(examRun.ExamCategory).toBe('AMC10');
        expect(examRun.ExamTitle).toBe('AMC10 Review 046 411');
        expect(examRun.AnsweredBy).toBe('Yinkai Gao');
        expect(examRun.StartTime).toBe('March 9, 2023 at 5:02:17 PM GMT-6');
        expect(examRun.CompleteTime).toBe('March 9, 2023 at 5:19:46 PM GMT-6');
        expect(examRun.TotalDuration).toBe('1,049');
        expect(examRun.TotalCount).toBe('4');
        expect(examRun.CorrectCount).toBe('2');
        expect(examRun.GuessCount).toBe('2');
        expect(examRun.GuessCorrectCount).toBe('1');
        expect(examRun.ExamDetails.length).toBe(4);
        expect(examRun.ExamDetails[0].toString()).toBe('AMC10-2021-FB-016DNoNo189');
        expect(examRun.ExamDetails[1].toString()).toBe('AMC10-2021-FB-017DNoYes460');
        expect(examRun.ExamDetails[2].toString()).toBe('AMC10-2021-FB-018DNoYes171');
        expect(examRun.ExamDetails[3].toString()).toBe('AMC10-2021-FB-019CNoNo224');

    });

});