using OpenQA.Selenium;

namespace KpUiTestxUnit.Pages;

public sealed class ProblemQueryPage : PageBase
{
    public readonly static string PageRegularUrl = $"{Constants.BASE_URL}/problems/r";
    public readonly static string PageStagingUrl = $"{Constants.BASE_URL}/problems/s";

    private readonly By keywordField = By.Name("keyword");
    private readonly By searchButton = By.CssSelector("form button:nth-child(2)");
    private readonly By loadMoreButton = By.CssSelector("div>button");
    private readonly By problemLinks = By.CssSelector("app-problem-list-view a");


    public ProblemQueryPage(IWebDriver driver) : base(driver)
    { }

    public override bool IsPageLoaded(bool withData = false)
    {
        var loaded = _wait.Until(d => d.FindElement(By.CssSelector("app-problem-query > h3")).Text.Contains("List Problems"));
        loaded = loaded && IsNotLoading();
        return loaded;
    }

    public void SetKeyword(string keyword)
    {
        var keywordFieldEl = _wait.Until(d => d.FindElement(keywordField));
        if (keywordFieldEl != null)
        {
            keywordFieldEl.SendKeys(Keys.Control + "a");
            keywordFieldEl.SendKeys(Keys.Backspace);
            keywordFieldEl.SendKeys(keyword);
        }

    }

    public void ClickSearchButton()
    {
        var btn = _wait.Until(d => d.FindElement(searchButton));
        if (btn != null)
        {
            btn.Click();
            IsNotLoading();
        }
    }

    public bool IsLoadMoreButtonShown()
    {
        var shortWait = WebDriverUtility.GetShortWait(_driver, 500);
        try
        {
            var ret = shortWait.Until(d => d.FindElement(loadMoreButton));
            return ret != null;
        }
        catch (NoSuchElementException)
        {
            return false;
        }
        catch (WebDriverTimeoutException)
        {
            return false;
        }
    }

    public void ClickLoadMoreButton()
    {
        var loadMoreButtonEl = _wait.Until(d => d.FindElement(loadMoreButton));
        if (loadMoreButtonEl != null)
        {
            loadMoreButtonEl.Click();
            IsNotLoading();
        }
    }

    public string[] GetProblemTitle()
    {
        var returnedProblems = _wait.Until(d => d.FindElements(problemLinks));
        if (returnedProblems != null && returnedProblems.Count > 0)
        {
            string[] ret = new string[returnedProblems.Count];
            for (int i = 0; i < returnedProblems.Count; i++)
            {
                ret[i] = returnedProblems[i].Text.Trim();
            }
            return ret;
        }
        return [];
    }

}
