const express = require('express');
const router = express.Router();

const membershipTypeController = require("../controllers/membership-type.controllers")
router.get('/', membershipTypeController.showAll); // show all of membership type data
router.post('/', membershipTypeController.create); // insert membership type data
router.get('/:id', membershipTypeController.findById); //show membership type data by id
router.put('/:id', membershipTypeController.update); //save update membership type data
router.delete('/:id', membershipTypeController.delete); //delete location data


module.exports = router


