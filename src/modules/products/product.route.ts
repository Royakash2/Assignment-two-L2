import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

// _____Define routes for product management and CRUD operations_--------------->
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);
export const productRoutes = router;
