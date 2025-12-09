import express from "express";
import Todo from "../models/Todo.mjs";

const router = express.Router();
router.get("/", async (req, res) => {
    const todos = await Todo.find({});
    res.json(todos);
});
router.post("/", async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    const todo = await newTodo.save();
    res.json(todo);
});
router.put("/:id", async (req, res) => {
    const updateTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { text: req.body.text, completed: req.body.completed },
        { new: true }
    );
    res.json(updateTodo);
});
router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
});
export default router;
