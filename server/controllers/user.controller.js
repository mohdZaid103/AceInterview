import { User } from "../models/user.model.js"


export const getCurrentUser = async (req,res)=>{
    try {
        const userId= req.userId
        if(!userId){
            return res.status(400).json({message:"unable to fetch userId from auth middleware in user controller"})
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"unable to fetch current user with given userId"})
        }
        return res.status(200).json(user)

    } catch (error) {
        return res.status(400).json({message:`unable to fetch current user ${error}`})
    }
}