const formData = require('./dummyFormData.json');

async function saveFormData(db, doc) {
  const o = await db.collection('form').findOne({ id: doc.id });
  if (o != null) {
    // console.log('update: ', doc);
    // eslint-disable-next-line no-param-reassign
    delete doc._id;
    db.collection('form').findOneAndUpdate({ _id: o._id },
      { $set: doc },
      { upsert: false },
      (err) => {
        if (err) console.log('findOneAndUpdate error: ', err);
      });
  } else {
    // console.log('insert: ', doc);
    db.collection('form').insertOne(doc);
  }
}

async function loadFormData(db) {
  return db.collection('form').find().toArray();
}

async function deleteFormData(db, doc) {
  db.collection('form').deleteOne({ id: doc.id });
}

function findRemovedItem(currentArray, previousArray) {
  return previousArray.filter(x => {
    const z = currentArray.find(y => y.id === x.id);
    return !currentArray.includes(z);
  });
}

async function save(db, taskData) {
  const oldData = await loadFormData(db);
  const missing = findRemovedItem(taskData, oldData);
  if (missing.length) {
    missing.forEach(doc => deleteFormData(db, doc));
  } else {
    taskData.forEach(doc => saveFormData(db, doc));
  }
}

module.exports = {
  data: formData,
  answers: {},
  save,
  load: loadFormData,
};
