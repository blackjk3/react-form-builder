var express = require('express');
var app = module.exports = express();
var formData = require('./dummyFormData.json');

app.route('/formdata/')
    .get((req, res) => {
        // console.log(formData);
        res.send(formData.task_data);
    })
    .post((req, res) => {
        const data = req.body;
        // console.log('post formdata', data);
        formData = data;
        res.status(200).send();
    });    

