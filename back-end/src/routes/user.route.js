import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateData,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { checkEmptyUser } from "../middlewares/user.middleware.js";
const userRoute = express.Router();

// get data router
userRoute.get("/", getUsers);

// get data by id router
userRoute.get("/:id", verifyToken, getUserById);

// create data router
userRoute.post("/", createUser);

// update data router
userRoute.patch("/update/:id", verifyToken, checkEmptyUser, updateData);

export default userRoute;
