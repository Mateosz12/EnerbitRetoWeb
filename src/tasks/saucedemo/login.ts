import { Page, expect } from "@playwright/test";
import { LoginPage } from "../../resources/suacedemo/loginUserInterface";
import { Auth } from "../../models/saucedemo/auth";
import { InventoryPage } from "../../resources/suacedemo/inventoryUserInterface";
import { CartPage } from "../../resources/suacedemo/yourCartUserInterface";

export class LoginTask {
    readonly page: Page;

     constructor(page: Page) {
        this.page = page;
     }

     async goto(){
        await this.page.goto('https://www.saucedemo.com/v1/')
     }

     async login(auth: Auth){
      await this.page.locator(LoginPage.username).fill(auth.username);
      await this.page.locator(LoginPage.password).fill(auth.password);
      await this.page.locator(LoginPage.button_login).click();

      await expect(this.page.locator(InventoryPage.products)).toHaveText('Products');
     }

     async loginFailed(auth: Auth){
      await this.page.locator(LoginPage.username).fill(auth.username);
      await this.page.locator(LoginPage.password).fill('hola');
      await this.page.locator(LoginPage.button_login).click();

      await expect(this.page.locator(LoginPage.errorText)).toHaveText('Epic sadface: Username and password do not match any user in this service')
     }


}
