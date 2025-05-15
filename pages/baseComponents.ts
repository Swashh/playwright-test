import { Locator, Page, expect } from '@playwright/test';


export class BaseComponents {
  readonly logoHeader = 'main-page-logo';
  readonly aboutUsBtn = 'header-button-services';
  readonly informationAboutCompanyBtn = 'header-services-element-1';
  readonly autoparkBtn = 'header-services-element-2';
  readonly contactsBtn = 'header-services-element-3';
  readonly dialogModalWindow = 'dialog';
  readonly closeModalWindowBtn: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.closeModalWindowBtn = this.page.getByRole('button', { name: 'close' })
  }

  async goTo(route) {
    await this.page.goto(route, {
      waitUntil: 'domcontentloaded',
      timeout: 90_000,
    });
    await this.checkAndCloseModal();
    await this.page.waitForLoadState('networkidle', { timeout:95000 });
  }

  async checkLogoHeaderExist() {
    await expect(this.page.getByTestId(this.logoHeader).first()).toBeVisible();
  }

  async clickAboutUsBtn() {
    await this.page.getByTestId(this.aboutUsBtn).first().click();
  }

  async clickInformationAboutCompanyBtn() {
    await this.page.getByTestId(this.informationAboutCompanyBtn).waitFor({ state: 'visible', timeout: 10_000 });
    await this.page.getByTestId(this.informationAboutCompanyBtn).click();
    await this.page.waitForURL('**/about-us');
    await expect(this.page.locator('h1').first()).toHaveText('Про компанію');
  }

  async clickAutoparkBtn() {
    await this.page.getByTestId(this.autoparkBtn).waitFor({ state: 'visible', timeout: 10_000 });
    await this.page.getByTestId(this.autoparkBtn).click();
    await this.page.waitForURL('**/our-buses');
    await expect(this.page.locator('h1').first()).toHaveText('Наш автопарк');
  }

  async clickContactsBtn() {
    await this.page.getByTestId(this.autoparkBtn).waitFor({ state: 'visible', timeout: 10_000 });
    await this.page.getByTestId(this.contactsBtn).click();
    await this.page.waitForURL('**/contacts');
    await expect(this.page.locator('h1').first()).toHaveText('Наші контакти');
  }

  async checkAndCloseModal() {
    // await this.closeModalWindowBtn.waitFor({ state: 'visible', timeout: 30_000 })
    if ((await this.closeModalWindowBtn.count()) > 0) {
    await this.closeModalWindowBtn.click()
    await this.closeModalWindowBtn.waitFor({ state: 'hidden', timeout: 5000 })
    } 
  }
}
