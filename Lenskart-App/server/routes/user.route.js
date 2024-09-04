import express from "express"
import UserModel from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userRouter = express.Router()

userRouter.get("/",async(req,res)=>{
    const getUser = await UserModel.find()
    res.status(200).json({users:getUser})
})

userRouter.post('/register',async(req,res)=>{
    const {firstName,lastName,email,password,role} = req.body
    
    try {
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
           return res.status(409).json({message:"Email already exist, please login"})
        }
        bcrypt.hash(password,3,async(err,hash)=>{
            if(err){
                return res.status(500).json({message:"Error while hashing password"})
            }
            const addUser = new UserModel({
                firstName,
                lastName,
                email,
                password:hash,
                role
            })
            await addUser.save()
            res.status(201).json({message:"Register Successful, please login"})
        })
        
    } catch (error) {
        res.status(500).json({message:"Error in server while registering",error})
    }
})

userRouter.post("/login",async(req,res)=>{
     const  {email, password} = req.body
     try {
        const user = await UserModel.findOne({email})
        if(!user){
          return  res.status(404).json({message:"User Not Registered, please Register"})
        }
       
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(err){
                    return res.status(500).json({message:"Server error during password validation"})
                }
                if(!result){
                    return res.status(401).json({message:"Incorrect password"})
                }
                const token = jwt.sign({id:user._id,name:user.firstName}, process.env.JWT_SECRET_KEY)
                res.status(200).json({message:"Login Successfull", token,firstName:user.firstName})
            })
        }

     } catch (error) {
        res.status(500).json({message:"Error in server while login"})
     }
})



userRouter.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not registered, please register." });
    }

    if (user.role === "user") {
      return res.status(403).json({ message: "You are not an admin." });
    }

    if (user.role === "admin") {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password." });
      }

      const token = jwt.sign(
        { id: user._id, name: user.firstName },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).json({
        message: "Login successful.",
        token,
        firstName: user.firstName,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in server while logging in." });
  }
});


userRouter.delete("/delete/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  });


export default userRouter