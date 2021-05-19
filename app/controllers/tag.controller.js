const Tag = require("../models/tag.js");

require("../db/mongoose.js");

const create = async (req, res) => {
  const tag = new Tag(req.body);

  try {
    await tag.save();
    
    res.status(201).send(tag);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.send(tags);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;

  try {
    const tag = await Tag.findOne({ _id: _id });
    res.send(tag);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["slug", "name", "tutorials"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const _id = req.params.id;

  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid parameter" });
  }

  try {
    const tag = await Tag.findOne({ _id: _id });

    updates.forEach((update) => (tag[update] = req.body[update]));

    await tag.save();

    if (!tag) {
      res.status(404).send("Not Found");
    }
    res.send(tag);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTag = async (req, res) => {
  const _id = req.params.id;
  try {
    const tag = await Tag.findByIdAndRemove(_id);

    res.send(tag);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteTag
};
