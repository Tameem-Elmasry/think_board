import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("CONNECTED TO DATABASE SUCCESSFULLY!");
    } catch (error) {
        console.error(`Error Connecting to DataBase: ${error}`);
        process.exit(1);
    }
};
