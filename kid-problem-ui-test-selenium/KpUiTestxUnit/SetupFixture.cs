using KpUiTestxUnit.Pages;
using KpUiTestxUnit.Utilties;
using Microsoft.Extensions.Configuration;
using OpenQA.Selenium;

namespace KpUiTestxUnit
{
    public class SetupFixture : IDisposable
    {

        private readonly Dictionary<string, IReadOnlyCollection<Cookie>> _authCookieStore = new();
        private readonly Dictionary<string, string> _localStorageStore = new();
        private readonly string AdminUserKey = "admin";
        private readonly string ChildUserKey = "child";

        private readonly string EnvVarPrefix = "KPUITEST_";
        private readonly string AdminUsernameEnvVarName = "KPUITEST_ADMIN_USERNAME";
        private readonly string AdminPasswordEnvVarName = "KPUITEST_ADMIN_PASSWORD";
        private readonly string ChildUsernameEnvVarName = "KPUITEST_CHILD_USERNAME";
        private readonly string ChildPasswordEnvVarName = "KPUITEST_CHILD_PASSWORD";
        
        public static string AdminUsername { get; private set; } = "";
        public static string AdminPassword { get; private set; } = "";
        public static string ChildUsername { get; private set; } = "";
        public static string ChildPassword { get; private set; } = "";
        public static string BaseUrl { get; private set; } = "";
        public static int TimeoutInSeconds { get; private set; } = 10;

        public SetupFixture()
        {
            ReadConfigurations();
            InitializePageFactory();

            // login - admin user
            IWebDriver driver = WebDriverUtility.GetDriver();

            var loginPage = new LoginPage(driver);
            if (!loginPage.Login(AdminUsername, AdminPassword))
            {
                Assert.Fail("Login of admin user failed. Please check credentials and application status.");
            }

            var cookies = driver.Manage().Cookies.AllCookies;
            _authCookieStore.Add(AdminUserKey, cookies);

            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            _localStorageStore.Add(AdminUserKey, js.ExecuteScript("return JSON.stringify(localStorage);")!.ToString());

            driver.Quit();
            driver.Dispose();

            // login - child user
            driver = WebDriverUtility.GetDriver();

            loginPage = new LoginPage(driver);
            if (!loginPage.Login(ChildUsername, ChildPassword))
            {
                Assert.Fail("Login of child user failed. Please check credentials and application status.");
            }

            cookies = driver.Manage().Cookies.AllCookies;
            _authCookieStore.Add(ChildUserKey, cookies);

            js = (IJavaScriptExecutor)driver;
            _localStorageStore.Add(ChildUserKey, js.ExecuteScript("return JSON.stringify(localStorage);")!.ToString());

            driver.Quit();
            driver.Dispose();
        }

        public IWebDriver GetDriverAndInjectSession(bool isAdminUser = true)
        {
            IWebDriver driver = WebDriverUtility.GetDriver();

            // 1. Navigate to the domain first
            driver.Navigate().GoToUrl(Constants.BASE_URL);

            string userKey = isAdminUser ? AdminUserKey : ChildUserKey;

            // 2. Inject Cookies
            foreach (var cookie in _authCookieStore[userKey])
            {
                driver.Manage().Cookies.AddCookie(cookie);
            }

            // 3. Inject Local Storage (via JS)
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            js.ExecuteScript($"var data = {_localStorageStore[userKey]}; for(var key in data) {{ localStorage.setItem(key, data[key]); }}");

            // 4. Refresh to reflect the logged-in state
            driver.Navigate().GoToUrl(Constants.HOME_URL);
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

            AdminUsername = config["Credentials:AdminUsername"] ?? "";
            AdminPassword = config["Credentials:AdminPassword"] ?? "";
            ChildUsername = config["Credentials:ChildUsername"] ?? "";
            ChildPassword = config["Credentials:ChildPassword"] ?? "";
            BaseUrl = config["BaseUrl"] ?? "";
            if (int.TryParse(config["TimeoutInSeconds"] ?? "10", out int t) && t > 0)
            {
                TimeoutInSeconds = t;
            }

            // If Username or Password is blank, try to get then from Environment Variables
            if (string.IsNullOrEmpty(AdminUsername))
            {
                AdminUsername = Environment.GetEnvironmentVariable(AdminUsernameEnvVarName) ?? "";
            }
            if (string.IsNullOrEmpty(AdminPassword))
            {
                AdminPassword = Environment.GetEnvironmentVariable(AdminPasswordEnvVarName) ?? "";
            }
            if (string.IsNullOrEmpty(ChildUsername))
            {
                ChildUsername = Environment.GetEnvironmentVariable(ChildUsernameEnvVarName) ?? "";
            }
            if (string.IsNullOrEmpty(ChildPassword))
            {
                ChildPassword = Environment.GetEnvironmentVariable(ChildPasswordEnvVarName) ?? "";
            }

            if (string.IsNullOrWhiteSpace(BaseUrl))
            {
                Assert.Fail("BaseUrl not provided. Set thitem in testsettings.local.json.");
            }

            if (string.IsNullOrWhiteSpace(AdminUsername) || string.IsNullOrWhiteSpace(AdminPassword)
                || string.IsNullOrWhiteSpace(ChildUsername) || string.IsNullOrWhiteSpace(ChildPassword))
            {
                Assert.Fail(
                    "Credentials not provided. Set them in testsettings.local.json or via env vars. ");
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