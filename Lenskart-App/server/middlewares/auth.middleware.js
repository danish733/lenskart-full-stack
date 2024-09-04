import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"


const auth = async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]

    try {
        if(!token){
            return res.status(401).json({message:"token not found"})
        }
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
            if(!decoded){
               return res.status(404).json({message:"Yoy are not authorized , login again"})
            }
            if(decoded){
                const user = await UserModel.findById(decoded.id)
                req.user = user
                next()
            }
        }
    } catch (error) {
        res.status(500).json({message:"Error in Authoriztion"})
    }
}

export default auth