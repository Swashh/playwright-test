import { test } from "../fixtures/homePage";

test.describe("Check elements from home page", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goTo('/');
  });

  test("Check header logo home page", async ({ homePage }) => {
    await homePage.checkLogoHeaderExist();
  });

  test("Navigate to About us > Information about company", async ({ homePage }) => {
    await homePage.clickAboutUsBtn()
    await homePage.clickInformationAboutCompanyBtn()
  });

  test("Navigate to About us > Autopark", async ({ homePage }) => {
    await homePage.clickAboutUsBtn()
    await homePage.clickAutoparkBtn()
  });

  test("Navigate to About us > Contacts", async ({ homePage }) => {
    await homePage.clickAboutUsBtn()
    await homePage.clickContactsBtn()
  });
});
