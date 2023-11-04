import "dotenv/config";
import axios from "axios";
import cheerio from "cheerio";
import { connect, disconnect } from "./libs/connect.js";
import { getFlatUrls } from "./controllers/url.js";
import { updateFlatsData } from "./controllers/flat.js";

async function flatData(url) {
    try {
        const { data } = await axios.get(url);
        const tree = getElementContent(url, data);
        return tree;
    } catch (e) {
        console.error(e);
    }
}

function getElementContent(url, data) {
    if (!url || !data) return;
    const fields = [
        ".closable",
        "h3.apt",
        ".price-container",
        ".rooms",
        "a.glightbox",
    ];
    const $ = cheerio.load(data);
    const elements = {};
    elements[url] = {};
    fields.forEach((element) => {
        $(element).each(function (_, el) {
            let value = "";
            if (element === "a.glightbox") {
                value = $(el).children("img").attr("src");
            } else {
                value = $(el)
                    .text()
                    .replace(/\s+/g, " ")
                    .replace(/\$/g, "")
                    .trim();
            }
            if (elements[url][element] && element === ".closable") {
                elements[url][element] = [elements[url][element], value];
            } else {
                elements[url][element] = value;
            }
        });
    });
    return elements;
}

async function getUrlList() {
    const flatList = await getFlatUrls();
    const { flatUrls } = flatList[flatList?.length - 1];
    return flatUrls;
}

async function generateTree() {
    try {
        let tree = {};
        const flatList = await getUrlList();
        if (flatList) {
            tree[new Date().toLocaleString("ka-GE").split(",")[0]] = (
                await Promise.allSettled(
                    flatList.map(async (url) => await flatData(url))
                )
            )
                .map((result) => {
                    if (result.status === "fulfilled") {
                        return result.value;
                    }
                })
                .filter((tree) => tree !== undefined);
        }
        return tree;
    } catch (e) {
        console.error(e);
    }
}

(async () => {
    connect();
    const tree = await generateTree();
    await updateFlatsData(tree);
    disconnect();
})();
