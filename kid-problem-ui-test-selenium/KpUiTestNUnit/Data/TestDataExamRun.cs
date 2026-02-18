using KpUiTestNUnit.Models;

namespace KpUiTestNUnit.Data;

public static class TestDataExamRun
{
    public static readonly ExamRun Test1 = new()
    {
        UID = "77f281b5-e437-46cd-84c5-555da4a57a44",
        ExamCategory = "AMC10",
        ExamTitle = "AMC10 2021 Wrong Practice 02",
        AnsweredBy = "Yinkai Gao",
        StartTime = "August 23, 2025 at 11:16:55 AM GMT-5",
        CompleteTime = "August 23, 2025 at 11:41:34 AM GMT-5",
        TotalDuration = "1,478",
        TotalCount = 5,
        CorrectCount = 2,
        GuessCount = 1,
        GuessCorrectCount = null,
        ExamDetails = [
            new ExamRunDetails() {ProblemTitle = "AMC10-2021FA-011", UserAnswer = "A", Correct = "Yes", Guess = "No", Duration = "181"},
            new ExamRunDetails() {ProblemTitle = "AMC10-2021A-017", UserAnswer = "B", Correct = "No", Guess = "No", Duration = "342"},
            new ExamRunDetails() {ProblemTitle = "AMC10-2021FA-014", UserAnswer = "B", Correct = "No", Guess = "No", Duration = "354"},
            new ExamRunDetails() {ProblemTitle = "AMC10-2021B-021", UserAnswer = "C", Correct = "No", Guess = "Yes", Duration = "240"},
            new ExamRunDetails() {ProblemTitle = "AMC10-2021B-008", UserAnswer = "A", Correct = "Yes", Guess = "No", Duration = "349"},
        ]
    };
}
