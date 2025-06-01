import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';
import DemoBar from './demobar';
import * as serviceWorker from './serviceWorker';
import * as variables from './variables';

const root = createRoot(document.getElementById('form-builder'));
root.render(<App />);

const demoBarRoot = createRoot(document.getElementById('demo-bar'));
demoBarRoot.render(<DemoBar variables={variables} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
