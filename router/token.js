require('dotenv').config();
const route = require('express').Router();
const TokenModel = require('../models/token');
const UserModel = require('../models/user');
/**
 * To authenticate token
 * path: /api/token/verify?token=""?email=""
 * method: get
 */
route.get('/verify', async (req, res) => {
  try {
    const tokenData = await TokenModel.findOne({ token: req.query.token });

    if (tokenData && tokenData.email === req.query.email) {
      await UserModel.findOneAndUpdate(
        { email: req.query.email },
        {
          isVerified: true,
        },
        { new: true }
      );
      await TokenModel.findOneAndDelete({ token: req.query.token });
      res.send(
        '<h1 style="color:green">Successfully Verified Your Account </h1>'
      );
    }
  } catch (error) {
    console.log(error);
    res.send('<h1 style="color:red">Error</h1>');
  }
});

module.exports = route;
