const express = require('express');
const router = express.Router();

const trainerController = require("../controllers/trainer.controllers")
router.get('/', trainerController.showAll); // show all of trainer data
router.post('/', trainerController.create); // insert trainer data
router.get('/:id', trainerController.findById); //show trainer data by id
router.put('/:id', trainerController.update); //save update trainer data
router.delete('/:id', trainerController.delete); //delete trainer data


module.exports = router


