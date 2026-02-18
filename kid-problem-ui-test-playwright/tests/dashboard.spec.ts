import { test, expect } from '@playwright/test';
import { HOME_URL, adminAuthDataFilePath } from '../utils/constants'
import { MenuBarComponentPage } from '../pages/MenuBarComponentPage';

test.describe('Admin user or Parent user uses Dashboard page', () => {

    test.use({ storageState: adminAuthDataFilePath });

    test('user navigates List All Exam Runs', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuExamRunsSubmenuBrowseAll();
        await expect(page).toHaveURL(/examruns\/all/);
        await expect(page.getByText('List All Exam Runs')).toBeVisible();
    });

    test('user navigates List Latest Exam Runs', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuExamRunsSubmenuBrowseLatest();
        await expect(page).toHaveURL(/examruns/);
        await expect(page.getByText('List Latest Exam Runs')).toBeVisible();
    });

    test('user navigates Exam Summaries', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuExamRunsSubmenuExamSummary();
        await expect(page).toHaveURL(/summary\/exam/);
        await expect(page.getByText('List Exam Summaries')).toBeVisible();
    });

    test('user navigates Problem Summaries', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuExamRunsSubmenuProblemSummary();
        await expect(page).toHaveURL(/summary\/problem/);
        await expect(page.getByText('List Problem Summaries')).toBeVisible();
    });

    test('user navigates Latest Assignments', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuAssignmentsSubmenuBrowseLatest();
        await expect(page).toHaveURL(/assignments/);
        await expect(page.getByText('List Latest Assignments')).toBeVisible();
    });

    test('user navigates All Assignments', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuAssignmentsSubmenuBrowseAll();
        await expect(page).toHaveURL(/assignments\/all/);
        await expect(page.getByText('List Latest Assignments')).toBeVisible();
    });

    test('user navigates List Active Exam Definitions', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuExamDefinitionsSubmenuBrowseActive();
        await expect(page).toHaveURL(/examdefs/);
        await expect(page.getByText('List Active Exam Definitions')).toBeVisible();
    });

    test('user navigates List All Exam Definitions', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuExamDefinitionsSubmenuBrowseAll();
        await expect(page).toHaveURL(/examdefs\/all/);
        await expect(page.getByText('List All Exam Definitions')).toBeVisible();
    });

    test('user navigates Create Exam Definitions', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuExamDefinitionsSubmenuCreateExamDefinition();
        await expect(page).toHaveURL(/examdef\/create/);
        await expect(page.getByText('Edit Exam Definition')).toBeVisible();
    });

});

test.describe('Admin user uses Problems menu on Dashboard page', () => {

    test.use({ storageState: adminAuthDataFilePath });

    test('user navigates Browse Problems', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuProblemsSubmenuBrowseProblems();
        await expect(page).toHaveURL(/problems\/r/);
        await expect(page.getByText('List Problems')).toBeVisible();
    });

    test('user navigates Create Problem', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuProblemsSubmenuCreateProblem();
        await expect(page).toHaveURL(/problem\/create/);
        await expect(page.getByText('Problem Editor')).toBeVisible();
    });

    test('user navigates Browse Staging Problems', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuProblemsSubmenuBrowseStagingProblems();
        await expect(page).toHaveURL(/problems\/s/);
        await expect(page.getByText('List Problems (Staging)')).toBeVisible();
    });

    test('user navigates Crawl Problem', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuProblemsSubmenuCrawlProblems();
        await expect(page).toHaveURL(/problem\/scrap/);
        await expect(page.getByText('Get Problems from AoP')).toBeVisible();
    });

    test('user navigates Upload Answers', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuProblemsSubmenuUploadAnswers();
        await expect(page).toHaveURL(/problem\/answers/);
        await expect(page.locator('css=mat-card-title')).toBeVisible();
        await expect(page.locator('css=mat-card-title')).toHaveText('Upload Answers');
    });

    test('user navigates Bulk Update', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuProblemsSubmenuBulkUpdate();
        await expect(page).toHaveURL(/problem\/bulkupdate/);
        await expect(page.getByText('Problem Bulk Editor - Move problems out of Staging area')).toBeVisible();
    });

    test('user navigates Bulk Create', async ({ page }) => {
        await page.goto(HOME_URL);
        const menu = new MenuBarComponentPage(page);
        await menu.ClickMenuProblemsSubmenuBulkCreate();
        await expect(page).toHaveURL(/problem\/bulkcreate/);
        await expect(page.getByText('Get Problems from AoPS Community area')).toBeVisible();
    });

});