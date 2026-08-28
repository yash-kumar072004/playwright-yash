export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.url =
      'https://app.thetestingacademy.com/playwright/ttacart/inventory';

    this.logo = page.getByText('TTACart', { exact: true });

    this.title = page.getByText('Products', {
      exact: true
    });

    this.sortDropdown = page.getByRole('combobox', {
      name: 'Sort products'
    });

    this.inventoryContainer = page.locator(
      '[data-test="inventory-container"]'
    );

    this.footer = page.getByRole('contentinfo');

    this.addTshirt = page.locator(
      '[data-test="add-to-cart-test-allthethings-tshirt-red"]'
    );

    this.removeTshirt = page.locator(
      '[data-test="remove-test-allthethings-tshirt-red"]'
    );

    this.shoppingCart = page.locator(
      '[data-test="shopping-cart-link"]'
    );
  }

  async open() {
    // Products should only be opened after login.
    // Instead of relying on page.goto() to a protected URL,
    // wait for the inventory page that login already opened.

    await this.inventoryContainer.waitFor({
      state: 'visible',
      timeout: 15000
    });

    console.log('Products URL:', this.page.url());
  }

  async addTshirtToCart() {
    await this.addTshirt.click();
  }

  async removeTshirtFromCart() {
    await this.removeTshirt.click();
  }

  async openCart() {
    await this.shoppingCart.click();
  }

  async sortProducts(value) {
    await this.sortDropdown.selectOption(value);
  }
}