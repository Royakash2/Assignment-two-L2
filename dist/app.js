"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./modules/products/product.route");
const order_route_1 = require("./modules/oders/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// products rote_____---->
app.use("/api/products", product_route_1.productRoutes);
// order routes______----->
app.use("/api/orders", order_route_1.orderRoutes);
// to handle undefined routes_______------>
app.get("/", (req, res) => {
    res.send("welcome to E-commerce Product management system");
});
// Middleware to handle undefined routes_____------->
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
// Error-handling __________------>
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "An internal server error occurred",
    });
});
exports.default = app;
