using KpUiTestxUnit.Utilties;
using OpenQA.Selenium;

namespace KpUiTestxUnit.Pages;

public sealed class MenuBarComponentPage : PageBase
{

    public MenuBarComponentPage(IWebDriver driver) : base(driver)
    { }

    public override bool IsPageLoaded(bool withData = false)
    {
        throw new NotImplementedException();
    }

    public ExamRunQueryPage? ClickSubmenuExamRunsBrowseAll()
    {
        int lv1MenuIndex = 0;
        int lv2MenuIndex = 1;
        return ClickSubmenu<ExamRunQueryPage>(lv1MenuIndex, lv2MenuIndex);
    }

    public ExamDefEditPage? ClickSubmenuCreateExamDefinition()
    {
        int lv1MenuIndex = 2;
        int lv2MenuIndex = 2;
        return ClickSubmenu<ExamDefEditPage>(lv1MenuIndex, lv2MenuIndex);
    }

    public ExamDefinitionQueryPage? ClickSubmenuBrowseActiveExamDefinition()
    {
        int lv1MenuIndex = 2;
        int lv2MenuIndex = 0;
        return ClickSubmenu<ExamDefinitionQueryPage>(lv1MenuIndex, lv2MenuIndex);
    }

    public AssignmentQueryPage? ClickSubmenuBrowseAllAssignments()
    {
        int lv1MenuIndex = 1;
        int lv2MenuIndex = 1;
        return ClickSubmenu<AssignmentQueryPage>(lv1MenuIndex, lv2MenuIndex);
    }

    /// <summary>
    /// Click Menu
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="lv1MenuIndex">0-based index of Level 1 menu</param>
    /// <param name="lv2MenuIndex">0-based index of Level 2 menu</param>
    /// <returns></returns>
    private T? ClickSubmenu<T>(int lv1MenuIndex, int lv2MenuIndex = 2) where T : PageBase
    {
        var lv1MenuItem = _wait.Until(d => d.FindElement(By.CssSelector($"kp-menu span:nth-child({lv1MenuIndex + 3}) > button")));
        if (lv1MenuItem != null && lv1MenuItem.Enabled && lv1MenuItem.Displayed)
        {
            lv1MenuItem.Click();
            var lv2MenuItems = _wait.Until(d => d.FindElements(By.CssSelector(".cdk-overlay-pane a")));
            if (lv2MenuItems.Count > lv2MenuIndex)
            {
                lv2MenuItems[lv2MenuIndex].Click();
                var factory = PageFactoryRegistry.Resolve<T>();
                return factory(_driver);
            }
        }
        return null;
    }

}
