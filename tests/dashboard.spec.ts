import { test, expect } from '../fixtures/auth.fixture';

test.describe('OrangeHRM Dashboard', () => {
  test('should display dashboard after login', async ({ authenticatedPage }) => {
    await authenticatedPage.verifyDashboardLoaded();
    expect(authenticatedPage.page.url()).toContain('/dashboard');
  });

  test('should display user dropdown with admin name', async ({ authenticatedPage }) => {
    const welcomeText = await authenticatedPage.getWelcomeMessage();
    expect(welcomeText).toBeTruthy();
  });

  test('should display quick launch widgets', async ({ authenticatedPage }) => {
    const widgetCount = await authenticatedPage.getQuickLaunchCount();
    expect(widgetCount).toBeGreaterThan(0);
  });

  test('should navigate to PIM module', async ({ authenticatedPage }) => {
    await authenticatedPage.navigateToModule('PIM');
    await expect(authenticatedPage.page).toHaveURL(/pim/);
  });

  test('should navigate to Leave module', async ({ authenticatedPage }) => {
    await authenticatedPage.navigateToModule('Leave');
    await expect(authenticatedPage.page).toHaveURL(/leave/);
  });

  test('should logout successfully', async ({ authenticatedPage, page }) => {
    await authenticatedPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
  });
});
