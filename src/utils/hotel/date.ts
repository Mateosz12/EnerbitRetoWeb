import { addDays, format } from "date-fns";
export function formatDate(date: Date){
    const formattedDate = format(date, 'MMMM d, yyyy');
    return formattedDate;
}
