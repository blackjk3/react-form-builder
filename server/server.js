/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var api = require('./api/routes');
var handleForm = require('./api/form');
var formData = require('./api/formData');

var mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

var app = express();

// set the view engine to ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs').renderFile);

app.set('port', (process.env.PORT || isProduction ? 8080 : 5005));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

if (isProduction) {
  app.use(express.static(`${__dirname}/../dist`));
}

app.use('/api/', api);

function fixLabelLink(data) {
  const task_data = data.task_data.map(x => ({ ...x }));
  for (let i = 0; i < task_data.length; i++) {
    if (data.task_data[i].label) {
      task_data[i].label = task_data[i].label.replace(/"/g, '\\"');
    }
  }
  return { task_data };
}

app.route('/api/form/')
  .get((req, res) => {
    const data = fixLabelLink(formData.data);
    // console.log('get form: ', data);
    // console.log('get form answers: ', formData.answers);
    res.render('index', {
      data: JSON.stringify(data),
      answers: JSON.stringify(formData.answers),
    });
  })
  .post(handleForm);

// console.log('NODE_ENV', process.env.NODE_ENV, `${__dirname}/../dist`);

// 404 catch-all handler (middleware)
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  res.status(500);
  res.render('500', { error: err });
});

app.listen(app.get('port'), function () {
  console.log(
    `Express started on http://localhost:${app.get(
      'port',
    )}; press Ctrl-C to terminate.`,
  );
});
