import { Request, Response } from "express";
import { productServices } from "./product.services";
import { ProductValidationSchema } from "../validation/product.validation";
import { z } from "zod";

// _________Handles creating a new product and responds with the created product data.---->
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = ProductValidationSchema.parse(req.body);
    const result = await productServices.createProduct(productData);
    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }
};

// _______Handles get all product data and searchTerm product data.----------->
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm?: string };
    let products = [];

    if (searchTerm) {
      products = await productServices.searchProduct(searchTerm);
    } else {
      products = await productServices.getAllProduct();
    }

    if (products.length === 0) {
      res.status(404).json({
        success: false,
        message: searchTerm
          ? `No products found matching search term '${searchTerm}'`
          : "No products available",
        data: products,
      });
    } else {
      res.status(200).json({
        success: true,
        message: searchTerm
          ? `Products matching search term '${searchTerm}' fetched successfully!`
          : "All products fetched successfully!",
        data: products,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// ________Handles Retrieve a Specific Product by ID----------->
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

//_________Handles Update Product Information------------>
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedProduct = await productServices.updateProductBYId(
      productId,
      updateData
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

//_________Handles delete Product---------------->
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await productServices.deleteProductBYId(productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
