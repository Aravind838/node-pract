const mongoose = require("mongoose");
const Joi = require("joi");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    dob: { type: Date, required: true },
    gender: { type: String, required: true }
  })
);

function validateStudent(student) {
  const schema = {
    name: Joi.string()
             .min(5)
             .max(50)
             .required(),
    dob: Joi.date()
            .required(),
    gender: Joi.string()
               .required()
  };

  return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validate = validateStudent;
