import test, { expect } from "@playwright/test";
import { AdminAuthDataFilePath, ChildAuthDataFilePath } from "../utils/constants";
import { AssignmentQueryPage } from "../pages/AssignmentQueryPage";
import { AssignmentViewPage } from "../pages/AssignmentViewPage";
import { MessagePage } from "../pages/MessagePage";

const testData = {
    queryTest: [
        { startDate: "8/1/2023", endDate: "8/15/2023", expectedCount: 12, firstRecord: "August 14, 2023 at 9:03:58 AM GMT-5" },
        { startDate: "10/1/2023", endDate: "10/25/2023", expectedCount: 14, firstRecord: "October 23, 2023 at 2:36:59 PM GMT-5" }
    ],
    navigateTest: [
        { startDate: "8/1/2023", endDate: "8/15/2023", selectIndex: 9, uid: "e4a21255-272c-4c8c-a657-e667db863b98", examTitle: "AMC10 Review 140 520" },
        { startDate: "10/1/2023", endDate: "10/25/2023", selectIndex: 5, uid: "a358a6e5-a429-4ab5-b73d-a3a4a043f114", examTitle: "AMC10-2022B Part 4 575" },
    ]
};

test.describe('Assignment Query Test', () => {
    test.use({ storageState: AdminAuthDataFilePath });

    testData.queryTest.forEach((tdata, i) => {
        test(`User queries in Assignment Query - ${i + 1}`, async ({ page }) => {
            const assignmentQueryPage = new AssignmentQueryPage(page);
            await assignmentQueryPage.goTo();
            const startTime = tdata.startDate;
            const endTime = tdata.endDate;
            await assignmentQueryPage.query(startTime, endTime);
            await expect(assignmentQueryPage.getCountOfQueryResultsField()).toContainText(tdata.expectedCount.toString());
            await expect(assignmentQueryPage.getAssignmentTitleFromQueryResult(0)).toHaveText(tdata.firstRecord);
        });
    });

    testData.navigateTest.forEach((tdata, i) => {
        test(`User navigate in Assignment Query - ${i + 1}`, async ({ page }) => {
            const assignmentQueryPage = new AssignmentQueryPage(page);
            await assignmentQueryPage.goTo();
            const startTime = tdata.startDate;
            const endTime = tdata.endDate;
            await assignmentQueryPage.query(startTime, endTime);
            await assignmentQueryPage.clickAssignmentTitleInQueryResults(tdata.selectIndex);
            const regex = new RegExp(`/assignment/view/${tdata.uid}`);
            await expect(page).toHaveURL(regex);

            const assignmentViewPage = new AssignmentViewPage(page);
            expect((await assignmentViewPage.getAssignment()).ExamTitle).toEqual(tdata.examTitle);

        });
    });

    test('Only Child user can Do Assignment', async ({ page }) => {
        const assignmentQueryPage = new AssignmentQueryPage(page);
        await assignmentQueryPage.goTo();
        const startTime = '3/1/2026';
        const endTime = '3/3/2026';
        await assignmentQueryPage.query(startTime, endTime);
        await assignmentQueryPage.clickDoAssignmentInQueryResults(0);
        const messagePage = new MessagePage(page);
        expect((await messagePage.getMessages())[0]).toContain('Only Child user can start an Assignment.');
    });

});
