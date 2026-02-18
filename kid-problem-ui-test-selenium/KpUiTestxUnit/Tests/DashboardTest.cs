using KpUiTestxUnit.Pages;

namespace KpUiTestxUnit.Tests
{
    public class DashboardTest : TestBase
    {

        public DashboardTest(SetupFixture fixture) : base(fixture)
        {

        }

        [Fact]
        public void Dashboard_Should_Display_List_Exam_Summaries()
        {
            _driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new DashboardPage(_driver);

            Assert.True(page.IsPageLoaded());
            Assert.True(page.GetCountOfExamSummaries() == 5);
        }

        [Fact]
        public void User_Nagivage_To_List_Exam_Summaries()
        {
            _driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new MenuBarComponentPage(_driver);
            var destPage = page.ClickSubmenuExamRunsBrowseAll();
            Assert.NotNull(destPage);
            Assert.True(_wait.Until(d => d.Url.Contains(ExamRunQueryPage.PageUrl)));
            Assert.True(destPage.IsPageLoaded());

        }

        [Fact]
        public void User_Nagivage_To_Create_Exam_Definition()
        {
            _driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new MenuBarComponentPage(_driver);
            var destPage = page.ClickSubmenuCreateExamDefinition();
            Assert.NotNull(destPage);
            Assert.True(_wait.Until(d => d.Url.Contains(ExamDefEditPage.PageUrlCreate)));
            Assert.True(destPage.IsPageLoaded());

        }

        [Fact]
        public void User_Nagivage_To_List_Active_Exam_Definition()
        {
            _driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new MenuBarComponentPage(_driver);
            var destPage = page.ClickSubmenuBrowseActiveExamDefinition();
            Assert.NotNull(destPage);

            Assert.True(_wait.Until(d => d.Url.Contains(ExamDefinitionQueryPage.PageUrlActive)));
            Assert.True(destPage.IsPageLoaded());
        }

        [Fact]
        public void User_Nagivage_To_List_Assignments()
        {
            _driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new MenuBarComponentPage(_driver);
            var destPage = page.ClickSubmenuBrowseAllAssignments();
            Assert.NotNull(destPage);

            Assert.True(_wait.Until(d => d.Url.Contains(AssignmentQueryPage.PageUrl)));
            Assert.True(destPage.IsPageLoaded());
        }


    }
}
