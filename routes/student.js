const express = require("express");
const router = express.Router();
const _ = require('lodash');
const mongoose = require("mongoose");
const { Student, validate } = require("../models/student");

router.get("/student", async (req, res) => {
  const students = await Student.find().sort("name");
  res.send(students);
});

router.post("/student", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = new Student(_.pick(req.body, ['name','dob','gender']));
  student = await student.save();
  res.send(student);
});

router.put("/student/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ['name','dob','gender']),
    { new: true }
  );
  if (!student)
    return res.status(404).send("The student with given ID, not found.");

  res.send(student);
});

router.delete("/student/:id", async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);
  if (!student)
    return res.status(404).send("The student with given ID, not found.");

  res.send(student);
});

router.get("/student/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res.status(404).send("The student with given ID, not found.");
  res.send(student);
});

router.get("/details", async (req, res) => {
  const details = await Student.aggregate([
    {
      $lookup: {
        from: "associations",
        localField: "_id",
        foreignField: "studentId",
        as: "subjectDetails"
      }
    },
    {
      $unwind: {
        path: "$subjectDetails",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "subjects",
        localField: "subjectDetails.subjectId",
        foreignField: "_id",
        as: "subjects"
      }
    },
    {
      $lookup: {
        from: "contacts",
        localField: "_id",
        foreignField: "studentId",
        as: "contact"
      }
    },
    {
      $unwind: {
        path: "$contact",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        dob: 1,
        gender: 1,
        phNumber: "$contact.phNumber",
        emailId: "$contact.emailId",
        address: "$contact.address",
        subjects: "$subjects.subjectName"
      }
    }
  ]);
  if (!details) return res.status(404).send("Details not found.");
  res.send(details);
});

module.exports = router;
