const express = require('express')
const studentRoute = express.Router();
const studentModel = require('../models/stundetModel');
const { sendResponse } = require('../helper/helper');
studentRoute.get('/', async (req, res) => {
    try {
        let page=Number(req.query.page)||1;
        let limit=Number(req.query.limit)||3;
        let skip =(page-1)*limit;
       const  result = await studentModel.find().skip(skip).limit(limit);
        if (!result) {
            res.send(sendResponse(false, null, "data not found")
            ).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            data: null,
            message: "Internal server error"
        }).status(400)
    }

})

studentRoute.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await studentModel.findById(id);
        if (!result) {
            res.send(sendResponse(false, null, "data not found")
            ).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            data: null,
            message: "Internal server error"
        }).status(400)
    }

})

studentRoute.post('/', async (req, res) => {
    // console.log("Post Student Data");
    // res.send("Post Single Student Data");
    let { firstName, lastName, contact, course } = req.body;
    try {
        let erarr = []
        if (!firstName) {
            erarr.push("req: first name")
        }
        if (!contact) {
            erarr.push("req: contact")
        }
        if (!course) {
            erarr.push("req: first course")
        }
        if (erarr.length > 0) {
            res.send(sendResponse(false, erarr, null, "req all fields"))
                .status(400)
            return;
        }
        else {
            let obj = {
                firstName, lastName, contact, course
            };
            let student = new studentModel(obj)
            await student.save()
            if (!student) {
                res.send(sendResponse(false, null, "Internal Server Error"));
            }
            else {
                res.send(sendResponse(true, student, "save Successfully"))
                    .status(200)
            }
        }
    }
    catch (err) {
        res.send(sendResponse(false, null, "internal server error"))
    }
})

studentRoute.put('/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let result = await studentModel.findById(id);
        if(!result){
            res.send(sendResponse(false, null, 'No Data found')).status(400);
        }
        else{
            let updateResult = await studentModel.findByIdAndUpdate(id, req.body, {new: true,});
            if(!updateResult){
                res.send(sendResponse(false, null, 'Error')).status(404);
            }
            else{
                res.send(sendResponse(true, updateResult, 'Updated Successfully')).status(200);
            }
        }
    }
    catch(e){

    }
       
})

studentRoute.delete('/:id', async (req, res) => {
            try {
                let id=req.params.id
                let result= await studentModel.findById(id)
                if(!result){

                    res.send(sendResponse(false,null,"no data on this ID").status(404))
                }
                else{
                    let deltresult=await studentModel.findByIdAndDelete(id);
                    if(!deltresult){
                        res.send(sendResponse(false,null,"error").status(404))

                    }
                    else{
                        res.send(sendResponse(true,null,"delted successfully").status(200))

                    }
                }
            } catch (error) {
                
            }  
 
})
studentRoute.get("/search",async(req,res)=>{
    let {firstName}=req.body;
    if(firstName){
        let result= await studentModel.find({firstName:firstName})
        if(!result){
            res.send(sendResponse(false,null,"no data found").status(404))
        }
        else{
            res.send(sendResponse(true,result).status(200))
        }
    }

})
module.exports = studentRoute