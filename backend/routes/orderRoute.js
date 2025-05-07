import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//multiple endpoints
//Admin Features
orderRouter.post("/list", adminAuth, allOrders); // вывод всех ордеров в админ панели
orderRouter.post("/status", adminAuth, updateStatus); //только админ может обновлять статус

// Payment Features
orderRouter.post("/place", authUser, placeOrder); // cashOnDelivery
orderRouter.post("/stripe", authUser, placeOrderStripe); // stripe
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//User Feature
orderRouter.post("/userorders", authUser, userOrders);

// verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
