import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import noteRoutes from './routes/note.route.js'

dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000

app.use(express.json()); //middleware(function that runs before you send the response back to the client) allows us to accept JSON data in the req.body

app.use("/api/notes", noteRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log("Serer started at http://localhost:"+ PORT)
})

