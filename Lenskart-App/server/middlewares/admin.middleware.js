

const admin = (req,res,next)=>{
    if(req.user.role === "admin"){
        next()
    }
    else{
        res.status(404).json({message:"You are not admin"})
    }
}
export default admin