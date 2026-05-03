import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.js"
import { analyzeResume } from "../controllers/interview.controller.js"

const interviewRouter = express.Router()

interviewRouter.post("/resume",isAuth,upload.single("resume"),analyzeResume)

export default interviewRouter