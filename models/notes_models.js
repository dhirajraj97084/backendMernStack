import mongoose from "mongoose";
import {User} from "../models/user_modes.js"
const {ObjectId}=mongoose.Schema.Types


const notesSchema=new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:User
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
},{timestamps:true})

export const Notes=mongoose.model("Notes",notesSchema);