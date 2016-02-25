var fs = require('fs');

var logfile = process.argv[2] || 'log.txt',
    gamesPlayed = 0,
    gamesWon = 0,
    gamesLoose = 0,
    maxWinSeq = 0,
    maxLooseSeq = 0;

var data = fs.readFileSync(logfile, 'utf8');

data = data.split('\n');

for (var i = 0, len = data.length, flag = 0, seq = 0; i < len; i++) {
  switch (data[i]) {
    case 'New game':
      gamesPlayed++;
      break;
    case 'User wins!':
      gamesWon++;
      if (flag === -1) seq = 0;
      seq++;
      flag = 1;
      if (seq > maxWinSeq) maxWinSeq = seq;
      break;
    case 'Dealer wins!':
      gamesLoose++;
      if (flag === 1) seq = 0;
      seq++;
      flag = -1;
      if (seq > maxLooseSeq) maxLooseSeq = seq;
      break;
    default:
      continue;
  }
}

console.log('Games played: ' + gamesPlayed);
console.log('Games won: ' + gamesWon);
console.log('Games loose: ' + gamesLoose);
console.log('Maximum win sequense: ' + maxWinSeq);
console.log('Maximum lose sequense: ' + maxLooseSeq);
