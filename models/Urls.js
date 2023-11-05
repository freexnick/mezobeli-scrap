import mongoose from "mongoose";

const UrlsSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Urls = mongoose.model("Urls", UrlsSchema);
