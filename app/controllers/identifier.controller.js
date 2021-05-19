const Identifier = require("../models/identifier.js");

require("../db/mongoose.js");

const create = async (req, res) => {
  const identifier = new Identifier(req.body);

  try {
    await identifier.save();
    
    res.status(201).send(identifier);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    const identifiers = await Identifier.find({});
    res.send(identifiers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;

  try {
    const identifier = await Identifier.findOne({ _id: _id }).populate('customer');
    res.send(identifier);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["code", "customer"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const _id = req.params.id;

  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid parameter" });
  }

  try {
    const identifier = await Identifier.findOne({ _id: _id });

    updates.forEach((update) => (identifier[update] = req.body[update]));

    await identifier.save();

    if (!identifier) {
      res.status(404).send("Not Found");
    }
    res.send(identifier);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteIdentifier = async (req, res) => {
  const _id = req.params.id;
  try {
    const identifier = await Identifier.findByIdAndRemove(_id);

    res.send(identifier);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteIdentifier
};
