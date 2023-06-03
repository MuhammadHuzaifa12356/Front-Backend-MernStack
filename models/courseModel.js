const mongoose = require ("mongoose");
const courseScheme =  new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    duration:{
        type: String,
        required:true,
    },
    fees:{
        type: String,
        required:true,
    },
    shortName:{
        type: String,
        required:true,
    }
})
const courseModel = mongoose.model("course",courseScheme)
module.exports=courseModel;