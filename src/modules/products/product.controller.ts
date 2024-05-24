import { Request, Response } from "express";
import { productServices } from "./product.services";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await productServices.createProduct(productData);
  res.json({
    success: true,
    message: "Product created successfully!",
    data: result,
  });
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProduct();
    res.json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductBYId(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getProductById,
};
