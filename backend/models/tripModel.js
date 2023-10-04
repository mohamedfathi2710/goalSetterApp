const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  city : {
    type: String,
    required: [true, 'Please add a text value']
  },
  days : {
    type: String,
    required: [true, 'Please add The days']
  },
  budget : {
    type: String,
    required: [true, 'Please add your budget']
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Trip', tripSchema)