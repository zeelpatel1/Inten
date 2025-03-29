const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../model/User')

const router=express.Router()

router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:'User already exists'})
        }
        const user=new User({name,email,password})
        await user.save()

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({username:user.username,token:token})

    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body

    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid credentials'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})

        res.status(200).json({username:user.username,token:token})
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
})

module.exports=router