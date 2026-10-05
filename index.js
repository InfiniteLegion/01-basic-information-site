const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const routes = require("./routes.js");

const dir = path.join(__dirname, "pages");

const server = http.createServer(async (req, res) => {
    const myURL = new URL(req.url, "http://localhost:3000");

    const pathname = myURL.pathname;
    const filename = routes[pathname];

    try {
        if (!filename) {
            res.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8",
            });

            const content = await fs.readFile(path.join(dir, "404.html"));

            res.end(content);
            return;
        }

        const filepath = path.join(dir, filename);
        const content = await fs.readFile(filepath);

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });

        res.end(content);
    } catch (err) {
        console.error(err);

        res.writeHead(500, {
            "Content-Type": "text/plain; charset=utf-8",
        });

        res.end("500 - Server inner error");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});