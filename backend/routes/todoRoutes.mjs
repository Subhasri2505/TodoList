import express from "express";
import Todo from "../models/Todo.mjs";

const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const newTodo = new Todo({ text: req.body.text });
        const todo = await newTodo.save();
        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updateData = {};
        if (req.body.text !== undefined) updateData.text = req.body.text;
        if (req.body.completed !== undefined) updateData.completed = req.body.completed;

        const updateTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );
        res.json(updateTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;
