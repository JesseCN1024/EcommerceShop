const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('express-session')
const userRepo = require('../../repositories/users');
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {handleErrors} = require('./middlewares');
const {requireEmail, requirePassword, requirePassConfirm, requireValidEmail, requireValidPass} = require('./validators');
const {validationResult} = require('express-validator');

// Creating ả sub routẻr
const router = express.Router();

// anytime there is a req -> run this func
// router is inside app, watch for incoming req with method GET and path /
router.get("/signup", (req, res) => {
  res.send(signupTemplate({
    req,

  })); // respond to the screen at localhost:3000
});
// Middleware Functions: function in the middle of requests
// next: callback func give to you and I express itself
// const bodyParser = (req, res, next) =>{
//     if (req.method==='POST'){
//        req.on("data", (data) => { // ~ on like an event listener
//         // Extrat password into an arr of value pairs
//          let arr = data.toString("utf8").split("&");
//          const form = {};
//          for (let pair of arr) {
//            const [key, value] = pair.split("=");
//            form[key] = value;
//          }
//          req.body = form;
//          next(); // express finish doing the extracting and continue do its own things in next()
//        });
//     }
//     else{
//         next(); // calback method
//     }

// }

// telling router to watch incoming req with / and method POST
// whenever a post request -> run bodyParser and after it run the next()
// function -> pass the req and res to the callback
// bodyParser: middleware function, receive html request and parse to data
router.post(
  "/signup",
  [requireEmail, requirePassword, requirePassConfirm],
  handleErrors(signupTemplate), // check the errors from the valitation above
  async (req, res) => {
    console.log('start in async')
    // const errors = validationResult(req);
    // // console.log(errors);
    // if (!errors.isEmpty()){
    //   console.log(errors);
    //   return res.send('Failed');

    // }
    // async function here
    const { email, password , passconfirm} = req.body;
    // Get the
    // const existingRepo = await userRepo.getAll();
    
    // If succeeded: Display on the screen
    // Create user in user repo
    const user = await userRepo.create({
      email: email,
      password: password
    });

    // Store the id of user inside the users cookies
    // session === {} -> session.ID creates a new key 'ID" IN COOKIES
    req.session.ID = user.id; // storing in cookies
    res.redirect('/admin/products');
  }
);

router.get("/signout", (req, res) => {
  // User sign out -> remove cookie with acc saved
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying the session");
    }
  });
  res.redirect("/signin");
});

// SIGN IN HANDLER
router.get("/signin", (req, res) => {
  res.send(signinTemplate({})); // passing an obj for destructuring in signin.js not happen error
});
router.post(
  "/signin",
  [
    requireValidEmail,
    requireValidPass  
  ],
  handleErrors(signinTemplate),
  async (req, res) => {
    const user = await userRepo.getOneBy({ email: req.body.email });
    // Cookies handling
    req.session.ID = user.id;
    res.redirect("/admin/products");
  }
);



// make all the route handler (post, get) available to all files in the prj
module.exports = router;