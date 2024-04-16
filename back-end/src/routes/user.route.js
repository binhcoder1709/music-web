import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
} from "../controllers/user.controller.js";
const userRoute = express.Router();

// get data router
userRoute.get("/", getUsers);

// get data by id router
userRoute.get("/:id", getUserById);

// create data router
userRoute.post("/", createUser);

export default userRoute;
