// src/routes/locations.routes.js

const express = require('express')
const {
  createLocation,
  listLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/location.controller.js')

const router = express.Router()

router.post('/', createLocation)
router.get('/', listLocations)
router.get('/:id', getLocation)
router.put('/:id', updateLocation)
router.delete('/:id', deleteLocation)

module.exports = router