using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace KpUiTestNUnit.Pages;

public abstract class PageBase
{
    protected readonly IWebDriver _driver;
    protected readonly WebDriverWait _wait;

    public PageBase(IWebDriver driver)
    {
        _driver = driver;
        _wait = WebDriverUtility.GetWait(_driver);
    }

    public abstract bool IsPageLoaded(bool withData = false);

    protected bool IsNotLoading()
    {
        By progressBar = By.CssSelector("mat-progress-bar");
        var notLoading = _wait.Until(d => d.FindElements(progressBar).Count == 0);

        try
        {
            var snackBar = _driver.FindElement(By.CssSelector("simple-snack-bar button"));
            if (snackBar is not null && snackBar.Enabled && snackBar.Displayed)
            {
                snackBar.Click();
            }
        }
        catch (NoSuchElementException)
        {
            // no action is required
        }

        notLoading = notLoading && _wait.Until(d => d.FindElements(By.CssSelector("simple-snack-bar button")).Count == 0);
        return notLoading;
    }
}