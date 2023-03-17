const _ = require('lodash');
const demoArraySnipping = (leftD, rightD, array) => {
    //array.push("banana", "apple", "peach", "plum", "orange", "mango", "pineapple");
    return _.dropRight(_.drop(array, leftD), rightD) // Perform left drop then right drop
}
module.exports = demoArraySnipping;