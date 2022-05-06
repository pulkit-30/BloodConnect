const route = require('express').Router();
const userModel = require('../models/user');
const main = require('../utils/nodemailer');
route.get('/', async (req, res) => {
  try {
    if (req.query.bg) {
      userModel.find({ bloodGroup: req.query.bg }, (err, user) => {
        if (err) {
          return res.status(400).json({
            status: 'Error',
            error: { message: 'No User Found' },
          });
        } else {
          res.status(200).json({
            status: 'Success',
            data: user,
          });
        }
      });
    } else {
      userModel.find({}, (err, user) => {
        if (err) {
          return res.status(400).json({
            status: 'Error',
            error: { message: 'No User Found' },
          });
        } else {
          res.status(200).json({
            status: 'Success',
            data: user,
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
