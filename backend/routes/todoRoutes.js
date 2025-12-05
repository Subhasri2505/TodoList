import express from "express";
import Todo from "../models/Todo.js";
const express=require("express")
const router = express.Router();
router.get("/",async(req,res)=>{
    const todos=await Todo.find({});
    res.json(todos);
});
router.post("/",async(req,res)=>{
    const newTodo=new Todo({text:req.body.text});
   const todo=await newTodo.save();
    res.json(todo);
});
router.put("/:id",async(req,res)=>{
    const updateTodo=await Todo.findByIDAndUpdate(
        req.params.id,
        {text:req.body.text,completed:req.body.completed},
        {new:true}
    );
    res.json(upadateTodo);
});
router.delete("/:id",async(req,res)=>{
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message:"Todo deleted"});
});
export default router;
