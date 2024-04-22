import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  avatar: {type: String},
  password: { type: String },
  role: { type: String },
  status: { type: Number },
  createdAt: { type: String },
});
const User = mongoose.model("users", userSchema);

export default User;
