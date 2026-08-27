import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';
import { CartPage } from '../../Page/Cart';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login();
});

test('Empty cart', async ({ page }) => {
  const cartPage = new CartPage(page);

  await page.locator('#shopping_cart_container').click();

  await expect(cartPage.emptyCart).toBeVisible();
});

test('Add item and verify cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addTshirtToCart();
  await productsPage.openCart();

  await expect(cartPage.inventoryItem).toBeVisible();
});

test('Continue shopping from cart', async ({ page }) => {
  const cartPage = new CartPage(page);

  await page.locator('#shopping_cart_container').click();

  await cartPage.continueShoppingClick();

  await expect(page).toHaveURL(/inventory/);
});

test('Checkout from cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addTshirtToCart();
  await productsPage.openCart();

  await cartPage.checkoutClick();

  await expect(page).toHaveURL(/checkout-step-one/);
});