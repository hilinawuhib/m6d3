import express from "express";
import Cart from "./cart-model.js";
import Product from "../products/model.js";
import sequelize from "sequelize";
const cartsRouter = express.Router();

cartsRouter.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [
        {
          model: Product,
        },
      ],
      attributes: [
        "productId",
        [sequelize.fn("count", sequelize.col("cart.id")), "unitQuantity"],
        [sequelize.fn("sum", sequelize.col("product.price")), "unitTotalPrice"],
      ],

      group: ["productId", "product.id"],

      where: {
        userId: req.params.userId,
      },
    });

    const totalQty = await Cart.count({
      where: {
        userId: req.params.userId,
      },
    });

    const totalSum = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] },
    });

    res.send({ cart, totalQty, totalSum });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

cartsRouter.delete("/:productId/:userId", async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.destroy({
      where: {
        userId,
        productId,
      },
    });
    res.send(cart);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
cartsRouter.post("/", async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const cart= await Cart.create({ userId, productId });
    res.send(cart);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default cartsRouter;
