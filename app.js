const http = require('http');

const port = process.env.PORT || 8080;

const server = http.createServer((request, response) => {
  if (request.url === '/healthz') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({
    app: 'nodejs-argocd-demo',
    message: 'Hello from Node.js on Kubernetes',
    version: process.env.APP_VERSION || '1.0.0'
  }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Node.js app listening on port ${port}`);
});