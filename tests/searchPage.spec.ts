import { test } from '../fixtures/homePage';
import { formatCurrentDate } from '../utils/dateUtils';

test.describe('Check elements and functional on search page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goTo('/bus/khmelnytskyi/bonn');
  });

  test.afterEach(async ({ homePage }) => {
    await homePage.cleanup();
  });

  test('Check From and To navigation cities @FormSearch', async ({ searchTrip }) => {
    await searchTrip.checkFromInputShouldBe('Хмельницький');
    await searchTrip.checkToInputShouldBe('Бонн');
  });

  test('Check date trip @FormSearch', async ({ searchTrip }) => {
    const todayDay = formatCurrentDate();

    await searchTrip.checkDataPickerVal(todayDay);
  });

  test('Check count passanger @FormSearch', async ({ searchTrip }) => {
    await searchTrip.checkCountPassanger('1 пасажир');
  });

  test('Check Find tickets btn is enabled @FormSearch', async ({ searchTrip }) => {
    await searchTrip.checkFindTicketsBtnEnabled();
  });

  test('Check all emenets exist in filter and clode @Filter', async ({ searchTrip }) => {
    await searchTrip.clickFilterBtn();
    await searchTrip.checkFilterElementExist();
    await searchTrip.clickCloseFilterBtn();
  });
});
