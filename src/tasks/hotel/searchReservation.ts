import { Page, expect } from "@playwright/test";
import { searchPage } from "../../resources/hotel/searchHotelsUserInterfaces";
import { selectHotelPage } from "../../resources/hotel/selectHotelUserInterfaces";
import { formatDate } from "../../utils/hotel/date";
import { log } from "console";



export class SearchReservationTask {
    readonly page: Page;
    private location: string | undefined;

    constructor(page: Page) {
        this.page = page;

    }

    async goto() {
        await this.page.goto('https://demos.devexpress.com/rwa/dxhotels/')
    }

    async searchReservation() {


        const today = new Date();
        const checkInDate = new Date(today);
        checkInDate.setDate(today.getDate() + 2);

        const checkOutDate = new Date(today);
        checkOutDate.setDate(today.getDate() + 7);


        const formattedCheckInDate = formatDate(checkInDate);
        const formattedCheckOutDate = formatDate(checkOutDate);

        console.log(checkOutDate);
        await this.page.locator(searchPage.location).click();
        await this.page.locator(searchPage.select_location).click();

        const locationValue = await this.page.locator(searchPage.location).inputValue();
        console.log(locationValue);
        if (locationValue !== null) {
            this.location = locationValue;
           // console.log(this.location);

        } else {

            console.error('Error: el valor de la ubicación es null.');
        }
        await this.page.locator(searchPage.check_in).fill(formattedCheckInDate);
        await this.page.locator(searchPage.checkout).fill(formattedCheckOutDate);
        // await this.page.pause();
        await this.page.locator(searchPage.rooms).fill("2");
        await this.page.locator(searchPage.adults).fill("3");
        await this.page.locator(searchPage.children).fill("2");
        await this.page.click(searchPage.btn_search);



        // await this.page.pause();




    }


    async validateNameCity() {

        const cityresult = await this.page.locator(selectHotelPage.city_result).textContent();
        console.log(cityresult);
        const result = cityresult?.split(',')[0].trim();
        const location = this.location?.split(',')[0].trim();

        //console.log(result);
        

        if (result === location) {
            console.log('La ciudad seleccionada coincide con la ubicación buscada:', result);
        } else {
            console.error(`La ciudad seleccionada (${result}) no coincide con la ubicación buscada (${this.location}).`);
        }
        expect(result).toEqual(location)


    }

}