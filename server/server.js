/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api/routes');

var mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

var app = express();

app.set('port', (process.env.PORT || isProduction ? 8080 : 5005));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

if (isProduction) {
  app.use(express.static(`${__dirname}/../dist`));
}

app.use('/api/', api);

// console.log('NODE_ENV', process.env.NODE_ENV, `${__dirname}/../dist`);

// 404 catch-all handler (middleware)
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  res.status(500).render('500');
});

app.listen(app.get('port'), function () {
  console.log(
    `Express started on http://localhost:${app.get(
      'port',
    )}; press Ctrl-C to terminate.`,
  );
});
