import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import { ReactFormBuilder } from "react-form-builder2";
import * as variables from './variables'

ReactDOM.render(
  <ReactFormBuilder variables={variables} 
    url='/api/formdata'
    saveUrl='/api/formdata'
  />,
  document.getElementById('form-builder')
)

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar')
)
