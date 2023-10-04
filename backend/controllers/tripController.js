const asyncHandler = require('express-async-handler')
const Trip = require('../models/goalModel');
const User = require('../models/userModel')

// Function responsible for Getting Data 
const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ user: req.user.id })
  res.status(200).json(trips);
})

// Function responsible for Adding New Data
const setTrips = asyncHandler(async (req, res) => {
  if(!req.body.city || !req.body.days || !req.body.budget) {
    res.status(400)
    throw new Error('Field is missing')
  }
  const trip = await Trip.create({
    city: req.body.city,
    days: req.body.days,
    budget: req.body.budget,
    user: req.user.id
  })
  res.status(201).json(trip)
})

// Function responsible for Updating Data
const updateTrips = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  
  if(!trip) {
    req.status(400)
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  if(trip.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized');
  }

  const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updatedTrip)
})

// Function responsible for Deleting Data
const deleteTrips = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if(!trip) {
    req.status(400)
    throw new Error('Trip not found');
  }

  const user = await User.findById(req.user.id);

  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  if(trip.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized');
  }
  
  await Trip.findByIdAndDelete(req.params.id)
  res.status(200).json({ id : req.params.id})
})


module.exports = {
  getTrips,
  setTrips,
  updateTrips,
  deleteTrips
}