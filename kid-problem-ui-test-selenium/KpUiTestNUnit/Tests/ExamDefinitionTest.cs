using KpUiTestNUnit.Data;
using KpUiTestNUnit.Models;
using KpUiTestNUnit.Pages;
using KpUiTestNUnit.Utilties;

namespace KpUiTestNUnit.Tests
{
    public class ExamDefinitionTest : TestBase
    {
        public static IEnumerable<ExamDefinition> DataForCreateExamDefinition()
        {
            yield return TestDataUserCreateExamDefinition.Test1;
            yield return TestDataUserCreateExamDefinition.Test2;
        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCaseSource(nameof(DataForCreateExamDefinition))]
        public void User_Create_Exam_Definition(ExamDefinition testData)
        {
            Driver.Navigate().GoToUrl(ExamDefEditPage.PageUrlCreate);

            var page = new ExamDefEditPage(Driver);
            Assert.IsTrue(page.IsPageLoaded());

            page.SelectExamCategory(testData.ExamCategoryIndex);
            page.EnterExamTitle(testData.ExamTitle);
            page.EnterExamYear(testData.ExamYear!);
            page.EnterMemo(testData.Memo!);
            page.SelectExamType(testData.ExamTypeIndex);
            var selectItems = testData.ProblemTitleSelectIndexes;
            int totalProblems = page.AddExamDetailsByRegularQuery(selectItems!);
            Assert.IsTrue(totalProblems == testData.CountOfExpectedProblems);

            var problems = page.GetProblemTitlesFromExamDetails();
            Assert.IsTrue(problems.Length == testData.ProblemTitles!.Length);
            for (int i = 0; i < testData.ProblemTitles!.Length; i++)
            {
                Assert.IsTrue(problems[i].Equals(testData.ProblemTitles![i]), problems[i]);
            }

            Assert.IsTrue(page.GetActiveFlag() == testData.ActiveStatusValue);

            page.ClickSaveButton();
            Assert.IsTrue(Driver.Url.Contains(TestDataHelper.EncodeUrl(testData.ExamTitle)));
        }


        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCase("AMC10/TestData20260210001")]
        [TestCase("AMC10/AMC10 P14 16B 236")]
        public void User_Navigate_To_Exam_Def_Edit_Screen(string examDefTitle)
        {
            string testExamDefTitle = TestDataHelper.EncodeUrl(examDefTitle);
            Driver.Navigate().GoToUrl($"{ExamDefEditPage.PageUrlEdit}/{testExamDefTitle}");
            var page = new ExamDefEditPage(Driver);
            Assert.IsTrue(page.IsPageLoaded(true));

            string? examCategory = page.GetSelectExamcCategory();
            string? examTitle = page.GetExamTitle();
            Assert.IsTrue(TestDataHelper.EncodeUrl($"{examCategory}/{examTitle}") == testExamDefTitle);

            var viewPage = page.ClickBackToViewButton();
            Assert.IsNotNull(viewPage);
            Assert.IsTrue(viewPage.IsPageLoaded());
        }

        [Test]
        [Retry(2)]
        [RetryLogger]
        [TestCase("AMC10/TestData20260213001", "AMC10", "TestData20260213001")]
        public void User_Create_Assignment_From_Exam_Definition(string examDefTitle, string examCategory, string examTitle)
        {
            string testExamDefTitle = TestDataHelper.EncodeUrl(examDefTitle);
            Driver.Navigate().GoToUrl($"{ExamDefViewPage.PageUrl}/{testExamDefTitle}");
            var page = new ExamDefViewPage(Driver);
            Assert.IsTrue(page.IsPageLoaded(true));

            var destPage = page.ClickCreateAssignmentButton();
            Assert.IsNotNull(destPage);
            Assert.IsTrue(destPage.IsPageLoaded());
            Assert.IsTrue(destPage.GetExamCategory() == examCategory);
            Assert.IsTrue(destPage.GetExamTitle() == examTitle);
            Assert.IsTrue(destPage.GetCompleted() == "No");
        }

        [Test]
        public void User_Inactivate_Exam_Def()
        {
            string testExamDefTitle = "AMC10/TestData20260210002";
            Driver.Navigate().GoToUrl($"{ExamDefEditPage.PageUrlEdit}/{testExamDefTitle}");
            var page = new ExamDefEditPage(Driver);
            Assert.IsTrue(page.IsPageLoaded(true));

            // Verify we are on the correct Exam Def
            string? examCategory = page.GetSelectExamcCategory();
            string? examTitle = page.GetExamTitle();
            Assert.IsTrue($"{examCategory}/{examTitle}" == testExamDefTitle);

            var currStatus = page.GetActiveFlag();
            Assert.IsNotNull(currStatus);

            page.SetActiveFlag(!currStatus.Value);
            page.ClickSaveButton();

            Driver.Navigate().GoToUrl($"{ExamDefViewPage.PageUrl}/{testExamDefTitle}");
            var viewPage = new ExamDefViewPage(Driver);
            Assert.IsTrue(viewPage.IsPageLoaded());
            bool active = viewPage.GetActiveFlag() == "Yes" ? true : false;
            // this fails due to an issue in the API service
            Assert.IsTrue(active == !currStatus.Value);
        }
    }
}
