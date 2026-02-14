using OpenQA.Selenium;

namespace KPUITest.Pages
{
    public sealed class LoginPage : PageBase
    {
        private readonly By usernameField = By.Id("email");
        private readonly By passwordField = By.Id("password");
        private readonly By loginButton = By.TagName("button");

        public LoginPage(IWebDriver driver) : base(driver)
        { }

        public override bool IsPageLoaded(bool withData = false)
        {
            throw new NotImplementedException();
        }

        public bool Login(string username, string password)
        {
            _driver.Navigate().GoToUrl(Constants.BASE_URL + "/login");

            usernameField.FindElement(_driver).SendKeys(username);
            passwordField.FindElement(_driver).SendKeys(password);
            loginButton.FindElement(_driver).Click();

            var wait = WebDriverUtility.GetWait(_driver);
            try
            {
                wait.Until(d => d.Url.Contains("/home"));
                return true;
            }
            catch (WebDriverTimeoutException)
            {
                return false;
            }
        }


    }
}
