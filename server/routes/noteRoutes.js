const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (err) {
    console.error("Error creating note:", err.message);
    res.status(500).json({ message: "Server error while creating note" });
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err.message);
    res.status(500).json({ message: "Server error while fetching notes" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully", id: req.params.id });
  } catch (err) {
    console.error("Error deleting note:", err.message);
    res.status(500).json({ message: "Server error while deleting note" });
  }
});

module.exports = router;
