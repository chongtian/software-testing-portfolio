## Playwright Test Suites | NSERP
This test suite showcases Playwright test framework to validate the NSERP web application. This test suite demonstrates SDET best practices including the Page Object Model (POM), clean code, and secure configuration management.

### NSERP Web Application
NSERP is a web application that helps microbusinesses manage customer information, purchase orders, shipments, invoices, and payments. I began developing NSERP in 2009 as a lightweight, practical solution to support day‑to‑day business operations. While intentionally minimal, it has proven useful in real-world scenarios. Over the years, I have evolved the technology stack multiple times. The current stack is identical to KidProblem, as both applications share the same underlying framework.

#### Tech Stack
- Database: Amazon DynomoDb
- Authorization and Authentication: Amazon Cognito
- Backend Service: .Net 8 hosted as an Amazon Lambda function
- Frontend application: Angular App host in Amazon S3

The primary repository and DevOps setup are hosted in Azure DevOps, and there are no plans to migrate them to GitHub. This repository mirrors the Playwright test suite used in Azure DevOps and is intended solely to showcase my expertise with Playwright.

### Tech Stack of Test Suite
- Language: Typescript
- Automation: Playwright
- Pattern: Page Object Model (POM)

### Key Features
- Decoupled Logic: Separation of test scripts from page-specific elements for high maintainability.
- CI/CD Ready: Test credential can be provided through Environment Variables, *TEST_USER_USERNAME* and *TEST_USER_PASSWORD*, which is important for CI/CD pipeline.

