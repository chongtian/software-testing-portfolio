using OpenQA.Selenium;

namespace KpUiTestxUnit.Pages;

public class DashboardPage : PageBase
{
    public DashboardPage(IWebDriver driver) : base(driver) { }

    public override bool IsPageLoaded(bool withData = false)
    {
        bool isLoaded = _wait.Until(d => d.FindElement(By.CssSelector("app-exam-summary-list-view > h3")) != null);
        isLoaded = isLoaded && _driver.FindElement(By.CssSelector("app-exam-summary-list-view > h3")).Text.Equals("List Exam Summaries");
        return isLoaded;
    }

    public int GetCountOfExamSummaries()
    {
        var trElments = By.CssSelector("app-exam-summary-list-view tr");
        if (_wait.Until(d => d.FindElements(trElments).Count > 0))
        {
            // the List Exam Summaries should have 4 rows, plus one tr of table header, the total number of tr should be 5
            var trs = _wait.Until(d => d.FindElements(trElments));
            if (trs != null && trs.Count > 0)
            {
                Console.WriteLine(trs.Count);
                return trs.Count;
            }
        }
        return 0;
    }
}
