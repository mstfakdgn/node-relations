const express = require("express");
const Customer = require("../models/customer.js");
require("../db/mongoose.js");

// POST a Customer
const create = async (req, res) => {
  const customer = new Customer(req.body);

  try {
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;

  try {
    const customer = await Customer.findOne({ _id: _id }).populate('identifier').populate('products');
    res.send(customer);
  } catch (error) {
    res.status(500).send(e);
  }
};

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstname", "lastname", "age"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const _id = req.params.id;

  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid parameter" });
  }

  try {
    const customer = await Customer.findById(_id);

    updates.forEach((update) => (customer[update] = req.body[update]));

    await customer.save();

    if (!customer) {
      res.status(404).send("Not Found");
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCustomer = async (req, res) => {
  const _id = req.params.id;
  try {
    const customer = await Customer.findByIdAndRemove(_id);
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteCustomer,
};
