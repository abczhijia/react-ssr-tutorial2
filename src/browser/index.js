import React from 'react';
import ReactDOM from 'react-dom';
import App from '../share/app';
import { BrowserRouter } from 'react-router-dom';

const data = 'hello ssr';

ReactDOM.hydrate(
    <BrowserRouter>
        <App data={data}/>
    </BrowserRouter>,
    document.getElementById('app'),
);