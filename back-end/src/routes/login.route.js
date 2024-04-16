import express from "express";
import {
  accessToken,
  checkExistUser,
  decryptionPassword,
} from "../middlewares/login.middleware.js";

const loginRoute = express.Router();

// create data router
loginRoute.post("/", checkExistUser, decryptionPassword, accessToken);

export default loginRoute;
