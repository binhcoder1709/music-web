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
        next();
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

// check if user blocked
const checkBlockUser = async (req, res, next) => {
  const userAuth = req.userAuth;
  if (userAuth.status == 0) {
    return res.status(403).json({ error: "Account Blocked" });
  } else if (userAuth.status == 1) {
    const userChecked = {
      id: userAuth._id,
      userName: userAuth.userName,
      email: userAuth.email,
      role: userAuth.role,
      avatar: userAuth.avatar,
    };
    req.userChecked = userChecked;
    next();
  }
};

// access token
const accessToken = async (req, res, next) => {
  const userChecked = req.userChecked;
  const token = jwt.sign(userChecked, process.env.TOKEN_SECRET, {
    expiresIn: "30m",
  });
  req.token = token;
  next();
};

export { checkExistUser, decryptionPassword, accessToken, checkBlockUser };
