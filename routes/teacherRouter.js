const express = require("express")
const teacher= express.Router();
const TeacherModel=require("../models/teacherModel");
const { sendResponse } = require("../helper/helper");
teacher.get('/',async(req,res)=>{
    try {
        const result= await TeacherModel.find()
        if(!result){
            res.send(sendResponse(false,null,"no data found")).status(404)
        }
        else{
            res.send(sendResponse(true,result)).status(200)
        }
    } catch (error) {
        console.log(error);
        res.send(
            sendResponse(false,null,"internal server erro").status(400)
        )
    }
})
teacher.get('/:id',(req,res)=>{
    res.send("get single teacher data")
})
teacher.put('/:id',(req,res)=>{
    res.send("edit teaacher data")
})
teacher.post('/',async(req,res)=>{
   let{name,course,contact}=req.body;
   try {
    let earr=[]
    if(!name){
            earr.push("req: name")
    }
    if(!course){
        earr.push("req: course")

    }
    if(!contact){
        earr.push("req: contact")

    }
    if(earr.length>0){
        res.send(sendResponse(false, earr,null,"req all fields"))
        .status(400)
        return;
    
    }
    else{
        let obj={name,course,contact}
        let teaacher= new TeacherModel(obj)
        await teacher.save()
        if(!teaacher){
            res.send(sendResponse(false,null,"Internal Server Error"));
        }
        else{
            res.send(sendResponse(true,teaacher,"save Successfully"))
            .status(200)
        }
    }
    
   } catch (error) {
    res.send(sendResponse(false,null,"internal server error"))
   }
})
teacher.delete('/:id',(req,res)=>{
    res.send("delete teacher data")
})

module.exports=teacher