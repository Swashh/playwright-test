import { Page } from "@playwright/test";

import { BaseComponents } from "./baseComponents";

export class HomePage extends BaseComponents {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
}
