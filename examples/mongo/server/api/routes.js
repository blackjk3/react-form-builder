/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
// eslint-disable-next-line import/no-extraneous-dependencies
var express = require('express');
var formData = require('./formData');

var app = express();

function fixFormData(data) {
  return (!data || data === '[]' || data.length === 0) ? [] : data;
}

app.route('/formdata/')
  .get(async (req, res) => {
    let data = fixFormData(formData.data.task_data);
    // console.log('get formdata: ', data);
    if (!data.length) {
      data = await formData.load(req.db);
      formData.task_data = data;
    }
    res.send(data);
  })
  .post(async (req, res) => {
    formData.data = req.body;
    const data = fixFormData(formData.data.task_data);
    await formData.save(req.db, data);
    res.status(200).send();
  });

module.exports = app;
