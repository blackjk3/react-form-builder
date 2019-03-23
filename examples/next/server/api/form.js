/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-var */
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var formData = require('./formData');

var extensions = ['.png', '.gif', '.jpg', '.jpeg'];
var handleError = (err, res) => {
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!');
};
var tempPath = path.join(__dirname, '../../public/temp');
var upload = multer({ dest: tempPath }).any();

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
      const file = req.files && req.files.length ? req.files[0] : null;
      if (!file) {
        res.status(201).send();
        return;
      }

      // TODO - handle multiple files
      const tempFilePath = file.path;
      const fieldname = file.fieldname;
      const targetPath = path.join(__dirname, '../../public/uploads');
      const extn = path.extname(file.originalname).toLowerCase();
      if (extensions.indexOf(extn) > -1) {
        const targetFilePath = path.join(targetPath, `${fieldname}${extn}`);
        fs.rename(tempFilePath, targetFilePath, err => {
          if (err) return handleError(err, res);
          formData.answers[fieldname] = `/uploads/${fieldname}${extn}`;
          res.status(201).send();
        });
      } else {
        fs.unlink(tempPath, err => {
          if (err) return handleError(err, res);
          res
            .status(403)
            .contentType('text/plain')
            .end('File type is not allowed!');
        });
      }
    }
  });
};

module.exports = handleUpload;
