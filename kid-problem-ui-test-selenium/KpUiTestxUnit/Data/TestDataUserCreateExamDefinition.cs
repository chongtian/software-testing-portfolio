using KpUiTestxUnit.Models;

namespace KpUiTestxUnit.Data;

public static class TestDataUserCreateExamDefinition
{
    public static readonly ExamDefinition Test1 = new()
    {
        ExamCategoryText = "AMC10",
        ExamCategoryIndex = 2,
        ExamTitle = $"Test Exam Def {DateTime.Now.Ticks}",
        ActiveStatusValue = true,
        ActiveStatusText = "Yes",
        ExamYear = "2020",
        ExamTypeText = "Practice",
        ExamTypeIndex = 2,
        Memo = "UI Test",
        ProblemTitles =
            [
            "AMC10-2020A-001",
            "AMC10-2020A-002",
            "AMC10-2020A-003",
            "AMC10-2020A-004",
            "AMC10-2020A-005"
            ],
        ProblemTitleSelectIndexes = [0, 1, 2, 3, 4],
        CountOfExpectedProblems = 50
    };

    public static readonly ExamDefinition Test2 = new()
    {
        ExamCategoryText = "AMC10",
        ExamCategoryIndex = 2,
        ExamTitle = $"AMC10 TestExam {DateTime.Now.Ticks}",
        ActiveStatusValue = true,
        ActiveStatusText = "Yes",
        ExamYear = "2020B",
        ExamTypeText = "Practice",
        ExamTypeIndex = 2,
        Memo = "UI Test",
        ProblemTitles =
        [
            "AMC10-2020B-001",
            "AMC10-2020B-002",
            "AMC10-2020B-003",
            "AMC10-2020B-004",
            "AMC10-2020B-005"
        ],
        ProblemTitleSelectIndexes = [0, 1, 2, 3, 4],
        CountOfExpectedProblems = 25
    };
}
