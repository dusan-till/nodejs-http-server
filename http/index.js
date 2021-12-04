//site on request generation test

res.setHeader("Content-Type", "text/html");
res.writeHead(200);
res.end(`
    <html>
        <body>
            <p>HTTP headers: ${JSON.stringify(req.headers)}</p>
            <p>HTTP version: ${req.httpVersion}</p>
            <p>HTTP method: ${req.method}</p>
            <p>Socket remote address: ${req.socket.remoteAddress}</p>
            <p>Socket remote port: ${req.socket.remotePort}</p>
            <p>Socket timeout: ${req.socket.timeout}</p>
            <p>Socket readyState: ${req.socket.readyState}</p>
            <p>HTTP url: ${curURL.href}</p>
        </body>
    </html>
`);