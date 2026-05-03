import express from  "express";
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors"


import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import interviewRouter from "./routes/interview.route.js";

dotenv.config()
const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use(express.json())
app.use(cookieParser())

app.use("/api/interview", interviewRouter)
app.use("/api/user",userRouter)
app.use("/api/auth", authRouter)

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb()
});