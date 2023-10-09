const {check} = require('express-validator');
const userRepo = require('../../repositories/users');

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      // Check if the email exists
      const emailCheck = await userRepo.getOneBy({ email: email });
      if (emailCheck) {
        throw new Error("Email in use");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),
  requirePassConfirm: check("passconfirm")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passconfirm, { req }) => {
      // Check if the two password inputed match
      if (req.body.password !== passconfirm) {
        throw new Error("Re-password does not match");
      }
      else return true; // fixing the fucking error name "Invalid Value"
    }),
  requireValidEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await userRepo.getOneBy({ email });
      if (!user) {
        throw new Error("User not found");
      }
    }),
  requireValidPass: check("password")
    .trim()
    .custom(async (password, { req }) => {
      // use req to get access to data of the body, like password in the ipf
      const user = await userRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Invalid password"); // no user found
      }
      const isValid = await userRepo.comparePass(user.password, password);
      if (!isValid) {
        // check and hashing password
        throw new Error("Password incorrect");
      }
    }),
  requireTitle: check("title")
    .trim()
    .isLength({ min: 4, max: 50 })
    .withMessage("The product name must from 4 to 50 characters"),
  requirePrice: check('price')
    .trim()
    .toInt()
    .isFloat({min: 1})
    .withMessage("Price must be a number")
};