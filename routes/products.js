const express = require('express');
const productsRepo = require('../repositories/products');
const productTemplate = require('../views/products/index')
const cartsRepo = require('../repositories/carts');

const router = express.Router();


// Route: Listing all products for user
router.get('/', async (req,res) => {
    const products = await productsRepo.getAll();
    return res.send(productTemplate({products}));
})





module.exports = router;