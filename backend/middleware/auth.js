const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.header('Authorization').replace('Bearer ','')
    if(!token){
        return res.status(401).json({message:'No token provided'})
    }

    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode
        next()
    } catch (error) {
        res.status(400).json({message:'Invalid token'})
    }
}
module.exports={verifyToken}