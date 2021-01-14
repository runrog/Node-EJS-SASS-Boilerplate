const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mime = require('mime');

const port = 2001;

http.createServer((request, response) => {
  const req = request.url;

  let filePath = `.${request.url}`;

  const cleanRoute = (route) => {
    let r = route;
    if (!route.endsWith('/')) {
      r = `${route}/`;
    }
    return r;
  };

  // when loading routes aka directory paths
  if (path.extname(req).trim() === '') {
    const route = cleanRoute(`${__dirname}/src${req}`);
    console.log('\x1b[37m loading route: ', req); // eslint-disable-line
    filePath = (`${route}/index.ejs`).replace('//index.ejs', '/index.ejs');
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
        console.log(err); // eslint-disable-line
      }
    });
  }

  // load assets locally
  if (path.dirname(req).match(/\/_images/gi)) {
    filePath = `./src/_images/${path.basename(req)}`;
  }

  // load dist locally
  if (path.dirname(req).match(/\/dist/gi)) {
    const pathInDist = req.split('/dist/')[1];
    filePath = `./dist/${pathInDist}`;
  }

  const charSet = 'utf-8';
  const contentType = mime.getType(path.basename(filePath));

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile('./404.html', () => {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, charSet);
        });
      } else {
        response.writeHead(500);
        response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
        response.end();
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, charSet);
    }
  });
}).listen(port);
