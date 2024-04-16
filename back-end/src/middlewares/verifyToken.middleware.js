import jwt from "jsonwebtoken";

// verify token
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, result) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      } else if (result) {
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "You're not authenticated" });
  }
}

export { verifyToken };
