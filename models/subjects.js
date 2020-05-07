const mongoose = require("mongoose");
const Joi = require("joi");

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, maxlength: 15, required: true }
});

const Subject = mongoose.model("Subject", subjectSchema);

function validateSubject(subject) {
  const schema = {
    subjectName: Joi.string()
      .max(15)
      .required()
  };

  return Joi.validate(subject, schema);
}

exports.subjectSchema = subjectSchema;
exports.Subject = Subject;
exports.validate = validateSubject;
