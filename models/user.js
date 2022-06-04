const mongoose = require('mongoose');
//defining the User Schema
const UserSchema = new mongoose.Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    bloodGroup: {
      type: String,
    },
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    course: {
      type: String,
    },
    branch: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    admissionNumber: {
      type: String,
    },
    college: {
      type: String,
      default: 'N.A',
    },
    city: {
      type: String,
      default: 'N.A',
    },
    state: {
      type: String,
      default: 'N.A',
    },
    declaration: {
      type: String,
      default: 'Hereby I confirm that I am 18+ and Eligible for blood donation',
    },
  },
  { timestamps: true }
);
//exporting the User model
module.exports = mongoose.model('user', UserSchema);
