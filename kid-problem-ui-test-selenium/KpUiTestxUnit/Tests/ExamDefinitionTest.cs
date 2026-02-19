using KpUiTestxUnit.Data;
using KpUiTestxUnit.Models;
using KpUiTestxUnit.Pages;
using KpUiTestxUnit.Utilties;

namespace KpUiTestxUnit.Tests
{
    public class ExamDefinitionTest : TestBase
    {
        public static IEnumerable<object?[]> DataForCreateExamDefinition()
        {
            yield return new object?[] { TestDataUserCreateExamDefinition.Test1 };
            yield return new object?[] { TestDataUserCreateExamDefinition.Test2 };
        }

        public ExamDefinitionTest(SetupFixture fixture) : base(fixture)
        {

        }

        [Theory]
        [MemberData(nameof(DataForCreateExamDefinition))]
        public void User_Create_Exam_Definition(ExamDefinition testData)
        {
            _driver.Navigate().GoToUrl(ExamDefEditPage.PageUrlCreate);

            var page = new ExamDefEditPage(_driver);
            Assert.True(page.IsPageLoaded());

            page.SelectExamcCategory(testData.ExamCategoryIndex);
            page.EnterExamTitle(testData.ExamTitle);
            page.EnterExamYear(testData.ExamYear!);
            page.EnterMemo(testData.Memo!);
            page.SelectExamType(testData.ExamTypeIndex);
            var selectItems = testData.ProblemTitleSelectIndexes;
            int totalProblems = page.AddExamDetailsByRegularQuery(selectItems!);
            Assert.True(totalProblems == testData.CountOfExpectedProblems);

            var problems = page.GetProblemTitlesFromExamDetails();
            Assert.True(problems.Length == testData.ProblemTitles!.Length);
            for (int i = 0; i < testData.ProblemTitles!.Length; i++)
            {
                Assert.True(problems[i].Equals(testData.ProblemTitles![i]), problems[i]);
            }

            Assert.True(page.GetActiveFlag() == testData.ActiveStatusValue);

            page.ClickSaveButton();
            Assert.Contains(TestDataHelper.EncodeUrl(testData.ExamTitle), _driver.Url);
        }


        [Theory]
        [InlineData("AMC10/TestData20260210001")]
        [InlineData("AMC10/AMC10 P14 16B 236")]
        public void User_Navigate_To_Exam_Def_Edit_Screen(string examDefTitle)
        {
            string testExamDefTitle = TestDataHelper.EncodeUrl(examDefTitle);
            _driver.Navigate().GoToUrl($"{ExamDefEditPage.PageUrlEdit}/{testExamDefTitle}");
            var page = new ExamDefEditPage(_driver);
            Assert.True(page.IsPageLoaded(true));

            string? examCategory = page.GetSelectExamcCategory();
            string? examTitle = page.GetExamTitle();
            Assert.True(TestDataHelper.EncodeUrl($"{examCategory}/{examTitle}") == testExamDefTitle);

            var viewPage = page.ClickBackToViewButton();
            Assert.NotNull(viewPage);
            Assert.True(viewPage.IsPageLoaded());
        }

        [Theory]
        [InlineData("AMC10/TestData20260213001", "AMC10", "TestData20260213001")]
        public void User_Create_Assignment_From_Exam_Definition(string examDefTitle, string examCategory, string examTitle)
        {
            string testExamDefTitle = TestDataHelper.EncodeUrl(examDefTitle);
            _driver.Navigate().GoToUrl($"{ExamDefViewPage.PageUrl}/{testExamDefTitle}");
            var page = new ExamDefViewPage(_driver);
            Assert.True(page.IsPageLoaded(true));

            var destPage = page.ClickCreateAssignmentButton();
            Assert.NotNull(destPage);
            Assert.True(destPage.IsPageLoaded());
            Assert.True(destPage.GetExamCategory() == examCategory);
            Assert.True(destPage.GetExamTitle() == examTitle);
            Assert.True(destPage.GetCompleted() == "No");
        }

        [Fact]
        public void User_Inactivate_Exam_Def()
        {
            string testExamDefTitle = "AMC10/TestData20260210002";
            _driver.Navigate().GoToUrl($"{ExamDefEditPage.PageUrlEdit}/{testExamDefTitle}");
            var page = new ExamDefEditPage(_driver);
            Assert.True(page.IsPageLoaded(true));

            // Verify we are on the correct Exam Def
            string? examCategory = page.GetSelectExamcCategory();
            string? examTitle = page.GetExamTitle();
            Assert.True($"{examCategory}/{examTitle}" == testExamDefTitle);

            var currStatus = page.GetActiveFlag();
            Assert.NotNull(currStatus);

            page.SetActiveFlag(!currStatus.Value);
            page.ClickSaveButton();

            _driver.Navigate().GoToUrl($"{ExamDefViewPage.PageUrl}/{testExamDefTitle}");
            var viewPage = new ExamDefViewPage(_driver);
            Assert.True(viewPage.IsPageLoaded());
            bool active = viewPage.GetActiveFlag() == "Yes" ? true : false;
            // this fails due to an issue in the API service
            Assert.True(active == !currStatus.Value);
        }
    }
}
