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
exports.orderServices = void 0;
const product_services_1 = require("../products/product.services");
const order_model_1 = require("./order.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate productId and get product details_________--------->
    const product = yield product_services_1.productServices.getProductBYId(orderData.productId);
    if (!product) {
        throw new Error("Product not found");
    }
    // Check if enough quantity is available___________----------->
    if (product.inventory.quantity < orderData.quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }
    // Create order________---------->
    const order = new order_model_1.Order(orderData);
    const result = yield order.save();
    // Update product inventory__________---------->
    const updatedQuantity = product.inventory.quantity - orderData.quantity;
    const inStock = updatedQuantity > 0;
    yield product_services_1.productServices.updateInventory(orderData.productId, updatedQuantity, inStock);
    return result;
});
// get all orders ______------->
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find();
});
// get order by email____________------
const getOrdersByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find({ email });
});
exports.orderServices = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
