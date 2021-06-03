// I pledge my honor that I have abided by the Stevens Honors System - Aparajita Rana

const arrayUtils = require('./arrayUtils');
const { mean, medianSquared, maxElement, fill, countRepeating, isEqual } = require('./arrayUtils')
const { camelCase, replaceChar, mashUp } = require('./stringUtils')
const { makeArrays, isDeepEqual, computeObject } = require('./objUtils')

console.log('mean Testing:')
try {
   // Should Pass
   const meanOne = mean([1, 2, 3]);
   console.log('mean passed successfully');
} catch (e) {
   console.log('mean failed test case');
}
try {
   // Should Fail
   const meanTwo = mean("yoikes");
   console.error('mean did not error');
} catch (e) {
   console.log('mean failed successfully');
}

console.log('\nmedianSquared Testing: ')
try {
   // Should Pass
   const medianSquaredOne = medianSquared([2, 10, 12]);
   console.log('medianSquared passed successfully');
} catch (e) {
   console.error('medianSquared failed test case');
}
try {
  // Should Fail
  const medianSquaredTwo = medianSquared("yoikes");
  console.error('medianSquared did not error');
} catch (e) {
  console.log('medianSquared failed successfully');
}

console.log('\nmaxElement Testing: ')
try {
   // Should Pass
   const maxElementOne = maxElement([5, 6, 7]);
   console.log('maxElement passed successfully');
} catch (e) {
   console.error('maxElement failed test case');
}
try {
  // Should Fail
  const maxElementTwo = maxElement("testsdfasd");
  console.error('maxElement did not error');
} catch (e) {
  console.log('maxElement failed successfully');
}

console.log('\nfill Testing: ')
try {
   // Should Pass
   const fillOne = fill(3, 'hola');
   console.log('fill passed successfully');
} catch (e) {
   console.error('fill failed test case');
}
try {
  // Should Fail
  const fillTwo = fill("yoikesks");
  console.error('fill did not error');
} catch (e) {
  console.log('fill failed successfully');
}

console.log('\ncountRepeating Testing: ')
try {
   // Should Pass
   const countRepeatingOne = countRepeating([7, '7', 10, "Hello","Hello", "hello"]);
   console.log('countRepeating passed successfully');
} catch (e) {
   console.error(e.message);
}
try {
  // Should Fail
  const countRepeatingTwo = countRepeating([true, undefined, null]);
  console.error('countRepeating did not error');
} catch (e) {
  console.log('countRepeating failed test case');
}

console.log('\nisEqual Testing:')
try {
   // Should Pass
   const isEqualOne = isEqual([null, null, null], [null, null, null]);
   console.log('isEqual passed successfully');
} catch (e) {
   console.error('isEqual failed test case');
}
try {
  // Should Fail
  const isEqualTwo = isEqual('plzwork', [1, 2, 3, 4]);
  console.error('isEqual did not error');
} catch (e) {
  console.log('isEqual failed successfully');
}

console.log('\ncamelCase Testing: ')
try {
   // Should Pass
   const camelCaseOne = camelCase("How now brown cow");
   console.log('camelCase passed successfully');
} catch (e) {
   console.error('camelCase failed test case');
}
try {
   // Should Fail
   const camelCaseTwo = camelCase(["Hello", "World"]);
   console.error('camelCase did not error');
} catch (e) {
   console.log('camelCase failed successfully');
}

console.log('\nreplaceChar Testing: ')
try {
   // Should Pass
   const replaceCharOne = replaceChar("Hello, How are you? I hope you are well");
   console.log('replaceChar passed successfully');
} catch (e) {
   console.error('replaceChar failed test case');
}
try {
   // Should Fail
   const replaceCharTwo = replaceChar(234324);
   console.error('replaceChar did not error');
} catch (e) {
   console.log('replaceChar failed successfully');
}

console.log('\nmashUp Testing: ')
try {
   // Should Pass
   const mashUpOne = mashUp("Does", "Work");
   console.log('mashUp passed successfully');
} catch (e) {
   console.error('mashUp failed test case');
}
try {
   // Should Fail
   const mashUpTwo = mashUp('o', 'okie');
   console.error('mashUp did not error');
} catch (e) {
   console.log('mashUp failed successfully');
}

console.log('\nmakeArrays Testing: ')
const first = { x: 3, y: 4};
const second = { a: 71, x: 6, z: 4 };
const third = { x: 0, y: 10, q: 14 };
try {
   // Should Pass
   const makeArraysOne = makeArrays([first, second, third]);
   console.log('makeArrays passed successfully');
} catch (e) {
   console.error(e.message);
}
try {
  // Should Fail
  const makeArraysTwo = makeArrays("yoiekssk");
  console.error('makeArrays did not error');
} catch (e) {
  console.log('makeArrays failed successfully');
}

console.log('\nisDeepEqual Testing: ')
const one = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const two = { c: true, b: 7, d: "Test", a: { sB: "There", sC: "Class", sA: "Hello" } }
const three = {a: 2, b: 3};

try {
   // Should Pass
   const isDeepEqualOne = isDeepEqual(one, two);
   console.log('isDeepEqual passed successfully');
} catch (e) {
   console.error('isDeepEqual failed test case');
}
try {
  // Should Fail
  const isDeepEqualTwo = isDeepEqual(three);
  console.error('isDeepEqual did not error');
} catch (e) {
  console.log('isDeepEqual failed successfully');
}

console.log('\ncomputeObject Testing: ')
try {
   // Should Pass
   const computeObjectOne = computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
   console.log('computeObject passed successfully');
} catch (e) {
   console.error('computeObject failed test case');
}
try {
   // Should Fail
   const computeObjectTwo = computeObject({ a: 'nah', b: 2, c: 23 }, n => n * 2);
   console.error('computeObject did not error');
} catch (e) {
   console.log('computeObject failed successfully');
}