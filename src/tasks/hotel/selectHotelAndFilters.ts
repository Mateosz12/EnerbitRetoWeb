import { Page, expect } from "@playwright/test";
import { ReservationFilter } from "../../models/hotel/reservationFilter";
import { selectHotelPage } from "../../resources/hotel/selectHotelUserInterfaces";
import { reservationPage } from "../../resources/hotel/reservationSummaryUserInterface";
import { log } from "console";




export class selectReservationTask {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;

    }


    async filterPrice(filters: ReservationFilter) {


        await this.page.locator(selectHotelPage.filter_move).click();

        let initialPrice = parseInt((await this.page.locator(selectHotelPage.init_price).innerText()).split('$')[1]);


        while (initialPrice < filters.minPrice || initialPrice > filters.maxPrice) {

            if (initialPrice > 250) {

                this.page.mouse.wheel(0, -200);//up
            }
            if (initialPrice < 200) {
                this.page.mouse.wheel(0, 100);//down
            }
            initialPrice = parseInt((await this.page.locator(selectHotelPage.init_price).innerText()).split('$')[1]);


        }



        //await this.page.pause();


    }

    async filterRating(filters: ReservationFilter) {


        await this.page.locator(selectHotelPage.filterRating).click();

        let initialRating = parseInt((await this.page.locator(selectHotelPage.initRating).innerText()).trim());
        const targetRating = filters.starts;


        while (initialRating !== targetRating) {

            if (initialRating > targetRating) {

                this.page.mouse.wheel(0, -2);
            }
            if (initialRating < targetRating) {
                this.page.mouse.wheel(0, 2);
            }
            await this.page.waitForTimeout(500);
            initialRating = parseInt((await this.page.locator(selectHotelPage.initRating).innerText()).trim());


        }



        //await this.page.pause();


    }

    async selectMinPrice() {

        const priceElements = await this.page.locator(selectHotelPage.priceHotel).all();
        const prices: number[] = [];



        for (const element of priceElements) {
            const textContent = (await element.innerText()).replace(/[^\d.-]/g, '');
            const price = parseFloat(textContent);
            prices.push(price);
        }
        console.log(prices);


        const minPrice = Math.min(...prices);
        console.log('Minimum price:', minPrice);

        const items = await this.page.locator(selectHotelPage.selecHotel).all();

        console.log(items);

        let btn_book = '';
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if ((await element.first().innerText()).includes(minPrice.toString())) {

                btn_book = `MainContentPlaceHolder_HotelsDataView_IT${index}_BookItButton_${index}_I`;

                break;
            }

        }

        await this.clickButton(btn_book);

        await expect(this.page.locator(reservationPage.h3Reservation)).toBeVisible();
        await this.page.pause();
    }

    private async clickButton(btn_book: string) {
        await this.page.evaluate((selector) => {
            const button = document.getElementById(selector);
            if (button) {
                button.style.display = 'block';
                button.click();
            }
        }, btn_book);
    }

    async Aplyfilters() {

        await this.page.locator(selectHotelPage.btn_aply).click();
    }

}

