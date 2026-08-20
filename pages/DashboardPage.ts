import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly dashboardHeading: Locator;
  readonly userDropdown: Locator;
  readonly logoutMenuItem: Locator;
  readonly sidebarMenu: Locator;
  readonly quickLaunchWidgets: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutMenuItem = page.locator('.oxd-userdropdown-link', { hasText: 'Logout' });
    this.sidebarMenu = page.locator('.oxd-sidepanel-body');
    this.quickLaunchWidgets = page.locator('.orangehrm-quick-launch-card');
  }

  async verifyDashboardLoaded() {
    await expect(this.sidebarMenu).toBeVisible();
    await expect(this.userDropdown).toBeVisible();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutMenuItem.click();
    await this.waitForPageLoad();
  }

  async navigateToModule(moduleName: string) {
    const menuItem = this.page.locator('.oxd-nav-item', { hasText: moduleName });
    await menuItem.click();
    await this.waitForPageLoad();
  }

  async getWelcomeMessage(): Promise<string> {
    await expect(this.userDropdown).toBeVisible();
    return this.userDropdown.innerText();
  }

  async getQuickLaunchCount(): Promise<number> {
    return this.quickLaunchWidgets.count();
  }
}
