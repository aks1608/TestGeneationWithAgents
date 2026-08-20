import { test, expect } from './fixtures/auth.fixture';

/**
 * Seed file — establishes the baseline environment for OrangeHRM.
 * Run this before using the playwright-test-generator agent to generate
 * new tests, or use it as a quick smoke check that the app is reachable.
 *
 * Site : https://opensource-demo.orangehrmlive.com
 * Creds: Admin / admin123  (override with ORANGEHRM_USERNAME / ORANGEHRM_PASSWORD)
 */
test.describe('OrangeHRM – Environment Seed', () => {
  test('app is reachable and login page loads', async ({ loginPage }) => {
    await loginPage.verifyLoginPageVisible();
    await expect(loginPage.page).toHaveURL(/auth\/login/);
  });

  test('admin can login and reach dashboard', async ({ authenticatedPage }) => {
    await authenticatedPage.verifyDashboardLoaded();
    await expect(authenticatedPage.page).toHaveURL(/dashboard/);
  });
});
