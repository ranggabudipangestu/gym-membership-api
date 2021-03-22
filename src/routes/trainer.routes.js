const express = require('express');
const router = express.Router();

const trainerController = require("../controllers/trainer.controllers")
router.get('/', trainerController.showAll); // show all of employee data
router.post('/', trainerController.create); // insert employee data
router.get('/:id', trainerController.findById); //show employee data by id
router.put('/:id', trainerController.update); //save update employee data
router.delete('/:id', trainerController.delete); //delete employee data


module.exports = router


