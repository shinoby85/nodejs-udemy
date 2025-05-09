const http = require('http');

const server = http.createServer((req, res) => {
  // console.log(req);
  console.log(req.url, req.method, req.headers);
  res.write('<html>');
  res.write('<head><title>My first page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
  // process.exit(1);
});

server.listen(3000);
