var express = require('express'),
    app = express(),
    api = require('./api');

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
  api.getStoresForZip(req.params.zip, function(err, stores) {
    res.render('flavorsByLocation', { stores: stores });
  });
});

app.get('/location/:lat/:long', function(req, res) {
  api.getStores(req.params.lat, req.params.long, function(stores, err) {
    res.render('flavorsByLocation', { stores: stores });
  });
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');