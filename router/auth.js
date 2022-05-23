const route = require('express').Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const mailer = require('../utils/nodemailer');
const { generateToken, StoreToken } = require('../utils/Token');

/**
 * Register Route
 * Callback function - args: req & res
 * Create new user and return user data
 * path: api/auth/register
 * method: post
 */
route.post('/register', async (req, res) => {
  try {
    // generating the salts
    const salt = bcrypt.genSaltSync(10);
    // securing the password using bcrypt
    const HashedPassword = bcrypt.hashSync(req.body.password, salt);
    // creating new User
    req.body.password = HashedPassword;
    const newUser = await new userModel(req.body);
    await newUser.save();

    /**
     * Generate Token
     */
    const Token = generateToken(newUser._id);
    await StoreToken(newUser._id, Token, newUser.email);
    const VerifyLink =
      'https://pure-wildwood-48840.herokuapp.com/api/token/verify?token=' +
      Token +
      '&&email=' +
      req.body.email;

    /**
     * Send Email Verification
     * from, to, subject, text, message, html
     */
    mailer({
      to: req.body.email,
      subject: 'Email Verification ✅',
      text: 'Please verify your Email',
      html: `
      <center>
      <h1>Blood Connect</h1>
      <img src="https://user-images.githubusercontent.com/76155456/167152740-c65ab08b-ae0a-4fc0-9c6c-31a039e669d9.png" width='300px'/>
      <p>Please verify your Email</p>
      <span>To verify your Email click here 👉</span>
      <a href=${VerifyLink}><button>Verify</button></a>
      </center>
      `,
    });

    return res.status(200).json({
      status: 'Success',
      message:
        'Email verification has been sent to your mail ,Please check your mail !!!',
    });
  } catch (error) {
    console.log(error);
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
 * path: api/auth/signIn
 * method: post
 */
route.post('/signIn', async (req, res) => {
  try {
    //finding the user using the email of the User
    const User = await userModel.findOne({ email: req.body.email });
    if (!User.isVerified)
      return res.status(400).json({
        status: 'Error',
        error: { message: 'Account is not Verified!!' },
      });
    // if user is found
    if (User) {
      //for comparing the secure password and User req password the password -- user security
      const valid = bcrypt.compareSync(req.body.password, User.password);
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
    return res.status(400).json({
      status: 'Error',
      error: error,
    });
  }
});

route.get('/session', async (req, res) => {
  try {
    const User = await userModel.findOne({ email: req.query.email });
    if (User && User.isVerified) {
      //filtering the data
      const { password, ...other } = User._doc;

      //send the response
      return res.status(200).json({
        status: 'Success',
        data: other,
      });
    } else throw new Error('Session Expired!!');
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      error: error,
    });
  }
});
module.exports = route;
