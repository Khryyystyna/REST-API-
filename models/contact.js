const { Schema, model } = require('mongoose');

const Joi = require("joi");

const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(), 
  favorite: Joi.boolean(),
})

const schemas = {
  addSchema,
}

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};