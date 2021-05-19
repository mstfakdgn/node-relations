const express = require("express");
const router = new express.Router();
const productController = require("../controllers/product.controller.js")

router.post("/products", productController.create);

router.get('/products', productController.findAll);

router.get('/products/:id', productController.findOne);

router.put('/products/:id', productController.update);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
