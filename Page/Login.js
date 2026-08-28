export class LoginPage {
  constructor(page) {
    this.page = page;

    this.url =
      'https://app.thetestingacademy.com/playwright/ttacart/';

    // Login fields
    this.username = page.locator('[data-test="username"]');

    this.password = page.locator('[data-test="password"]');

    this.loginButton = page.locator(
      '[data-test="login-button"]'
    );

    // Application error message
    this.error = page.locator('[data-test="error"]');

    // Header after successful login
    this.primaryHeader = page.locator(
      '[data-test="primary-header"]'
    );
  }

  // Open login page
  async open() {
    await this.page.goto(this.url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await this.username.waitFor({
      state: 'visible',
      timeout: 10000
    });

    console.log('URL:', this.page.url());
  }

  // Normal login
  async login(
    username = 'standard_user',
    password = 'tta_secret'
  ) {
    await this.username.fill(username);
    await this.password.fill(password);

    // Successful login should redirect to inventory.
    await Promise.all([
      this.page.waitForURL('**/inventory', {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      }),

      this.loginButton.click()
    ]);

    console.log('Logged in:', this.page.url());
  }

  // Login with only username
  // Used for testing empty password
  async loginWithUsername(username) {
    await this.username.fill(username);

    // Do NOT wait for inventory here.
    // If password is empty, browser validation stops submission.
    await this.loginButton.click();
  }

  // Login with only password
  // Used for testing empty username
  async loginWithPassword(password) {
    await this.password.fill(password);

    // Do NOT wait for inventory here.
    // If username is empty, browser validation stops submission.
    await this.loginButton.click();
  }

  // Login with custom username and password
  // Used for invalid login testing
  async loginWithCredentials(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);

    await this.loginButton.click();
  }

  // Get native browser validation message
  async getUsernameValidationMessage() {
    return await this.username.evaluate(
      (input) => input.validationMessage
    );
  }

  // Get native browser validation message
  async getPasswordValidationMessage() {
    return await this.password.evaluate(
      (input) => input.validationMessage
    );
  }
}