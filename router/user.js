const route = require('express').Router();
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * Update the account information
 * path: api/user/update/:id
 * method: put
 */
route.put('/update/:id', async (req, res) => {
  try {
    if (req.body.id === req.params.id) {
      if (req.body.Password) {
        const salt = await bcrypt.genSalt(10);
        req.body.Password = await bcrypt.hash(req.body.Password, salt);
      }
      const UpdatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        status: 'Success',
        data: UpdatedUser,
        Message: 'Account Updated Successfully',
      });
    } else throw new Error('You cannot update this account!!');
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'Error',
      error: error,
    });
  }
});

/**
 * delete the User Account
 * path: api/user/:id
 * method: delete
 */
route.delete('/delete/:id', async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: 'Success',
      message: 'Account Deleted Successfully',
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
