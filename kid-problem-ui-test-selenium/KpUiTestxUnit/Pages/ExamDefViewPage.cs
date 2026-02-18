using OpenQA.Selenium;

namespace KpUiTestxUnit.Pages;

public sealed class ExamDefViewPage : PageBase
{

    public readonly static string PageUrl = $"{Constants.BASE_URL}/examdef/view";

    private readonly By examTitleField = By.CssSelector("mat-card-content .w3-cell-row .w3-cell:nth-child(1) span:nth-child(2)");
    private readonly By examCategoryField = By.CssSelector("mat-card-content .w3-cell-row .w3-cell:nth-child(2) span:nth-child(2)");
    private readonly By examYearField = By.CssSelector("mat-card-content .w3-cell-row .w3-cell:nth-child(3) span:nth-child(2)");
    private readonly By examTypeField = By.CssSelector("mat-card-content .w3-cell-row .w3-cell:nth-child(4) span:nth-child(2)");
    private readonly By memoField = By.CssSelector("mat-card-content .w3-cell-row .w3-cell:nth-child(5) span:nth-child(2)");
    private readonly By activeField = By.CssSelector("mat-card-content .w3-cell-row .w3-cell:nth-child(6) span:nth-child(2)");

    private readonly By examDetailsItems = By.CssSelector(".w3-row .w3-col");

    private readonly By editButton = By.CssSelector("mat-card-actions > button:nth-child(1)");
    private readonly By createAssignmentButton = By.CssSelector("mat-card-actions > button:nth-child(3)");

    public ExamDefViewPage(IWebDriver driver) : base(driver)
    { }

    public override bool IsPageLoaded(bool withData = false)
    {
        int attempts = 5;
        var shortWait = WebDriverUtility.GetWait(_driver, 1);
        while (attempts > 0)
        {
            try
            {
                var examTitleElement = shortWait.Until(d => d.FindElement(examTitleField));
                if (examTitleElement != null && !string.IsNullOrEmpty(examTitleElement.Text))
                {
                    break;
                }
            }
            catch (WebDriverTimeoutException)
            {
                attempts--;
            }
        }
        if (attempts <= 0)
        {
            throw new WebDriverTimeoutException("Failed to load page.");
        }

        var loaded = _wait.Until(d => d.FindElement(By.CssSelector("app-exam-def-detail-view > h3")).Text.Contains("View Exam Definition"));
        loaded = loaded && IsNotLoading();
        return loaded;
    }

    public string GetExamTitle()
    {
        return _driver.FindElement(examTitleField).Text.Trim();
    }

    public string GetExamCategory()
    {
        return _driver.FindElement(examCategoryField).Text.Trim();
    }

    public string GetExamYear()
    {
        return _driver.FindElement(examYearField).Text.Trim();
    }

    public string GetExamType()
    {
        return _driver.FindElement(examTypeField).Text.Trim();
    }

    public string GetMemo()
    {
        return _driver.FindElement(memoField).Text.Trim();
    }

    public string GetActiveFlag()
    {
        return _driver.FindElement(activeField).Text.Trim();
    }

    public string[] GetProblemTitlesFromExamDetails()
    {
        var items = _driver.FindElements(examDetailsItems);
        if (items.Count > 0)
        {
            var ret = new string[items.Count];
            for (int i = 0; i < items.Count; i++)
            {
                ret[i] = items[i].Text.Trim();
            }
            return ret;
        }
        else
        {
            return [];
        }
    }

    public AssignmentViewPage? ClickCreateAssignmentButton()
    {
        var btn = _wait.Until(d => d.FindElement(createAssignmentButton));
        btn.Click();
        IAlert alert = _wait.Until(d => d.SwitchTo().Alert());
        // alert.Text has text
        alert.Accept();

        try
        {
            _wait.Until(d => d.Url.Contains(AssignmentViewPage.PageUrl));
            return new AssignmentViewPage(_driver);
        }
        catch (WebDriverTimeoutException)
        {
            return null;
        }

    }

    public bool ClickEditButton()
    {
        var btn = _wait.Until(d => d.FindElement(editButton));

        if (btn != null && btn.Displayed && btn.Enabled)
        {
            btn.Click();
            return true;
        }
        return false;
    }

    private bool IsNotLoading()
    {
        By progressBar = By.CssSelector("mat-progress-bar");
        return _wait.Until(d => d.FindElements(progressBar).Count == 0);
    }

}
