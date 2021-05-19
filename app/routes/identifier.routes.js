const express = require("express");
const router = new express.Router();
const identifierController = require("../controllers/identifier.controller.js")

router.post("/identifiers", identifierController.create);

router.get('/identifiers', identifierController.findAll);

router.get('/identifiers/:id', identifierController.findOne);

router.put('/identifiers/:id', identifierController.update);

router.delete('/identifiers/:id', identifierController.deleteIdentifier);


module.exports = router;
