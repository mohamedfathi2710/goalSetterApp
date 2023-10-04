const express = require('express');
const router = express.Router();
const { getTrips, setTrips, updateTrips, deleteTrips } = require('../controllers/tripController')
const {protect} = require('../middleware/authMidleware');

router.route('/').get(protect, getTrips).post(protect, setTrips)
router.route('/:id').put(protect, updateTrips).delete(protect, deleteTrips)

module.exports = router;