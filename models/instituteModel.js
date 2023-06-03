const mongoose = require("mongoose");
const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: { type: String, required: true },
  shortName: { type: String, required: true },
  tel: { type: String, required: true },
});
const instituteModel=mongoose.model("institute",instituteSchema)
module.exports=instituteModel