/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
const express = require('express');
const next = require('next');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const api = require('./api/routes');
const handleForm = require('./api/form');
const formData = require('./api/formData');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production'; // true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); // part of next config
const MONGO_URL = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

console.log(`Connecting to ${MONGO_URL}`);
MongoClient.connect(MONGO_URL, (err, client) => {
  if (err) throw err;
  nextApp.prepare().then(() => {
    const db = client.db(dbName);
    // express code here
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // eslint-disable-next-line no-shadow
    app.use((req, res, next) => {
      // Also expose the MongoDB database handle so Next.js can access it.
      req.db = db;
      next();
    });
    app.use('/api/', api);

    app.route('/api/form/')
      .get((req, res) => {
        res.send(formData.answers);
      })
      .post(() => handleForm(db));

    app.get('*', (req, res) => {
      // for all the react stuff
      return handle(req, res);
    });

    app.listen(PORT, err1 => {
      if (err1) throw err1;
      console.log(`ready at http://localhost:${PORT}`);
    });
  }).catch(err2 => {
    console.log('Mongo start error: \n', err2.message);
  });
});
