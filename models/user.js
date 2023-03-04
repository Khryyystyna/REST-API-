const { Schema, model } = require('mongoose');

const Joi = require("joi");

const { handleMongooseError } = require('../helpers');

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    },
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(), 
})

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(), 
})

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};