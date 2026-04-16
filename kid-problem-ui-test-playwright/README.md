## Playwright Test Suites | Kid Problems
This test suite showcases Playwright test framework to validate the Kid Problems web application (refer to the repo here: [kid-problems](https://github.com/chongtian/kid-problems)). This test suite demonstrates SDET best practices including the Page Object Model (POM), clean code, and secure configuration management.

### Tech Stack
- Language: Typescript
- Automation: Playwright
- Pattern: Page Object Model (POM)

### Key Features
- Decoupled Logic: Separation of test scripts from page-specific elements for high maintainability.
- CI/CD Ready: Test credential can be provided through Environment Variables, *KPUITEST_USERNAME* and *KPUITEST_PASSWORD*, which is important for CI/CD pipeline.

### Notes
 - I’ve moved the **KidProblem** source code and DevOps setup from Azure DevOps to GitHub. Going forward, I’ll maintain the automated tests in the KidProblem GitHub repository. Please see the repo here: [kid-problems](https://github.com/chongtian/kid-problems).
 - I will primarily use Selenium to test the Kid Problem web application to clearly demonstrate my expertise with Selenium. I do not plan to make significant updates to the Playwright test suite for this application. I will continue my Playwright work on a different web application.