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
        [InlineData("8/1/2023", "8/15/2023", 12, "August 14, 2023 at 9:03:58 AM GMT-5")]
        [InlineData("10/1/2023", "10/25/2023", 14, "October 23, 2023 at 2:36:59 PM GMT-5")]
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
        [InlineData("8/1/2023", "8/15/2023", 9, "e4a21255-272c-4c8c-a657-e667db863b98", "AMC10 Review 140 520")]
        [InlineData("10/1/2023", "10/25/2023", 5, "a358a6e5-a429-4ab5-b73d-a3a4a043f114", "AMC10-2022B Part 4 575")]
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
