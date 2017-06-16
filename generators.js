// // //The function* declaration (function keyword followed by an asterisk) defines a generator function, which returns a Generator object.
// // function* exampleGenerator(i) {
// //   yield 1000
// //   yield i + 1;
// //   yield i + 2;
// //   yield i + 3;
// // }
// //
// // //Calling a generator function does not execute its body immediately; an iterator object for the function is returned instead. When the iterator's next() method is called, the generator function's body is executed until the first yield expression, which specifies the value to be returned from the iterator or, with yield*, delegates to another generator function. The next() method returns an object with a value property containing the yielded value and a done property which indicates whether the generator has yielded its last value as a boolean. Calling the next() method with an argument will resume the generator function execution, replacing the yield statement where execution was paused with the argument from next().
// //
// // function run(iter) {
// //   let { value, done } = iter.next();
// //
// //   while (!done) {
// //     console.log(value);
// //     ({ value, done } = iter.next());
// //   }
// // }
//
// //run(exampleGenerator(2));
//
// function* exampleGenerator(m) {
//   while (true) {
//     const n = yield;
//     console.log(n + m);
//   }
// }
//
// function run(iter) {
//   iter.next();  // Run the generator until the first `yield` statement
//   iter.next(1);
//   iter.next(2);
//   iter.next(3);
//   iter.return();
// }
//
// run(exampleGenerator(2));

function* smileyGenerator() {
  console.log(yield "HAPPY");
  console.log(yield "SAD");
  console.log(yield "I HAVE OTHER EMOTIONS TOO, Y'KNOW");
}

function getSmiley(value) {
  switch (value) {
    case "HAPPY": {
      return ":)";
    }
    case "SAD": {
      return ":(";
    }
    default: {
      return "¯\_(ツ)_/¯";
    }
  }
}

function run(iter) {
  let smiley;
  // Run the generator until the first `yield` statement
  let { value, done } = iter.next();

  while (!done) {
    smiley = getSmiley(value);
    ({ value, done } = iter.next(smiley));
  }
}

run(smileyGenerator());
