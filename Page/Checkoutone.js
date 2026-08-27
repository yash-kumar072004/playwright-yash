export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstName = page.getByRole('textbox', {
      name: 'First Name'
    });

    this.lastName = page.getByRole('textbox', {
      name: 'Last Name'
    });

    this.postalCode = page.getByRole('textbox', {
      name: 'Zip/Postal Code'
    });

    this.continueButton = page.getByRole('button', {
      name: 'Continue'
    });

    this.cancelButton = page.getByRole('link', {
      name: 'Cancel'
    });

    this.primaryHeader = page.locator(
      '[data-test="primary-header"]'
    );

    this.titleRow = page.locator(
      '[data-test="title-row"]'
    );
  }

  async openStepOne() {
    await this.page.locator(
      '[data-test="shopping-cart-link"]'
    ).click();

    await this.page.locator(
      '[data-test="checkout"]'
    ).click();
  }

  async fillCheckoutDetails(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }
}