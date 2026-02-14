using KPUITest.Models;

namespace KPUITest.Data;

public static class TestDataAssignment
{
    public static readonly Assignment Test1 = new()
    {
        UID = "64046b7b-de62-4c4f-95b3-eca4ab24a4f9",
        ExamCategory = "AMC10",
        ExamTitle = "AMC10 2022 Wrong Practice 01",
        CreateTime = "August 20, 2025 at 11:17:00 AM GMT-5",
        Memo = "",
        Completed = "Yes",
        ExamRuns = ["Run 1"]
    };
}
