import ToDoListSchema from "../models/todo.model.js";
import express from "express";
import checkUser from "../middlewares/auth.middleware.js";

const router = express.Router();

//Create a new item in the to do list
router.post("/", checkUser, async (req, res) => {
  const todo = new ToDoListSchema({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get all items in the to do list
router.get("/", checkUser, async (req, res) => {
  try {
    const todos = await ToDoListSchema.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get a single item in the to do list
router.get("/:id", getTodo, (req, res) => {
  res.json(res.todo);
});

//Update a single item in the to do list
router.patch("/:id", getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }
  if (req.body.description != null) {
    res.todo.description = req.body.description;
  }
  if (req.body.status != null) {
    res.todo.status = req.body.status;
  }
  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete a single item in the to do list
router.delete("/:id", getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: "Deleted Todo" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Middleware function for gettting to do list item
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await ToDoListSchema.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "Cannot find todo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.todo = todo;
  next();
}
export default router;
