using KpUiTestxUnit.Pages;

namespace KpUiTestxUnit.Tests
{

    public class ProblemTest : TestBase
    {
        public ProblemTest(SetupFixture fixture) : base(fixture)
        { }

        [Theory]
        [InlineData(false, "AMC10-2010A", 25, "AMC10-2010A-001")]
        [InlineData(true, "AMC12-2010A", 25, "AMC12-2010A-001")]
        public void User_Queries_Problem(bool isStaging, string keyword, int expectedCount, string firstRecord)
        {
            _driver.Navigate().GoToUrl(isStaging ? ProblemQueryPage.PageStagingUrl : ProblemQueryPage.PageRegularUrl);

            var page = new ProblemQueryPage(_driver);
            Assert.True(page.IsPageLoaded());

            page.SetKeyword(keyword);
            page.ClickSearchButton();
            Assert.False(page.IsLoadMoreButtonShown());
            var results = page.GetProblemTitle();
            Assert.True(results.Length == expectedCount);
            Assert.Equal(firstRecord, results[0]);
        }

        [Theory]
        [InlineData(false, "AMC10-2010", 50, "AMC10-2010B-025")]
        [InlineData(true, "AMC12-2010", 50, "AMC12-2010B-025")]
        public void User_Queries_Problem_with_Load_More(bool isStaging, string keyword, int expectedCount, string lastRecord)
        {
            _driver.Navigate().GoToUrl(isStaging ? ProblemQueryPage.PageStagingUrl : ProblemQueryPage.PageRegularUrl);

            var page = new ProblemQueryPage(_driver);
            Assert.True(page.IsPageLoaded());

            page.SetKeyword(keyword);
            page.ClickSearchButton();
            Assert.True(page.IsLoadMoreButtonShown());
            page.ClickLoadMoreButton();
            Assert.False(page.IsLoadMoreButtonShown());
            var results = page.GetProblemTitle();
            Assert.True(results.Length == expectedCount);
            Assert.Equal(lastRecord, results[expectedCount - 1]);
        }

        [Theory]
        [InlineData("AMC12-2010A", 25, "AMC12-2010A-001 Answer: C")]
        public void User_Add_Staging_Problems_In_Bulk_Editor(string keyword, int expectedCount, string firstRecord)
        {
            _driver.Navigate().GoToUrl(ProblemBulkUpdatePage.PageUrl);
            var page = new ProblemBulkUpdatePage(_driver);
            Assert.True(page.IsPageLoaded());

            page.SelectAllStagingProblems(keyword);
            var results = _wait.Until(d => d.FindElements(page.GetStagingProblems()));
            Assert.Equal(expectedCount, results.Count);
            Assert.Contains(firstRecord, results[0].Text); 
        }

        [Fact]
        public void User_Generate_Problem_Answers()
        {
            _driver.Navigate().GoToUrl(ProblemUploadAnswersPage.PageUrl);
            var page = new ProblemUploadAnswersPage(_driver);
            Assert.True(page.IsPageLoaded());

            page.GenerateAnswers("AMC12", "2020A", "A\nB\nC\nD\nE");
            var result = page.GetGeneratedAnswers(); 
            Assert.NotNull(result);
            var answers = result.Split("\n");
            Assert.Equal(5, answers.Length);
            Assert.Equal("AMC12-2020A-001 A", answers[0].Trim());
            Assert.Equal("AMC12-2020A-002 B", answers[1].Trim());
            Assert.Equal("AMC12-2020A-003 C", answers[2].Trim());
            Assert.Equal("AMC12-2020A-004 D", answers[3].Trim());
            Assert.Equal("AMC12-2020A-005 E", answers[4].Trim());
        }

    }
}