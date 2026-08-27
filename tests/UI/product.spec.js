import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import { ProductsPage } from '../../Page/Products';

test('Products page UI', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login();
  await productsPage.open();

  await expect(productsPage.logo).toBeVisible();
  await expect(productsPage.title).toBeVisible();
  await expect(productsPage.sortDropdown).toBeVisible();
  await expect(productsPage.inventoryContainer).toBeVisible();
  await expect(productsPage.footer).toBeVisible();
});