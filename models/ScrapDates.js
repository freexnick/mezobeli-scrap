import mongoose from "mongoose";

const ScrapSchema = new mongoose.Schema(
    {},
    {
        timestamps: true,
    }
);

export const ScrapDates = mongoose.model("ScrapDates", ScrapSchema);
