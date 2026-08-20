import { test, expect } from '../fixtures/auth.fixture';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test.describe('OrangeHRM Employee List', () => {
  test.beforeEach(async ({ authenticatedPage, page }) => {
    const employeeListPage = new EmployeeListPage(page);
    await employeeListPage.goto();
    await employeeListPage.verifyPageLoaded();
  });

  test('should display employee list page after login', async ({ page }) => {
    const employeeListPage = new EmployeeListPage(page);
    await expect(employeeListPage.employeeTable).toBeVisible();
    await expect(employeeListPage.addEmployeeButton).toBeVisible();
  });

  test('should display records found label', async ({ page }) => {
    const employeeListPage = new EmployeeListPage(page);
    const recordsText = await employeeListPage.getRecordsFoundText();
    expect(recordsText).toMatch(/\(\d+ Records\)/);
  });

  test('should show employee results when searching by name', async ({ page }) => {
    const employeeListPage = new EmployeeListPage(page);
    await employeeListPage.searchByEmployeeName('Admin');
    const recordsText = await employeeListPage.getRecordsFoundText();
    expect(recordsText).not.toContain('(0 Records)');
  });

  test('should show no results for non-existent employee', async ({ page }) => {
    const employeeListPage = new EmployeeListPage(page);
    await employeeListPage.searchByEmployeeName('ZZZNOBODYZZZZ');
    const recordsText = await employeeListPage.getRecordsFoundText();
    expect(recordsText).toContain('(0 Records)');
  });
});
