import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import FormBuilder from "./src/index";

// Add our stylesheets for the demo.
require('./css/application.css.scss');

ReactDOM.render(
  <FormBuilder.ReactFormBuilder />,
  document.getElementById('form-builder')
)

ReactDOM.render(
  <DemoBar />,
  document.getElementById('demo-bar')
)

