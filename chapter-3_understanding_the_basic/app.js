const http = require("http");


const server = http.createServer((request, response) => {

    console.log("=======================================================")
    console.log("URL:", request.url);
    console.log("=======================================================")
    console.log("METHOD:", request.method)
    console.log("=======================================================")
    console.log("HEADERS:", request.headers)
    process.exit();
});

server.listen(8088);
