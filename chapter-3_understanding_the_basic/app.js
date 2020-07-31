const http = require("http");


const server = http.createServer((request, response) => {

    const url = request.url;

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
        return response.end() // It set cause we should not call any response.write() or response.setHeader() after.


    }

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

    // console.log("=================================")
    // console.log("RESPONSE HEADERS:", response._header)
    // console.log("=================================")
    // console.log("REQUEST HEADERS:", request.headers)
    // console.log("=================================")
});

server.listen(8088);
