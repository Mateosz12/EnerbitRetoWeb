import { test } from "@playwright/test";
import { LoginTask } from "../../src/tasks/saucedemo/login";
import { Auth } from "../../src/models/saucedemo/auth";



test.describe('Login', () => {
    test('Login sucessfull' ,async ({page}) => {
        const auth : Auth = {
            username: process.env.USERNAME as string,
            password: process.env.PASSWORD as string,
        }

        const login = new LoginTask(page);
        await login.goto();
        await login.login(auth);

    })
})

test.describe('Login unsucessfull', () => {
    test('Login unsucessfull' ,async ({page}) => {
        const auth : Auth = {
            username: process.env.USERNAME as string,
            password: process.env.PASSWORD as string,
        }

        const login = new LoginTask(page);
        await login.goto();
        await login.loginFailed(auth);

    })
})

