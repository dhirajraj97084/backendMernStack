import express from "express";
import fetchUsert from "../middleware/fetchUser.js";
import { Notes } from "../models/notes_models.js";

const notes_router=express.Router();

// add_notes API
notes_router.post("/addnotes",fetchUsert,async(req,res)=>{
   try {
    const { title, description,tag}=req.body;
    if (!title || !description || !tag) {
        res.status(401).json({msg:"please fill the all the field"});
    }
    const note=await Notes({
        title,
        description,
        tag
    })
    const savenotes=await note.save();
    console.log(savenotes);
    res.status(200).json(savenotes);
   } catch (error) {
    res.status(500).json({error:"internal server error"});
   }
})

// fetchallnotes API
notes_router.get("/fetchallnotes",fetchUsert,async(req,res)=>{
    try {
        const notes=await Notes.find({user:req.userId});
        res.json({notes});
    } catch (error) {
      console.log("internal server error");  
      res.status(500).json({Error:"INTERNAL SERVER ERROR"});
    }        
})



export default notes_router;