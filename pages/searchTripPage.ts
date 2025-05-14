import { Locator, Page, expect } from '@playwright/test';
import { FilterPage } from '../pages/filtersPage';

export class SearchTripPage extends FilterPage {
  readonly page: Page;
  readonly fromInput: Locator;
  readonly toInput: Locator;
  readonly dataPicker: Locator;
  readonly passangerCount: Locator;
  readonly findTicketsBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.fromInput = page.getByRole('combobox', { name: 'Звідки' });
    this.toInput = page.getByRole('combobox', { name: 'Куди' });
    this.dataPicker = page.locator('input[type="text"][readonly]').first();
    this.passangerCount = page.locator('input[type="text"][readonly]').last();
    this.findTicketsBtn = page.getByRole('button', { name: 'Знайти квитки' });
  }

  async checkFromInputShouldBe(cityName) {
    await expect(this.fromInput).toHaveValue(cityName);
  }

  async checkToInputShouldBe(cityName) {
    await expect(this.toInput).toHaveValue(cityName);
  }

  async checkDataPickerVal(todayDay) {
    await expect(this.dataPicker).toHaveValue(todayDay);
  }

  async checkCountPassanger(countPassanger) {
    await expect(this.passangerCount).toHaveValue(countPassanger);
  }

  async checkFindTicketsBtnEnabled() {
    await expect(this.findTicketsBtn).toBeEnabled();
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
