const http = require('http');
const fs = require('fs');
const _= require("lodash");
const server = http.createServer((request,response) =>{
    console.log("Request has been made");
    // lodash {
        const num = _.random(0,20);
        console.log(num);
    // }

    // setHeader() it is used to set header here content-type is header name
    response.setHeader("Content-Type","text/html");

    // response.write("Hello Harsh");
    // response.write("<h1>Hello Harsh</h1>");
    // response.write("<h2>Hello Harsh</h2>");
    //response.end();

    //ROUTING
    let path = "./views/";
    switch(request.url) {
        case "/":
            path+="index.html";
            response.statusCode = 200;
            break;
        case "/about":
            path+="about.html";
            response.statusCode = 200;
            break;
        case "/about-us":
            response.statusCode = 301;
            //here setHeader() is used to redirect the by adding Location header
            response.setHeader("Location","/about");
            response.end();
            break;
        default:
            path+="404.html";
            response.statusCode = 404;
            break;
    }
    //sending a html file as response
    fs.readFile(path,(err,data)=>{
        if(err) {
            console.log(err);
            response.end();
        } else {
            response.write(data);
            response.end();
        }
    });

});

server.listen(3000, 'localhost',()=>{
    console.log(`Listening on port 3000`);
})