import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

// OrangeHRM credentials — override via environment variables for CI
export const CREDENTIALS = {
  admin: {
    username: process.env.ORANGEHRM_USERNAME ?? 'Admin',
    password: process.env.ORANGEHRM_PASSWORD ?? 'admin123',
  },
} as const;

export type OrangeHRMFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  employeeListPage: EmployeeListPage;
  authenticatedPage: DashboardPage;
};

export const test = base.extend<OrangeHRMFixtures>({
  // Provides a LoginPage instance
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Provides a DashboardPage instance (no auto-login)
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  // Provides an EmployeeListPage instance (no auto-login)
  employeeListPage: async ({ page }, use) => {
    await use(new EmployeeListPage(page));
  },

  // Performs login and provides an authenticated DashboardPage
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(CREDENTIALS.admin.username, CREDENTIALS.admin.password);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyDashboardLoaded();
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
