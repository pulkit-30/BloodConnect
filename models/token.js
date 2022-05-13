const mongoose = require('mongoose');
//defining the User Schema
const TokenSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//exporting the User model
module.exports = mongoose.model('token', TokenSchema);
