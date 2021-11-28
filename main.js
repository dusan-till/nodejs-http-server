const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const url = require('url');
const port = 80;
const content_types = {
    ".css": "text/css",
    ".html": "text/html",
    ".xml": "application/xml",
    ".xhtml": "application/xhtml+xml",
    ".js": "application/javascript",
    ".apng": "image/apng",
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".jpe": "image/jpeg",
    ".jif": "image/jpeg",
    ".jfif": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp"
}

const requestListener = async function (req, res) {
    let path_ = __dirname + url.parse(req.url, `http://${req.headers.host}`).pathname;
    console.log(path_)
    let file = await fs.readFile(path_);
    res.setHeader("Content-Type", content_types[path.extname(path_)] || "text/plain");
    res.writeHead(200);
    res.end(file);
}

const server = http.createServer(requestListener);
server.listen(port);