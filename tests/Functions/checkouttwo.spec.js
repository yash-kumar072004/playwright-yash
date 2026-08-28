import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';
import { CartPage } from '../../Page/Cart';
import { CheckoutPage } from '../../Page/Checkout';
test.describe('Checkout Step Two functionality', () => {
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.open();
  await loginPage.login();

  await productsPage.addTshirtToCart();
  await productsPage.openCart();

  await cartPage.checkoutClick();

  await checkoutPage.fillCheckoutDetails(
    'Yash',
    'Kumar',
    '700001'
  );

  await checkoutPage.continueCheckout();
});

test('Finish checkout', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.finishCheckout();

  await expect(page).toHaveURL(/checkout-complete/);
});

test('Cancel checkout overview', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.cancelCheckout();

  await expect(page).toHaveURL(/cart/);
});
});