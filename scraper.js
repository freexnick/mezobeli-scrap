import "dotenv/config";
import axios from "axios";
import getElementContent from "./libs/getElementContent.js";
import addScrapDate from "./controllers/scrapDate.js";
import { connect, disconnect } from "./libs/connect.js";
import { getFlatUrls } from "./controllers/url.js";
import { addFlatsData } from "./controllers/flat.js";

async function flatData(url) {
    try {
        const { data } = await axios.get(url);
        const tree = getElementContent(url, data);
        return tree;
    } catch (e) {
        console.error(e);
    }
}

async function getUrlList() {
    const flatData = await getFlatUrls();
    const flatUrls = [];
    for (let flat of flatData) {
        if (flat.url) {
            flatUrls.push(flat.url);
        }
    }
    return flatUrls;
}

async function generateTree() {
    try {
        let tree = [];
        const flatList = await getUrlList();
        if (flatList) {
            const treeData = await Promise.allSettled(
                flatList.map(async (url) => await flatData(url))
            );
            for (let data of treeData) {
                if (data.status === "fulfilled") {
                    tree.push(data.value);
                }
            }
        }
        return tree;
    } catch (e) {
        console.error(e);
    }
}

(async () => {
    await connect();
    const tree = await generateTree();
    if (tree) {
        await addScrapDate();
        await addFlatsData(tree);
    }
    await disconnect();
})();
