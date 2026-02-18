import { expect, type Page } from '@playwright/test';

export class MenuBarComponentPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async ClickMenuExamRunsSubmenuBrowseAll() {
        const lv1Menu = 'Exam Runs';
        const lv2Menu = 'Browse All';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuExamRunsSubmenuBrowseLatest() {
        const lv1Menu = 'Exam Runs';
        const lv2Menu = 'Browse Latest';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuExamRunsSubmenuExamSummary() {
        const lv1Menu = 'Exam Runs';
        const lv2Menu = 'Exam Summary';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuExamRunsSubmenuProblemSummary() {
        const lv1Menu = 'Exam Runs';
        const lv2Menu = 'Problem Summary';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuAssignmentsSubmenuBrowseAll() {
        const lv1Menu = 'Assignments';
        const lv2Menu = 'Browse All';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuAssignmentsSubmenuBrowseLatest() {
        const lv1Menu = 'Assignments';
        const lv2Menu = 'Browse Latest';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuExamDefinitionsSubmenuBrowseActive() {
        const lv1Menu = 'Exam Definitions';
        const lv2Menu = 'Browse Active';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuExamDefinitionsSubmenuBrowseAll() {
        const lv1Menu = 'Exam Definitions';
        const lv2Menu = 'Browse All';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuExamDefinitionsSubmenuCreateExamDefinition() {
        const lv1Menu = 'Exam Definitions';
        const lv2Menu = 'Create Exam Definition';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuProblemsSubmenuBrowseProblems() {
        const lv1Menu = 'Problems';
        const lv2Menu = 'Browse Problems';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuProblemsSubmenuCreateProblem() {
        const lv1Menu = 'Problems';
        const lv2Menu = 'Create Problem';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuProblemsSubmenuBrowseStagingProblems() {
        const lv1Menu = 'Problems';
        const lv2Menu = 'Browse Staging Problems';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }

    async ClickMenuProblemsSubmenuCrawlProblems() {
        const lv1Menu = 'Problems';
        const lv2Menu = 'Crawl Problems';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }    

    async ClickMenuProblemsSubmenuUploadAnswers() {
        const lv1Menu = 'Problems';
        const lv2Menu = 'Upload Answers';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }
    
    async ClickMenuProblemsSubmenuBulkUpdate() {
        const lv1Menu = 'Problems';
        const lv2Menu = 'Bulk Update';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }  
    
    async ClickMenuProblemsSubmenuBulkCreate() {
        const lv1Menu = 'Problems';
        const lv2Menu = 'Bulk Create';
        await expect(this.page.getByRole('button', { name: lv1Menu })).toBeVisible();
        await this.page.getByRole('button', { name: lv1Menu }).click();
        await expect(this.page.getByRole('menuitem', { name: lv2Menu })).toBeVisible();
        await this.page.getByRole('menuitem', { name: lv2Menu }).click();
    }     

}