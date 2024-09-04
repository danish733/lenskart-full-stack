import express from "express";
import auth from "../middlewares/auth.middleware.js";
import CartModel from "../models/cart.model.js";

const cartRouter = express.Router();

// Fetch cart items
cartRouter.get("/", auth, async (req, res) => {
    const userId = req.user._id;
    try {
        const cartItems = await CartModel.findOne({ user: userId }).populate({
            path: "products.product",
            select: "title image price description",
        });

        if (!cartItems) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json({ cartItems });
    } catch (error) {
        res.status(500).json({ message: "Error in server while getting cart items" });
    }
});

// Add an item to the cart
cartRouter.post("/add", auth, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        let cart = await CartModel.findOne({ user: userId });

        if (!cart) {
            cart = new CartModel({
                user: userId,
                products: [{ product: productId, quantity: quantity || 1 }],
            });
        } else {
            const productIndex = cart.products.findIndex(
                (item) => item.product.toString() === productId
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity || 1;
            } else {
                cart.products.push({ product: productId, quantity: quantity || 1 });
            }
        }

        await cart.save();
        res.status(201).json({ message: "Item added to cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in server while adding item to cart", error: error.message });
    }
});

// Delete an item from the cart
cartRouter.delete("/delete/:id", auth, async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.id;

    try {
        const cart = await CartModel.findOneAndUpdate(
            { user: userId },
            { $pull: { products: { product: productId } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart or product not found" });
        }

        res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error in server while deleting item from cart", error: error.message });
    }
});

// Update the quantity of an item in the cart
cartRouter.patch("/update/:id", auth, async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.id;
    const { quantity } = req.body;

    try {
        const cart = await CartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex > -1) {
            if (quantity <= 0) {
                // Remove the product if quantity is zero or negative
                cart.products.splice(productIndex, 1);
            } else {
                // Update the quantity if greater than zero
                cart.products[productIndex].quantity = quantity;
            }
            await cart.save();
            res.status(200).json({ message: "Item quantity updated successfully" });
        } else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error in server while updating item quantity", error: error.message });
    }
});

export default cartRouter;
