import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create product
const createProducts = async (playLoad: TProduct) => {
  const result = await Product.create(playLoad);
  return result;
};
export const productServices = {
  createProducts,
};
