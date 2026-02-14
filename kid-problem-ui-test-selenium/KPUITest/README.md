## UI Automation Suite | Kid Problems
A Selenium WebDriver framework built with C# and NUnit to validate the Kid Problems web application (refer to the repo here: [kid-problems](https://github.com/chongtian/kid-problems)). This project demonstrates SDET best practices including the Page Object Model (POM), clean code, and secure configuration management.

### Tech Stack
- Language: C# (.NET 8.0)
- Automation: Selenium WebDriver
- Test Runner: NUnit
- Pattern: Page Object Model (POM)

### Key Features
- Decoupled Logic: Separation of test scripts from page-specific elements for high maintainability.
- Fluent Wait Strategy: Implementation of WebDriverWait to eliminate flakiness caused by element load times.
- CI/CD Ready: Test credential can be provided through Environment Variables, *KPUITEST_USERNAME* and *KPUITEST_PASSWORD*, which is important for CI/CD pipeline.
