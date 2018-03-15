import Koa from 'koa';
import KoaStatic from 'koa-static';
import KoaRouter from 'koa-router';

const app = new Koa();
const router = new KoaRouter();

router.get('*', (ctx, next) => {
    ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="/client.js"></script>
    </body>
    </html>`;
});

app.use(KoaStatic('build'));
app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening on 3000');
});