const dotenv=require('dotenv')
dotenv.config()

const express=require('express')
const connectDb=require('./config/db')
const cors=require('cors')
const authRoutes=require('./routes/auth')
const documentRoutes=require('./routes/document')

const app=express()
connectDb()

app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/documents',documentRoutes)

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('Server is running on port 3000')
})