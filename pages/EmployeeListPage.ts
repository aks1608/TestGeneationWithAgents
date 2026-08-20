import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeListPage extends BasePage {
  readonly pageHeading: Locator;
  readonly addEmployeeButton: Locator;
  readonly searchButton: Locator;
  readonly employeeNameInput: Locator;
  readonly employeeTable: Locator;
  readonly employeeRows: Locator;
  readonly recordsFound: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.addEmployeeButton = page.locator('button', { hasText: 'Add' });
    this.searchButton = page.locator('button[type="submit"]');
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.employeeTable = page.locator('.oxd-table');
    this.employeeRows = page.locator('.oxd-table-row--with-border');
    this.recordsFound = page.locator('.oxd-text--span', { hasText: /Record/ });
  }

  async goto() {
    await this.navigate('/web/index.php/pim/viewEmployeeList');
  }

  async searchByEmployeeName(name: string) {
    await this.employeeNameInput.fill(name);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async verifyPageLoaded() {
    await expect(this.addEmployeeButton).toBeVisible();
    await expect(this.employeeTable).toBeVisible();
  }

  async getEmployeeRowCount(): Promise<number> {
    return this.employeeRows.count();
  }

  async getRecordsFoundText(): Promise<string> {
    await expect(this.recordsFound).toBeVisible();
    return this.recordsFound.innerText();
  }
}
