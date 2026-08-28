import { test, expect } from '@playwright/test';

import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';
import { CartPage } from '../../Page/Cart';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login();

  // login() should finish on inventory
  await expect(page).toHaveURL(/\/inventory$/);
});

test('Without Item', async ({ page }) => {
  const cartPage = new CartPage(page);

  // Go from inventory to cart
  await cartPage.open();

  await expect(page).toHaveURL(/\/cart$/);

  await expect(
    page.locator('[data-test="primary-header"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="title-row"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="cart-list"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="cart-empty"]')
  ).toBeVisible();

  await expect(
    page.getByText('Continue Shopping')
  ).toBeVisible();

  await expect(
    page.getByText('Checkout')
  ).toBeVisible();
});

test('With Item', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // We are already on inventory after login
  await expect(page).toHaveURL(/\/inventory$/);

  // Add product
  await productsPage.addTshirtToCart();

  // Open cart
  await productsPage.openCart();

  await expect(page).toHaveURL(/\/cart$/);

  // Verify cart page
  await expect(
    page.locator('[data-test="primary-header"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="title-row"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="cart-list"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="inventory-item"]')
  ).toBeVisible();

  await expect(
    page.getByText('Continue Shopping')
  ).toBeVisible();

  await expect(
    page.getByText('Checkout')
  ).toBeVisible();
});