const route = require('express').Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * Register Route
 * Callback function - args: req & res
 * Create new user and return user data
 */
route.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    //generating the salts
    const salt = bcrypt.genSaltSync(10);
    //securing the password using bcrypt
    const HashedPassword = bcrypt.hashSync(req.body.password, salt);
    //creating new User
    req.body.password = HashedPassword;
    const newUser = await new userModel(req.body);
    await newUser.save();

    //filtering the data
    const { _id, password, ...other } = newUser._doc;

    //send the response
    return res.status(200).json({
      status: 'Success',
      data: other,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      error: error,
    });
  }
});

/**
 * SignIn Route
 * Callback function - args: req & res
 * find user with email and return user data
 */
route.post('/signIn', async (req, res) => {
  try {
    //finding the user using the email of the User
    const User = await userModel.findOne({ email: req.body.email });
    // if user is found
    if (User) {
      //for comparing the secure password and User req password the password -- user security
      const valid = bcrypt.compareSync(req.body.password, User.password);
      console.log(valid);
      if (!valid) {
        return res.status(400).json({
          status: 'Error',
          error: { message: 'Invalid Password !!' },
        });
      }
      //filtering the data
      const { _id, password, ...other } = User._doc;

      //send the response
      return res.status(200).json({
        status: 'Success',
        data: other,
      });
    } else {
      //if no user is found
      return res.status(404).json({
        status: 'Error',
        error: {
          message: 'No User Found!!',
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'Error',
      error: error,
    });
  }
});

module.exports = route;
