import React from 'react';
import ReactDOM from 'react-dom';
import App from '../share/app';

const data = 'hello ssr';

ReactDOM.hydrate(<App data={data}/>, document.getElementById('app'));