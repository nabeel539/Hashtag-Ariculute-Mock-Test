import express from "express";
import {
  createOrder,
  verifyPayment,
  checkPurchase,
} from "../controllers/paymentController.js";
import { userProtect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/razorpay", userProtect, createOrder);
router.post("/verifyRazorpay", userProtect, verifyPayment);
router.get("/check-purchase/:testId", userProtect, checkPurchase);

export default router;
