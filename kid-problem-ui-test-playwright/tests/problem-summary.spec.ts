import { test, expect } from '@playwright/test';
import { adminAuthDataFilePath } from '../utils/constants'
import { ProblemSummaryQueryPage } from '../pages/ProblemSummaryQueryPage';

test.describe('Problem Summary', () => {

    test.use({ storageState: adminAuthDataFilePath });

    test('User queries Problem Summary with Load More', async ({ page }) => {
        const problemSummaryQueryPage = new ProblemSummaryQueryPage(page);
        await problemSummaryQueryPage.goTo();

        await problemSummaryQueryPage.query(0, 1, '0.8-1.0', 'AMC8-2020', true);
        await expect(problemSummaryQueryPage.getPaginatorRange()).toContainText('12');

    });

    test('User queries Problem Summary without Load More', async ({ page }) => {
        const problemSummaryQueryPage = new ProblemSummaryQueryPage(page);
        await problemSummaryQueryPage.goTo();

        await problemSummaryQueryPage.query(0, 1, '0.8-1.0', 'AMC8-2020', false);
        await expect(problemSummaryQueryPage.getPaginatorRange()).toContainText('1');

    });


});