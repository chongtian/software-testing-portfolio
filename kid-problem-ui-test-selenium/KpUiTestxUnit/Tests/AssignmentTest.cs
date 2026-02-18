using KpUiTestxUnit.Data;
using KpUiTestxUnit.Models;
using KpUiTestxUnit.Pages;

namespace KpUiTestxUnit.Tests
{
    public class AssignmentTest : TestBase // to do: use POM
    {
        public static IEnumerable<object?[]> DataForAssignment()
        {
            yield return new object?[] { TestDataAssignment.Test1 };
        }

        public AssignmentTest(SetupFixture fixture) : base(fixture)
        {

        }

        [Theory]
        [InlineData("8/1/2025", "9/1/2025", 14, "August 30, 2025 at 11:28:32 AM GMT-5")]
        [InlineData("10/1/2025", "10/31/2025", 16, "October 25, 2025 at 11:41:00 AM GMT-5")]
        public void User_Query_In_Assignments(string startTime, string endTime, int expectedCount, string firstRecord)
        {
            _driver.Navigate().GoToUrl(AssignmentQueryPage.PageUrl);

            var page = new AssignmentQueryPage(_driver);
            Assert.True(page.IsPageLoaded());

            page.SetQueryDateRange(startTime, endTime);
            page.ClickSearchButton();
            Assert.True(page.GetCountOfQueryResults() == expectedCount);
            Assert.Contains(firstRecord, page.GetAssignmentTitleFromQueryResult(0));
        }

        [Theory]
        [InlineData("8/1/2025", "9/1/2025", 9, "64046b7b-de62-4c4f-95b3-eca4ab24a4f9", "AMC10 2022 Wrong Practice 01")]
        [InlineData("10/1/2025", "10/31/2025", 5, "c51c260b-a445-4e65-b2c6-b6718a73c92d", "AMC10 Regular Practice 011")]
        public void User_Navigate_To_Detail_From_List_Assignments(string startTime, string endTime, int selectIndex, string uid, string examTitle)
        {
            _driver.Navigate().GoToUrl(AssignmentQueryPage.PageUrl);

            var page = new AssignmentQueryPage(_driver);
            Assert.True(page.IsPageLoaded());

            page.SetQueryDateRange(startTime, endTime);
            page.ClickSearchButton();

            var destPage = page.ClickAssignmentTitleInQueryResults(selectIndex);
            Assert.NotNull(destPage);
            Assert.True(destPage.IsPageLoaded());
            Assert.True(_wait.Until(d => d.Url.Contains($"{AssignmentViewPage.PageUrl}/{uid}")));
            Assert.True(destPage.GetExamTitle() == examTitle);

        }

        [Theory]
        [MemberData(nameof(DataForAssignment))]
        public void User_View_Exam_Run(Assignment testData)
        {
            _driver.Navigate().GoToUrl($"{AssignmentViewPage.PageUrl}/{testData.UID}");

            var page = new AssignmentViewPage(_driver);
            Assert.True(page.IsPageLoaded());

            Assert.True(page.GetExamCategory() == testData.ExamCategory);
            Assert.True(page.GetExamTitle() == testData.ExamTitle);
            Assert.True(page.GetCreateTime() == testData.CreateTime);
            Assert.True(page.GetMemo() == testData.Memo);
            Assert.True(page.GetCompleted() == testData.Completed);

            var details = page.GetExamRunLabels();
            for (int i = 0; i < testData.ExamRuns!.Length; i++)
            {
                Assert.True(details[i] == testData.ExamRuns[i]);
            }
        }
    }
}
