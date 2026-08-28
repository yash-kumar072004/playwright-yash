import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
});

test('Invalid Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login('gfh', 'ggg');

  await expect(loginPage.error).toBeVisible();
});

test('Valid Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    'standard_user',
    'tta_secret'
  );

  await expect(
    loginPage.primaryHeader
  ).toBeVisible();
});

test('Empty Username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.loginWithPassword('ggg');

  await expect(loginPage.username).toBeInvalid();
});

test('Empty Password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.loginWithUsername('gfh');

  await expect(loginPage.password).toBeInvalid();
});
