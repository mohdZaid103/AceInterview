import {mongoose,Schema} from "mongoose"

const interviewSchema = new mongoose.Schema({})

export const Interview = mongoose.model("Interview", interviewSchema)