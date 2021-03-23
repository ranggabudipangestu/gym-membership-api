const express = require('express');
const router = express.Router();

const locationController = require("../controllers/location.controllers")
router.get('/', locationController.showAll); // show all of location data
router.post('/', locationController.create); // insert location data
router.get('/:id', locationController.findById); //show location data by id
router.put('/:id', locationController.update); //save update location data
router.delete('/:id', locationController.delete); //delete location data


module.exports = router


