// @ imports
import express from "express";
import notesRoutes from "./notesRoutes.js";
import authRoutes from "./authRoutes.js"

// @ Constants
const router = express.Router();


// @ middlewares
router.use("/api/notes", notesRoutes);
router.use("/api/user", authRoutes);

// @ exports
export default router;