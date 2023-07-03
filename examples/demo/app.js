import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFormBuilder } from 'react-form-builder2';
import DemoBar from './demobar';
import * as variables from './variables';

import 'react-form-builder2/dist/app.css';

const app = ReactDOM.createRoot(
  document.getElementById('form-builder'),
);
app.render(
  <React.StrictMode>
    <ReactFormBuilder variables={variables}
      url='/api/formdata'
      saveUrl='/api/formdata'
    />
  </React.StrictMode>,
);

const demo = ReactDOM.createRoot(
  document.getElementById('demo-bar'),
);
demo.render(<DemoBar variables={variables} />);
