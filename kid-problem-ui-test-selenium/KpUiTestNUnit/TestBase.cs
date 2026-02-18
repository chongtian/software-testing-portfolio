using Newtonsoft.Json;
using OpenQA.Selenium;

namespace KpUiTestNUnit
{
    public abstract class TestBase
    {
        protected IWebDriver Driver;

        private const string LocalCookiesFile = "cookies.json";
        private const string LocalStorageFile = "localStorage.json";

        [SetUp]
        public void SetUp()
        {
            Driver = WebDriverUtility.GetDriver();
            InjectSession(Driver);
        }

        [TearDown]
        public void TearDown()
        {
            Driver.Quit();
            Driver.Dispose();
        }

        public void InjectSession(IWebDriver driver)
        {
            // 1. Navigate to the domain first
            driver.Navigate().GoToUrl(Constants.BASE_URL + "/login");

            // 2. Inject Cookies
            var cookieData = File.ReadAllText(LocalCookiesFile);
            var cookies = JsonConvert.DeserializeObject<List<Cookie>>(cookieData);
            foreach (var cookie in cookies)
            {
                driver.Manage().Cookies.AddCookie(cookie);
            }

            // 3. Inject Local Storage (via JS)
            var storageData = File.ReadAllText(LocalStorageFile);
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            js.ExecuteScript($"var data = {storageData}; for(var key in data) {{ localStorage.setItem(key, data[key]); }}");

            // 4. Refresh to reflect the logged-in state
            driver.Navigate().Refresh();
        }
    }
}
