import { test, expect, CREDENTIALS } from '../fixtures/auth.fixture';

test.describe('OrangeHRM Login', () => {
  test('should display login page elements', async ({ loginPage }) => {
    await loginPage.verifyLoginPageVisible();
  });

  test('should login successfully with valid credentials', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(CREDENTIALS.admin.username, CREDENTIALS.admin.password);
    await dashboardPage.verifyDashboardLoaded();
    expect(loginPage.page.url()).toContain('/dashboard');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid credentials');
  });

  test('should show error for empty username', async ({ loginPage }) => {
    await loginPage.login('', 'admin123');
    const requiredError = loginPage.page.locator('.oxd-input-field-error-message');
    await expect(requiredError).toBeVisible();
  });

  test('should show error for empty password', async ({ loginPage }) => {
    await loginPage.login('Admin', '');
    const requiredError = loginPage.page.locator('.oxd-input-field-error-message');
    await expect(requiredError).toBeVisible();
  });

  test('should redirect to login page when accessing protected route unauthenticated', async ({ page }) => {
    await page.goto('/web/index.php/dashboard/index');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/auth/login');
  });
});
