import { productServices } from "../products/product.services";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (orderData: TOrder) => {
  // Validate productId and get product details_________--------->
  const product = await productServices.getProductBYId(orderData.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // Check if enough quantity is available___________----------->
  if (product.inventory.quantity < orderData.quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  // Create order________---------->
  const order = new Order(orderData);
  const result = await order.save();

  // Update product inventory__________---------->
  const updatedQuantity = product.inventory.quantity - orderData.quantity;
  const inStock = updatedQuantity > 0;
  await productServices.updateInventory(
    orderData.productId,
    updatedQuantity,
    inStock
  );

  return result;
};

// get all orders ______------->
const getAllOrders = async () => {
  return await Order.find();
};

// get order by email____________------
const getOrdersByEmail = async (email: string) => {
  return await Order.find({ email });
};

export const orderServices = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
