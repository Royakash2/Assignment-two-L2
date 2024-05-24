import express, { Request, Response } from "express";
import { productController } from "./product.controller";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:productId", productController.getProductById);
router.put("/:productId", productController.updateProduct);
export const productRoutes = router;
