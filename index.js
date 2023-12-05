const http = require("http");
const url = require("url");

let homePageCounter = 0;
let aboutPageCounter = 0;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/") {
    homePageCounter++;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Welcome to the Home Page</h1>`);
    res.write(`<p>Number of visits: ${homePageCounter}</p>`);
    res.write(`<a href="/about">About Page</a>`);
    res.end();
  } else if (parsedUrl.pathname === "/about") {
    aboutPageCounter++;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Welcome to the About Page</h1>`);
    res.write(`<p>Number of visits: ${aboutPageCounter}</p>`);
    res.write(`<a href="/">Home Page</a>`);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write(`404 Not Found`);
    res.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
