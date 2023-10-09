const express = require('express');
// Use multer
const multer = require('multer');
const productsRepo = require('../../repositories/products');
const newProTemplate = require('../../views/admin/products/new');
const editProTemplate = require('../../views/admin/products/edit');
const indexProTemplate = require('../../views/admin/products/index');

const {requireTitle, requirePrice} = require('./validators');
const {handleErrors, checkAuth} = require('./middlewares');
const products = require('../../repositories/products');

// similar, create a router then export for index.js to use
const router = express.Router(); // router navigates incoming requests to suitable routes
// Call multer after creating a router
const upload = multer({storage: multer.memoryStorage()});




// Route: Listing all the products
router.get('/admin/products',checkAuth, async (req,res) => {
  const products = await productsRepo.getAll();
  res.send(indexProTemplate({products}));

});

// Route: Showing the add form
router.get('/admin/products/new',checkAuth,(req,res) => {
    res.send(newProTemplate({})); // passing {} obj for handling undefined error

});

// Route: submiting the form
router.post(
  "/admin/products/new",
  checkAuth, // midldeware to check Authentication from cookie
  upload.single("image"), // uploading img and parsing the incoming req
  [requireTitle, requirePrice], // validation
  handleErrors(newProTemplate), // handle any error if there is then return for soon
  async (req, res) => {
    console.log(req.file);
    // Image handle
    const image = req.file.buffer.toString("base64");
    const { title, price } = req.body;
    await productsRepo.create({
      title,
      price,
      image,
    });

    req.on("data", (data) => {
      console.log(data.toString());
    });
    res.redirect('/admin/products');
  }
);
// Route: listing the edit page of a product
router.get('/admin/products/:id/edit',checkAuth, async (req, res) => {

  // Get the product based on the id in the url
  const product = await productsRepo.getOne(req.params.id);
  if (!product){
    return res.send('Product not found');
  }
  res.send(editProTemplate({product}));
});
// Route: handling editting of a product
router.post("/admin/products/:id/edit", 
  checkAuth, 
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(editProTemplate, async (req) => { 
    // this callback is triggered when there is error 
    const product = await productsRepo.getOne(req.params.id);
    return {product};
  }),
  async (req, res) => {
    // After all the middlewares have been triggered -> safe to save the data
    // Take the changes object from the body
    const changes = req.body;
    // Check image 
    if (req.file){ // if there is a file (or img uploaded)
      changes.image = req.file.buffer.toString('base64');
    }
    // Update
    await productsRepo.update(req.params.id, changes) // only need to use changes var for the update
    res.redirect('/admin/products');
});

// Route: Deleting a product
router.post('/admin/products/:id/delete',
  checkAuth,
  async(req, res) => {
    await productsRepo.delete(req.params.id);
    return res.redirect('/admin/products');
})



module.exports = router;

