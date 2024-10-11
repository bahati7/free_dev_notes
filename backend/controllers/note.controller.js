import Note from "../models/note.model.js";
import mongoose from "mongoose";

export const getNotes = async (req, res)=>{
    try {
        const notes = await Note.find({});
        res.status(200).json({success:true, data:notes})
    } catch (error) {
        console.log("error in fetching notes", error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
}

export const createNote = async(req,res)=>{
    const note = req.body; // this will be sent by the user

    if(!note.title || !note.description || !note.author){
        return res.status(400).json({success:false, message: "Please fill in all fields"});
    }

    const newNote= new Note(note);

    try {
        await newNote.save();
        res.status(201).json({success:true, data:newNote});
    } catch (error) {
        console.error("Error in creating note:", error.message);
        res.status(500).json({success:false, message:"Server Error"}); 
    }
}

export const updateNote =async (req,res)=>{
    const {id}=req.params;

    const note = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid note id"});
    }

    try {
       const updatedNote= await Note.findByIdAndUpdate(id,note,{new:true});
       return res.status(200).json({success:true, data:updatedNote}) 
    } catch (error) {
        res.status(500).json({success:false, message:"Server error"})
    }

}

export const deleteNote = async(req, res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Invalid note id"});
    }

    try {
        await  Note.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Note deleted"});

    } catch (error) {
        console.error("Error in deleting note:", error.message);
        res.status(500 ).json({success:false, message:"Server error "})
    }
}