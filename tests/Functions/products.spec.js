import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';
test.describe('Products page functionality', () => {
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login();
});

test('Add product to cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.addTshirtToCart();

  await expect(
    productsPage.removeTshirt
  ).toBeVisible();
});

test('Remove product from cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.addTshirtToCart();

  await expect(
    productsPage.removeTshirt
  ).toBeVisible();

  await productsPage.removeTshirtFromCart();

  await expect(
    productsPage.addTshirt
  ).toBeVisible();
});

test('Sort products low to high', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortProducts('lohi');

  await expect(
    productsPage.sortDropdown
  ).toHaveValue('lohi');
});

test('Sort products high to low', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortProducts('hilo');

  await expect(
    productsPage.sortDropdown
  ).toHaveValue('hilo');
});

test('Open cart from products', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.openCart();

  await expect(page).toHaveURL(/cart/);
});
});