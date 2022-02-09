import { Router } from "express";

import Review from "./model.js";

const reviewsRouter = Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({});
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const singleReview = await Review.findByPk(req.params.id);
    if (singleReview) {
      res.send(singleReview);
    } else {
      res.status(404).send({ message: "NO REVIEW" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

reviewsRouter.put("/:id", async (req, res, next) => {
  try {
    const [success, updatedReview] = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (success) {
      res.send(updatedReview);
    } else {
      res.status(404).send({ message: "no such review" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Review.destroy({ id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default reviewsRouter;
