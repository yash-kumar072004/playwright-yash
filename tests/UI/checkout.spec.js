import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';

test.beforeEach(async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/ttacart');

  const loginPage = new LoginPage(page);
  await loginPage.login();

  // Go to Cart
  await page.locator('#shopping_cart_container').click();
});

test('Without Item', async ({ page }) => {
  await expect(page.locator('[data-test="primary-header"]')).toBeVisible();
  await expect(page.locator('[data-test="title-row"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-empty"]')).toBeVisible();
  await expect(page.getByText('Continue ShoppingCheckout')).toBeVisible();
});

test('With Item', async ({ page }) => {
  await page.locator('[data-test="continue-shopping"]').click();

  await page.locator(
    '[data-test="add-to-cart-test-allthethings-tshirt-red"]'
  ).click();

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.locator('[data-test="primary-header"]')).toBeVisible();
  await expect(page.locator('[data-test="title-row"]')).toBeVisible();
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
  await expect(page.getByText('Continue ShoppingCheckout')).toBeVisible();
});