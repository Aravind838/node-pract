const express = require("express");
const router = express.Router();
const _ = require('lodash');
const mongoose = require("mongoose");
const { Association, validate } = require("../models/association");

router.get("/", async (req, res) => {
  const associations = await Association.find().sort('studentId');
  res.send(associations);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let association = new Association(_.pick(req.body, ['studentId', 'subjectId']));
  association = await association.save();
  res.send(association);
});

module.exports = router;
