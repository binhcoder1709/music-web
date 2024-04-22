import express from "express";
import {
  checkIdExist,
  validationMusic,
} from "../middlewares/music.middleware.js";
import {
  createMusic,
  getMusicById,
  getMusics,
  getVinahouseMusics,
} from "../controllers/music.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const musicRoute = express.Router();

// get data router
musicRoute.get("/", getMusics);

// get vinahouse type router
musicRoute.get("/vinahouse", getVinahouseMusics);

// create data router
musicRoute.post("/", verifyToken, validationMusic, createMusic);

// get data by id router
musicRoute.get("/:id", checkIdExist, getMusicById);

export default musicRoute;
