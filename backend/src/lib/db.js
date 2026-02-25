import mongoose from "mongoose";
import "dotenv/config";

export const connectDb = async () => {
    try {
        const { MONGODB_URI } = process.env;
        if(!MONGODB_URI) throw new Error("MONGODB_URI is not set");
        const conn = await mongoose.connect(MONGODB_URI);
        console.log("MONGODB CONNECTED: ", conn.connection.host) 
    } catch (error) {
        console.log("Error connecting to MONGODB", error);
        process.exit(1); // 1 status code means fail, 0 means success
    }
}