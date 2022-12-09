import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "shweta super secret key", async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ status: false, ms: "here 1" });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.user = user;
        else {
          return res.status(401).json({ status: false, ms: "here 2" });
        }

        next();
      }
    });
  } else {
    return res.status(401).json({ status: false, ms: "here 3" });
    // next();
  }
};

export default checkUser;
