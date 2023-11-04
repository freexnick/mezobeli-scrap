import { Urls } from "../models/Urls.js";

async function getFlatUrls() {
    return await Urls.find({});
}
export { getFlatUrls };
