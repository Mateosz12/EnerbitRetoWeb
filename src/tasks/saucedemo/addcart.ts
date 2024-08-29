import { Page, expect } from "@playwright/test";
;
import { InventoryPage } from "../../resources/suacedemo/inventoryUserInterface";
import { CartPage } from "../../resources/suacedemo/yourCartUserInterface";
import { checkoutPage } from "../../resources/suacedemo/chekoutUserInterface";
import { OverviewPage } from "../../resources/suacedemo/overviewUserInterface";
import { PriceUtils } from "../../utils/saucedemo/addUpPrices";

import { es, faker, fakerES } from '@faker-js/faker';
import { log } from "console";

export class AddcartTask {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/v1/')
    }

    async addtocart() {
        await this.page.locator(InventoryPage.btn_product_backpack).click();
        await this.page.locator(InventoryPage.btn_product_bikeLight).click();
        await this.page.locator(InventoryPage.btn_cart).click();
        await expect(this.page.locator(CartPage.name_backPack)).toHaveText('Sauce Labs Backpack');
        await expect(this.page.locator(CartPage.name_bikeLight)).toHaveText('Sauce Labs Bike Light');
        await this.page.locator(CartPage.btn_checkout).click();

    }

    async yourInformation() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const code = fakerES.location.zipCode();

        await this.page.locator(checkoutPage.first_name).fill(firstName)
        await this.page.locator(checkoutPage.last_name).fill(lastName)
        await this.page.locator(checkoutPage.postal_code).fill(code)
        await this.page.locator(checkoutPage.btn_continue).click();

      
    }
    
    async yourInformationFailed() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const code = fakerES.location.zipCode();

        await this.page.locator(checkoutPage.first_name).fill(firstName)
        await this.page.locator(checkoutPage.last_name).fill(lastName)
        await this.page.locator(checkoutPage.btn_continue).click();
        await expect(this.page.locator(checkoutPage.error_postal)).toHaveText('Error: Postal Code is required');
      
    }

    async calculateTotalPrices() {

        const priceElements = await this.page.$$(OverviewPage.product_price);
        let sumTotalProducts = 0;

        for (const element of priceElements) {
            const label = await element.textContent();
            if (label) {
                const price = PriceUtils.extractPrice(label);
                sumTotalProducts += price;
            }
        }

        console.log(sumTotalProducts);
        

        const priceFixedTotal = parseFloat(sumTotalProducts.toFixed(2));
        const totalPriceText = await this.page.textContent(OverviewPage.total_price);


        if (totalPriceText) {
            const displayedTotal = PriceUtils.extractPrice(totalPriceText);
            expect(priceFixedTotal).toBeCloseTo(displayedTotal, 2);
        } else {
            throw new Error('Total price element not found.');
        }
    }

}


