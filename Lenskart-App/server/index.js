import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.route.js"
import connection from "./config/db.js"
import productRouter from "./routes/product.route.js"
import wishlistRouter from "./routes/wishlist.route.js"
import cartRouter from "./routes/cart.route.js"
import paymentRouter from "./routes/payment.route.js"

const PORT = process.env.PORT
const app = express()

app.use(cors({ origin: "*" }));
app.use(express.json())

app.use("/user",userRouter)
app.use("/product", productRouter)
app.use("/cart",cartRouter)
app.use("/wishlist",wishlistRouter)
app.use("/payment", paymentRouter)

app.get("/",(req,res)=>{
    res.send("<h2>Welcome to Lenskart Backend</h2>")
})
app.listen(PORT,async(req,res)=>{
    try {
        await connection
        console.log(`server is running on http://localhost:${PORT} and connected to Database`)
    } catch (error) {
        console.log(`Error while connecting Server & Database`, error)
    }
})