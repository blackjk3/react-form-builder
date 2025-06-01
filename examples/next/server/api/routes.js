/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
// eslint-disable-next-line import/no-extraneous-dependencies
var express = require('express');
// var handleForm = require('./form');
var formData = require('./formData');

var app = express();

app.route('/formdata/')
  .get((req, res) => {
    // console.log('get formdata: ', formData.data);
    res.send(formData.data.task_data);
  })
  .post((req, res) => {
    formData.data = req.body;
    // console.log('post formdata: ', formData.data);
    res.status(200).send();
  });

module.exports = app;
