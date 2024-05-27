"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
// ______Schema for product variants--------->
const VariantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
});
// Schema for product inventory________------>
const InventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: {
        type: Boolean,
        required: true,
    },
});
// _________Schema for product--------->
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        required: true,
    },
    tags: { type: [String], required: true },
    variants: { type: [VariantSchema], required: true, _id: false },
    inventory: { type: InventorySchema, required: true, _id: false },
});
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
