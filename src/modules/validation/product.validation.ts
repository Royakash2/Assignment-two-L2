import { z } from "zod";

// Define Zod schema for product variant
const VariantSchema = z.object({
  type: z.string().min(1, { message: "Variant type is required" }),
  value: z.string().min(1, { message: "Variant value is required" }),
});

// Define Zod schema for product inventory
const InventorySchema = z.object({
  quantity: z
    .number()
    .positive({ message: "Quantity must be a positive number" }),
  inStock: z.boolean(),
});

// Define Zod schema for product
export const ProductValidationSchema = z.object({
  name: z.string().min(4, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Each tag must have at least one character" })
    )
    .min(1, { message: "At least one tag is required" }),
  variants: z
    .array(VariantSchema)
    .min(1, { message: "At least one variant is required" }),
  inventory: InventorySchema,
});
