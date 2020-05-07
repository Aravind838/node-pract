const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
  studentId:Number,
  name: { type: String, minlength: 5, maxlength: 50, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);

function validateStudent(student) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    dob: Joi.date().required(),
    gender: Joi.string().required()
  };

  return Joi.validate(student, schema);
}

exports.studentSchema = studentSchema;
exports.Student = Student;
exports.validate = validateStudent;
