import { Locator, Page, expect } from '@playwright/test';

export class FilterPage {
  readonly page: Page;
  readonly filterBtn: Locator;
  readonly closeFilterBtn: Locator;
  readonly sendingRadioBtn: Locator;
  readonly priceRadioBtn: Locator;
  readonly durationRadioBtn: Locator;
  readonly stationInKhm: Locator;
  readonly stationInBonn: Locator;
  readonly showTripBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterBtn = page.getByRole('button', { name: 'Фільтри' });
    this.closeFilterBtn = page.locator('[data-sentry-element="StyledCloseIconButton"]');
    this.sendingRadioBtn = page.getByRole('radio', { name: 'Відправлення (найраніше)' });
    this.priceRadioBtn = page.getByRole('radio', { name: 'Ціна (найнижча)' });
    this.durationRadioBtn = page.getByRole('radio', { name: 'Тривалість (найкоротша)' });
    this.stationInKhm = page.getByRole('checkbox', { name: 'KLR Bus Terminal' });
    this.stationInBonn = page.getByRole('checkbox', { name: 'Campus' });
    this.showTripBtn = page.getByRole('button', { name: 'Показати подорожі' });
  }
  async clickFilterBtn() {
    await this.filterBtn.click();
    await expect(this.closeFilterBtn).toBeVisible();
  }

  async clickCloseFilterBtn() {
    await this.closeFilterBtn.click();
    await expect(this.closeFilterBtn).not.toBeVisible();
  }

  async checkFilterElementExist() {
    await expect(this.sendingRadioBtn).toBeVisible();
    await expect(this.priceRadioBtn).toBeVisible();
    await expect(this.durationRadioBtn).toBeVisible();
    await expect(this.page.getByText('Відправлення з Хмельницький')).toBeVisible();
    await expect(this.page.getByText('Прибуття в Бонн')).toBeVisible();
    await expect(this.stationInKhm).toBeVisible();
    await expect(this.stationInBonn).toBeVisible();
    await expect(this.showTripBtn).toBeVisible();
  }
}
