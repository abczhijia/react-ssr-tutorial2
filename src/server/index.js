import Koa from 'koa';

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello server';
});

app.listen(3000, () => {
    console.log('server is listening on 3000');
});