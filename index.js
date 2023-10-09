const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('express-session');
const authRouter = require('./routes/admin/auth');
const productAdminRouter = require('./routes/admin/products')
const productUserRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');



const app = express(); // handle the server throught out app

// tell express to find public folder and make it public to the outside
app.use(express.static('public'));

// Applying bodyParse to all route in node js, everytime it will check if the method is
// POST then usr bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(
  cookieSession({ 
    // keys: 'dsfsdf' // used to encrypt all the info stored inside the data
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRouter);
app.use(productAdminRouter);
app.use(productUserRouter);
app.use(cartsRouter);


// tell the server to listen to req on port 3000, keep the server hanging   
app.listen(3000, () => {
    console.log('lisetening')
})