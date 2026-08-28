export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.url =
      'https://app.thetestingacademy.com/playwright/ttacart/inventory';

    this.logo = page.getByText('TTACart', { exact: true });
    this.title = page.getByText('Products', { exact: true });

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
    const response = await this.page.goto(this.url, {
      waitUntil: 'commit',
      timeout: 30000
    });

    console.log('Status:', response?.status());
    console.log('URL:', this.page.url());

    await this.page.waitForLoadState('domcontentloaded');
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