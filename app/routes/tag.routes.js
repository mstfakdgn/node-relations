const express = require("express");
const router = new express.Router();
const tagController = require("../controllers/tag.controller.js")

router.post("/tags", tagController.create);

router.get('/tags', tagController.findAll);

router.get('/tags/:id', tagController.findOne);

router.put('/tags/:id', tagController.update);

router.delete('/tags/:id', tagController.deleteTag);

module.exports = router;
