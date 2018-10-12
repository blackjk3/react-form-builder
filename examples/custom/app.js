import React from "react";
import ReactDOM from "react-dom";
import { ReactFormBuilder } from "react-form-builder2";
import DemoBar from './demobar';
import * as variables from './variables'
import { get, post} from './requests';

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
  <ReactFormBuilder variables={variables}
    url={url}
    saveUrl={saveUrl}
    onLoad={onLoad}
    onPost={onPost}
  />,
  document.getElementById('form-builder')
)

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar')
)
