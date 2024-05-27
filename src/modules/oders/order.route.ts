import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

// Create a new order_______------->
router.post("/", orderController.createOrder);

// Retrieve all orders or orders by user email_________---------->
router.get("/", orderController.getAllOrders);

export const orderRoutes = router;
