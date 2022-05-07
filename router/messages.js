require('dotenv').config();
const route = require('express').Router();
const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

route.post('/send', (req, res) => {
  try {
    const from = 'Blood Connect';
    // enter a number
    const to = '';
    const text = `Hello! There is a urgent Blood request from Pulkit, It's your time to come forward and help him!
    Please try to help!`;
    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        return res.status(400).json({
          status: 'Error',
          error: error,
        });
      } else {
        if (responseData.messages[0]['status'] === '0') {
          console.log('Message sent successfully.');
        } else {
          return res.status(400).json({
            status: 'Error',
            error: error,
          });
        }
      }
    });
    res.status(200).json({
      status: 'Success',
      message: 'Message sent Successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Error',
      error: error,
    });
  }
});
module.exports = route;
