import mongoose from "mongoose";

const FlatsSchema = new mongoose.Schema(
    {
        flatData: Object,
    },
    { timestamps: true }
);

export const Flats = mongoose.model("Flats", FlatsSchema);
