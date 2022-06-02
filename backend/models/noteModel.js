const mongoose=require('mongoose');

const noteSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',

    },
    note:{
        type:String,
        required:[true,'Please add a body for post']
    }
},{
    timestamps:true,
})

module.exports=mongoose.model('Note',noteSchema);