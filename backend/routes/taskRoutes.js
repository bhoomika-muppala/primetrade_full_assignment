const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");
const auth = require("../middleware/auth");

// Create task
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all tasks of logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
