const express = require("express");
const course = express.Router();
const coursemodel = require("../models/courseModel");
const { sendResponse } = require("../helper/helper");
course.get("/", async (req, res) => {
  try {
    const result = await coursemodel.find();
    if (!result) {
      res.send(sendResponse(false, null, "no data found")).status(404);
    } else {
      res.send(sendResponse(true, result)).status(200);
    }
  } catch (error) {
    console.log(error);
    res.send(sendResponse(false, null, "internal server erro").status(400));
  }
});
course.get("/:id", (req, res) => {});
course.post("/", async (req, res) => {
  let { name, duration, fees,shortName } = req.body;
  try {
    let earr = [];
    if (!name) {
      earr.push("req: name");
    }
    if (!duration) {
      earr.push("req: duration");
    }
    if (!fees) {
      earr.push("req: fees ");
    }
    if(!shortName){
        earr.push("req: shortname")

    }
    if (earr.length > 0) {
      res.send(sendResponse(false, earr, null, "req all fields")).status(400);
      return;
    } else {
      let obj = { name, duration, fees,shortName};
      let course = new  coursemodel(obj);
      await course.save();
      if (!course) {
        res.send(sendResponse(false, null, "Internal Server Error"));
      } else {
        res.send(sendResponse(true, course, "save Successfully")).status(200);
      }
    }
  } catch (error) {
    res.send(sendResponse(false, null, "internal server error"));
  }
});
course.put("/:id", (req, res) => {});
course.delete("/:id", (req, res) => {});

module.exports = course