using KpUiTestNUnit.Models;
using OpenQA.Selenium;

namespace KpUiTestNUnit.Pages;

public sealed class ExamRunViewPage : PageBase
{
    public readonly static string PageUrl = $"{Constants.BASE_URL}/examrun/view";

    public readonly static string UrlExamDefCreate = $"{Constants.BASE_URL}/examdef/create";
    public readonly static string UrlExamDefView = $"{Constants.BASE_URL}/examdef/view";
    public readonly static string UrlExamDefEdit = $"{Constants.BASE_URL}/examdef/edit";

    private readonly By examCategoryField = By.CssSelector("div.w3-cell:nth-child(2) span:nth-child(2)");
    private readonly By examTitleField = By.CssSelector("div.w3-cell:nth-child(3) span:nth-child(2)");
    private readonly By answeredByField = By.CssSelector("div.w3-cell:nth-child(4) span:nth-child(2)");
    private readonly By startTimeField = By.CssSelector("div.w3-cell:nth-child(5) span:nth-child(2)");
    private readonly By completeTimeField = By.CssSelector("div.w3-cell:nth-child(6) span:nth-child(2)");
    private readonly By totalDurationField = By.CssSelector("div.w3-cell:nth-child(7) span:nth-child(2)");
    private readonly By totalCountField = By.CssSelector("div.w3-cell:nth-child(8) span:nth-child(2)");
    private readonly By correctCountField = By.CssSelector("div.w3-cell:nth-child(9) span:nth-child(2)");
    private readonly By guessCountField = By.CssSelector("div.w3-cell:nth-child(10) span:nth-child(2)");
    private readonly By guessCorrectCountField = By.CssSelector("div.w3-cell:nth-child(11) span:nth-child(2)");
    private readonly By goToAssignmentField = By.CssSelector("div.w3-cell:nth-child(12) a");

    private readonly By examDetailsItems = By.CssSelector("tbody tr");


    public ExamRunViewPage(IWebDriver driver) : base(driver)
    { }

    public override bool IsPageLoaded(bool withData = false)
    {
        var loaded = _wait.Until(d => !string.IsNullOrWhiteSpace(d.FindElement(examCategoryField).Text));
        loaded = loaded && IsNotLoading();
        return loaded;
    }

    public string GetExamTitle()
    {
        try
        {
            return _driver.FindElement(examTitleField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetExamCategory()
    {
        try
        {
            return _driver.FindElement(examCategoryField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetAnsweredBy()
    {
        try
        {
            return _driver.FindElement(answeredByField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetStartTime()
    {
        try
        {
            return _driver.FindElement(startTimeField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetCompleteTime()
    {
        try
        {
            return _driver.FindElement(completeTimeField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetTotalDuration()
    {
        try
        {
            return _driver.FindElement(totalDurationField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetTotalCount()
    {
        try
        {
            return _driver.FindElement(totalCountField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetCorrectCount()
    {
        try
        {
            return _driver.FindElement(correctCountField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetGuessCount()
    {
        try
        {
            return _driver.FindElement(guessCountField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetGuessCorrectCount()
    {
        try
        {
            return _driver.FindElement(guessCorrectCountField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public ExamRunDetails[] GetExamRunDetails()
    {
        var items = _driver.FindElements(examDetailsItems);
        if (items.Count > 0)
        {
            var ret = new ExamRunDetails[items.Count];
            for (int i = 0; i < items.Count; i++)
            {
                var examRunDetail = new ExamRunDetails()
                {
                    ProblemTitle = items[i].FindElement(By.CssSelector("td:nth-child(1)")).Text,
                    UserAnswer = items[i].FindElement(By.CssSelector("td:nth-child(2)")).Text,
                    Correct = items[i].FindElement(By.CssSelector("td:nth-child(3)")).Text,
                    Guess = items[i].FindElement(By.CssSelector("td:nth-child(4)")).Text,
                    Duration = items[i].FindElement(By.CssSelector("td:nth-child(5)")).Text
                };

                ret[i] = examRunDetail;
            }
            return ret;
        }
        else
        {
            return [];
        }
    }

    public AssignmentViewPage? ClickGoToAssignment()
    {
        var link = _wait.Until(d => d.FindElement(goToAssignmentField));
        if (link != null)
        {
            link.Click();
            if (_wait.Until(d => d.Url.Contains("/assignment/view/")))
            {
                return new AssignmentViewPage(_driver);
            }
        }
        return null;
    }

}
