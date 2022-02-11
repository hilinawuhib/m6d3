import express from "express";
import productsRoutes from "./services/products/product.js";
import reviewsRoutes from "./services/reviews/review.js";
import usersRoutes from "./services/reviews/user.js";
import cartsRoutes from "./services/cart/cart.js";
import categorysRoutes from "./services/category/category.js";
import { authenticateDatabase } from "./utils/db/connect.js";
const server = express();
const { PORT = 3006 } = process.env;
server.use(express.json());
server.use("/products", productsRoutes);
server.use("/reviews", reviewsRoutes);
server.use("/users", usersRoutes);
server.use("/cart", cartsRoutes);
server.use("/categories", categorysRoutes);
server.listen(PORT, () => {
  authenticateDatabase();
  console.log(`Server is listening on port ${PORT}`);
});
server.on("error", (error) => {
  console.log(`Server is stopped : ${error}`);
});
