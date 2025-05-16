import { test as homePageFixture } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { SearchTripPage } from '../pages/searchTripPage';

type HomePageType = {
  homePage: HomePage;
  searchTrip: SearchTripPage;
};

export const test = homePageFixture.extend<HomePageType>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  searchTrip: async ({ page }, use) => {
    await use(new SearchTripPage(page));
  },
});

export { expect } from '@playwright/test';
