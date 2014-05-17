var express = require("express");
//var app = express();
var fs = require('fs');
var mimeLookup = require('mime');

//app.use(express.logger());

var port = process.env.PORT || 5000;

express.createServer(function (request, response) {
//app.get('/', function(request, response) {

    console.log('GET request at: '+ request.url);
    var rootPath = './services',
        filePath = rootPath + request.url + "/" + request.method + ".json";

    console.log('PATH is: '+ filePath);

    fs.exists(filePath, function(exists) {
        console.log('exists '+ filePath);
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    console.log('500 '+ filePath);

                    response.send(500);
                }
                else {
                    console.log('mime '+ filePath);
                    var contentType = mimeLookup.lookup(filePath);
                    // response.set('Content-Type',contentType);
                    // response.send(200,content);

                    console.log('200 '+ filePath);
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            console.log('404 '+ filePath);
            response.status(404).send('Not found');
            //response.send(404, filePath);
        }
    });
}).listen(port);
console.log("Listening on " + port);

// var port = process.env.PORT || 5000;
// app.listen(port, function() {
//   console.log("Listening on " + port);
// });
