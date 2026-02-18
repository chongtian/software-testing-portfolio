using KpUiTestxUnit.Pages;
using KpUiTestxUnit.Utilties;
using Microsoft.Extensions.Configuration;
using OpenQA.Selenium;

namespace KpUiTestxUnit
{
    public class SetupFixture : IDisposable
    {

        private IReadOnlyCollection<Cookie> AuthCookies { get; set; }
        private string? LocalStorage { get; set; }

        private readonly string EnvVarPrefix = "KPUITEST_";
        private readonly string UsernameEnvVarName = "KPUITEST_USERNAME";
        private readonly string PasswordEnvVarName = "KPUITEST_PASSWORD";
        private readonly string TimeoutEnvVarName = "KPUITEST_TIMEOUT";
        public static string Username { get; private set; } = "";
        public static string Password { get; private set; } = "";
        public static string BaseUrl { get; private set; } = "";
        public static int TimeoutInSeconds { get; private set; } = 10;

        public SetupFixture()
        {
            ReadConfigurations();
            InitializePageFactory();

            IWebDriver driver = WebDriverUtility.GetDriver();

            // login
            var loginPage = new LoginPage(driver);
            if (!loginPage.Login(Username, Password))
            {
                Assert.Fail("Login failed. Please check credentials and application status.");
            }

            AuthCookies = driver.Manage().Cookies.AllCookies;

            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            LocalStorage = js.ExecuteScript("return JSON.stringify(localStorage);")!.ToString();

            driver.Quit();
            driver.Dispose();
        }

        public IWebDriver GetDriverAndInjectSession()
        {
            IWebDriver driver = WebDriverUtility.GetDriver();

            // 1. Navigate to the domain first
            driver.Navigate().GoToUrl(Constants.BASE_URL + "/login");

            // 2. Inject Cookies
            foreach (var cookie in AuthCookies)
            {
                driver.Manage().Cookies.AddCookie(cookie);
            }

            // 3. Inject Local Storage (via JS)
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            js.ExecuteScript($"var data = {LocalStorage}; for(var key in data) {{ localStorage.setItem(key, data[key]); }}");

            // 4. Refresh to reflect the logged-in state
            driver.Navigate().Refresh();

            return driver;
        }


        public void Dispose()
        {
            // Runs ONCE after all tests 
        }


        private void ReadConfigurations()
        {
            string basePath = AppDomain.CurrentDomain.BaseDirectory;

            var config = new ConfigurationBuilder()
                            .SetBasePath(basePath)
                            .AddJsonFile("testsettings.json", optional: false, reloadOnChange: false)
                            .AddJsonFile("testsettings.local.json", optional: true, reloadOnChange: false)
                            .AddEnvironmentVariables(prefix: EnvVarPrefix)
                            .Build();

            Username = config["Credentials:Username"] ?? "";
            Password = config["Credentials:Password"] ?? "";
            BaseUrl = config["BaseUrl"] ?? "";
            if (int.TryParse(config["TimeoutInSeconds"] ?? "10", out int t) && t > 0)
            {
                TimeoutInSeconds = t;
            }

            // If Username or Password is blank, try to get then from Environment Variables
            if (string.IsNullOrEmpty(Username))
            {
                Username = Environment.GetEnvironmentVariable(UsernameEnvVarName) ?? "";
            }
            if (string.IsNullOrEmpty(Password))
            {
                Password = Environment.GetEnvironmentVariable(PasswordEnvVarName) ?? "";
            }

            if (string.IsNullOrWhiteSpace(BaseUrl))
            {
                Assert.Fail("BaseUrl not provided. Set thitem in testsettings.local.json.");
            }

            if (string.IsNullOrWhiteSpace(Username) || string.IsNullOrWhiteSpace(Password))
            {
                Assert.Fail(
                    "Credentials not provided. Set them in testsettings.local.json or via env vars " +
                    "TEST_CREDENTIALS__USERNAME / TEST_CREDENTIALS__PASSWORD (or TEST_USERNAME / TEST_PASSWORD).");
            }
        }

        private void InitializePageFactory()
        {
            PageFactoryRegistry.Register(d => new ExamDefEditPage(d));
            PageFactoryRegistry.Register(d => new ExamDefViewPage(d));
            PageFactoryRegistry.Register(d => new ExamRunQueryPage(d));
            PageFactoryRegistry.Register(d => new MenuBarComponentPage(d));
            PageFactoryRegistry.Register(d => new ExamDefinitionQueryPage(d));
            PageFactoryRegistry.Register(d => new DashboardPage(d));
            PageFactoryRegistry.Register(d => new ExamRunViewPage(d));
            PageFactoryRegistry.Register(d => new AssignmentQueryPage(d));
            PageFactoryRegistry.Register(d => new AssignmentViewPage(d));

        }


    }
}