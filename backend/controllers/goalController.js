const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel');

// Function responsible for Getting Data 
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals);
})

// Function responsible for Adding New Data
const setGoals = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const goal = await Goal.create({
    text: req.body.text,
  })
  res.status(201).json(goal)
})

// Function responsible for Updating Data
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  
  if(!goal) {
    req.status(400)
    throw new Error('Goal not found');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedGoal)
})

// Function responsible for Deleting Data
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if(!goal) {
    req.status(400)
    throw new Error('Goal not found');
  }

  await Goal.findByIdAndDelete(req.params.id)
  res.status(200).json({ id : req.params.id})
})


module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals
}