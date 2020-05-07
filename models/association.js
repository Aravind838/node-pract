const mongoose = require("mongoose");
const Joi = require("joi");

const associationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    autopopulate: true
  },
  subjectId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      autopopulate: true
    }
  ]
});
associationSchema.plugin(require("mongoose-autopopulate"));

const Association = mongoose.model("Association", associationSchema);

function validateAssociation(association) {
  const schema = {
    studentId: Joi.required(),
    subjectId: Joi.required()
  };

  return Joi.validate(association, schema);
}

exports.associationSchema = associationSchema;
exports.Association = Association;
exports.validate = validateAssociation;
