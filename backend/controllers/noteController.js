const asyncHandler=require('express-async-handler');

const Note=require('../models/noteModel');
const User=require('../models/userModel');

const getNotes=asyncHandler(async(req,res)=>{
    const notes=await Note.find({user:req.user.id})
    res.status(200).json(notes);
})

const setNote=asyncHandler(async(req,res)=>{
    if(!req.body.note){
        res.status(400)
        throw new Error('Please add body for post request');
    }
    const createdNote=await Note.create({
        note:req.body.note,
        user:req.user.id
    })
    res.status(200).json({message:createdNote});
})

const updateNote=asyncHandler(async(req,res)=>{
    const noteById=await Note.findById(req.params.id);
    if(!noteById){
        res.status(400)
        throw new Error('Note not found')
    }

    const user=await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    if(noteById.user.toString()!==user.id){
        res.status(401)
        throw new Error('User not authorised')
    }
    const updatedNote=await Note.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedNote);
})

const deleteNote=asyncHandler(async(req,res)=>{
    const noteById=await Note.findById(req.params.id);
    if(!noteById){
        res.status(400)
        throw new Error('Note not found')
    }
    
    const user=await User.findById(req.user.id);
    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    if(noteById.user.toString()!==user.id){
        res.status(401)
        throw new Error('User not authorised')
    }

    await noteById.remove();
    res.status(200).json({id:req.params.id});
})

module.exports={
    getNotes,
    setNote,
    updateNote,
    deleteNote
}