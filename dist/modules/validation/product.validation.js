"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
// Define Zod schema for product variant
const VariantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "Variant type is required" }),
    value: zod_1.z.string().min(1, { message: "Variant value is required" }),
});
// Define Zod schema for product inventory
const InventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .positive({ message: "Quantity must be a positive number" }),
    inStock: zod_1.z.boolean(),
});
// Define Zod schema for product
exports.ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(4, { message: "Name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    category: zod_1.z.string().min(1, { message: "Category is required" }),
    tags: zod_1.z
        .array(zod_1.z
        .string()
        .min(1, { message: "Each tag must have at least one character" }))
        .min(1, { message: "At least one tag is required" }),
    variants: zod_1.z
        .array(VariantSchema)
        .min(1, { message: "At least one variant is required" }),
    inventory: InventorySchema,
});
