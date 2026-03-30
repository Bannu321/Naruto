import express from "express";
// import User from "../models/user.js";
// import router from "./Authentication.js";
import Tasks from "../models/tasks.js";
// import Tasks from "../models/user.js";

const router = express.Router();

// Get all Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.find({ userID: req.query.userID });
    res.send(tasks);
  } catch (err) {
    return res.status(500).json("Error: " + err);
  }
});

// Add a Task
router.post("/", async (req, res) => {
  const Task = new Tasks({
    userID: req.body.userID,
    title: req.body.title,
    difficulty: req.body.difficulty,
  });
  try {
    const newTask = await Task.save();
    res.status(201).json(newTask);
  } catch (err) {
    return res.status(400).json({ message: "Error: " + err.message });
  }
});

// Update a Task
router.patch("/", async (req, res) => {
  try {
    const task = await Tasks.findById(req.body.taskID);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.body.title !== undefined) {
      task.title = req.body.title;
    }
    if (req.body.isCompleted !== undefined) {
      task.isCompleted = req.body.isCompleted;
    }
    if (req.body.difficulty !== undefined) {
      task.difficulty = req.body.difficulty;
    }

    const updatedTodo = await task.save();
    res.json(updatedTodo);
  } catch (err) {
    return res.status(400).json({ message: "Error: " + err.message });
  }
});

// Delete a Task
router.delete("/", async (req, res) => {
  try {
    await Tasks.findByIdAndDelete(req.body.id);
    if (!task) {
      return res.json({ message: "Task Deleted" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Error: " + err.message });
  }
});

export default router;
