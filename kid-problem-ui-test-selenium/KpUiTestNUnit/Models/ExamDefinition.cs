namespace KpUiTestNUnit.Models;

public class ExamDefinition
{
    public required string ExamCategoryText { get; set; }

    /// <summary>
    /// This is the 1-based index of select options of Exam Category
    /// </summary>
    public required int ExamCategoryIndex { get; set; }
    public required string ExamTitle { get; set; }
    public required bool ActiveStatusValue { get; set; } = true;
    public required string ActiveStatusText { get; set; } = "Yes";
    public string? ExamYear { get; set; }
    public required string ExamTypeText { get; set; } = "Practice";

    /// <summary>
    /// This is the 1-based index of select option of Exam Type
    /// </summary>
    public required int ExamTypeIndex { get; set; } = 2;
    public string? Memo { get; set; }
    public string[]? ProblemTitles { get; set; }
    public int[]? ProblemTitleSelectIndexes { get; set; }
    public int CountOfExpectedProblems { get; set; } = 0;

}
