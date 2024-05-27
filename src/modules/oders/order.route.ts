import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

// Create a new order
router.post("/", orderController.createOrder);

// Retrieve all orders or orders by user email
router.get("/", orderController.getAllOrders);

export const orderRoutes = router;
