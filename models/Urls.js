import mongoose from "mongoose";

const UrlsSchema = new mongoose.Schema(
    {
        flatUrls: Array,
    },
    {
        timestamps: true,
    }
);

export const Urls = mongoose.model("Urls", UrlsSchema);
