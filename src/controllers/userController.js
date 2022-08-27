const User = require('../models/Users');
const CryptoJS = require('crypto-js');

// get logged in user
const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.user.id);
    const { password, ...others } = result;
    res.status(200).json({ status: 'successful', data: others._doc });
  } catch (err) {
    res.status(500).json({
      message: "We're working on a fix. Please try later",
      error: err,
    });
  }
};

// get one user
const getOneUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);

    if (result._id) {
      const { password, ...others } = result;
      res.status(200).json({ status: 'successful', data: others._doc });
    } else {
      res.status(400).json({ message: 'User does not exist' });
    }
  } catch (err) {
    res.status(500).json({
      message: "We're working on a fix. Please try later",
      error: err,
    });
  }
};

// get al users
const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json({ status: 'successful', data: result });
  } catch (err) {
    res.status(500).json({
      message: "We're working on a fix. Please try later",
      error: err,
    });
  }
};

// update user
const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTOJS_SECRET
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(201).json({ message: 'successful', data: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "We're working on fixing the issue. Please try later" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'successful', message: 'user deleted' });
  } catch (err) {
    res.status(500).json({
      message: "We're working on a fix. Please try later",
      error: err,
    });
  }
};

module.exports = { getUser, getOneUser, getAllUsers, updateUser, deleteUser };