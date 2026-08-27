import { test, expect } from '@playwright/test';

import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';
import { CartPage } from '../../Page/Cart';

test('Cart page UI', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.open();
  await loginPage.login();

  // Open Cart
  await productsPage.openCart();

  // Verify Cart UI
  await expect(cartPage.logo).toBeVisible();
  await expect(cartPage.cartContents).toBeVisible();
  await expect(cartPage.continueShopping).toBeVisible();
  await expect(cartPage.checkout).toBeVisible();
});