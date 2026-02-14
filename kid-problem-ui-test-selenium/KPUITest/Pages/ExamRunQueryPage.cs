using OpenQA.Selenium;

namespace KPUITest.Pages;

public sealed class ExamRunQueryPage : PageBase
{
    public readonly static string PageUrl = $"{Constants.BASE_URL}/examruns/all";

    private readonly By startTimeField = By.Name("startTime");
    private readonly By endTimeField = By.Name("endTime");
    private readonly By searchButton = By.CssSelector("app-exam-run-list-view form button:nth-child(2)");
    private readonly By returnResultTableRows = By.CssSelector("app-exam-run-list-view tr");
    private readonly By countField = By.CssSelector("app-exam-run-list-view .w3-cell-row div.w3-cell:not(.w3-container)");

    public ExamRunQueryPage(IWebDriver driver) : base(driver)
    { }

    public override bool IsPageLoaded(bool withData = false)
    {
        var loaded = _wait.Until(d => d.FindElement(By.CssSelector("app-exam-run-query > h3")).Text.Contains("List All Exam Runs"));
        loaded = loaded && _wait.Until(d => d.FindElement(By.CssSelector("app-exam-run-query mat-date-range-input")) != null);
        loaded = loaded && IsNotLoading();
        return loaded;
    }

    public void SetQueryDateRange(string startTimeText, string endTimeText)
    {
        var startTimeElement = _wait.Until(d => d.FindElement(startTimeField));
        if (startTimeElement != null)
        {
            startTimeElement.SendKeys(Keys.Control + "a");
            startTimeElement.SendKeys(Keys.Backspace);
            startTimeElement.SendKeys(startTimeText);
        }

        var endTimeElement = _wait.Until(d => d.FindElement(endTimeField));
        if (endTimeElement != null)
        {
            endTimeElement.SendKeys(Keys.Control + "a");
            endTimeElement.SendKeys(Keys.Backspace);
            endTimeElement.SendKeys(endTimeText);
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

    public string GetExamTitleFromQueryResult(int index)
    {
        var hasResult = _wait.Until(d => d.FindElements(returnResultTableRows).Count > 0);
        if (hasResult)
        {
            var td = _wait.Until(d => d.FindElement(By.CssSelector($"app-exam-run-list-view tbody tr:nth-child({index + 1}) > td:nth-child(2)")));
            if (td != null)
            {
                return td.Text;
            }
        }
        return "";
    }

    /// <summary>
    /// Click the link of item from Query Result
    /// </summary>
    /// <param name="index">0-based index</param>
    /// <returns></returns>
    public ExamRunViewPage? ClickExamTitleInQueryResults(int index)
    {
        var hasResult = _wait.Until(d => d.FindElements(returnResultTableRows).Count > 0);
        if (hasResult)
        {
            var examLink = _wait.Until(d => d.FindElement(By.CssSelector($"app-exam-run-list-view tbody tr:nth-child({index + 1}) a")));
            if (examLink != null)
            {
                examLink.Click();
                if (_wait.Until(d => d.Url.Contains("/examrun/view/")))
                {
                    return new ExamRunViewPage(_driver);
                }
            }
        }
        return null;
    }

    public int GetCountOfQueryResults()
    {
        var hasResult = _wait.Until(d => d.FindElements(returnResultTableRows).Count > 0);
        if (hasResult)
        {
            var countElement = _wait.Until(d => d.FindElement(countField));
            if (countElement != null)
            {
                var countText = countElement.Text.Replace("Count of all records:", "").Trim();
                if (string.IsNullOrWhiteSpace(countText))
                {
                    return 0;
                }
                else
                {
                    if (int.TryParse(countText, out int count))
                    {
                        return count;
                    }
                }
            }
        }

        return 0;
    }

    private bool IsNotLoading()
    {
        By progressBar = By.CssSelector("mat-progress-bar");
        return _wait.Until(d => d.FindElements(progressBar).Count == 0);
    }

}
