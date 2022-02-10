import { Router } from "express";
import Product from "./model.js";
import { Op } from "sequelize";
import Review from "../reviews/model.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Review],
    });
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);

    if (singleProduct) {
      res.send(singleProduct);
    } else {
      res.status(404).send({ message: "no such product." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.get("/search", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        ...(req.query.search && {
          [Op.or]: [
            {
              product_name: {
                [Op.iLike]: `%${req.query.search}%`,
              },
            },
            {
              product_description: {
                [Op.iLike]: `%${req.query.search}%`,
              },
            },
          ],
        }),

        ...(req.query.price && {
          product_price: {
            [Op.between]: req.query.price.split(","),
          },
        }),
      },

      ...(req.query.order && { order: [req.query.order.split(",")] }),
    });
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.get("/stats", async (req, res, next) => {
  try {
    const stats = await Review.findAll({
      attributes: [
        [
          sequelize.cast(
            sequelize.fn("count", sequelize.col("product_id")),
            "integer"
          ),
          "numberOfComments",
        ],
      ],
      group: ["product_id", "product.id", "product.review.id"],
      include: [{ model: Product, include: [Review] }],
    });
    res.send(stats);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.put("/:id", async (req, res, next) => {
  try {
    const [success, updatedProduct] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (success) {
      res.send(updatedProduct);
    } else {
      res.status(404).send({ message: "no such product" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
export default productsRouter;
