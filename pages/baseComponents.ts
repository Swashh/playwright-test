import { Locator, Page, expect } from '@playwright/test';

export class BaseComponents {
  readonly page: Page;
  readonly logoHeader: Locator;
  readonly aboutUsBtn: Locator;
  readonly informationAboutCompanyBtn: Locator;
  readonly autoparkBtn: Locator;
  readonly contactsBtn: Locator;
  readonly closeModalWindowBtn: Locator;
  private handlerRegistered: boolean = false;

  constructor(page: Page) {
    this.page = page;
    this.closeModalWindowBtn = this.page.locator("[role='dialog'] >  button[aria-label='close']");
    this.contactsBtn = this.page.getByTestId('header-services-element-3');
    this.autoparkBtn = this.page.getByTestId('header-services-element-2');
    this.informationAboutCompanyBtn = this.page.getByTestId('header-services-element-1');
    this.aboutUsBtn = this.page.getByTestId('header-button-services').first();
    this.logoHeader = this.page.getByTestId('main-page-logo').first();
  }

  async goTo(route) {
    await this.page.addLocatorHandler(
      this.closeModalWindowBtn,
      async (overlay) => {
        try {
          console.log('Знайдена кнопка закриття модального вікна, клікаєм');
          await overlay.click();
          console.log('Модальне вікно закрито');
        } catch (e) {
          console.warn('Помилка при кліку на закриття модального вікна:', e);
        }
      },
      { times: 1, noWaitAfter: true }
    );
    this.handlerRegistered = true;

    await this.page.goto(route, {
      waitUntil: 'load',
      timeout: 30_000,
    });
  }
  async cleanup() {
    if (this.handlerRegistered) {
      await this.page.removeLocatorHandler(this.closeModalWindowBtn);
      console.log('Обробник модального вікна видаленний');
      this.handlerRegistered = false;
    } else {
      console.log('Обробник не був зареганий, пропускаємо видалення');
    }
  }

  async checkLogoHeaderExist() {
    await expect(this.logoHeader).toBeVisible();
  }

  async clickAboutUsBtn() {
    await this.aboutUsBtn.click();
  }

  async clickInformationAboutCompanyBtn() {
    await this.informationAboutCompanyBtn.waitFor({ state: 'visible', timeout: 10_000 });
    await this.informationAboutCompanyBtn.click();
    await this.page.waitForURL('**/about-us');
  }

  async clickAutoparkBtn() {
    await this.autoparkBtn.waitFor({ state: 'visible', timeout: 10_000 });
    await this.autoparkBtn.click();
    await this.page.waitForURL('**/our-buses');
  }

  async clickContactsBtn() {
    await this.autoparkBtn.waitFor({ state: 'visible', timeout: 10_000 });
    await this.contactsBtn.click();
    await this.page.waitForURL('**/contacts');
  }
}
