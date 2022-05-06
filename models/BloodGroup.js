const mongoose = require('mongoose');
//defining the User Schema
const GroupsSchema = new mongoose.Schema(
  {
    Groups: {
      type: String,
    },
  },
  { timestamps: true }
);
//exporting the User model
module.exports = mongoose.model('groups', GroupsSchema);
