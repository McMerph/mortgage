/* eslint-disable react/jsx-filename-extension, import/prefer-default-export, react/prop-types */

import 'normalize.css';
import './src/global.css';

const browserUpdate = require('browser-update/update.npm.js');

browserUpdate({
  required: { e: -2, f: -2, o: -2, s: -2, c: -2 },
  insecure: true,
  api: 2019.11,
});

export { default as wrapPageElement } from './wrap-page-element';
