export class CartPage {
  constructor(page) {
    this.page = page;

    this.logo = page.getByText('TTACart', { exact: true });

    // Added for Cart UI tests
    this.primaryHeader = page.locator(
      '[data-test="primary-header"]'
    );

    this.titleRow = page.locator(
      '[data-test="title-row"]'
    );

    this.cartList = page.locator(
      '[data-test="cart-list"]'
    );

    this.cartContents = page.locator(
      '[data-test="cart-contents-container"]'
    );

    this.inventoryItem = page.locator(
      '[data-test="inventory-item"]'
    );

    this.emptyCart = page.getByText(
      'Your cart is empty.',
      { exact: true }
    );

    this.continueShopping = page.getByRole('link', {
      name: 'Continue Shopping'
    });

    this.checkout = page.getByRole('link', {
      name: 'Checkout'
    });
  }

  async open() {
    await this.page.goto(
      'https://app.thetestingacademy.com/playwright/ttacart/cart'
    );
  }

  async checkoutClick() {
    await this.checkout.click();
  }

  async continueShoppingClick() {
    await this.continueShopping.click();
  }
}