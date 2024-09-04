import express from "express";
import auth from "../middlewares/auth.middleware.js";
import WishlistModel from "../models/wishlist.model.js";

const wishlistRouter = express.Router();


wishlistRouter.get("/", auth, async (req, res) => {
    const userId = req.user._id;
    try {
      // Find the wishlist for the user and populate the products array with full product details
      const wishlistItems = await WishlistModel.findOne({ user: userId }).populate({
        path: "products",
        select: "image title description price frameSize frameColor", // Select specific fields to populate
      });
  
      if (!wishlistItems) {
        return res.status(404).json({ message: "Wishlist is empty" });
      }
  
      res.status(200).json({ wishlist: wishlistItems });
    } catch (error) {
      res.status(500).json({
        message: "Error in server while getting wishlist items",
        error: error.message,
      });
    }
  });


wishlistRouter.post("/add", auth, async (req, res) => {
    const { productId } = req.body; // Product ID from client
    const userId = req.user._id; // Extracted from middleware
  
    try {
      // Check if a wishlist already exists for the user
      let wishlist = await WishlistModel.findOne({ user: userId });
  
      if (wishlist) {
        // Check if the product is already in the wishlist
        if (wishlist.products.includes(productId)) {
          return res.status(400).json({ message: "Item already in wishlist" });
        }
  
        // Add the product to the wishlist
        wishlist.products.push(productId);
      } else {
        // Create a new wishlist entry
        wishlist = new WishlistModel({
          user: userId,
          products: [productId],
        });
      }
  
      // Save the updated or new wishlist
      await wishlist.save();
      res.status(201).json({ message: "Item added to wishlist successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error in server while adding item to wishlist",
        error: error.message,
      });
    }
  });

  wishlistRouter.delete("/delete/:productId", auth, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;
  
    try {
      // Find the user's wishlist and remove the specific product
      const wishlist = await WishlistModel.findOneAndUpdate(
        { user: userId },
        { $pull: { products: productId } },
        { new: true }
      );
  
      if (!wishlist) {
        return res.status(404).json({ message: "Item not found in wishlist" });
      }
  
      res.status(200).json({ message: "Item removed from wishlist successfully", wishlist });
    } catch (error) {
      res.status(500).json({
        message: "Error in server while deleting item from wishlist",
        error: error.message,
      });
    }
  });

export default wishlistRouter;

