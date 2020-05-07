const mongoose = require("mongoose");
const Joi = require("joi");

const contactSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    autopopulate: true
  },
  phNumber: { type: Number, required: true },
  emailId: { type: String, required: true },
  address: { type: String, required: true, maxlength: 50 }
});
contactSchema.plugin(require("mongoose-autopopulate"));

const Contact = mongoose.model("Contact", contactSchema);

function validateContact(contact) {
  const schema = {
    studentId: Joi.string(),
    phNumber: Joi.number().required(),
    emailId: Joi.string().required(),
    address: Joi.string().required()
  };

  return Joi.validate(contact, schema);
}

exports.contactSchema = contactSchema;
exports.Contact = Contact;
exports.validate = validateContact;
