export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Step One
    this.firstName = page.getByRole('textbox', {
      name: 'First Name'
    });

    this.lastName = page.getByRole('textbox', {
      name: 'Last Name'
    });

    this.postalCode = page.getByRole('textbox', {
      name: 'Zip/Postal Code'
    });

    this.continue = page.getByRole('button', {
      name: 'Continue'
    });

    this.cancel = page.getByRole('link', {
      name: 'Cancel'
    });

    // Step Two
    this.finish = page.locator('[data-test="finish"]');
  }

  async fillCheckoutDetails(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckout() {
    await this.continue.click();
  }

  async cancelCheckout() {
    await this.cancel.click();
  }

  async finishCheckout() {
    await this.finish.click();
  }
}