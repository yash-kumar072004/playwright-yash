import { test, expect } from '@playwright/test';

import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';
import { CartPage } from '../../Page/Cart';
test.describe('Cart page functionality', () => {
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login();

  // Login should finish on inventory
  await expect(page).toHaveURL(/inventory$/);
});

test('Without Item', async ({ page }) => {
  const cartPage = new CartPage(page);

  // Inventory → Cart
  await cartPage.open();

  await expect(page).toHaveURL(/cart$/);

  // Verify Cart page
  await expect(cartPage.primaryHeader).toBeVisible();
  await expect(cartPage.titleRow).toBeVisible();
  await expect(cartPage.cartList).toBeVisible();
  await expect(cartPage.emptyCart).toBeVisible();
  await expect(cartPage.continueShopping).toBeVisible();
  await expect(cartPage.checkout).toBeVisible();
});

test('With Item', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Already on inventory after login
  await expect(page).toHaveURL(/inventory$/);

  // Add product
  await productsPage.addTshirtToCart();

  // Inventory → Cart
  await productsPage.openCart();

  await expect(page).toHaveURL(/cart$/);

  // Verify Cart page
  await expect(cartPage.primaryHeader).toBeVisible();
  await expect(cartPage.titleRow).toBeVisible();
  await expect(cartPage.cartList).toBeVisible();
  await expect(cartPage.inventoryItem).toBeVisible();
  await expect(cartPage.continueShopping).toBeVisible();
  await expect(cartPage.checkout).toBeVisible();
});
});