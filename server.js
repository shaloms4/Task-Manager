import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import taskRoutes from "./routes/taskRoutes.js";


dotenv.config()
const app = express();
const port = 3000;


//middleware
app.use(express.json());
connectToDB();


app.use("/", taskRoutes);


// Start the Express server
app.listen(port, () =>{
    console.log(`server running on ${port}`);
});
