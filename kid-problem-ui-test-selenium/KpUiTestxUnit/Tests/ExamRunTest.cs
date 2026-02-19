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
        [InlineData("8/1/2023", "8/15/2023", 12, "AMC10 Review 147 529")]
        [InlineData("9/2/2023", "9/30/2023", 20, "AMC10 Review 177 564")]
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
        [InlineData("8/1/2023", "8/15/2023", 9, "5423ac10-eec6-4555-8faa-3096d878018a", "AMC10 Review 140 520")]
        [InlineData("9/2/2023", "9/30/2023", 5, "0ab4af3f-6b3b-4232-9aca-3fdc02a8ded7", "AMC10 Review 172 559")]
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
        [InlineData("8f3731de-2e41-42c1-8b47-fbc9e6d9925d", "ac0d1f40-87cc-4ba9-a202-5420dace507f", "August 8, 2023 at 9:11:38 AM GMT-5")]
        [InlineData("5b717440-6871-40bb-a2a9-80b471d0de29", "0b583da7-8886-45c3-bba5-b78aee36580b", "August 7, 2023 at 9:56:26 AM GMT-5")]
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
