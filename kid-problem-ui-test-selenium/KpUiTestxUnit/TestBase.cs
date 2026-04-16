using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace KpUiTestxUnit
{
    public abstract class TestBase : IClassFixture<SetupFixture>, IDisposable
    {
        protected readonly IWebDriver _driver;
        protected readonly WebDriverWait _wait;
        protected readonly SetupFixture _fixture;

        public TestBase(SetupFixture fixture, bool isAdminUser = true)
        {
            _fixture = fixture;
            _driver = fixture.GetDriverAndInjectSession(isAdminUser);
            _wait = WebDriverUtility.GetWait(_driver, SetupFixture.TimeoutInSeconds);
        }

        public void Dispose()
        {
            _driver.Quit();
            _driver.Dispose();
        }

    }
}
