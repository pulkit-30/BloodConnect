const mongoose = require('mongoose');
//defining the User Schema
const UserSchema = new mongoose.Schema(
  {
    isOrganization: {
      type: Boolean,
      default: false,
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
  },
  { timestamps: true }
);
//exporting the User model
module.exports = mongoose.model('user', UserSchema);
