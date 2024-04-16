import { findByEmail } from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// check exist data
const checkExistUser = async (req, res, next) => {
  const data = req.body;
  const userExist = await findByEmail(data.email);
  if (!userExist) {
    return res.status(404).json({ error: "Data Not Found" });
  }
  req.userAuth = userExist;
  next();
};

// decrypt password
const decryptionPassword = async (req, res, next) => {
  const data = req.body;
  const userAuth = req.userAuth;
  bcrypt.compare(data.password, userAuth.password, (err, result) => {
    try {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result) {
        const userChecked = {
          id: userAuth._id,
          userName: userAuth.userName,
          email: userAuth.email,
          role: userAuth.role,
          avatar: userAuth.avatar
        };
        req.userChecked = userChecked;
        next();
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

// access token
const accessToken = async (req, res, next) => {
  const userChecked = req.userChecked;
  const token = jwt.sign(userChecked, process.env.TOKEN_SECRET, {
    expiresIn: "30m",
  });
  return res.status(200).json(token);
};

export { checkExistUser, decryptionPassword, accessToken };
