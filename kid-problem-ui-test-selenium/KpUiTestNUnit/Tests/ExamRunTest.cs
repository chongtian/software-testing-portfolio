using KpUiTestNUnit.Data;
using KpUiTestNUnit.Models;
using KpUiTestNUnit.Pages;
using KpUiTestNUnit.Utilties;

namespace KpUiTestNUnit.Tests
{
    public class ExamRunTest : TestBase // to do: use POM
    {
        public static IEnumerable<ExamRun> DataForExamRun()
        {
            yield return TestDataExamRun.Test1;
        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCase("8/1/2023", "8/15/2023", 12, "AMC10 Review 147 529")]
        [TestCase("9/2/2023", "9/30/2023", 20, "AMC10 Review 177 564")]
        public void User_Query_In_Exam_Summaries(string startTime, string endTime, int expectedCount, string firstRecord)
        {
            Driver.Navigate().GoToUrl(ExamRunQueryPage.PageUrl);

            var page = new ExamRunQueryPage(Driver);
            Assert.IsTrue(page.IsPageLoaded());

            page.SetQueryDateRange(startTime, endTime);
            page.ClickSearchButton();
            Assert.IsTrue(page.GetCountOfQueryResults() == expectedCount);
            Assert.IsTrue(page.GetExamTitleFromQueryResult(0).Contains(firstRecord));
        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCase("8/1/2023", "8/15/2023", 9, "5423ac10-eec6-4555-8faa-3096d878018a", "AMC10 Review 140 520")]
        [TestCase("9/2/2023", "9/30/2023", 5, "0ab4af3f-6b3b-4232-9aca-3fdc02a8ded7", "AMC10 Review 172 559")]
        public void User_Navigate_To_Detail_From_List_Exam_Summaries(string startTime, string endTime, int selectIndex, string uid, string examTitle)
        {
            var wait = WebDriverUtility.GetWait(Driver);
            Driver.Navigate().GoToUrl(ExamRunQueryPage.PageUrl);

            var page = new ExamRunQueryPage(Driver);
            Assert.IsTrue(page.IsPageLoaded());

            page.SetQueryDateRange(startTime, endTime);
            page.ClickSearchButton();

            var destPage = page.ClickExamTitleInQueryResults(selectIndex);
            Assert.IsNotNull(destPage);
            Assert.IsTrue(destPage.IsPageLoaded());
            Assert.IsTrue(wait.Until(d => d.Url.Contains($"{ExamRunViewPage.PageUrl}/{uid}")));
            Assert.IsTrue(destPage.GetExamTitle() == examTitle);

        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCaseSource(nameof(DataForExamRun))]
        public void User_View_Exam_Run(ExamRun testData)
        {
            Driver.Navigate().GoToUrl($"{ExamRunViewPage.PageUrl}/{testData.UID}");

            var page = new ExamRunViewPage(Driver);
            Assert.IsTrue(page.IsPageLoaded());

            Assert.IsTrue(page.GetExamCategory() == testData.ExamCategory);
            Assert.IsTrue(page.GetExamTitle() == testData.ExamTitle);
            Assert.IsTrue(page.GetAnsweredBy() == testData.AnsweredBy);
            Assert.IsTrue(page.GetStartTime() == testData.StartTime);
            Assert.IsTrue(page.GetCompleteTime() == testData.CompleteTime);
            Assert.IsTrue(page.GetTotalDuration() == testData.TotalDuration);
            Assert.IsTrue(page.GetTotalCount() == testData.TotalCount.ToString());
            Assert.IsTrue(page.GetCorrectCount() == testData.CorrectCount.ToString());
            Assert.IsTrue(page.GetGuessCount() == testData.GuessCount.ToString());
            Assert.IsTrue(page.GetGuessCorrectCount() == testData.GuessCorrectCount.ToString());

            var details = page.GetExamRunDetails();
            for (int i = 0; i < testData.ExamDetails.Length; i++)
            {
                Assert.IsTrue(details[i].ToString() == testData.ExamDetails[i].ToString());
            }
        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCase("8f3731de-2e41-42c1-8b47-fbc9e6d9925d", "ac0d1f40-87cc-4ba9-a202-5420dace507f", "August 8, 2023 at 9:11:38 AM GMT-5")]
        [TestCase("5b717440-6871-40bb-a2a9-80b471d0de29", "0b583da7-8886-45c3-bba5-b78aee36580b", "August 7, 2023 at 9:56:26 AM GMT-5")]
        public void User_Click_Assignment_Link_From_Exam_Run(string examRunUid, string assignmentUid, string assignmentCreateTime)
        {
            var wait = WebDriverUtility.GetWait(Driver);
            Driver.Navigate().GoToUrl($"{ExamRunViewPage.PageUrl}/{examRunUid}");

            var page = new ExamRunViewPage(Driver);
            Assert.IsTrue(page.IsPageLoaded());

            var destPage = page.ClickGoToAssignment();
            Assert.IsNotNull(destPage);
            Assert.IsTrue(destPage.IsPageLoaded());
            Assert.IsTrue(wait.Until(d => d.Url.Contains($"{AssignmentViewPage.PageUrl}/{assignmentUid}")));
            Assert.IsTrue(destPage.GetCreateTime() == assignmentCreateTime);
        }
    }
}
