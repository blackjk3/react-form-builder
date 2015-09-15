[![npm package](https://img.shields.io/badge/npm-0.0.1-orange.svg?style=flat-square)](https://www.npmjs.com/package/react-forms-builder)

# React Form Builder
A complete react form builder that interfaces with a json endpoint to load and save generated forms.  The toolbox contains 16 items for gathering data.  Everything from star ratings to signature boxes!

![](screenshot.png)

# Basic Usage

```javascript
var React = require('react');
var FormBuilder = require('react-forms-builder');

React.render(
  <FormBuilder.ReactFormBuilder />,
  document.body
)
```

# Props

```javascript
<FormBuilder.ReactFormBuilder 
  url='path/to/GET/initial.json'
  saveUrl='path/to/POST/built/form.json' />
```

# React Form Generator
Now that a form is built and saved, let's generate it from the saved json.

```javascript
var React = require('react');
var FormBuilder = require('react-forms-builder');

React.render(
  <FormBuilder.ReactFormGenerator
    form_action="/path/to/form/submit"
    form_method="POST"
    task_id={12} // Used to submit a hidden variable with the id to the form from the database.
    answer_data={JSON_ANSWERS} // Answer data, only used if loading a pre-existing form with values.
    authenticity_token={AUTH_TOKEN} // If using Rails and need an auth token to submit form.
    data={JSON_QUESTION_DATA} // Question data
  />,
  document.body
)
```


# Vendor Dependencies
In order to make the form builder look pretty, there are a few dependencies other than React.  See the example code in index.html for more details.

- Bootstrap
- FontAwesome
- jQuery

# SASS
All relevant styles are located in css/application.css.scss.

# DEMO
```bash
$ npm install
$ npm start
```
Then navigate to http://localhost:8080/ in your browser and you should be able to see the form builder in action.