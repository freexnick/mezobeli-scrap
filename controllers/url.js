import { Urls } from "../models/Urls.js";

async function getFlatUrls() {
    try {
        return await Urls.find({});
    } catch (e) {
        console.error(e);
    }
}
export { getFlatUrls };
