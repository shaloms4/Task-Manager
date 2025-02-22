import express from 'express';
import { Task } from '../models/task.model.js';

const router = express.Router();


// Create a new task item
router.post("/create-task", async(req, res) => {
    const taskDetails = req.body;
    try {
        const result = await Task.create(taskDetails)
        res.send({
            success: true,
            message: "Task is created succesfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to create task",
            data: result
        });
    }
})


// Retrieve all task items from the database
router.get("/tasks", async (req, res) => {
    try{
        const result = await Task.find()
        res.send({
            success: true,
            message: "Task lists retrived succesfully",
            data: result
        });

    }catch (error){
        res.send({
            success: true,
            message: "Failed to retrive task list",
            data: result
    });
  }
})


// Retrieve a single task item by its ID
router.get("/:taskId", async (req, res) =>{
    const taskId = req.params.taskId
    try {
        const result = await Task.findById(taskId)
        res.send({
            success: true,
            message: "Task retrieved succesfully.",
            data: result
        })
    } catch (error){
        res.send({
            success: false,
            message: "Failed to retrieve task",
            data: result
            
        });
    }
})


// Update a task item by its ID
router.patch("/:taskId", async (req, res) =>{
    const taskId = req.params.taskId;
    const updatedTask = req.body;
    try {
        const result = await Task.findByIdAndUpdate(taskId, updatedTask,{new: true});
        res.send({
            success: true,
            message: "Task updated succesfully.",
            data: result
        })
    } catch (error){
        res.send({
            success: false,
            message: "Failed to update task",
            data: result            
        });
    }
})


// Delete a task item by its ID
router.delete("/delete/:taskId", async (req, res) =>{
    const taskId = req.params.taskId
    try {
        await Task.findByIdAndDelete(taskId);
        res.send({
            success: true,
            message: "Task deleted succesfully.",
            data: null
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Task deleted succesfully.",
            data: null
        });
    }
});

export default router;