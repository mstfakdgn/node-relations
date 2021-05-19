const express = require("express");
const router = new express.Router();
const Customer = require("../models/customer.js");
const customerController = require("../controllers/customer.controller.js")

router.post("/customers", customerController.create);

router.get('/customers', customerController.findAll);

router.get('/customers/:id', customerController.findOne);

router.put('/customers/:id', customerController.update);

router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;
