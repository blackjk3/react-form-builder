import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import FormBuilder from "./src/index";
import * as variables from './variables'

// Add our stylesheets for the demo.
require('./scss/application.scss');

const onPost = function(data) {
  console.log('onPost', data);
}

ReactDOM.render(
  <FormBuilder.ReactFormBuilder variables={variables} 
    url='/api/formdata'
    saveUrl='/api/formdata'
    onPost={onPost}
  />,
  document.getElementById('form-builder')
)

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar')
)
