const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const url = require('url');
const port = 8080;
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
    //parsing request
    let path_ = __dirname + "/http" + url.parse(req.url, `http://${req.headers.host}`).pathname;

    //finding the file
    let notfound = false;
    let file;
    try {
        let stat = await fs.stat(path_);
        if(stat.isDirectory()) {
            if(path_[path_.length-1] == path.delimiter) {
                path_ += "index.html";
            } else {
                path_ += "/index.html";
            }
        } else if(stat.isFile()) {
            file = await fs.readFile(path_);
        } else {
            file = "";
            notfound = true;
        }
    }
    catch(err) {
        console.log(err.code);
        file = "";
        notfound = true;
    }

    //sending response
    res.setHeader("Content-Type", content_types[path.extname(path_)] || "text/plain");
    if(notfound) {
        res.writeHead(404);
    } else {
        res.writeHead(200);
    }
    res.end(file);
}

const server = http.createServer(requestListener);
server.listen(port);