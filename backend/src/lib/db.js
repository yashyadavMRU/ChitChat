import mongoose from "mongoose";
import "dotenv/config";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB CONNECTED: ", conn.connection.host) 
    } catch (error) {
        console.log("Error connecting to MONGODB", error);
        process.exit(1); // 1 status code means fail, 0 means success
    }
}