const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8000;

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

http.createServer((req, res) => {
  try {
    const decoded = decodeURIComponent(req.url.split('?')[0]);
    let p = path.normalize(decoded).replace(/^([\x00-\x1f]|\.{2,})+/g, '');
    if (p === '/' || p === '') p = '/index.html';
    const filepath = path.join(process.cwd(), p);
    fs.stat(filepath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      const ext = path.extname(filepath).toLowerCase();
      const type = mime[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', type);
      const stream = fs.createReadStream(filepath);
      stream.pipe(res);
    });
  } catch (e) {
    res.statusCode = 500;
    res.end('Server error');
  }
}).listen(port, () => console.log(`Static server listening on http://localhost:${port}`));
