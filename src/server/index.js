import 'babel-polyfill';
import Koa from 'koa';
import KoaStatic from 'koa-static';
import KoaRouter from 'koa-router';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../share/app';
import { StaticRouter, matchPath } from 'react-router-dom';
import routes from '../share/routes';
import serialize from 'serialize-javascript';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';

const app = new Koa();
const router = new KoaRouter();

router.get('/api/*', async (ctx, next) => {
    const url = ctx.request.url.replace(/^\/api/, '');
    const startTime = +Date.now();
    ctx.body = await fetch(`http://www.hostedredmine.com${url}`).then(res => res.json());
    console.log('接口请求耗时: ', +Date.now() - startTime, 'ms');
});

router.get('*', async (ctx, next) => {
    const context = {};
    const { request } = ctx;
    const route = routes.find(r => matchPath(request.path, r));
    const fn = _.get(route, 'component.prototype.prefetch');

    if (typeof fn === 'function') {
        context.prefetch = await fn(request.query);
    }

    const app = renderToString(
        <StaticRouter location={request.url} context={context}>
            <App/>
        </StaticRouter>,
    );

    ctx.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>ssr</title>
        </head>
        <body>
            <div id="app">${app}</div>
            <script>window.__INITIAL_DATA__ = ${serialize(context.prefetch)}</script>
            <script src="/client.js"></script>
        </body>
        </html>
    `;
});

app.use(KoaStatic('build'));
app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening on 3000');
});