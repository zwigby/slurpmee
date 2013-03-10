var express = require('express');
var app = express();

var oneDay = 86400000;

app.use(express.compress());
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));
app.use(express.bodyParser());

app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/chooseLocation', function(req, res) {
  res.render('chooseLocation');
});

app.get('/location/:zip', function(req, res) {
  res.render('flavorsByLocation');
});

app.get('/location/:lat/:long', function(req, res) {
  res.render('flavorsByLocation');
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');