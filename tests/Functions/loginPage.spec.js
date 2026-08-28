import { test, expect } from '@playwright/test';

import { LoginPage } from '../../Page/Login';


// --------------------------------------------------
// INVALID LOGIN
// --------------------------------------------------
test.describe('Login page functionality', () => {
test('Invalid Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.loginWithCredentials(
    'wrong_user',
    'wrong_password'
  );

  // Invalid credentials should NOT redirect to inventory.
  await expect(page).not.toHaveURL(/\/inventory$/);

  // Application error should appear.
  await expect(loginPage.error).toBeVisible();
});


// --------------------------------------------------
// VALID LOGIN
// --------------------------------------------------

test('Valid Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login();

  await expect(page).toHaveURL(/\/inventory$/);

  await expect(
    loginPage.primaryHeader
  ).toBeVisible();
});


// --------------------------------------------------
// EMPTY USERNAME
// --------------------------------------------------

test('Empty Username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.loginWithPassword('tta_secret');

  // Browser native validation
  const message =
    await loginPage.getUsernameValidationMessage();

  expect(message).toBe('Please fill out this field.');

  // Should remain on login page
  await expect(page).not.toHaveURL(/\/inventory$/);
});


// --------------------------------------------------
// EMPTY PASSWORD
// --------------------------------------------------

test('Empty Password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.loginWithUsername('standard_user');

  // Browser native validation
  const message =
    await loginPage.getPasswordValidationMessage();

  expect(message).toBe('Please fill out this field.');

  // Should remain on login page
  await expect(page).not.toHaveURL(/\/inventory$/);
});
});