import mongoose from "mongoose";

const connection = {};

async function connect() {
    if (connection.isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db?.connections[0]?.readyState;
    } catch (e) {
        console.error(e);
    }
}

async function disconnect() {
    return mongoose.disconnect();
}

export { connect, disconnect };
