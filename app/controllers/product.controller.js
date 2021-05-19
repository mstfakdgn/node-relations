const Product = require("../models/product.js");
const Customer = require("../models/customer.js");

require("../db/mongoose.js");

const create = async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    const customer = await Customer.findById(req.body.customer);
    
    customer.products = customer.products.concat(product._id)
    await customer.save()

    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findOne({ _id: _id }).populate("customer");
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["code", "name", "details", "customer"];
  const isValidOp = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  const _id = req.params.id;

  const product = await Product.findOne({ _id: _id });

  console.log(product);
  if (updates.includes('customer')) {
    const oldCustomer = await Customer.findById(product.customer);

    const index = oldCustomer.products.indexOf(product._id);
    oldCustomer.products.splice(index, 1)

    await oldCustomer.save();

    const newCustomer = await Customer.findById(req.body.customer);
    newCustomer.products = newCustomer.products.concat((product._id))

    await newCustomer.save();
  }

  if (!isValidOp) {
    return res.status(400).send({ error: "Invalid parameter" });
  }

  try {

    updates.forEach((update) => (product[update] = req.body[update]));

    await product.save();

    if (!product) {
      res.status(404).send("Not Found");
    }
    res.send(await Product.findOne({ _id: _id }).populate("customer"));
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findByIdAndRemove(_id);

    const customer = await Customer.findById(product.customer);

    const index = customer.products.indexOf(product._id);
    customer.products.splice(index, 1)
    await customer.save()

    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteProduct
};
