const express = require('express');
const router = express.Router();
const taxController = require("../controllers/tax.controllers")
router.get('/', taxController.showAll); // show all of tax data
router.post('/', taxController.create); // insert tax data
router.get('/:id', taxController.findById); //show tax data by id
router.put('/:id', taxController.update); //save update tax data
router.delete('/:id', taxController.delete); //delete tax data
module.exports = router


