using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace KPUITest.Pages;

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
}