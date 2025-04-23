import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

const MONGODB_URI = process.env.MONGODB_URI;

export async function dbconnect(): Promise<void> {
    if (!MONGODB_URI) {
        console.error("❌ MONGODB_URI is not set in environment variables!");
        throw new Error("Database connection error: MONGODB_URI is missing");
    }

    if (connection.isConnected) {
        console.log("✅ Database is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);

        connection.isConnected = db.connections[0].readyState;
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
}
