const express=require("express");
const institute= express.Router();
const instituteModel=require("../models/instituteModel")
const { sendResponse } = require("../helper/helper");

institute.get('/', async(req,res)=>{
    try {
        const result= await instituteModel.find()
        if(!result){
            res.send(sendResponse(false,null,"no data found")).status(404)
        }
        else{
            res.send(sendResponse(true,result)).status(200)
        }
    } catch (error) {
        console.log(error);
        res.send(
            sendResponse(false,null,"internal server erroe").status(400)
        )
    }
})
institute.get('/:id',(req,res)=>{
    res.send("get single institute data")
})
institute.post('/',async(req,res)=>{
    let{name,address,shortname,tel}=req.body;
    try {
     let earr=[]
     if(!name){
             earr.push("req: name")
     }
     if(!address){
         earr.push("req: address")
 
     }
     if(!shortname){
         earr.push("req: shortname")
 
     }
     if(!tel){
        earr.push("req: tel")
     }
     if(earr.length>0){
         res.send(sendResponse(false, earr,null,"req all fields"))
         .status(400)
         return;
     
     }
     else{
         let obj={name,address,shortname,tel}
         let institute= new instituteModel(obj)
         await institute.save()
         if(!institute){
             res.send(sendResponse(false,null,"Internal Server Error"));
         }
         else{
             res.send(sendResponse(true,institute,"save Successfully"))
             .status(200)
         }
     }
     
    } catch (error) {
     res.send(sendResponse(false,null,"internal server error"))
    }
})
institute.put('/:id',(req,res)=>{
    res.send("edit  institute data")
})
institute.delete('/:id',(req,res)=>{
    res.send("delete  institute data")
})
module.exports=institute