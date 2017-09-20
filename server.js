const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const port = 2001;

http.createServer((request, response) => {
  let filePath = `.${request.url}`;

  if (filePath === './') {
    filePath = './index.ejs';
  }

  const extname = path.extname(filePath);

    // Render our ejs
  if (extname === '.ejs') {
    ejs.renderFile(filePath, { env: 'dev' }, (err, str) => {
      // render on success
      if (!err) {
        response.end(str);
      } else {
        // render or error
        response.end('An error occurred, see error in terminal');
        console.log(err);
      }
    });
  }

  let contentType = 'text/html';

  if (extname === '.js') {
    contentType = 'text/javascript';
  }
  if (extname === '.css') {
    contentType = 'text/css';
  }
  if (extname === '.json') {
    contentType = 'application/json';
  }
  if (extname === '.png') {
    contentType = 'image/png';
  }
  if (extname === '.jpg') {
    contentType = 'image/jpg';
  }
  if (extname === '.wav') {
    contentType = 'audio/wav';
  }
  if (extname === '.svg') {
    contentType = 'image/svg+xml';
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile('./404.html', () => {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        });
      } else {
        response.writeHead(500);
        response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
        response.end();
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}).listen(port);
