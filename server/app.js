/* eslint-disable */
const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const compress = require('koa-compress');
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const historyApiFallback = require('koa2-connect-history-api-fallback');
const UAEConfig = require('../conf/config.json');

const app = new Koa();
const port = parseInt(process.env.PORT, 10) || 5222;

app.use(compress());

app.use(async (ctx, next) => {
  for await (const proxyConfig of UAEConfig.proxyMap || []) {
    if (ctx.url.startsWith(proxyConfig.routePath)) {
      ctx.respond = false;
      await k2c(
        createProxyMiddleware({
          target: proxyConfig.target,
          changeOrigin: true,
        }),
      )(ctx, next);
      return;
    }
  }

  await next();
});

app.use(async (ctx, next) => {
  await next();

  ctx.cookies.set('UAE_MODE', process.env.UAE_MODE, { httpOnly: false });
  ctx.set('Access-Control-Allow-Origin', '*');

  if (ctx.path === '/' || ctx.path === '/index.html') {
    ctx.set('cache-control', 'no-cache');
  }
});

const serveOptions = {
  maxage: 30 * 24 * 60 * 60 * 1000,
};

app.use(historyApiFallback());
app.use(serve('./build', serveOptions));
app.use(mount('/test', serve('./build', serveOptions)));
app.listen(port);
console.log(`> [start web on port] ${port}`);
