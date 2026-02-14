using KPUITest.Data;
using KPUITest.Models;
using KPUITest.Pages;

namespace KPUITest.Tests
{
    public class ExamRunTest : TestBase // to do: use POM
    {
        public static IEnumerable<ExamRun> DataForExamRun()
        {
            yield return TestDataExamRun.Test1;
        }

        [Test]
        [TestCase("8/1/2025", "9/1/2025", 13, "AMC10 2019 Wrong Practice 01")]
        [TestCase("9/2/2025", "9/30/2025", 23, "AMC10 2019 Hard Practice 01")]
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
        [TestCase("8/1/2025", "9/1/2025", 9, "47446d46-c603-4540-bbdb-f0290d768522", "AMC10 Practice wrong problem 01")]
        [TestCase("9/2/2025", "9/30/2025", 5, "209b5da9-5cc4-4328-a480-47c2ac908d6b", "AMC12 2019 Easy Practice 01")]
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
        [TestCase("3bda2c3e-bf51-4005-9483-97c4d971c17e", "ecd3961a-8583-40eb-b643-eab05d1ae1f5", "August 30, 2025 at 11:27:36 AM GMT-5")]
        [TestCase("ed19f011-8dab-4d80-8c7e-a838f88468da", "70125fdf-d7bc-4952-aa97-81df3fe066c0", "February 8, 2025 at 11:50:57 AM GMT-6")]
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
