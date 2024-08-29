import { test } from "@playwright/test";
import { LoginTask } from "../../src/tasks/saucedemo/login";
import { Auth } from "../../src/models/saucedemo/auth";
import { AddcartTask } from "../../src/tasks/saucedemo/addcart";


test.describe('Add to cart 2 products and pay and validate price ', () => {
    test('Add to cart products pay sucessfull' ,async ({page}) => {
        const auth : Auth = {
            username: process.env.USERNAME as string,
            password: process.env.PASSWORD as string,
        }

        const login = new LoginTask(page);
        const add = new AddcartTask(page);


        await login.goto();
        await login.login(auth);
        await add.addtocart();
        await add.yourInformation();
        await add.calculateTotalPrices();
       

    })

    test('Add to cart products pay failed by code postal' ,async ({page}) => {
        const auth : Auth = {
            username: process.env.USERNAME as string,
            password: process.env.PASSWORD as string,
        }

        const login = new LoginTask(page);
        const add = new AddcartTask(page);


        await login.goto();
        await login.login(auth);
        await add.addtocart();
        await add.yourInformationFailed();
       
       

    })

})