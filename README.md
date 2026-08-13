# ejadaAsessement# Ejada Assessment - Playwright Automation Framework

## Overview

This project is an automation framework developed using **Playwright with TypeScript**.

The framework covers:

- Web UI automation for SauceDemo
- Login scenarios
- Product selection and cart functionality
- Checkout and order completion
- Simple Books API automation
- GET, POST, PATCH and DELETE API operations
- API authentication using access tokens
- Allure reporting
- Page Object Model (POM)
- JSON-based test data and locators
- Excel-based test data support

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Playwright | UI and API automation |
| TypeScript | Programming language |
| Node.js | Runtime |
| Allure | Test reporting |
| XLSX | Excel test data |
| Git | Version control |
| GitHub | Source code repository |

---

## Project Structure

```text
ejadaAssessment/
│
├── Pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── Locators/
│   └── pageLocators.json
│
├── UserData/
│   └── UersLogin.json
│
├── data/
│   └── UserData.xlsx
│
├── tests/
│   ├── login.spec.ts
│   ├── order.spec.ts
│   └── simpleBooks.api.spec.ts
│
├── url.json
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md