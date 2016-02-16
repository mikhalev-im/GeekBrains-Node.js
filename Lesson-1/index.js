var ansi = require('ansi');
var cursor = ansi(process.stdout);
cursor.beep();
console.log('Hello world!');
