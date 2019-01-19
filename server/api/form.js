/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var formData = require('./formData');

var handleError = (err, res) => {
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!');
};

var upload = multer({ dest: '/uploads' }).any();
var handleUpload = (req, res) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log('multer.MulterError', error);
    } else if (error) {
      // An unknown error occurred when uploading.
      console.log('multer.MulterError', error);
    } else {
      formData.answers = req.body;
      console.log('form answers', formData.answers);
      const file = req.files[0];
      if (!file) {
        res.redirect('/api/form');
        return;
      }
      const tempPath = file.path;
      const targetPath = path.join(__dirname, '../../public/uploads/image.png');

      if (path.extname(file.originalname).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
          res
            .status(200)
            .contentType('text/plain')
            .end('File uploaded!');
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
          res
            .status(403)
            .contentType('text/plain')
            .end('Only .png files are allowed!');
        });
      }
    }
  });
};

module.exports = handleUpload;
