export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.url =
      'https://app.thetestingacademy.com/playwright/ttacart/checkout-step-two';

    this.primaryHeader = page.locator(
      '[data-test="primary-header"]'
    );

    this.titleRow = page.locator(
      '[data-test="title-row"]'
    );

    this.cartList = page.locator(
      '[data-test="cart-list"]'
    );

    this.paymentInformation = page.getByText(
      'Payment Information:TTACard #31337Shipping Information:Free TTA Express'
    );

    this.cancelFinish = page.getByText(
      'CancelFinish'
    );

    this.footer = page.locator(
      '[data-test="footer"]'
    );

    // Step One fields
    this.firstName = page.getByRole('textbox', {
      name: 'First Name'
    });

    this.lastName = page.getByRole('textbox', {
      name: 'Last Name'
    });

    this.postalCode = page.getByRole('textbox', {
      name: 'Zip/Postal Code'
    });

    this.continueButton = page.locator(
      '[data-test="continue"]'
    );
  }

  async open() {
    await this.page.goto(this.url);
  }

  async fillCheckoutDetails(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }
}