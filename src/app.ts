import express, { NextFunction, Request, Response, json } from "express";
import { productRoutes } from "./modules/products/product.route";
import { orderRoutes } from "./modules/oders/order.route";
const app = express();
app.use(express.json());

// products rote_____---->
app.use("/api/products", productRoutes);
// order routes______----->
app.use("/api/orders", orderRoutes);

// to handle undefined routes_______------>

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to E-commerce Product management system");
});
// Middleware to handle undefined routes_____------->
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error-handling __________------>
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred",
  });
});

export default app;
