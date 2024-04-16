import express from "express";
import { validationMusic } from "../middlewares/music.middleware.js";
import { createMusic, getMusics } from "../controllers/music.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const musicRoute = express.Router();

// get data router
musicRoute.get("/", getMusics);

// create data router
musicRoute.post("/", verifyToken, validationMusic, createMusic);

export default musicRoute;
