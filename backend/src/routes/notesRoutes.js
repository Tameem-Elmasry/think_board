// @ imports
import express from "express";
import {
    addNote,
    getAllNotes,
    updateNote,
    deleteNote,
    getNoteById,
} from "../controllers/notesControl.js";
import { verifyToken } from "../middleware/auth.js";

// @ constants
const router = express.Router();

// @ routes
router.get("/", verifyToken, getAllNotes);
router.get("/:id", verifyToken, getNoteById);
router.post("/", verifyToken, addNote);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

// @ exports
export default router;
