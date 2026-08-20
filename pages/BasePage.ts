import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {}

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async navigate(path: string) {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }
}
