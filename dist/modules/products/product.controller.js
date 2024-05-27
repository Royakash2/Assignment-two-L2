"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_services_1 = require("./product.services");
const product_validation_1 = require("../validation/product.validation");
const zod_1 = require("zod");
// _________Handles creating a new product and responds with the created product data.---->
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = product_validation_1.ProductValidationSchema.parse(req.body);
        const result = yield product_services_1.productServices.createProduct(productData);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: error.message || "Internal Server Error",
            });
        }
    }
});
// _______Handles get all product data and searchTerm product data.----------->
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        let products = [];
        if (searchTerm) {
            products = yield product_services_1.productServices.searchProduct(searchTerm);
        }
        else {
            products = yield product_services_1.productServices.getAllProduct();
        }
        if (products.length === 0) {
            res.status(404).json({
                success: false,
                message: searchTerm
                    ? `No products found matching search term '${searchTerm}'`
                    : "No products available",
                data: products,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: searchTerm
                    ? `Products matching search term '${searchTerm}' fetched successfully!`
                    : "All products fetched successfully!",
                data: products,
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
});
// ________Handles Retrieve a Specific Product by ID----------->
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_services_1.productServices.getProductBYId(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
//_________Handles Update Product Information------------>
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const updatedProduct = yield product_services_1.productServices.updateProductBYId(productId, updateData);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
});
//_________Handles delete Product---------------->
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const deletedProduct = yield product_services_1.productServices.deleteProductBYId(productId);
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
