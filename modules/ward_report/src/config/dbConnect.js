import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDbFunc = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL_DEV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ Error Connecting to MongoDB:", error);
        throw new Error("Database Connection Failed"); 
    }
};

export { connectToDbFunc }; // ✅ Named export
