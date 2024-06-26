import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// Service functions to interact with the product controller---->

// _________Create a new product---->
const createProduct = async (playLoad: TProduct) => {
  const result = await Product.create(playLoad);
  return result;
};

// _________search product by search term------->
const searchProduct = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i");
  const result = await Product.find({
    $or: [
      { name: regex },
      { description: regex },
      { category: regex },
      { tags: regex },
    ],
  });
  return result;
};
// _______Get all products-------->
const getAllProduct = async () => {
  const result = await Product.find();
  return result;
};
// ______get product by id------->
const getProductBYId = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
const updateProductBYId = async (id: string, updateData: TProduct) => {
  const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};
// __________delete product by id--------->
const deleteProductBYId = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
// _____update inventory by using Id
const updateInventory = async (
  productId: string,
  quantity: number,
  inStock: boolean
) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    { "inventory.quantity": quantity, "inventory.inStock": inStock },
    { new: true }
  );
  return result;
};

export const productServices = {
  createProduct,
  getAllProduct,
  getProductBYId,
  updateProductBYId,
  deleteProductBYId,
  searchProduct,
  updateInventory,
};
