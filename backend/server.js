import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

import noteRoutes from './routes/note.route.js'

dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000;

const __dirname= path.resolve();

app.use(express.json()); //middleware(function that runs before you send the response back to the client) allows us to accept JSON data in the req.body

app.use("/api/notes", noteRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, ()=>{
    connectDB();
    console.log("Serer started at http://localhost:"+ PORT)
})

