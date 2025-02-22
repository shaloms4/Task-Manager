import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js";
dotenv.config()
const app = express();
const port = 3000;


//middleware
app.use(express.json());
connectToDB();


// Create a new todo item
app.post("/create-todo", async(req, res) => {
    const todoDetails = req.body;
    try {
        const result = await Todo.create(todoDetails)
        res.send({
            success: true,
            message: "Todo is created succesfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to create todo",
            data: result,
        });
    }
})


// Retrieve all todo items from the database
app.get("/todos", async (req, res) => {
    try{
        const result = await Todo.find()
        res.send({
            success: true,
            message: "Todo lists retrived succesfully",
            data: result
        });

    }catch (error){
        res.send({
            success: true,
            message: "failed to retrive todo list",
            data: result
    });
  }
})


// Retrieve a single todo item by its ID
app.get("/:todoId", async (req, res) =>{
    const todoId = req.params.todoId
    try {
        const result = await Todo.findById(todoId)
        res.send({
            success: true,
            message: "todo retrieved succesfully.",
            data: result
        })
    } catch (error){
        res.send({
            success: false,
            message: "Failed to retrieve todo",
            data: result
            
        });
    }
})


// Update a todo item by its ID
app.patch("/:todoId", async (req, res) =>{
    const todoId = req.params.todoId;
    const updatedTodo = req.body;
    try {
        const result = await Todo.findByIdAndUpdate(todoId, updatedTodo,{
            new: true,
        });
        res.send({
            success: true,
            message: "todo updated succesfully.",
            data: result
        })
    } catch (error){
        res.send({
            success: false,
            message: "Failed to update todo",
            data: result            
        });
    }
})


// Delete a todo item by its ID
app.delete("/delete/:todoId", async (req, res) =>{
    try {
        await Todo.findByIdAndDelete(req.params.todoId);
        res.send({
            success: true,
            message: "todo deleted succesfully.",
            data: null
        })
    } catch (error) {
        res.send({
            success: false,
            message: "todo deleted succesfully.",
            data: null
        });
    }
});


// Start the Express server
app.listen(port, () =>{
    console.log(`server running on ${port}`);
});
