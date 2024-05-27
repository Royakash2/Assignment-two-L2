import { Request, Response } from "express";
import { orderServices } from "./order.services";
import { TOrder } from "./order.interface";
import { orderValidationSchema } from "../validation/order.validation";
import { z } from "zod";

// create order controller__-------->
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = orderValidationSchema.parse(req.body);
    const result = await orderServices.createOrder(orderData);
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }
};

// get all order controller______--------->
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined;
    const result = email
      ? await orderServices.getOrdersByEmail(email)
      : await orderServices.getAllOrders();

    if (email && result.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No orders found for email: ${email}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ success: false, message: errorMessage });
  }
};
export const orderController = {
  createOrder,
  getAllOrders,
};
