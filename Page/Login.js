export class LoginPage {
  constructor(page) {
    this.page = page;

    this.url = 'https://app.thetestingacademy.com/playwright/ttacart';

    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
    this.primaryHeader = page.locator('[data-test="primary-header"]');
  }

  async open() {
    await this.page.goto(this.url);
  }

  async login(
    username = 'standard_user',
    password = 'tta_secret'
  ) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async loginWithUsername(username) {
    await this.username.fill(username);
    await this.loginButton.click();
  }

  async loginWithPassword(password) {
    await this.password.fill(password);
    await this.loginButton.click();
  }
}