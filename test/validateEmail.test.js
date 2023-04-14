const assert = require('assert');
const validateEmail = require('../src/pages/validateEmail.js');

describe('validateEmail', function() {
  it('should return true for valid email', function() {
    assert.equal(validateEmail('example@example.com'), true);
  });
  
  it('should return false for invalid email', function() {
    assert.equal(validateEmail('example.com'), false);
  });
});

