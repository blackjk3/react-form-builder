/* eslint-disable no-var */
// eslint-disable-next-line import/no-extraneous-dependencies
var express = require('express');
var handleForm = require('./form');

var app = express();
let formData = require('./dummyFormData.json');

app.route('/formdata/')
  .get((req, res) => {
    console.log('get formdata: ', formData);
    res.send(formData.task_data);
  })
  .post((req, res) => {
    formData = req.body;
    console.log('post formdata: ', formData);
    res.status(200).send();
  });

app.route('/form/')
  .get((req, res) => {
    console.log('get form: ', formData);
    res.send('GET FORM');
  })
  .post(handleForm);

module.exports = app;
