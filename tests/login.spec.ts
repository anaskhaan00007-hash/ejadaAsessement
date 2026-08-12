import { test } from '@playwright/test';
import loginData from '../Data/Url.json';
import userData from '../Data/UersLogin.json';
import LoginPage from '../Pages/loginPage';
import ProductsPage from '../Pages/ProductsPage';
import CartPage from '../Pages/CartPage';
import CheckoutPage from '../Pages/CheckoutPage';

test.describe.configure({ mode: 'parallel' })


test.beforeEach(async ({ page }) => {
  await page.goto(loginData.SauceDemoUrl);
});

test('Valid User Login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.loginToApplication(
    userData.ValidUser,
    userData.Password
  );

  await login.verifyDashboard();
});


test('Verify Locked Out User Login', async ({ page }) => {

  const login = new LoginPage(page);

  await login.loginToApplication(
    userData.LockedUser,
    userData.Password
  );

  await login.verifyErrorMessage('LockedUser');
});


test('Verify Password Required', async ({ page }) => {

    const login = new LoginPage(page);

  // Username is valid, password is blank
  await login.loginToApplication(
    userData.ValidUser,
    ''
  );

  await login.verifyErrorMessage('PasswordRequired');
});


test('Verify Username Required', async ({ page }) => {

  const login = new LoginPage(page);

  // Username is blank, password is valid
  await login.loginToApplication(
    '',
    userData.Password
  );

  await login.verifyErrorMessage('UsernameRequired');
});


test('Verify Invalid User Login', async ({ page }) => {

  const login = new LoginPage(page);

  await login.loginToApplication(
    'invalid_user',
    userData.Password
  );

  await login.verifyErrorMessage('InvalidCredentials');
});

test('Complete product order with valid user', async ({ page }) => {

  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);


  // Login
  await login.loginToApplication(userData.ValidUser, userData.Password);

  // Verify dashboard
  await login.verifyDashboard();

  // Products
  await products.verifyProductsPage();

  await products.addProductToCart();

  await products.openCart();


  // Cart
  await cart.verifyProductInCart();

  await cart.proceedToCheckout();


  // Checkout
  await checkout.enterCustomerDetails(
    'Mohd',
    'Aamir',
    '12345'
  );

  await checkout.continueToOverview();

  await checkout.finishOrder();

  await checkout.verifyOrderConfirmation();
});


