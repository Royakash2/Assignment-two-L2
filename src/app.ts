import express, { Request, Response, json } from "express";
import { productRoutes } from "./modules/products/product.route";
import { orderRoutes } from "./modules/oders/order.route";
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
