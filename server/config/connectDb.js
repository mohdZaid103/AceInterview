import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`DB Connected Successfully: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`DB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;