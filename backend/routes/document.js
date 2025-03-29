const express=require('express')
const Document=require('../model/Document')
const {verifyToken}=require('../middleware/auth')
const router=express.Router()

router.get('/',verifyToken,async(req,res)=>{
    try {
        const document=await Document.find({owner:req.userId})
        if(!document){
            return res.status(404).json({message:'Document not found'})
        }
        res.json(document)
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
})

router.get('/:id',verifyToken,async(req,res)=>{
    try {
        const document=await Document.findById(req.params.id)
        if(!document){
            return res.status(404).json({message:'Document not found'})
        }
        res.json(document)
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
})

router.post('/',verifyToken,async(req,res)=>{
    const {title,content}=req.body
    try {
        const newDocument=new Document({
            title,
            content,
            owner:req.userId
        })
        await newDocument.save()
        res.status(201).json(newDocument)
    } catch (error) {
        res.status(500).json({message:'Server error'})  
    }
})

router.put('/:id',verifyToken,async(req,res)=>{
    const {title,content}=req.body
    try {
        const updatedDocument=await Document.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!updatedDocument){
            return res.status(404).json({message:'Document not found'})
        }
        res.json(updatedDocument)
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
})

router.delete('/:id',verifyToken,async(req,res)=>{
    try {
        await Document.findByIdAndUpdate(req.params.id)
        res.json({message:'Document deleted successfully'})
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
})

module.exports=router