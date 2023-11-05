import { ScrapDates } from "../models/ScrapDates.js";

async function addScrapDate() {
    try {
        return await ScrapDates.create({});
    } catch (e) {
        console.error(e);
    }
}

export default addScrapDate;
