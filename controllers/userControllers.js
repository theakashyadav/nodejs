const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// @desc Register a userr
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User Already Registered');
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log({ hashedPassword });
  const user = await User.create({ username, email, password: hashedPassword });
  console.log('user created', user);
  if (user) {
    res.status(201).json({
      message: 'User created successfully !!',
      data: { _id: user.id, email: user.email },
    });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory !!');
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: { username: user.username, email: user.email, id: user.id },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    );
    res.status(200).json({
      user: { username: user.username, email: user.email },
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error('Credentials Invalid !!');
  }
});

// @desc Current user
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc Logout user
// @route GET /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({message:"Logged Out Successfully"});
});


module.exports = { registerUser, loginUser, currentUser, logoutUser };
