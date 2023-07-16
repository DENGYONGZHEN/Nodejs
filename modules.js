const Calculator = require('./test-module-1');
const calculator2 = require('./test-module-2');
//require 只加载一次module，然后放在内存中缓存下来，之后不再加载
const testLoad = require('./test-module-3');
//const { add, multiply, divide } = require('./test-module-2');

// console.log(arguments);

/** '(function (exports, require, module, __filename, __dirname) { ',
     '\n});'
*/

// console.log(require('module').wrapper);

const calculator = new Calculator();
console.log(calculator.add(2, 4));
console.log(calculator2.mlutiply(5, 3));

testLoad();
testLoad();
testLoad();
