import { expect, Page } from '@playwright/test';
import pagelocators from '../Locators/pageLocators.json';

class CheckoutPage {
  private page: Page;

  private firstName: string;
  private lastName: string;
  private postalCode: string;
  private continueButton: string;
  private finish: string;
  private orderConfirmation: string;

  constructor(page: Page) {
    this.page = page;

    this.firstName = pagelocators.firstName;
    this.lastName = pagelocators.lastName;
    this.postalCode = pagelocators.postalCode;
    this.continueButton = pagelocators.continue;
    this.finish = pagelocators.finish;
    this.orderConfirmation = pagelocators.orderConfirmation;
  }

  async enterCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {

    await this.page.locator(this.firstName).fill(firstName);

    await this.page.locator(this.lastName).fill(lastName);

    await this.page.locator(this.postalCode).fill(postalCode);

    console.log('✓ Customer details entered');
  }

  async continueToOverview(): Promise<void> {

    await this.page.locator(this.continueButton).click();

    console.log('✓ Checkout overview displayed');
  }

  async finishOrder(): Promise<void> {

    await this.page.locator(this.finish).click();

    console.log('✓ Finish button clicked');
  }

  async verifyOrderConfirmation(): Promise<void> {

    await expect(
      this.page.locator(this.orderConfirmation)
    ).toHaveText('Thank you for your order!');

    console.log('✓ Order completed successfully');
  }
}

export default CheckoutPage;