export class CheckoutPage {
  constructor(page) {
    this.page = page;

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

    // Buttons
    this.continue = page.getByRole('button', {
      name: 'Continue'
    });

    this.cancel = page.getByRole('link', {
      name: 'Cancel'
    });

    // UI elements
    this.primaryHeader = page.locator(
      '[data-test="primary-header"]'
    );

    this.titleRow = page.locator(
      '[data-test="title-row"]'
    );

    // First name validation error
    this.firstNameError = page.getByText(
      'Error: First Name is required'
    );

    // Step Two
    this.finish = page.getByRole('button', {
      name: 'Finish'
    });
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