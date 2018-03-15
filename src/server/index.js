import Koa from 'koa';
import KoaStatic from 'koa-static';
import KoaRouter from 'koa-router';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../share/app';

const app = new Koa();
const router = new KoaRouter();

router.get('*', (ctx, next) => {
    const data = 'hello ssr';
    const app = renderToString(<App data={data}/>);

    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>ssr</title>
    </head>
    <body>
        <div id="app">${app}</div>
        <script src="/client.js"></script>
    </body>
    </html>`;
});

app.use(KoaStatic('build'));
app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening on 3000');
});