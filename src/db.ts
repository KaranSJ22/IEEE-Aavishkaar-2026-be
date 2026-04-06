import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/techfest26";

export const mongodbClient = {
    init: async () => {
        try {
            await mongoose.connect(MONGO_URL);
            console.log("✅ Successfully connected to MongoDB");
        } catch (error) {
            console.error("❌ MongoDB connection error:", error);
            process.exit(1);
        }
    }
};
