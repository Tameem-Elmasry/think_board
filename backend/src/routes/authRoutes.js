// @ imports
import express from "express";
import { login, signUp, checkAuth, logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

// @ constants
const router = express.Router();

// @ routes
router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", verifyToken, checkAuth);
router.post("/logout", logout);

// @ exports
export default router;
