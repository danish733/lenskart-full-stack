import express from 'express';
import Razorpay from "razorpay";
import crypto from 'crypto';
import 'dotenv/config';
import PaymentModel from '../models/payment.model.js';

const paymentRouter = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ROUTE 1: Create Order
paymentRouter.post('/order', (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: Number(amount) * 100, // Amount in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
      console.log(order);
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.error(error);
  }
});

// ROUTE 2: Verify Payment
paymentRouter.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature , amount} = req.body;

  try {
    // Create Sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    // Create Expected Signature
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) // Correct usage of environment variable
      .update(sign.toString())
      .digest("hex");

    // Check if the signature is authentic
    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      // Payment data to be saved in the database (Assuming you have a Payment model)
      const payment = new PaymentModel({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: amount
      });

      // Save Payment 
      await payment.save();

      // Send Success Message 
      res.json({
        message: "Payment Successfully",
        orderId: razorpay_order_id,
        amount: amount
      });
    } else {
      res.status(400).json({ message: "Invalid Payment Signature!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.error(error);
  }
});

export default paymentRouter;
