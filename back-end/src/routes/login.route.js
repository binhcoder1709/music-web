import express from "express";
import {
  accessToken,
  checkBlockUser, 
  checkExistUser,
  decryptionPassword,
} from "../middlewares/login.middleware.js";
import { loginUser } from "../controllers/user.controller.js";

const loginRoute = express.Router();

// create data router
loginRoute.post(
  "/",
  checkExistUser,
  decryptionPassword,
  checkBlockUser,
  accessToken,
  loginUser
);

loginRoute.post("/popup", checkExistUser, checkBlockUser, accessToken, loginUser);

export default loginRoute;
