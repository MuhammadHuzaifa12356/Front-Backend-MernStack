const mongoose = require("mongoose")
const teacherSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    course:{
        type:Number,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
})
const TeacherModel= mongoose.model("teacher",teacherSchema);
module.exports=TeacherModel;