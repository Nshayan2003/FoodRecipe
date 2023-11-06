import express from "express";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/login", loginUser);
router.get("/:id", auth, getUserProfile);

export default router;
