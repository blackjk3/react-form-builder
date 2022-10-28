import React from 'react';
import ReactDOM from 'react-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import DemoBar from './demobar';
import * as variables from './variables';

import 'react-form-builder2/dist/app.css';

ReactDOM.render(
  <ReactFormBuilder variables={variables}
    url='/api/formdata'
    saveUrl='/api/formdata'
  />,
  document.getElementById('form-builder'),
);

ReactDOM.render(
  <DemoBar variables={variables} />,
  document.getElementById('demo-bar'),
);
