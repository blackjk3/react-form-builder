import React from "react";
import DemoBar from './demobar';
import FormBuilder from "./src/index";

// Add our stylesheets for the demo.
require('./css/application.css.scss');

React.render(
  <FormBuilder.ReactFormBuilder />,
  document.getElementById('form-builder')
)

React.render(
  <DemoBar />,
  document.getElementById('demo-bar')
)

