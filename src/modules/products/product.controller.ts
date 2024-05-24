import { Request, Response } from "express";
import { productServices } from "./product.services";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await productServices.createProducts(productData);
  res.json({
    success: true,
    message: "Product created successfully!",
    data: result,
  });
};

export const productController = {
  createProduct,
};
