import React from 'react';
import ReactDOM from 'react-dom';
import DemoBar from './demobar';
import FormBuilder from './src/index';
import * as variables from './variables';
// import { get, post} from './src/stores/requests';
// Add our stylesheets for the demo.
require('./scss/application.scss');

const url = '/api/formdata';
const saveUrl = '/api/formdata';

const content = [
  {
    id: 'C68B673B-3948-4D62-AF6D-5320CAB4DDB7',
    element: 'TextInput',
    text: 'Text Input',
    required: true,
    canHaveAnswer: true,
    field_name: 'text_input_EEA6F5DA-5C2C-43D3-AB62-62385E3925D9',
    label: '<div>Name</div>\n',
  },
  {
    id: '6DAF1E95-44F6-4E5B-ABDD-D9A6BCA2C08A',
    element: 'TextInput',
    text: 'Text Input',
    required: true,
    canHaveAnswer: true,
    field_name: 'text_input_C5305462-9704-4E77-BFAB-A43C14AB2B8E',
    label: '<div>Email</div>\n',
  },
];

// const onLoad = function() {
//   console.log('onLoad');
//   return get(url);
// }

// const onPost = function(data) {
//   console.log('onPost', data);
//   post(saveUrl, data);
// }

ReactDOM.render(
  <FormBuilder.ReactFormBuilder variables={variables}
    url={url}
    saveUrl={saveUrl}
    data={content}
  />,
  document.getElementById('form-builder'),
);

// ReactDOM.render(
//   <FormBuilder.ReactFormBuilder variables={variables}
//     onLoad={onLoad}
//     onPost={onPost}
//   />,
//   document.getElementById('form-builder')
// )

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar'),
);
