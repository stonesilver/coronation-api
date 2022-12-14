const User = require('../models/Users');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// register controller
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  //   check for body object
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'credentials is required' });
  }

  const checkDuplicate = await User.findOne({ username }).exec();
  if (checkDuplicate) {
    return res.status(403).json({
      message: 'Username already exist',
    });
  }

  try {
    //   hashing password
    const hashPwd = CryptoJS.AES.encrypt(
      password,
      process.env.CRYPTOJS_SECRET
    ).toString();

    const result = await User.create({ username, email, password: hashPwd });
    res.status(201).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "We're working to fix the issue please try later",
      error: err,
    });
  }
};

// login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist',
      });
    }

    //   decrypting password
    const decryptedPwd = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTOJS_SECRET
    );
    const originalPwd = decryptedPwd.toString(CryptoJS.enc.Utf8);

    // creating jwt token
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    const {
      password: { pwd },
      ...others
    } = user;

    if (originalPwd === password) {
      res.status(200).json({
        status: 'success',
        data: { ...others._doc, email, accessToken },
      });
    } else {
      res.status(400).json({ message: 'Email or password not correct' });
    }
  } catch (err) {
    res.status(500).json({
      message: "We're working to fix the issue. Please try later",
    });
  }
};

module.exports = { registerUser, loginUser };
