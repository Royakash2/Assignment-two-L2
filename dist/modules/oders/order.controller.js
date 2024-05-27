"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const order_validation_1 = require("../validation/order.validation");
const zod_1 = require("zod");
// create order controller__-------->
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = order_validation_1.orderValidationSchema.parse(req.body);
        const result = yield order_services_1.orderServices.createOrder(orderData);
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        }
    }
});
// get all order controller______--------->
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = email
            ? yield order_services_1.orderServices.getOrdersByEmail(email)
            : yield order_services_1.orderServices.getAllOrders();
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
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ success: false, message: errorMessage });
    }
});
exports.orderController = {
    createOrder,
    getAllOrders,
};
