const mongoose=require('mongoose');

const documentSchema=new mongoose.Schema({
    title:{
        type:String,
        requrie:true
    },
    content:{
        type:String,
        requrie:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requrie:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Document',documentSchema)