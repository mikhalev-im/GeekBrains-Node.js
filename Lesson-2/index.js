var readline = require('readline');
var fs = require('fs');

var logfile = process.argv[3];

console.log('Hello!\nTHis is BlackJack!');
playBlackJack(logfile);

function playBlackJack(logfile) {
  
  var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  var userCards = [getCard(cards), getCard(cards)];

  startGame();

  function startGame() {

    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    gameRound(userCards);
  }

  function gameRound (userCards) {
    
    var userSum = getSum(userCards);
    console.log('Your cards: ' + userCards + ". Sum: " + userSum);
    
    if (userSum > 21) {
     console.log('You lose!');
     rl.close();
     return;
    }
    

    rl.question('Do you want one more card? [y] or [n]: ', function(answer) {
      if (answer === 'y') {
        userCards.push(getCard(cards));
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
    while (dealerSum < 17) {
      dealerCards.push(getCard(cards));
      dealerSum = getSum(dealerCards);
    }
    
    console.log('Dealer cards: ' + dealerCards + '. Sum: ' + dealerSum);
    
    if (userSum > dealerSum || dealerSum > 21) {
      console.log('You win!');
      rl.close();
    }
    else if (userSum < dealerSum) {
      console.log('You lose!');
      rl.close();
    }
    else {
      console.log('Tie!');
      rl.close();
    }
  }




}