const express = require("express");
const router = express.Router();
const _ = require('lodash');
const mongoose = require("mongoose");
const { Subject, validate } = require("../models/subjects");

router.get("/", async (req, res) => {
  const subjects = await Subject.find().sort("subjectName");
  res.send(subjects);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subject = new Subject(_.pick(req.body, ['subjectName']));
  subject = await subject.save();
  res.send(subject);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ['subjectName']),
    { new: true }
  );
  if (!subject)
    return res.status(404).send("The subject with given ID, not found.");

  res.send(subject);
});

router.delete("/:id", async (req, res) => {
  const subject = await Subject.findByIdAndRemove(req.params.id);
  if (!subject)
    return res.status(404).send("The subject with given ID, not found.");

  res.send(subject);
});

router.get("/:id", async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject)
    return res.status(404).send("The subject with given ID, not found.");
  res.send(subject);
});

module.exports = router;
