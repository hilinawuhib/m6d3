import { Router } from "express";
import Category from "./category-model.js";


const categorysRouter = Router();

categorysRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      
    });
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

categorysRouter.get("/:id", async (req, res, next) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id);
    if (singleCategory) {
      res.send(singleCategory);
    } else {
      res.status(404).send({ message: "NO Category" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

categorysRouter.post("/", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.send(newCategory);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

categorysRouter.put("/:id", async (req, res, next) => {
  try {
    const [success, updatedCategory] = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (success) {
      res.send(updatedCategory);
    } else {
      res.status(404).send({ message: "NO CATEGORY" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
categorysRouter.delete("/:id", async (req, res, next) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default categorysRouter;
