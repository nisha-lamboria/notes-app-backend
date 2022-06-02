const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    const passRegex=/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    // const emailRegex=/^[A-Za-z0-9]{3,12}@[A-Za-z]{3,4}[.]{1}[A-Za-z]$/

    //check if all fields have been filled
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('user with this email already exists')
    }else if(passRegex.test(password)!==true){
        res.status(400)
        throw new Error('Not a valid password')
    }

    //encrypt password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    //Create User
    const user=await User.create({
        name,
        email,
        password:hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid User Data')
    }
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email})

    if(user && await bcrypt.compare(password,user.password)){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('your password or email is wrong')
    }
    
})

const authorisedUser=asyncHandler(async(req,res)=>{
    const {_id,name,email}=await User.findById(req.user.id);
    res.status(200).json({
        id:_id,
        name,
        email,
    })
    
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

module.exports={
    registerUser,
    loginUser,
    authorisedUser
}