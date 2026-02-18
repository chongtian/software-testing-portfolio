using OpenQA.Selenium;

namespace KpUiTestNUnit.Pages;

public sealed class ExamDefinitionQueryPage : PageBase
{
    public readonly static string PageUrlAll = $"{Constants.BASE_URL}/examdefs/all";
    public readonly static string PageUrlActive = $"{Constants.BASE_URL}/examdefs";
    public ExamDefinitionQueryPage(IWebDriver driver) : base(driver)
    { }

    public override bool IsPageLoaded(bool withData = false)
    {
        var loaded = _wait.Until(d => d.FindElement(By.CssSelector("app-exam-def-query > h3")).Text.Contains("List Active Exam Definitions"));
        // the other mat-select is from mat-paginator
        loaded = loaded && _wait.Until(d => d.FindElements(By.CssSelector("mat-select")).Count.Equals(2));
        loaded = loaded && IsNotLoading();
        return loaded;
    }

    private bool IsNotLoading()
    {
        By progressBar = By.CssSelector("mat-progress-bar");
        return _wait.Until(d => d.FindElements(progressBar).Count == 0);
    }

}
