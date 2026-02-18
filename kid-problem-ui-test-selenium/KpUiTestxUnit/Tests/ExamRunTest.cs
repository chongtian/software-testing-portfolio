using KpUiTestxUnit.Data;
using KpUiTestxUnit.Models;
using KpUiTestxUnit.Pages;

namespace KpUiTestxUnit.Tests
{
    public class ExamRunTest : TestBase // to do: use POM
    {
        public static IEnumerable<object?[]> DataForExamRun()
        {
            yield return new object?[] { TestDataExamRun.Test1 };
        }

        public ExamRunTest(SetupFixture fixture) : base(fixture)
        {

        }

        [Theory]
        [InlineData("8/1/2025", "9/1/2025", 13, "AMC10 2019 Wrong Practice 01")]
        [InlineData("9/2/2025", "9/30/2025", 23, "AMC10 2019 Hard Practice 01")]
        public void User_Query_In_Exam_Summaries(string startTime, string endTime, int expectedCount, string firstRecord)
        {
            _driver.Navigate().GoToUrl(ExamRunQueryPage.PageUrl);

            var page = new ExamRunQueryPage(_driver);
            Assert.True(page.IsPageLoaded());

            page.SetQueryDateRange(startTime, endTime);
            page.ClickSearchButton();
            Assert.True(page.GetCountOfQueryResults() == expectedCount);
            Assert.Contains(firstRecord, page.GetExamTitleFromQueryResult(0));
        }

        [Theory]
        [InlineData("8/1/2025", "9/1/2025", 9, "47446d46-c603-4540-bbdb-f0290d768522", "AMC10 Practice wrong problem 01")]
        [InlineData("9/2/2025", "9/30/2025", 5, "209b5da9-5cc4-4328-a480-47c2ac908d6b", "AMC12 2019 Easy Practice 01")]
        public void User_Navigate_To_Detail_From_List_Exam_Summaries(string startTime, string endTime, int selectIndex, string uid, string examTitle)
        {
            _driver.Navigate().GoToUrl(ExamRunQueryPage.PageUrl);

            var page = new ExamRunQueryPage(_driver);
            Assert.True(page.IsPageLoaded());

            page.SetQueryDateRange(startTime, endTime);
            page.ClickSearchButton();

            var destPage = page.ClickExamTitleInQueryResults(selectIndex);
            Assert.NotNull(destPage);
            Assert.True(destPage.IsPageLoaded());
            Assert.True(_wait.Until(d => d.Url.Contains($"{ExamRunViewPage.PageUrl}/{uid}")));
            Assert.True(destPage.GetExamTitle() == examTitle);

        }

        [Theory]
        [MemberData(nameof(DataForExamRun))]
        public void User_View_Exam_Run(ExamRun testData)
        {
            _driver.Navigate().GoToUrl($"{ExamRunViewPage.PageUrl}/{testData.UID}");

            var page = new ExamRunViewPage(_driver);
            Assert.True(page.IsPageLoaded());

            Assert.True(page.GetExamCategory() == testData.ExamCategory);
            Assert.True(page.GetExamTitle() == testData.ExamTitle);
            Assert.True(page.GetAnsweredBy() == testData.AnsweredBy);
            Assert.True(page.GetStartTime() == testData.StartTime);
            Assert.True(page.GetCompleteTime() == testData.CompleteTime);
            Assert.True(page.GetTotalDuration() == testData.TotalDuration);
            Assert.True(page.GetTotalCount() == testData.TotalCount.ToString());
            Assert.True(page.GetCorrectCount() == testData.CorrectCount.ToString());
            Assert.True(page.GetGuessCount() == testData.GuessCount.ToString());
            Assert.True(page.GetGuessCorrectCount() == testData.GuessCorrectCount.ToString());

            var details = page.GetExamRunDetails();
            for (int i = 0; i < testData.ExamDetails.Length; i++)
            {
                Assert.True(details[i].ToString() == testData.ExamDetails[i].ToString());
            }
        }

        [Theory]
        [InlineData("3bda2c3e-bf51-4005-9483-97c4d971c17e", "ecd3961a-8583-40eb-b643-eab05d1ae1f5", "August 30, 2025 at 11:27:36 AM GMT-5")]
        [InlineData("ed19f011-8dab-4d80-8c7e-a838f88468da", "70125fdf-d7bc-4952-aa97-81df3fe066c0", "February 8, 2025 at 11:50:57 AM GMT-6")]
        public void User_Click_Assignment_Link_From_Exam_Run(string examRunUid, string assignmentUid, string assignmentCreateTime)
        {
            _driver.Navigate().GoToUrl($"{ExamRunViewPage.PageUrl}/{examRunUid}");

            var page = new ExamRunViewPage(_driver);
            Assert.True(page.IsPageLoaded());

            var destPage = page.ClickGoToAssignment();
            Assert.NotNull(destPage);
            Assert.True(destPage.IsPageLoaded());
            Assert.True(_wait.Until(d => d.Url.Contains($"{AssignmentViewPage.PageUrl}/{assignmentUid}")));
            Assert.True(destPage.GetCreateTime() == assignmentCreateTime);
        }
    }
}
