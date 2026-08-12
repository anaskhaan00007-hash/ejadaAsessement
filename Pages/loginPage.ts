import { expect, Page } from '@playwright/test';
import pagelocators from '../Locators/pageLocators.json';

class LoginPage {
  private page: Page;
  private password: string;
  private signIn: string;
  private menu: string;
  private username: string;
  private loginError: string;

  constructor(page: Page) {
    this.page = page;

    this.password = pagelocators.password;
    this.signIn = pagelocators.signIn;
    this.menu = pagelocators.menuButton;
    this.username = pagelocators.username;
    this.loginError = pagelocators.loginError;
    
  }

  // Method to perform login action
  async loginToApplication(user: string, pass: string): Promise<void> {
   await this.page.locator(this.username).fill(user);
    await this.page.locator(this.password).fill(pass);

    await this.page.locator(this.signIn).click();
  }

  // Method to verify successful login by checking the presence of the menu button
  async verifyDashboard(){
    const menu = this.page.locator(this.menu);

    // Verify menu button is visible
    await expect(menu).toBeVisible();

    console.log('✓ Dashboard verification completed successfully');
  }

  // Method to verify error messages based on the type of error
   async verifyErrorMessage(errorType: string) {

    let expectedMessage: string;

    switch (errorType) {

      case 'LockedUser':
        expectedMessage =
          'Epic sadface: Sorry, this user has been locked out.';
        break;

      case 'InvalidCredentials':
        expectedMessage =
          'Epic sadface: Username and password do not match any user in this service';
        break;

      case 'UsernameRequired':
        expectedMessage =
          'Epic sadface: Username is required';
        break;

      case 'PasswordRequired':
        expectedMessage =
          'Epic sadface: Password is required';
        break;

      default:
        throw new Error(`Unknown error type: ${errorType}`);
    }

    const errorMessage = this.page.locator(this.loginError);

    await expect(errorMessage).toBeVisible();

    await expect(errorMessage).toContainText(expectedMessage);

    console.log(
      `✓ ${errorType} error message verified: ${expectedMessage}`
    );
  }
}



export default LoginPage;