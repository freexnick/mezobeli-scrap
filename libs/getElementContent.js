import cheerio from "cheerio";

function mapToField(element) {
    switch (element) {
        case ".closable":
            return "header";
        case "h3.apt":
            return "flat";
        case ".price-container":
            return "priceDetails";
        case ".rooms":
            return "room";
        case "a.glightbox":
            return "img";
        default:
            return;
    }
}

function handlePriceDetails(priceString) {
    const priceValues = priceString.split("₾");
    return {
        oldPrice: `${priceValues[0].trim()}₾`,
        newPrice: `${priceValues[1].trim()}₾`,
        oldSquarePrice: `${priceValues[2].trim()}₾`,
        newSquarePrice: `${priceValues[3].trim()}₾`,
    };
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
    elements["url"] = url;
    fields.forEach((element) => {
        $(element).each(function (_, el) {
            let value = "";
            const field = mapToField(element);
            if (field === "img") {
                value = $(el).children("img").attr("src");
            } else {
                value = $(el)
                    .text()
                    .replace(/\s+/g, " ")
                    .replace(/\$/g, "")
                    .trim();
            }
            if (elements[field] && field === "header") {
                elements[field] = [elements[field], value];
            } else if (field === "priceDetails") {
                elements[field] = handlePriceDetails(value);
            } else {
                elements[field] = value;
            }
        });
    });
    return elements;
}

export default getElementContent;
