import { test, expect } from '@playwright/test';

import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';
import { CartPage } from '../../Page/Cart';
import { CheckoutPage } from '../../Page/Checkout';
test.describe('Checkout Step One functionality', () => {
test('Checkout Step One UI', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.open();
  await loginPage.login();

  // Add product
  await productsPage.addTshirtToCart();

  // Products → Cart
  await productsPage.openCart();

  // Cart → Checkout Step One
  await cartPage.checkoutClick();

  // Verify Checkout Step One
  await expect(checkoutPage.primaryHeader).toBeVisible();

  await expect(checkoutPage.titleRow).toBeVisible();

  await expect(
    page.getByText('Cancel Continue')
  ).toBeVisible();
});
});