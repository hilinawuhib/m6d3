import { Router } from "express";
import User from "./user-model.js";
import Review from "./model.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Review],
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id);
    if (singleUser) {
      res.send(singleUser);
    } else {
      res.status(404).send({ message: "NO USER" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const [success, updatedUser] = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (success) {
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: "NO USER" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
usersRouter.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default usersRouter;
