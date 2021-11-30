const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const url = require('url');
const vm = require('vm');

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
    const path_ = __dirname + "/http" + new url.URL(req.url, `http://${req.headers.host}`).pathname;

    let stat;

    try {
        stat = await fs.stat(path_);
    }
    catch(err) {
        res.writeHead(404);
        res.end();
        return
    }

    if(stat.isFile()) {
        let file;

        try {
            file = await fs.readFile(path_);
        }
        catch(err) {
            res.writeHead(404);
            res.end();
            return
        }

        res.setHeader("Content-Type", content_types[path.extname(path_)] || "text/plain");
        res.writeHead(200);
        res.end(file);
    } else if(stat.isDirectory()) {
        try {
            let context = {req, res}
            vm.createContext(context);

            const code = await fs.readFile(path_ + "/index.js");
            vm.runInContext(code, context);

            res = context.res;
        }
        catch(err) {
            res.writeHead(404);
            res.end();
            return
        }
    } else {
        res.writeHead(404);
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(port);