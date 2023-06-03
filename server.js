const express= require("express");
const app = express();
const cors = require('cors');
const mongoose = require ("mongoose");
app.use(express.json());
app.use(cors());
const student = require("./routes/studentRouter")
const teacher = require("./routes/teacherRouter");
const institute=require("./routes/instituteRouter")
const course=require("./routes/courseRoute")
const UserRoute = require('./routes/userRoute');
require('dotenv').config();
app.use("/api/student",student);
app.use("/api/teacher",teacher)
app.use("/api/institute",institute)
app.use("/api/course",course)
app.use("/api/user", UserRoute);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("app is connected and working");
    })
}).catch((err)=>{
    console.log(err);
})


// const teacher = require("./routes/teacherRouter");
// app.use("/api/student",student);
// app.use("/api/teacher",teacher);

// app.listen(5000);