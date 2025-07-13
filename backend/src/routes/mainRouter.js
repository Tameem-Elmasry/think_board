// @ imports
import express from "express";
import notesRoutes from "./notesRoutes.js";

// @ Constants
const router = express.Router();

// @ middlewares
router.use("/api/notes", notesRoutes);

// @ exports
export default router;

// 3W5V0WFJc55Qg17x