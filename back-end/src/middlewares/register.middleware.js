import { findByEmail } from "../services/user.service.js";
import bcrypt from "bcrypt";

// check exist user
const checkExistUser = async (req, res, next) => {
  const data = req.body;
  const userExist = await findByEmail(data.email);
  if (userExist) {
    return res.status(400).json({ message: "Exist Data" });
  }
  next();
};

// validation data
const validationUser = async (req, res, next) => {
  const data = req.body;
  if (!data.email || !data.password || !data.userName) {
    return res
      .status(400)
      .json({ message: "Missing username, email or password" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (data.password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }
  next();
};

// hash password
const hashPassword = async (req, res, next) => {
  const data = req.body;
  if (data.password) {
    try {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash;
      next();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    next();
  }
};

export {checkExistUser, validationUser, hashPassword}