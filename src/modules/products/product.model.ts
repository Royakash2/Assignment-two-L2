import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

// ______Schema for product variants--------->
const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

// Schema for product inventory________------>
const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: {
    type: Boolean,
    required: true,
  },
});

// _________Schema for product--------->
const ProductSchema = new Schema<TProduct>({
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

export const Product = model<TProduct>("Product", ProductSchema);
