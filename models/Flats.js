import mongoose from "mongoose";

const FlatsSchema = new mongoose.Schema(
    {
        url: String,
        header: Array,
        flat: String,
        priceDetails: Object,
        room: String,
        img: String,
        color: String,
    },
    { timestamps: true }
);

export const Flats = mongoose.model("Flats", FlatsSchema);
