require('dotenv').config();
const route = require('express').Router();
const mailer = require('../utils/nodemailer');

/**
 * To send Mails
 * path: api/message/mail
 * method: post
 */
route.post('/mail', async (req, res) => {
  try {
    // to the person
    await mailer({
      to: req.body.to.email,
      subject: 'Urgent blood need !!!',
      text: req.body.Message,
      html: `
      <center>
      <h1>Blood Connect</h1>
      <img src="https://user-images.githubusercontent.com/76155456/167152740-c65ab08b-ae0a-4fc0-9c6c-31a039e669d9.png" width='300px'/>

      <p>Hello ${req.body.to.username},
      There is an urgent need of blood If you are available please help us 🙏.
      </p>
      </center>
      <div>
      From:
      <div>username: ${req.body.from.username}</div>
      <div>email: ${req.body.from.email}</div>
      <div>branch: ${req.body.from.branch}</div>
      <div>course: ${req.body.from.course}</div>
      <div>Admission Number: ${req.body.from.admissionNumber}</div>
      <div>Contact: ${req.body.from.phoneNumber}</div>
      </div>
      `,
    });

    // confirmation mail to sender
    await mailer({
      to: req.body.from.email,
      subject: 'Urgent Blood request send successfully ✅',
      text: `Your Request has been send successfully to ${req.body.to.username}`,
      html: `
      <center>
      <h1>Blood Connect</h1>
      <img src="https://user-images.githubusercontent.com/76155456/167152740-c65ab08b-ae0a-4fc0-9c6c-31a039e669d9.png" width='300px'/>

      <p>
      Your Blood Request has been sent successfully ✅
      </p>
      </center>
      <div>
      To:
      <div>username: ${req.body.to.username}</div>
      <div>email: ${req.body.to.email}</div>
      <div>course: ${req.body.to.course}</div>
      </div>
      `,
    });

    return res.status(200).json({
      status: 'Success',
      message: `Your Message has been sent successfully ✅`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'Error',
      error: error,
    });
  }
});
module.exports = route;
