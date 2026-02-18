using System;
using NUnit.Framework;
using NUnit.Framework.Interfaces;

namespace KpUiTestNUnit.Utilties;

public class RetryLoggerAttribute : Attribute, ITestAction
{
    public void BeforeTest(ITest test)
    {
        int retry = TestContext.CurrentContext.CurrentRepeatCount;

        if (retry > 0)
        {
            // the text written to console will be included in the test report
            Console.WriteLine($"[RetryLogger] Test '{test.Name} retry attempt #{retry}");
        }
    }

    public void AfterTest(ITest test)
    {
        // optional: log after each retry or after final result
    }

    public ActionTargets Targets => ActionTargets.Test;
}
