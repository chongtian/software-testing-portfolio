using OpenQA.Selenium;

namespace KPUITest.Pages;

public sealed class AssignmentViewPage : PageBase
{
    public readonly static string PageUrl = $"{Constants.BASE_URL}/assignment/view";

    private readonly By examCategoryField = By.CssSelector("mat-list:nth-child(1) mat-list-item:nth-child(1) span:nth-child(2)");
    private readonly By examTitleField = By.CssSelector("mat-list:nth-child(1) mat-list-item:nth-child(2) span:nth-child(2)");
    private readonly By createTimeField = By.CssSelector("mat-list:nth-child(1) mat-list-item:nth-child(3) span:nth-child(2)");
    private readonly By memoField = By.CssSelector("mat-list:nth-child(1) mat-list-item:nth-child(4) span:nth-child(2)");
    private readonly By completedField = By.CssSelector("mat-list:nth-child(1) mat-list-item:nth-child(5) span:nth-child(2)");

    private readonly By examRunsList = By.CssSelector("mat-list:nth-child(4) mat-list-item");


    public AssignmentViewPage(IWebDriver driver) : base(driver)
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

    public string GetCreateTime()
    {
        try
        {
            return _driver.FindElement(createTimeField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetMemo()
    {
        try
        {
            return _driver.FindElement(memoField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string GetCompleted()
    {
        try
        {
            return _driver.FindElement(completedField).Text;
        }
        catch (NoSuchElementException)
        {
            return "";
        }
    }

    public string[] GetExamRunLabels()
    {
        var items = _driver.FindElements(examRunsList);
        if (items.Count > 0)
        {
            var ret = new string[items.Count];
            for (int i = 0; i < items.Count; i++)
            {
                ret[i] = items[i].Text;
            }
            return ret;
        }
        else
        {
            return [];
        }
    }

    private bool IsNotLoading()
    {
        By progressBar = By.CssSelector("mat-progress-bar");
        return _wait.Until(d => d.FindElements(progressBar).Count == 0);
    }

}
