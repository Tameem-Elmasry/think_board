// @ imports
import express from "express";
import {
    addNote,
    getAllNotes,
    updateNote,
    deleteNote,
    getNoteById
} from "../controllers/notesControl.js";

// @ constants
const router = express.Router();

// @ routes
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

// @ exports
export default router;
