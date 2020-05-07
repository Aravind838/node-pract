const express = require("express");
const router = express.Router();
const _ = require('lodash');
const mongoose = require("mongoose");
const { Contact, validate } = require("../models/contacts");

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort("studentId");
  res.send(contacts);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let contact = new Contact(_.pick(req.body, ['studentId', 'phNumber', 'emailId', 'address']));
  contact = await contact.save();
  res.send(contact);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body, ['phNumber', 'emailId', 'address']),
    { new: true }
  );
  if (!contact)
    return res.status(404).send("The contact with given ID, not found.");

  res.send(contact);
});

router.delete("/:id", async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.id);
  if (!contact)
    return res.status(404).send("The contact with given ID, not found.");

  res.send(contact);
});

router.get("/:id", async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact)
    return res.status(404).send("The contact with given ID, not found.");
  res.send(contact);
});

module.exports = router;
