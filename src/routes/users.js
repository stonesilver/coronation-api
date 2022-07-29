const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/Users');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
} = require('./verifyToken');

// find me
router.get('/find-me', verifyToken, async (req, res) => {
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
});

// Get one user
router.get('/:id', verifyTokenAndIsAdmin, async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    const { password, ...others } = result;
    res.status(200).json({ status: 'successful', data: others._doc });
  } catch (err) {
    res.status(500).json({
      message: "We're working on a fix. Please try later",
      error: err,
    });
  }
});

// Get all user
router.get('/', verifyTokenAndIsAdmin, async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json({ status: 'successful', data: result });
  } catch (err) {
    res.status(500).json({
      message: "We're working on a fix. Please try later",
      error: err,
    });
  }
});

// Update user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
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
});

// Delete user
router.delete('/:id', verifyTokenAndIsAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'successful', message: 'user deleted' });
  } catch (err) {
    res.status(500).json({
      message: "We're working on a fix. Please try later",
      error: err,
    });
  }
});

module.exports = router;
