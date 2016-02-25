var readline = require('readline');
var fs = require('fs');

var logfile = process.argv[2] || 'log.txt';

console.log('Hello!\nTHis is BlackJack!');
playBlackJack(logfile);

function playBlackJack(logfile) {
  
  var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  var userCards = [getCard(cards), getCard(cards)];

  startGame();

  function startGame() {
    fs.appendFileSync(logfile, 'New game\n');

    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    gameRound(userCards);
  }

  function gameRound (userCards) {
    
    var userSum = getSum(userCards);

    fs.appendFileSync(logfile, 'User cards: ' + userCards + '\n');
    fs.appendFileSync(logfile, 'User sum = ' + userSum + '\n');
    
    console.log('Your cards: ' + userCards + ". Sum: " + userSum);
    
    if (userSum > 21) {
     console.log('You lose!');
     fs.appendFileSync(logfile, 'Dealer win\nEnd of the game\n');
     rl.close();
     return;
    }
    

    rl.question('Do you want one more card? [y] or [n]: ', function(answer) {
      if (answer === 'y') {
        userCards.push(getCard(cards));
        fs.appendFileSync(logfile, 'User gets one more card\n');
        gameRound(userCards);
      }
      else if (answer === 'n') {
        getResult(userSum);
        return;
      }
      else {
        console.log('Wrong input!');
        return;
      }
    })
  }

  function getCard(cards) {
    return cards[Math.round(Math.random() * (cards.length - 1))];
  }

  function getSum(cards) {
    var aces = 0, sum = 0;
    
    for (var i = 0, len = cards.length; i < len; i++) {
      if ('JQK'.indexOf(cards[i]) >= 0) {
        sum = +sum + 10;
      }
      else if (cards[i] === 'A') {
        aces++;
      }
      else {
        sum = +sum + parseInt(cards[i]);
      }
    }

    while (aces--){
      if (+sum > 11) {
        sum = +sum + 2;
      }
      else {
        sum = +sum + 10;
      }
    }

    return sum;
  }

  function getResult (userSum) {
    var dealerCards = [getCard(cards), getCard(cards)], dealerSum = getSum(dealerCards);
    
    fs.appendFileSync(logfile, 'Dealer cards: ' + dealerCards + '\n');
    fs.appendFileSync(logfile, 'Dealer sum = ' + dealerSum + '\n');

    while (dealerSum < 17) {
      fs.appendFileSync(logfile, 'Dealer needs one more card\n')
      dealerCards.push(getCard(cards));
      fs.appendFileSync(logfile, 'Dealer cards: ' + dealerCards + '\n');
      dealerSum = getSum(dealerCards);
      fs.appendFileSync(logfile, 'Dealer sum = ' + dealerSum + '\n');
    }
    
    console.log('Dealer cards: ' + dealerCards + '. Sum: ' + dealerSum);
    
    if (userSum > dealerSum || dealerSum > 21) {
      console.log('You win!');
      fs.appendFileSync(logfile, 'User wins!\nEnd of the game\n');
      rl.close();
    }
    else if (userSum < dealerSum) {
      console.log('You lose!');
      fs.appendFileSync(logfile, 'Dealer wins!\nEnd of the game\n');
      rl.close();
    }
    else {
      console.log('Tie!');
      fs.appendFileSync(logfile, 'Tie!\nEnd of the game\n');
      rl.close();
    }
  }
}