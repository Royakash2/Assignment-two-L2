import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  productId: z.string().min(1, "Product ID is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().positive("Quantity must be a positive number"),
});
