import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js";
import mongooseConnect from "./config/mongoose.config.js";
import registerRoute from "./routes/register.route.js";
import loginRoute from "./routes/login.route.js";
import musicRoute from "./routes/music.route.js";
const app = express();
dotenv.config();
mongooseConnect();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoute);
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/musics", musicRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running with port", port);
});
