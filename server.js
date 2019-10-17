const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18next = require('./src/i18n');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();

// const express = require('express');
// const next = require('next');
// const path = require("path");
// const nextI18NextMiddleware = require('next-i18next/middleware').default;

// const { NextI18NextInstance } = require('./src/i18n');

// const port = process.env.PORT || 3000;
// const app = next({ dev: process.env.NODE_ENV !== 'production' });
// const handle = app.getRequestHandler();

// (async () => {
//   await app.prepare();
//   app.setAssetPrefix(process.env.STATIC_PATH);
//   const server = express();
//   server.use(express.static(path.join(__dirname, '../public')));

//   server.use(nextI18NextMiddleware(NextI18NextInstance));

//   server.get('*', (req, res) => handle(req, res));

//   await server.listen(port);
//   console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
// })();
