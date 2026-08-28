import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
test.describe('Login page functionality', () => {
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
});

test('Login page UI', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await expect(loginPage.username).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});
});