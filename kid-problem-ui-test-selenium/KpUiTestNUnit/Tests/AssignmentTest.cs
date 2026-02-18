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
        [TestCase("8/1/2025", "9/1/2025", 14, "August 30, 2025 at 11:28:32 AM GMT-5")]
        [TestCase("10/1/2025", "10/31/2025", 16, "October 25, 2025 at 11:41:00 AM GMT-5")]
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
        [TestCase("8/1/2025", "9/1/2025", 9, "64046b7b-de62-4c4f-95b3-eca4ab24a4f9", "AMC10 2022 Wrong Practice 01")]
        [TestCase("10/1/2025", "10/31/2025", 5, "c51c260b-a445-4e65-b2c6-b6718a73c92d", "AMC10 Regular Practice 011")]
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
