const route = require('express').Router();
const userModel = require('../models/user');
const main = require('../utils/nodemailer');

/**
 * Search data
 * path: api/search/
 * queries: bg --  bloodGroup
 * method: get
 */
route.get('/', async (req, res) => {
  try {
    if (req.query.bg) {
      userModel.find({ bloodGroup: req.query.bg }, (err, user) => {
        if (err) {
          throw new Error('No User Found');
        } else {
          let filter_data = [];
          user.forEach((usr) => {
            if (usr.isVerified) filter_data.push(usr);
          });
          res.status(200).json({
            status: 'Success',
            data: filter_data,
          });
        }
      });
    } else {
      userModel.find({}, (err, user) => {
        if (err) {
          throw new Error('No User Found');
        } else {
          let filter_data = [];
          user.reverse();
          user.forEach((usr) => {
            if (usr.isVerified) filter_data.push(usr);
          });
          res.status(200).json({
            status: 'Success',
            data: filter_data,
          });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      error: { message: 'Something went wrong!!!' },
    });
  }
});

module.exports = route;
