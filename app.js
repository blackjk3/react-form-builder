import React from 'react';
import { createRoot } from 'react-dom/client';
import DemoBar from './demobar';
// eslint-disable-next-line no-unused-vars
import FormBuilder, { Registry } from './src/index';
import * as variables from './variables';

// Add our stylesheets for the demo.
require('./scss/application.scss');

const url = '/api/formdata';
const saveUrl = '/api/formdata';

const App = () => (
  <FormBuilder.ReactFormBuilder
    variables={variables}
    url={url}
    saveUrl={saveUrl}
    locale="en"
    saveAlways={false}
    // toolbarItems={items}
  />
);

const root = createRoot(document.getElementById('form-builder'));
root.render(<App />);

const demoBarRoot = createRoot(document.getElementById('demo-bar'));
demoBarRoot.render(<DemoBar variables={variables} />);
