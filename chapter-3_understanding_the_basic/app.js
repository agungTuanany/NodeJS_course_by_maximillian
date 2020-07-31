const http = require("http");


const server = http.createServer((request, response) => {

    response.setHeader("Content-Type", "text/html")
    response.write(`
        <html lang="en">
            <head>
                <title>My firts Page</title>
            </head>
            <body>
                <h1>Hello from Node.JS server!</h1>
            </body>
        </html>
        `);

    response.end()

    console.log("=================================")
    console.log("RESPONSE HEADERS:", response._header)
    console.log("=================================")
    console.log("REQUEST HEADERS:", request.headers)
    console.log("=================================")
});

server.listen(8088);
