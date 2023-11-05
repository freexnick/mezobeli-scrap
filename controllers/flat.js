import { Flats } from "../models/Flats.js";

async function addFlatsData(data) {
    try {
        return await Flats.insertMany(data);
    } catch (e) {
        console.error(e);
    }
}

export { addFlatsData };
