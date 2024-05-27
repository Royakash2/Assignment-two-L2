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
exports.productServices = void 0;
const product_model_1 = require("./product.model");
// Service functions to interact with the product controller---->
// _________Create a new product---->
const createProduct = (playLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(playLoad);
    return result;
});
// _________search product by search term------->
const searchProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, "i");
    const result = yield product_model_1.Product.find({
        $or: [
            { name: regex },
            { description: regex },
            { category: regex },
            { tags: regex },
        ],
    });
    return result;
});
// _______Get all products-------->
const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
// ______get product by id------->
const getProductBYId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProductBYId = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, updateData, { new: true });
    return result;
});
// __________delete product by id--------->
const deleteProductBYId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
// _____update inventory by using Id
const updateInventory = (productId, quantity, inStock) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, { "inventory.quantity": quantity, "inventory.inStock": inStock }, { new: true });
    return result;
});
exports.productServices = {
    createProduct,
    getAllProduct,
    getProductBYId,
    updateProductBYId,
    deleteProductBYId,
    searchProduct,
    updateInventory,
};
