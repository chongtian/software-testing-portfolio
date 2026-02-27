using OpenQA.Selenium;

namespace KpUiTestxUnit.Pages;

public sealed class ProblemBulkUpdatePage : PageBase
{
    public readonly static string PageUrl = $"{Constants.BASE_URL}/problem/bulkupdate";

    private readonly By keywordField = By.CssSelector("input[type='search']");
    private readonly By searchButton = By.CssSelector("div:nth-child(2) > button");

    public ProblemBulkUpdatePage(IWebDriver driver) : base(driver)
    { }

    public override bool IsPageLoaded(bool withData = false)
    {
        var loaded = _wait.Until(d => d.FindElement(By.CssSelector("app-problem-bulk-update > h3")).Text.Contains("Problem Bulk Editor - Move problems out of Staging area"));
        loaded = loaded && IsNotLoading();
        return loaded;
    }


    public void SelectAllStagingProblems(string keyword)
    {
        var keywordFieldEl = _wait.Until(d => d.FindElement(keywordField));
        if (keywordFieldEl != null)
        {
            keywordFieldEl.SendKeys(Keys.Control + "a");
            keywordFieldEl.SendKeys(Keys.Backspace);
            keywordFieldEl.SendKeys(keyword);
        }

        var btn = _wait.Until(d => d.FindElement(searchButton));
        if (btn != null)
        {
            btn.Click();
            IsNotLoading();
        }

        var selectAllBtn = _wait.Until(d => d.FindElement(By.CssSelector(".cdk-overlay-pane button[role='switch']")));
        if (selectAllBtn != null)
        {
            selectAllBtn.Click();
        }

        var addBtn = _wait.Until(d => d.FindElement(By.CssSelector(".cdk-overlay-pane div:nth-child(1) > button")));
        if (addBtn != null)
        {
            addBtn.Click();
        }

        _wait.Until(d => d.FindElements(By.CssSelector(".cdk-overlay-pane")).Count == 0);
    }

    public By GetStagingProblems()
    {
        return By.CssSelector(".w3-card.w3-cell-row");
    }

}
