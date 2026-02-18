using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace KpUiTestxUnit.Pages;

public abstract class PageBase
{
    protected readonly IWebDriver _driver;
    protected readonly WebDriverWait _wait;

    public PageBase(IWebDriver driver)
    {
        _driver = driver;
        _wait = WebDriverUtility.GetWait(_driver, SetupFixture.TimeoutInSeconds);
    }

    public abstract bool IsPageLoaded(bool withData = false);
}