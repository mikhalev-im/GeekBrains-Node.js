var random = require('random-gen');
var prompt = require('prompt');
var cc = require('curly-colors');

console.log(cc('<{yellow>I think of a number between 1 and 3. Try to gues it!<}>'));

random.mixin('myNum' ,['1', '2', '3']);
var myNumber = random.myNum(1);

prompt.start();

prompt.get(['Number'], function(err, result) {
  if (result.Number === myNumber) {
    console.log(cc('<{green>You win!<}>'));
  }
  else {
    console.log(cc('<{red>You are wrong! My number was ' + myNumber + '<}>'));
  }
});
