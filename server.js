const express = require("express");
const customerRouter = require("./app/routes/customer.routes.js")
const productRouter = require("./app/routes/product.routes.js")
const tutorialRouter = require("./app/routes/tutorial.routes.js")
const tagRouter = require("./app/routes/tag.routes.js")

const app = express();
const port = process.env.PORT || 3000;

//use request body
app.use(express.json());
app.use(customerRouter)
app.use(productRouter)
app.use(tutorialRouter)
app.use(tagRouter)

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
