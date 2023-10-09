const {validationResult} = require('express-validator');


module.exports = {
    // handleErrors return a fucntion?: middlewares functon will pass this
    // func into route handler for resuable for many other requests coming
    handleErrors(templateFunc, dataCb){ // data callback function (it's a function)
        return async (req, res, next) => {
          // The result of validator-express after checking will be passed into the req
          // So get errors by validationResult(req)
          const errors = validationResult(req);
          console.log(errors);
          if (!errors.isEmpty()) {
            // Handle the callback data
            let data ={};
            if (dataCb){ // check if the callback is provided then provoke it
              data = await dataCb(req);
            }
            return res.send(templateFunc({ errors, ...data })); // spread ...data
          }
          next(); // hey every went well, call the next middleware or invoke
          // the next route handler
        }

    },
    checkAuth(req,res,next){
      if (!req.session.ID){
        return res.redirect('/signin');
      }
      next(); // if all the code above run smoothly, then call the next middlewares
      // or route handlers or,.... to continue
    }
    
}