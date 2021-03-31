const express = require('express');
const router = express.Router();

const locationController = require("../data-master/controllers/location.controllers")
router.get('/location/', locationController.showAll); // show all of location data
router.post('/location/', locationController.create); // insert location data
router.get('/location/:id', locationController.findById); //show location data by id
router.put('/location/:id', locationController.update); //save update location data
router.delete('/location/:id', locationController.delete); //delete location data

const memberController = require("../data-master/controllers/member.controllers")
router.get('/member/', memberController.showAll); // show all of member data
router.post('/member/', memberController.create); // insert member data
router.get('/member/:id', memberController.findById); //show member data by id
router.put('/member/:id', memberController.update); //save update member data
router.delete('/member/:id', memberController.delete); //delete member data

const membershipTypeController = require("../data-master/controllers/membership-type.controllers")
router.get('/membership-type/', membershipTypeController.showAll); // show all of membership type data
router.post('/membership-type/', membershipTypeController.create); // insert membership type data
router.get('/membership-type/:id', membershipTypeController.findById); //show membership type data by id
router.put('/membership-type/:id', membershipTypeController.update); //save update membership type data
router.delete('/membership-type/:id', membershipTypeController.delete); //delete location data

const taxController = require("../data-master/controllers/tax.controllers")
router.get('/tax/', taxController.showAll); // show all of tax data
router.post('/tax/', taxController.create); // insert tax data
router.get('/tax/:id', taxController.findById); //show tax data by id
router.put('/tax/:id', taxController.update); //save update tax data
router.delete('/tax/:id', taxController.delete); //delete tax data

const trainerController = require("../data-master/controllers/trainer.controllers")
router.get('/trainer/', trainerController.showAll); // show all of trainer data
router.post('/trainer/', trainerController.create); // insert trainer data
router.get('/trainer/:id', trainerController.findById); //show trainer data by id
router.put('/trainer/:id', trainerController.update); //save update trainer data
router.delete('/trainer/:id', trainerController.delete); //delete trainer data


const memberPaymentController = require("../transaction/controllers/member-payment.controllers")
router.get('/member-payment/', memberPaymentController.showAll); // show all of trainer data
router.post('/member-payment/', memberPaymentController.create); // insert trainer data
router.get('/trainer/:id', memberPaymentController.findById); //show trainer data by id
router.put('/trainer/:id', memberPaymentController.update); //save update trainer data
router.delete('/member-payment/:id', memberPaymentController.delete); //delete trainer data


module.exports = router


