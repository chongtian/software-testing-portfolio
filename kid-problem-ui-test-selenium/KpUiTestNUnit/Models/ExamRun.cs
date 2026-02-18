namespace KpUiTestNUnit.Models;

public class ExamRun
{
    public string? UID { get; set; }
    public required string ExamCategory { get; set; }
    public required string ExamTitle { get; set; }
    public required string AnsweredBy { get; set; }
    public required string StartTime { get; set; }
    public string? CompleteTime { get; set; }
    public string? TotalDuration { get; set; }
    public required int TotalCount { get; set; }
    public int? CorrectCount { get; set; }
    public int? GuessCount { get; set; }
    public int? GuessCorrectCount { get; set; }

    public required ExamRunDetails[] ExamDetails { get; set; }

}

