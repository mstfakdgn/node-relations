const express = require("express");
const router = new express.Router();
const tutorialController = require("../controllers/tutorial.controller.js")

router.post("/tutorials", tutorialController.create);

router.get('/tutorials', tutorialController.findAll);

router.get('/tutorials/:id', tutorialController.findOne);

router.put('/tutorials/:id', tutorialController.update);

router.delete('/tutorials/:id', tutorialController.deleteTutorial);

router.put('/tutorials/:tutorialId/tags', tutorialController.attachTagToTutorial);

router.get('/tutorials/:tutorialId/tags', tutorialController.getTagsOfTutorial);

router.delete('/tutorials/:tutorialId/tags', tutorialController.removeTagsFromTutorial);


module.exports = router;
