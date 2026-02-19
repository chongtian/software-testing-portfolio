using KpUiTestNUnit.Data;
using KpUiTestNUnit.Models;
using KpUiTestNUnit.Pages;
using KpUiTestNUnit.Utilties;

namespace KpUiTestNUnit.Tests
{
    public class AssignmentTest : TestBase // to do: use POM
    {
        public static IEnumerable<Assignment> DataForAssignment()
        {
            yield return TestDataAssignment.Test1;
        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCase("8/1/2023", "8/15/2023", 12, "August 14, 2023 at 9:03:58 AM GMT-5")]
        [TestCase("10/1/2023", "10/25/2023", 14, "October 23, 2023 at 2:36:59 PM GMT-5")]
        public void User_Query_In_Assignments(string startTime, string endTime, int expectedCount, string firstRecord)
        {
            Driver.Navigate().GoToUrl(AssignmentQueryPage.PageUrl);

            var page = new AssignmentQueryPage(Driver);
            Assert.IsTrue(page.IsPageLoaded());

            page.SetQueryDateRange(startTime, endTime);
            page.ClickSearchButton();
            Assert.IsTrue(page.GetCountOfQueryResults() == expectedCount);
            Assert.IsTrue(page.GetAssignmentTitleFromQueryResult(0).Contains(firstRecord));
        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCase("8/1/2023", "8/15/2023", 9, "e4a21255-272c-4c8c-a657-e667db863b98", "AMC10 Review 140 520")]
        [TestCase("10/1/2023", "10/25/2023", 5, "a358a6e5-a429-4ab5-b73d-a3a4a043f114", "AMC10-2022B Part 4 575")]
        public void User_Navigate_To_Detail_From_List_Assignments(string startTime, string endTime, int selectIndex, string uid, string examTitle)
        {
            var wait = WebDriverUtility.GetWait(Driver);
            Driver.Navigate().GoToUrl(AssignmentQueryPage.PageUrl);

            var page = new AssignmentQueryPage(Driver);
            Assert.IsTrue(page.IsPageLoaded());

            page.SetQueryDateRange(startTime, endTime);
            page.ClickSearchButton();

            var destPage = page.ClickAssignmentTitleInQueryResults(selectIndex);
            Assert.IsNotNull(destPage);
            Assert.IsTrue(destPage.IsPageLoaded());
            Assert.IsTrue(wait.Until(d => d.Url.Contains($"{AssignmentViewPage.PageUrl}/{uid}")));
            Assert.IsTrue(destPage.GetExamTitle() == examTitle);

        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCaseSource(nameof(DataForAssignment))]
        public void User_View_Exam_Run(Assignment testData)
        {
            Driver.Navigate().GoToUrl($"{AssignmentViewPage.PageUrl}/{testData.UID}");

            var page = new AssignmentViewPage(Driver);
            Assert.IsTrue(page.IsPageLoaded());

            Assert.IsTrue(page.GetExamCategory() == testData.ExamCategory);
            Assert.IsTrue(page.GetExamTitle() == testData.ExamTitle);
            Assert.IsTrue(page.GetCreateTime() == testData.CreateTime);
            Assert.IsTrue(page.GetMemo() == testData.Memo);
            Assert.IsTrue(page.GetCompleted() == testData.Completed);

            var details = page.GetExamRunLabels();
            for (int i = 0; i < testData.ExamRuns!.Length; i++)
            {
                Assert.IsTrue(details[i] == testData.ExamRuns[i]);
            }
        }
    }
}
