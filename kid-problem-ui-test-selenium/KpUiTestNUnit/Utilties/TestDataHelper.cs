namespace KpUiTestNUnit.Utilties;

public static class TestDataHelper
{
    public static string EncodeUrl(string r)
    {
        return r.Replace(" ", "%20");
    }
}
