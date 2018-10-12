import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import FormBuilder from "./src/index";
import * as variables from './variables'
import { get, post} from './src/stores/requests';
// Add our stylesheets for the demo.
require('./scss/application.scss');

const url = '/api/formdata';
const saveUrl ='/api/formdata';

const onLoad = function() {
  console.log('onLoad');
  return get(url);
}

const onPost = function(data) {
  console.log('onPost', data);
  post(saveUrl, data);
}

ReactDOM.render(
  <FormBuilder.ReactFormBuilder variables={variables} 
    url={url}
    saveUrl={saveUrl}
  />,
  document.getElementById('form-builder')
)

// ReactDOM.render(
//   <FormBuilder.ReactFormBuilder variables={variables} 
//     onLoad={onLoad}
//     onPost={onPost}
//   />,
//   document.getElementById('form-builder')
// )

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar')
)
