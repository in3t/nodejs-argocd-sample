const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_request, response) => {
  response.json({
    name: 'Node.js Argo CD sample',
    status: 'running',
    version: process.env.APP_VERSION || 'local'
  });
});

app.get('/healthz', (_request, response) => response.status(200).send('ok'));
app.get('/readyz', (_request, response) => response.status(200).send('ready'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
