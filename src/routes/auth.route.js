import { register, login } from "../controllers/auth.controller.js";
import checkUser from "../middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);

export default router;
