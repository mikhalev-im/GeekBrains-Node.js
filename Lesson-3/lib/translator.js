var urlutils = require('url');
var request = require('request');

module.exports = function(word) {
  var yandexLink = 'https://translate.yandex.net/api/v1.5/tr.json/translate?'
      yandexKey = 'key=trnsl.1.1.20160301T061401Z.208c8d324d97ac54.89bdaa6f647621bfc7150ca2561d9bf4ee304cdf',
      text = '&text=' + word,
      lang = '&lang=en-ru';

  var fullLink = yandexLink + yandexKey + text + lang;

  request(fullLink, function (error, response, body) {
    body = JSON.parse(body);
    console.log('Перевод слова ' + word + ': ' + body.text);
  });
}






