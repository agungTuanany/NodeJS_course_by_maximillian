"use strict";

// Dependencies
const fs = require("fs")

const reqeustHandler = (request, response) => {

    const url = request.url;
    const method = request.method;

    if (url === "/") {
        response.setHeader("Content-Type", "text/html");
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

            body.push(chunk);
        });

        request.on("end", () => {

            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];

            // Caused non block I/O
            fs.writeFile("message.txt", message, err => {

                if (err) return console.log("Error on fs.writeFile:", err)

                // The response should be done while working with the 'fs'
                response.statusCode = 302; // Redirection
                response.setHeader("location", "/");

                return response.end();
            });
        });
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
};

/*
 * Ways for exports and imports
 */


module.exports = {
    handler  : reqeustHandler,
    someText : "Some hard coded text"
};

// Or
// module.exports = reqeustHandler;

// Or
// module.exports.handler = reqeustHandler;
// module.exports.someText = "Some hard coded text";

// Or
// exports.handler = reqeustHandler;
// exports.someText = "Some hard coded text";
