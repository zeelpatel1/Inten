const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    name:{ type :String, requrie:true },
    email:{ type :String, requrie:true },
    password:{ type :String, requrie:true },
})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
})

module.exports=mongoose.model('User',UserSchema)