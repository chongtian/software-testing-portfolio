using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace KpUiTestxUnit
{
    [Collection("UI Tests")]
    public abstract class TestBase: IDisposable
    {
        protected readonly IWebDriver _driver;
        protected readonly WebDriverWait _wait;
        protected readonly SetupFixture _fixture;

        public TestBase(SetupFixture fixture)
        {
            _fixture = fixture;
            _driver = fixture.GetDriverAndInjectSession();
            _wait = WebDriverUtility.GetWait(_driver, SetupFixture.TimeoutInSeconds);
        }

        public void Dispose()
        {
            _driver.Quit();
            _driver.Dispose();
        }

    }
}
