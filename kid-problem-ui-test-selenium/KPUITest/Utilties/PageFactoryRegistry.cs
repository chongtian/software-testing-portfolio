using KPUITest.Pages;
using OpenQA.Selenium;
using System.Collections.Concurrent;

namespace KPUITest.Utilties;

public static class PageFactoryRegistry
{
    private static readonly ConcurrentDictionary<Type, Delegate> _map = new();

    // Register a factory for a page type
    public static void Register<T>(Func<IWebDriver, T> factory) where T : PageBase
        => _map[typeof(T)] = factory;

    // Resolve the factory
    public static Func<IWebDriver, T> Resolve<T>() where T : PageBase
    {
        if (_map.TryGetValue(typeof(T), out var del) && del is Func<IWebDriver, T> typed)
            return typed;

        throw new InvalidOperationException($"No factory registered for {typeof(T).Name}. ");
    }
}
