// @ imports
import Note from "../models/Note.js";

// @ Handlers:
// & Get all notes
export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({
            createdAt: -1,
        });
        return notes.length > 0
            ? res.status(200).json({
                  success: true,
                  msj: `Notes fetched successfully`,
                  data: notes,
              })
            : res.status(200).json({
                  success: true,
                  msj: `There is no notes`,
              });
    } catch (error) {
        console.log(`Error in getAllNotes controller: ${error}`);
        res.status(500).json({
            success: false,
            msj: `Internal Server Error`,
        });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                success: false,
                msj: `Please Insert valid ID`,
            });
        const foundNote = await Note.findById(id);
        return !foundNote
            ? res.status(400).json({
                  success: false,
                  msj: `there is no notes with this ID`,
              })
            : res.status(200).json({
                  success: true,
                  msj: `required Note found successfully`,
                  data: foundNote,
              });
    } catch (error) {
        console.log(`Error in addNote controller: ${error}`);
        res.status(500).json({
            success: false,
            msj: `Internal Server Error`,
        });
    }
};

export const addNote = async (req, res) => {
    try {
        const { title, content, id } = req.body;
        const userId = req.user.id;
        if (!title || !content)
            return res.status(400).json({
                success: false,
                msj: `Please enter valid title and content`,
            });
        const newNote = new Note({ title, content, userId });
        await newNote.save();

        return res.status(201).json({
            success: true,
            msj: `Note Created successfully`,
            data: newNote,
        });
    } catch (error) {
        console.log(`Error in addNote controller: ${error}`);
        res.status(500).json({
            success: false,
            msj: `Internal Server Error`,
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                success: false,
                msj: `Please insert valid ID`,
            });
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {
                title,
                content,
            },
            { new: true }
        );
        if (!updatedNote)
            return res.status(404).json({
                success: false,
                msj: `There is no Note with the given ID`,
            });
        res.status(200).json({
            success: true,
            msj: `Note Updated Successfully`,
            data: updatedNote,
        });
    } catch (error) {
        console.error(`Error in updateNote controller: ${error}`);
        res.status(500).json({
            success: false,
            msj: `Internal Server Error`,
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).json({
                success: false,
                msj: `Please insert valid ID`,
            });
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote)
            return res.status(404).json({
                success: false,
                msj: `There is no Note with the given ID`,
            });
        return res.status(200).json({
            success: true,
            msj: `Note deleted successfully!`,
            data: deletedNote,
        });
    } catch (error) {
        console.error(`Error in deleteNote controller: ${error}`);
        res.status(500).json({
            success: false,
            msj: `Internal Server Error`,
        });
    }
};
