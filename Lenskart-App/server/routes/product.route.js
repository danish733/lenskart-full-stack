import express from "express"
import ProductModel from "../models/product.model.js"
import admin from "../middlewares/admin.middleware.js"
import auth from "../middlewares/auth.middleware.js"

const productRouter = express.Router()

productRouter.get("/", async (req, res) => {
    try {
      const { frameType, frameShape, frameColor , frameSize, gender} = req.query;
      let filter = {};
  
      // Build filter based on query parameters
      if (frameType) {
        filter.frameType = { $in: frameType.split(",") };
      }
      if (frameShape) {
        filter.frameShape = { $in: frameShape.split(",") };
      }
      if (frameColor) {
        filter.frameColor = { $in: frameColor.split(",") };
      }
      if (frameSize) {
        filter.frameSize = { $in: frameSize.split(",") };
      }
      if(gender){
        filter.gender = { $in: gender.split(",") }
      }
  
      const getProduct = await ProductModel.find(filter);
      res.status(200).json({ product: getProduct });
    } catch (error) {
      res.status(500).json({ message: "Error in server while getting product" });
    }
  });

  productRouter.get("/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: "Error fetching product details" });
    }
  });


productRouter.post("/create",[auth,admin],async(req,res)=>{
    const { image, subImages, title, frameType, frameShape, frameColor, frameSize, framePower, gender, brand,choice, price, description } = req.body;

    try {
        const addProduct = new ProductModel({
            image, subImages, title, frameType, frameShape, frameColor, frameSize, framePower, gender, brand,choice, price, description
        })
        await addProduct.save()
        res.status(201).json({message:"Product Succesfully added"})
    } catch (error) {
        res.status(500).json({message:"Error in server while adding product"})
    }

})

productRouter.patch("/update/:id",[auth,admin],async(req,res)=>{
        const productId = req.params.id
        const payload = req.body
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(productId, payload)
                res.status(200).json({message:"Product Update successfull"})
        } catch (error) {
            res.status(500).json({message:"Error in Server while updating"})
        }
})

productRouter.delete("/delete/:id",[auth,admin],async(req,res)=>{
    const productId = req.params.id
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete(productId)
            res.status(200).json({message:"Product Deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error in Server while deleting"})
    }
})

export default productRouter