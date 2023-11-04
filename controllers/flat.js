import { Flats } from "../models/FlatsData.js";

async function updateFlatsData(data) {
    return await Flats.create({ flatData: data });
}

export { updateFlatsData };
