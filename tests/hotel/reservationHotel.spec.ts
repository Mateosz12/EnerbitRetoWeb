import { test } from "@playwright/test";
import { SearchReservationTask } from "../../src/tasks/hotel/searchReservation";
import { selectReservationTask } from "../../src/tasks/hotel/selectHotelAndFilters";
import { ReservationFilter } from "../../src/models/hotel/reservationFilter";

test.describe('search for reservation according to the requirements ', () => {
    test('search sucessfull' ,async ({page}) => {
       

        const search = new SearchReservationTask(page);
        
        await search.goto();
        await search.searchReservation();
        await search.validateNameCity();
   
       
    })

    test('reserve hotel with filters specifics' ,async ({page}) => {
        const filter: ReservationFilter = {
            minPrice: 200,
            starts: 3,
            maxPrice: 300
          }
       

        const search = new SearchReservationTask(page);
        const select = new selectReservationTask(page);
        
        await search.goto();
        await search.searchReservation();
        await search.validateNameCity();
        await select.filterPrice(filter);
        await select.Aplyfilters();
        await select.filterRating(filter);
        await select.Aplyfilters();
        await select.selectMinPrice();
        

   
       
    })
})