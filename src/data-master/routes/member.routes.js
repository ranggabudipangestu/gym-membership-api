const express = require('express');
const router = express.Router();

const memberController = require("../controllers/member.controllers")
router.get('/', memberController.showAll); // show all of member data
router.post('/', memberController.create); // insert member data
router.get('/:id', memberController.findById); //show member data by id
router.put('/:id', memberController.update); //save update member data
router.delete('/:id', memberController.delete); //delete member data


module.exports = router
