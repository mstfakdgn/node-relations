const Tutorial = require("../models/tutorial.js");

require("../db/mongoose.js");

const create = async (req, res) => {
  const tutorial = new Tutorial(req.body);

  try {
    await tutorial.save();

    res.status(201).send(tutorial);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    const tutorials = await Tutorial.find({});
    res.send(tutorials);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;

  try {
    const tutorial = await Tutorial.findOne({ _id: _id });
    res.send(tutorial);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["slug", "name", "tags"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const _id = req.params.id;

  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid parameter" });
  }

  try {
    const tutorial = await Tutorial.findOne({ _id: _id });

    updates.forEach((update) => (tutorial[update] = req.body[update]));

    await tutorial.save();

    if (!tutorial) {
      res.status(404).send("Not Found");
    }
    res.send(tutorial);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTutorial = async (req, res) => {
  const _id = req.params.id;
  try {
    const tutorial = await Tutorial.findByIdAndRemove(_id);

    res.send(tutorial);
  } catch (error) {
    res.status(500).send(error);
  }
};

const attachTagToTutorial = async (req, res) => {
  const tutorialId = req.params.tutorialId;
  const tutorial = await Tutorial.findOne({ _id: tutorialId });

  // var tagArray = []
  // req.body.tags.forEach(async (tag) => {
  //   console.log(tag);
  //   tagArray.push(tag);
  // });

  tutorial.tags = req.body.tags 

  await tutorial.save();
  res.status(200).send(tutorial.populate('tags'));
};

const getTagsOfTutorial = async (req,res) => {
  const tutorialId = req.params.tutorialId;
  const tutorial = await Tutorial.findOne({ _id: tutorialId }).populate('tags');

  res.status(200).send(tutorial.populate('tags'))
}

const removeTagsFromTutorial = async (req, res) => {
  const tutorialId = req.params.tutorialId;
  const tutorial = await Tutorial.findOne({ _id: tutorialId })

  tutorial.tags = tutorial.tags.filter((tag) => {
    return !req.body.tags.includes(tag.toString())
  })

  await tutorial.save();


  res.status(200).send(tutorial.populate('tags'));
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteTutorial,
  attachTagToTutorial,
  getTagsOfTutorial,
  removeTagsFromTutorial
};
