import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create product
const createProduct = async (playLoad: TProduct) => {
  const result = await Product.create(playLoad);
  return result;
};
// get all product
const getAllProduct = async () => {
  const result = await Product.find();
  return result;
};
// get product by id
const getProductBYId = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
const updateProductBYId = async (id: string, updateData: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

export const productServices = {
  createProduct,
  getAllProduct,
  getProductBYId,
  updateProductBYId,
};
