const express = require("express");
const productRouter = express.Router();
const queries = require('../Models/products.js');

productRouter.get("/", (req, res) => {
  let { page = 1, count = 5 } = req.query;
  queries.getProducts(page, count).then(result => {
    console.log('GET products | page:', page, 'count:', count);
    res.send(result);
  }).catch(e => {
    console.log(e);
    res.send('not found');
  })
});

productRouter.get("/:product_id", (req, res) => {
  let { product_id = 1 } = req.params;
  queries.getProductById(product_id).then(result => {
    console.log('GET productsById | product_id:', product_id);
    res.send(result[0]);
  }).catch(e => {
    console.log(e);
    res.send('not found');
  })
});
productRouter.get("/:product_id/styles", (req, res) => {
  let { product_id = 1 } = req.params;
  queries.getProductStyles(product_id).then(result => {
    console.log('GET getProductStyles | product_id:', product_id);
    res.send(result);
  }).catch(e => {
    console.log(e);
    res.send('not found');
  })
});
productRouter.get("/:product_id/related", (req, res) => {
  let { product_id = 1 } = req.params;
  queries.getRelatedProducts(product_id).then(result => {
    console.log('GET getRelatedProducts | product_id:', product_id);
    res.send(result[0].related_products);
  }).catch(e => {
    console.log(e);
    res.send('not found');
  })
});
module.exports = productRouter;