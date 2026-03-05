import { test, expect } from '@playwright/test';
import { childAuthDataFilePath } from '../utils/constants';
import { ExamRunnerPage } from '../pages/ExamRunnerPage';
import { AssignmentQueryPage } from '../pages/AssignmentQueryPage';
import { ExamRunViewPage } from '../pages/ExamRunViewPage';

test.describe('Exam Runner (before clicking Complete button)', () => {

    test.use({ storageState: childAuthDataFilePath });

    // this test suite tests read-only UI behavior of Exam Runner
    // Do not click "I Complete Exam"

    test('Child click an Answer button', async ({ page }) => {
        const examRunUid = "adb1a29f-67c5-4606-bc22-d7e807672cc9";
        const examRunnerpage = new ExamRunnerPage(page);
        await examRunnerpage.goTo(examRunUid);

        await expect(examRunnerpage.getCurrentProblemTitle()).toContainText('Problem 1 - AMC10-2010A-001');

        // click Delete button to remove the answer from previous test
        await examRunnerpage.clickDeleteMyAnswerButton();

        await examRunnerpage.clickAnswerButton(0);
        await expect(examRunnerpage.getAnswerButton(0)).toHaveCSS('background-color', 'rgb(255, 0, 0)');

        await examRunnerpage.clickAnswerButton(2);
        await expect(examRunnerpage.getAnswerButton(2)).toHaveCSS('background-color', 'rgb(255, 0, 0)');
        await expect(examRunnerpage.getAnswerButton(0)).toHaveCSS('background-color', 'rgb(63, 81, 181)');

        await examRunnerpage.clickDeleteMyAnswerButton();

        await examRunnerpage.clickAnswerButton(0);
        await expect(examRunnerpage.getAnswerButton(2)).toHaveCSS('background-color', 'rgb(63, 81, 181)');
    });

    test('Child navigates among problems', async ({ page }) => {
        const examRunUid = "adb1a29f-67c5-4606-bc22-d7e807672cc9";
        const examRunnerpage = new ExamRunnerPage(page);
        await examRunnerpage.goTo(examRunUid);

        await expect(examRunnerpage.getCurrentProblemTitle()).toContainText('Problem 1 - AMC10-2010A-001');

        // click Delete button to remove the answer from previous test
        await examRunnerpage.clickDeleteMyAnswerButton();

        await examRunnerpage.clickAnswerButton(0);
        await expect(examRunnerpage.getProblemNavigateButton(0)).toHaveCSS('background-color', 'rgb(144, 238, 144)');

        await examRunnerpage.clickProblemNavigateButton(1);
        await expect(examRunnerpage.getCurrentProblemTitle()).toContainText('Problem 2 - AMC10-2010A-002');

        await examRunnerpage.clickDeleteMyAnswerButton();

    });

    test('Verify Summary', async ({ page }) => {
        const examRunUid = "fa63a4ad-2d4f-40c6-bc62-ed4ecf94ac3f";
        const examRunnerpage = new ExamRunnerPage(page);
        await examRunnerpage.goTo(examRunUid);

        await expect(examRunnerpage.getCurrentProblemTitle()).toContainText('Problem 1 - AMC10-2020A-001');

        await expect(examRunnerpage.getProblemNavigateButton(0)).toHaveCSS('background-color', 'rgb(144, 238, 144)');
        await expect(examRunnerpage.getProblemNavigateButton(1)).toHaveCSS('background-color', 'rgb(144, 238, 144)');
        await expect(examRunnerpage.getProblemNavigateButton(2)).toHaveCSS('background-color', 'rgb(144, 238, 144)');
        await expect(examRunnerpage.getProblemNavigateButton(3)).toHaveCSS('background-color', 'rgb(144, 238, 144)');
        await expect(examRunnerpage.getProblemNavigateButton(4)).toHaveCSS('background-color', 'rgb(255, 255, 0)');

        await examRunnerpage.clickSummaryPanelHeader();
        await expect(examRunnerpage.getSummaryTable().locator('tbody tr')).toHaveCount(5);
        await expect(examRunnerpage.getSummaryTable().locator('tbody tr:nth-child(1)')).toHaveText('1AMC10-2020A-001ENo42');
        await expect(examRunnerpage.getSummaryTable().locator('tbody tr:nth-child(2)')).toHaveText('2AMC10-2020A-002CNo29');
        await expect(examRunnerpage.getSummaryTable().locator('tbody tr:nth-child(3)')).toHaveText('3AMC10-2020A-003ANo20');
        await expect(examRunnerpage.getSummaryTable().locator('tbody tr:nth-child(4)')).toHaveText('4AMC10-2020A-004EYes26');
        await expect(examRunnerpage.getSummaryTable().locator('tbody tr:nth-child(5)')).toHaveText('5AMC10-2020A-005No');

    });

    test('Child User click "I need more time." button', async ({ page }) => {
        const examRunUid = "af27a24b-6a90-4b79-bed6-78edc74ee3c0";
        const examRunnerpage = new ExamRunnerPage(page);
        await examRunnerpage.goTo(examRunUid);

        await examRunnerpage.clickCompleteButton();
        await expect(examRunnerpage.getCancelCompleteExamButton()).toBeVisible();
        await expect(examRunnerpage.getCancelCompleteExamButton()).toBeEnabled();
        await examRunnerpage.getCancelCompleteExamButton().click();

        await expect(examRunnerpage.getCancelCompleteExamButton()).toBeHidden();
        await expect(examRunnerpage.getConfirmCompleteExamButton()).toBeHidden();
    });


});

test.describe('Child user does Assignment', () => {

    test.use({ storageState: childAuthDataFilePath });

    test('Child user can Do Assignment', async ({ page }) => {
        const assignmentQueryPage = new AssignmentQueryPage(page);
        await assignmentQueryPage.goTo();
        const startTime = '3/1/2026';
        const endTime = '3/3/2026';
        await assignmentQueryPage.query(startTime, endTime);
        await assignmentQueryPage.clickDoAssignmentInQueryResults(0);
        await expect(page).toHaveURL(/examrun\/run\//);

        const examRunnerpage = new ExamRunnerPage(page);
        await expect(examRunnerpage.getCurrentProblemTitle()).toContainText('Problem 1 - AMC10-2010A-001');

        await examRunnerpage.clickAnswerButton(0);
        await examRunnerpage.clickSubmitAndNextButton();
        await examRunnerpage.clickAnswerButton(1);
        await examRunnerpage.clickProblemNavigateButton(2);
        await examRunnerpage.clickAnswerButton(2);
        await examRunnerpage.clickSubmitAndNextButton();
        await examRunnerpage.clickAnswerButton(3);
        await examRunnerpage.clickGuessedButton();
        await examRunnerpage.clickProblemNavigateButton(4);
        await examRunnerpage.clickAnswerButton(4);
        await examRunnerpage.clickSubmitAndNextButton();

        await examRunnerpage.clickCompleteButton();

        await expect(examRunnerpage.getConfirmCompleteExamButton()).toBeVisible();
        await expect(examRunnerpage.getConfirmCompleteExamButton()).toBeEnabled();
        await examRunnerpage.getConfirmCompleteExamButton().click();

        // it navigates to the Exam Run View page
        const examRunViewPage = new ExamRunViewPage(page);
        const examRun = await examRunViewPage.getExamRun();
        expect(examRun.ExamCategory).toBe('AMC10');
        expect(examRun.ExamTitle).toBe('TestData20260302001');
        expect(examRun.AnsweredBy).toBe('Yinkai Gao');
        expect(examRun.TotalCount).toBe('5');
        expect(examRun.CorrectCount).toBe('2');
        expect(examRun.GuessCount).toBe('1');
        expect(examRun.GuessCorrectCount).toBeNull();
        expect(examRun.ExamDetails.length).toBe(5);
    });
});