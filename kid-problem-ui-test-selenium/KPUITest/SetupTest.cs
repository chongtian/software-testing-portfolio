using KPUITest.Pages;
using KPUITest.Utilties;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using OpenQA.Selenium;

namespace KPUITest
{
    [SetUpFixture]
    public class SetupTest
    {

        private readonly string EnvVarPrefix = "KPUITEST_";
        private readonly string UsernameEnvVarName = "KPUITEST_USERNAME";
        private readonly string PasswordEnvVarName = "KPUITEST_PASSWORD";
        public static string Username { get; private set; } = "";
        public static string Password { get; private set; } = "";
        public static string BaseUrl { get; private set; } = "";


        [OneTimeSetUp]
        public void OneTimeSetup()
        {

            ReadConfigurations();
            InitializePageFactory();

            IWebDriver driver = WebDriverUtility.GetDriver();

            // login
            var loginPage = new LoginPage(driver);
            if (!loginPage.Login(Username, Password))
            {
                throw new AssertionException("Login failed. Please check credentials and application status.");
            }

            // store
            // Get all cookies
            var cookies = driver.Manage().Cookies.AllCookies;
            string jsonCookies = JsonConvert.SerializeObject(cookies);
            File.WriteAllText("cookies.json", jsonCookies);

            // Get Local Storage (if your app uses JWT/Tokens)
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            var localStorage = js.ExecuteScript("return JSON.stringify(localStorage);")!.ToString();
            File.WriteAllText("localStorage.json", localStorage);

            driver.Quit();
            driver.Dispose();
        }

        private void ReadConfigurations()
        {
            var basePath = TestContext.CurrentContext.TestDirectory;

            var config = new ConfigurationBuilder()
                            .SetBasePath(basePath)
                            .AddJsonFile("testsettings.json", optional: false, reloadOnChange: false)
                            .AddJsonFile("testsettings.local.json", optional: true, reloadOnChange: false)
                            .AddEnvironmentVariables(prefix: EnvVarPrefix)
                            .Build();

            Username = config["Credentials:Username"] ?? "";
            Password = config["Credentials:Password"] ?? "";
            BaseUrl = config["BaseUrl"] ?? "";

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
                Assert.Inconclusive("BaseUrl not provided. Set thitem in testsettings.local.json.");
            }

            if (string.IsNullOrWhiteSpace(Username) || string.IsNullOrWhiteSpace(Password))
            {
                Assert.Inconclusive(
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