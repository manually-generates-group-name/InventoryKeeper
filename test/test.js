const assert = require('assert');
const _ = require('lodash');
const demoArraySnipping = require('../src/pages/DemoArraySnipping.js');

describe('demoArraySnipping', function() {
  it('should snip both sides of a array according to given values', function() {
    array1 = [];
    array01 = [];
    left1 = 5;
    right1 = 0;
    array1.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    array01.push(6, 7, 8, 9, 10);
    array2 = [];
    array02 = [];
    left2 = 2;
    right2 = 1;
    array2.push(1.6, 2.1, 3.3, 4.784, 5.029, 6.934, 7.9, 8.0, 9.1, 10.2);
    array02.push(3.3, 4.784, 5.029, 6.934, 7.9, 8.0, 9.1);
    array3 = [];
    array03 = [];
    left3 = 3;
    right3 = 3;
    array3.push(1, 2, 3, 4, 5, 6);
    array4 = [];
    array04 = [];
    left4 = 0;
    right4 = 0;
    array4.push("banana", "apple", "peach", "plum", "orange", "mango", "pineapple");
    array04.push("banana", "apple", "peach", "plum", "orange", "mango", "pineapple");
    assert.deepStrictEqual(demoArraySnipping(left1, right1, array1), array01);
    assert.deepStrictEqual(demoArraySnipping(left2, right2, array2), array02);
    assert.deepStrictEqual(demoArraySnipping(left3, right3, array3), array03);
    assert.deepStrictEqual(demoArraySnipping(left4, right4, array4), array04);
  });
});
