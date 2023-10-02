const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { use } = require('../routes/goalRoutes');


// Register a New User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const userExists = await User.findOne({email});
  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if(user) {
    res.status(201).json({
      _id: use.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

// Authenticate a New User
const loginUser = asyncHandler(async(req, res) => {
  const { email , password} = req.body;

  // Check for user email
  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id: use.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
});

// Get User Data
const getMe = asyncHandler(async (req, res) => {
  res.json({message: 'User data'})
});

module.exports = {
  registerUser,
  loginUser,
  getMe
}