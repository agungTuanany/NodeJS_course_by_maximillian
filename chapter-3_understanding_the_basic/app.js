const http = require("http");


const server = http.createServer((request, response) => {

    console.log(request);
    process.exit();
});

server.listen(8088);
