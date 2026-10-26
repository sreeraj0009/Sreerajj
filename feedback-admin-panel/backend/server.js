import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const feedbackSchema=new mongoose.Schema({name:{type:String,required:true,trim:true},courseId:{type:String,required:true},courseName:{type:String,required:true},duration:{type:String,required:true},rating:{type:Number,required:true,min:1,max:5},comment:{type:String,required:true,trim:true,maxlength:500}},{timestamps:true});
const Feedback=mongoose.model('Feedback',feedbackSchema);
app.get('/api/health',(_req,res)=>res.json({status:'ok',service:'Feedback Admin API'}));
app.get('/api/feedback',async(_req,res,next)=>{try{res.json(await Feedback.find().sort({createdAt:-1}).limit(200));}catch(e){next(e)}});
app.post('/api/feedback',async(req,res,next)=>{try{const item=await Feedback.create(req.body);res.status(201).json(item);}catch(e){next(e)}});
app.get('/api/courses',async(_req,res,next)=>{try{const rows=await Feedback.aggregate([{$group:{_id:{courseId:'$courseId',courseName:'$courseName',duration:'$duration'},responses:{$sum:1},rating:{$avg:'$rating'}}},{$sort:{rating:-1}}]);res.json(rows);}catch(e){next(e)}});
app.use((err,_req,res,_next)=>{console.error(err.message);res.status(err.name==='ValidationError'?400:500).json({message:err.name==='ValidationError'?'Please check the submitted fields.':'Server error'});});
const port=process.env.PORT||5000;
if(process.env.MONGO_URI){mongoose.connect(process.env.MONGO_URI).then(()=>app.listen(port,()=>console.log(`Feedback API running on ${port}`))).catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1)});}else{app.listen(port,()=>console.log(`Feedback API running on ${port}; set MONGO_URI to enable database routes`));}
