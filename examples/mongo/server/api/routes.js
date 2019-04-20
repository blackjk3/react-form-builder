/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
// eslint-disable-next-line import/no-extraneous-dependencies
var express = require('express');
var formData = require('./formData');

var app = express();

async function saveFormData(db, doc) {
  const o = await db.collection('form').findOne({ id: doc.id });
  if (o != null) {
    // console.log('replaceOne: ', doc);
    delete doc._id;
    db.collection('form').findOneAndUpdate({ _id: o._id }, { $set: doc },
      { upsert: true }, (err) => {
        if (err) console.log('replaceOne error: ', err);
      });
  } else {
    // console.log('insertOne: ', doc);
    db.collection('form').insertOne(doc);
  }
}

async function loadFormData(db) {
  return db.collection('form').find().toArray();
}

function findRemovedItem(currentArray, previousArray) {
  return previousArray.filter(x => {
    const z = currentArray.find(y => y.id === x.id);
    return !currentArray.includes(z);
  });
}

async function deleteFormData(db, doc) {
  db.collection('form').deleteOne({ id: doc.id });
}

function fixData(data) {
  return (!data || data === '[]' || data.length === 0) ? [] : data;
}

app.route('/formdata/')
  .get(async (req, res) => {
    let data = fixData(formData.data.task_data);
    // console.log('get formdata: ', data);
    if (!data.length) {
      data = await loadFormData(req.db);
      formData.task_data = data;
    }
    res.send(data);
  })
  .post(async (req, res) => {
    const data = await loadFormData(req.db);
    const missing = findRemovedItem(req.body.task_data, data);
    if (missing.length) {
      missing.forEach(doc => {
        // console.log('delete formdata: ', doc);
        deleteFormData(req.db, doc);
      });
    } else {
      formData.data = req.body;
      // console.log('post formdata: ', formData.data);
      formData.data.task_data.forEach(doc => {
        saveFormData(req.db, doc);
      });
    }
    res.status(200).send();
  });

module.exports = app;
