import express from "express";
import { createUser } from "../controllers/user.controller.js";
import {
  checkExistUser,
  hashPassword,
  validationUser,
} from "../middlewares/register.middleware.js";
const registerRoute = express.Router();

// create data router
registerRoute.post(
  "/",
  checkExistUser,
  validationUser,
  hashPassword,
  createUser
);

export default registerRoute;
