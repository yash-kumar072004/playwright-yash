import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';
import { CartPage } from '../../Page/Cart';
import { CheckoutPage } from '../../Page/Checkout';
test.describe('Checkout Step One functionality', () => {
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login();
});

test('Continue checkout with valid details', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Add product
  await productsPage.addTshirtToCart();

  // Products → Cart
  await productsPage.openCart();

  // Cart → Checkout
  await cartPage.checkoutClick();

  // Fill details
  await checkoutPage.fillCheckoutDetails(
    'Yash',
    'Kumar',
    '700001'
  );

  // Continue
  await checkoutPage.continueCheckout();

  await expect(page).toHaveURL(/checkout-step-two/);
});

test('Checkout with empty first name', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addTshirtToCart();
  await productsPage.openCart();
  await cartPage.checkoutClick();

  // Leave First Name empty
  await checkoutPage.lastName.fill('Kumar');
  await checkoutPage.postalCode.fill('700001');

  await checkoutPage.continueCheckout();

  // Verify application error
  await expect(
    page.getByText('Error: First Name is required')
  ).toBeVisible();
});

test('Cancel checkout', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await productsPage.addTshirtToCart();
  await productsPage.openCart();
  await cartPage.checkoutClick();

  await checkoutPage.cancelCheckout();

  await expect(page).toHaveURL(/cart/);
});
});