"use strict";

const http = require("http");
const fs   = require("fs");


const server = http.createServer((request, response) => {

    const url = request.url;
    const method = request.method;

    if (url === "/") {
        response.setHeader("Content-Type", "text/html")
        response.write(`
            <html lang="en">
                <head>
                    <title>Enter Message</title>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message" placeholder="write some data...">
                        <button type="submit">submit</button>
                    </form>
                </body>
            </html>
        `);

        return response.end(); // It set cause we should not call any response.write() or response.setHeader() after.
    };

    if (url === "/message" && method === "POST") {

        const body = [];
        request.on("data", (chunk) => {

            console.log("======================");
            console.log("chunk from request.on('data'):", chunk);
            console.log("======================");
            body.push(chunk);
        });

        request.on("end", () => {

            const parsedBody = Buffer.concat(body).toString();
            console.log("parsed chunk:", parsedBody)
            console.log("======================");

            // const desctructuringBody = { ...parsedBody }
            // console.log("desctructuringBody:", desctructuringBody)
            // console.log("======================");

            // const rawMessage = parsedBody.split()[0]
            // console.log("rawMessage :", rawMessage)
            // console.log("======================");

            // const rawMessage1 = parsedBody.split("message")[0]
            // console.log("rawMessage1:", rawMessage1)
            // console.log("======================");

            // const rawMessage2 = parsedBody.split("message")[1]
            // console.log("rawMessage2:", rawMessage2)
            // console.log("======================");

            // const rawMessage3 = parsedBody.split("=")[0]
            // console.log("rawMessage3 ", rawMessage3)
            // console.log("======================");

            const message = parsedBody.split("=")[1];
            console.log("parsedBody.split:", message)
            console.log("======================");

            fs.writeFileSync("message.txt", message);
        });

        response.statusCode = 302; // Redirection
        response.setHeader("location", "/");

        return response.end();
    };

    response.setHeader("Content-Type", "text/html");
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

    response.end();
});

server.listen(8088);
