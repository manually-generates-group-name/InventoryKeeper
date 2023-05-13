const validator = require('validator');

/*
 * This validates that what is entered is an email.
 */
const validateEmail = (email) => {
  return validator.isEmail(email);
}

module.exports = validateEmail;

