using OpenQA.Selenium;

namespace KpUiTestNUnit.Pages;

public sealed class ExamDefEditPage : PageBase
{

    public readonly static string PageUrlCreate = $"{Constants.BASE_URL}/examdef/create";
    public readonly static string PageUrlEdit = $"{Constants.BASE_URL}/examdef/edit";

    private readonly By examTitleField = By.CssSelector("input[formcontrolname='ExamTitle']");
    private readonly By examYearField = By.CssSelector("input[formcontrolname='ExamYear']");
    private readonly By memoField = By.CssSelector("input[formcontrolname='Memo']");
    private readonly By examCategoryField = By.CssSelector("mat-select[formcontrolname='ExamCategory']");
    private readonly By examTypeField = By.CssSelector("mat-select[formcontrolname='ExamType']");
    private readonly By activeFlagField = By.CssSelector("mat-checkbox[formcontrolname='Active'] input[type='checkbox']");
    private readonly By addExamDetailsFromQueryButton = By.CssSelector("mat-card-actions:nth-child(2) > button:nth-child(1)");
    private readonly By selectAndCloseButtonOnQuery = By.CssSelector(".cdk-overlay-pane button:nth-child(1)");
    private readonly By problemsInExamDetails = By.CssSelector("div.w3-row a");
    private readonly By saveButton = By.CssSelector("mat-card-actions:nth-child(2) > button:nth-child(5)");
    private readonly By viewButton = By.CssSelector("mat-card-actions:nth-child(1) button");

    public ExamDefEditPage(IWebDriver driver) : base(driver)
    { }

    public override bool IsPageLoaded(bool withData = false)
    {
        if (withData)
        {
            int attempts = 10;
            var shortWait = WebDriverUtility.GetWait(_driver, 1);
            while (attempts > 0)
            {
                try
                {
                    var examTitleElement = shortWait.Until(d => d.FindElement(examTitleField));
                    if (examTitleElement != null && !string.IsNullOrEmpty(examTitleElement.GetAttribute("value")?.ToString()))
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
        }

        var loaded = _wait.Until(d => d.FindElement(By.CssSelector("app-exam-def-detail-view > h3")).Text.Contains("Edit Exam Definition"));
        loaded = loaded && _driver.FindElements(By.CssSelector("mat-select")).Count.Equals(2);
        loaded = loaded && IsNotLoading();
        return loaded;
    }

    // itemIndex is 1-based
    public void SelectExamCategory(int itemIndex)
    {
        string selectOptions = $".cdk-overlay-pane mat-option:nth-child({itemIndex})";

        // The options of ExamCategoty are loaded from an API call
        // but there is no good check to verify the API call is completed,
        // so we click the mat-select serveral times until we see the items
        int attempts = 10;
        var shortWait = WebDriverUtility.GetWait(_driver, 1);
        while (attempts > 0)
        {
            _driver.FindElement(examCategoryField).Click();
            try
            {
                if (shortWait.Until(d => d.FindElements(By.CssSelector(selectOptions)).Count > 0))
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
            throw new WebDriverTimeoutException("Exam Category options failed to load after clicking mat-select multiple times.");
        }

        _driver.FindElement(By.CssSelector(selectOptions)).Click();
    }

    public string GetSelectExamcCategory()
    {
        return _driver.FindElement(examCategoryField).Text;
    }


    public void EnterExamTitle(string value)
    {
        _driver.FindElement(examTitleField).SendKeys(value);
    }

    public string GetExamTitle()
    {
        return _driver.FindElement(examTitleField).GetAttribute("value") ?? "";
    }

    public void EnterExamYear(string value)
    {
        _driver.FindElement(examYearField).SendKeys(value);
    }

    public void EnterMemo(string value)
    {
        _driver.FindElement(memoField).SendKeys(value);
    }

    public void SelectExamType(int itemIndex)
    {
        string selectOptions = $".cdk-overlay-pane mat-option:nth-child({itemIndex})";

        _driver.FindElement(examTypeField).Click();
        try
        {
            _wait.Until(d => d.FindElements(By.CssSelector(selectOptions)).Count > 0);
        }
        catch (WebDriverTimeoutException)
        {
            throw;
        }

        _driver.FindElement(By.CssSelector(selectOptions)).Click();
    }

    public void SetActiveFlag(bool value)
    {
        var checkbox = _wait.Until(d => d.FindElement(activeFlagField));
        if (checkbox != null)
        {
            if ((!checkbox.Selected && value) || (checkbox.Selected && !value))
            {
                checkbox.Click();
            }
        }
    }

    public bool? GetActiveFlag()
    {
        var checkbox = _wait.Until(d => d.FindElement(activeFlagField));
        if (checkbox != null)
        {
            return checkbox.Selected;
        }
        return null;
    }

    public void ClickAddExamDetails()
    {
        _driver.FindElement(addExamDetailsFromQueryButton).Click();
    }

    public int AddExamDetailsByRegularQuery(int[] selectItems)
    {
        _driver.FindElement(addExamDetailsFromQueryButton).Click();
        var isReturnRecord = _wait.Until(d => d.FindElements(By.CssSelector(".cdk-overlay-pane mat-checkbox")).Count > 0);

        if (isReturnRecord)
        {
            var allCheckBoxes = _driver.FindElements(By.CssSelector(".cdk-overlay-pane input[type='checkbox']"));

            foreach (int i in selectItems)
            {
                if (i >= 0 && i < allCheckBoxes.Count)
                {
                    if (!allCheckBoxes[i].Selected)
                    {
                        allCheckBoxes[i].Click();
                    }
                }
            }

            _driver.FindElement(selectAndCloseButtonOnQuery).Click();

            try
            {
                _wait.Until(d => d.FindElements(problemsInExamDetails).Count > 0);
            }
            catch (WebDriverTimeoutException)
            {
                throw;
            }

            return allCheckBoxes.Count;
        }

        return 0;
    }

    public string[] GetProblemTitlesFromExamDetails()
    {
        var items = _driver.FindElements(problemsInExamDetails);
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

    public void ClickSaveButton()
    {
        var btn = _driver.FindElement(saveButton) ?? throw new NotFoundException("Cannot find Save Uutton");
        btn.Click();
        IAlert alert = _wait.Until(d => d.SwitchTo().Alert());
        // alert.Text has text
        alert.Accept();

        try
        {
            _wait.Until(d => d.Url.Contains(PageUrlEdit));
            _wait.Until(d => !d.FindElement(saveButton).Enabled);
        }
        catch (WebDriverTimeoutException)
        {
            throw;
        }
    }

    public ExamDefViewPage? ClickBackToViewButton()
    {
        var btn = _wait.Until(d => d.FindElement(viewButton));

        if (btn != null && btn.Displayed && btn.Enabled)
        {
            btn.Click();
            return new ExamDefViewPage(_driver);
        }
        return null;
    }

}
