using OpenQA.Selenium;

namespace KpUiTestxUnit.Pages;

public class ProblemUploadAnswersPage : PageBase
{
    public readonly static string PageUrl = $"{Constants.BASE_URL}/problem/answers";
    
    public ProblemUploadAnswersPage(IWebDriver driver) : base(driver) { }

    public override bool IsPageLoaded(bool withData = false)
    {
        var loaded = _wait.Until(d => d.FindElement(By.CssSelector("app-update-answer mat-card-title")).Text.Contains("Upload Answers"));
        loaded = loaded && IsNotLoading();
        return loaded;
    }

    public void GenerateAnswers(string category, string year, string answers)
    {
        var problemCategoryEl = _wait.Until(d => d.FindElement(By.Id("mat-input-0")));
        var problemYearEl = _wait.Until(d => d.FindElement(By.Id("mat-input-1")));
        var answersEl = _wait.Until(d => d.FindElement(By.Id("mat-input-2")));
        var generateBtnEl = _wait.Until(d => d.FindElement(By.CssSelector("app-update-answer button:nth-child(1)")));

        problemCategoryEl.SendKeys(category);
        problemYearEl.SendKeys(year);
        answersEl.SendKeys(answers);
        generateBtnEl.Click();
    }

    public string GetGeneratedAnswers()
    {
        string result = _wait.Until(d => d.FindElement(By.Id("mat-input-3")).GetAttribute("value"));
        return result;
    }
}
