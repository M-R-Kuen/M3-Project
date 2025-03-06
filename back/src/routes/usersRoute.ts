import { Router } from "express";
import {
  createUserController,
  getUserController,
  getUserByIdController,
  loginUserController,
  deleteUserController,
} from "../controllers/usersControllers";
import { validateUserData } from "../middlewares/userMiddlewares";
const usersRouter = Router();

usersRouter.get("/", getUserController);

usersRouter.post("/register", validateUserData, createUserController);
usersRouter.post("/login", loginUserController);

usersRouter.get("/:id", getUserByIdController);
usersRouter.delete("/:id", deleteUserController);
//usersRouter.put("/:id", deleteUserController);

export default usersRouter;
