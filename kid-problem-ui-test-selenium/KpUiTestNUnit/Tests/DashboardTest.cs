using KpUiTestNUnit.Pages;

namespace KpUiTestNUnit.Tests
{
    public class DashboardTest : TestBase
    {

        [Test]
        public void Dashboard_Should_Display_List_Exam_Summaries()
        {
            var wait = WebDriverUtility.GetWait(Driver);
            Driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new DashboardPage(Driver);

            Assert.IsTrue(page.IsPageLoaded());
            Assert.IsTrue(page.GetCountOfExamSummaries() == 5);
        }

        [Test]
        public void User_Nagivage_To_List_Exam_Summaries()
        {
            var wait = WebDriverUtility.GetWait(Driver);
            Driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new MenuBarComponentPage(Driver);
            var destPage = page.ClickSubmenuExamRunsBrowseAll();
            Assert.IsNotNull(destPage, "Failed to click the menu Exam Runs - Browse All");

            Assert.IsTrue(wait.Until(d => d.Url.Contains(ExamRunQueryPage.PageUrl)));
            Assert.IsTrue(destPage.IsPageLoaded());

        }

        [Test]
        public void User_Nagivage_To_Create_Exam_Definition()
        {
            var wait = WebDriverUtility.GetWait(Driver);
            Driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new MenuBarComponentPage(Driver);
            var destPage = page.ClickSubmenuCreateExamDefinition();
            Assert.IsNotNull(destPage, "Failed to click the menu Exam Definition - Create Exam Definition");

            Assert.IsTrue(wait.Until(d => d.Url.Contains(ExamDefEditPage.PageUrlCreate)));
            Assert.IsTrue(destPage.IsPageLoaded());

        }

        [Test]
        public void User_Nagivage_To_List_Active_Exam_Definition()
        {
            var wait = WebDriverUtility.GetWait(Driver);
            Driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new MenuBarComponentPage(Driver);
            var destPage = page.ClickSubmenuBrowseActiveExamDefinition();
            Assert.IsNotNull(destPage, "Failed to click the menu Exam Definition - Browse Active");

            Assert.IsTrue(wait.Until(d => d.Url.Contains(ExamDefinitionQueryPage.PageUrlActive)));
            Assert.IsTrue(destPage.IsPageLoaded());
        }

        [Test]
        public void User_Nagivage_To_List_Assignments()
        {
            var wait = WebDriverUtility.GetWait(Driver);
            Driver.Navigate().GoToUrl($"{Constants.HOME_URL}");

            var page = new MenuBarComponentPage(Driver);
            var destPage = page.ClickSubmenuBrowseAllAssignments();
            Assert.IsNotNull(destPage, "Failed to click the menu Assignments - Browse All");

            Assert.IsTrue(wait.Until(d => d.Url.Contains(AssignmentQueryPage.PageUrl)));
            Assert.IsTrue(destPage.IsPageLoaded());
        }


    }
}
