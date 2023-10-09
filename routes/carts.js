const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartTemplate = require('../views/products/cart')


const router = express.Router();

router.get('/des', (req,res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
    })
    res.redirect('/');
})

//ROUTE: add item into cart
router.post('/cart/products', async (req, res) => {
    let cart = await cartsRepo.getOne((req.session.cartID) ? req.session.cartID : '');
    // CREATE OR TAKE THE CART IN THE COOKIE
    if (!req.session.cartID || !cart){
        // Create a cart with the product provided
        cart = await cartsRepo.create({products:[]})
        // Save the cookie session
        req.session.cartID = cart.id;
        console.log('create new');
    } 
    
    // HANDLE ADDING OR UPDATING PRODUCTS
    const productID = (req.body.productID);
    const existingItem = await cart.products.find((pro) => pro.id === productID);
    if (existingItem) {
        // existingItem is an object that stored the address not the value so we can use to increase the value 
        existingItem.quantity++;
    }
    else{
        cart.products.push({
            id: productID,
            quantity: 1
        })
    }
    await cartsRepo.update(cart.id, {
        products: cart.products 
    })
    
    return res.redirect('/');
    
})

//ROUTE: get and show
router.get('/cart', async (req,res) => {
    // If there is no cart then items (in template) = undefined
    if (!req.session.cartID) return res.send(cartTemplate({items: []}));
    // if there is a cart, attach products info into the items
    const cart = await cartsRepo.getOne(req.session.cartID);
    // For every product in the cart product -> add the detail
    for (let item of cart.products){ // item== product with id and its quantity
        const productDetail = await productsRepo.getOne(item.id);
        item.productDetail = productDetail; // add productDetail into item
    }
    return res.send(cartTemplate({items: cart.products}))

})

//ROUTE: delete cart item
router.post('/cart/product/delete', async (req,res) => {
    const id = req.body.productID;
    const cart = await cartsRepo.getOne(req.session.cartID);
    const products = cart.products.filter((product) => product.id!==id);
    console.log(cart);
    await cartsRepo.update(req.session.cartID, {
        products 
    });
    return res.redirect('/cart')
})



//ROUTE: Add, remove number of quantity

module.exports = router;