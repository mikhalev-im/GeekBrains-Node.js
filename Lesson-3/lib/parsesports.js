var request = require('request');
var cheerio = require('cheerio');

function getGames() {
  request('http://www.sports.ru/', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      console.log('Сегодняшние матчи по футболу:');
      
      $('[data-accordion-id=teaser] > .accordion-group').each(function (i, elment) {
        var sportTitle = $(this).find('.accordion__title > a').eq(0).text();
        
        if (sportTitle.indexOf('футбол') >= 0) {
          console.log('\n' + sportTitle + '\n');
          var teams = $(this).find('.teaser-event__board-player-name');
          var score = $(this).find('.teaser-event__board-score');
          for (var i = 0, len = score.length; i < len; i++) {
            console.log(teams.eq(i*2).text() + score.eq(i).text() + teams.eq(i*2+1).text());
          }
        }
      })
    }
  })
}

module.exports = getGames;