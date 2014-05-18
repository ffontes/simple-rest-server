var express = require("express");
var handler = require("./src/requestHandler.js");
//var app = express();
//app.use(express.logger());

var port = process.env.PORT || 5000;

express.createServer(function (request, response) {
    handler.onRequest(request, response);
}).listen(port);

console.log("Listening on " + port);

// var port = process.env.PORT || 5000;
// app.listen(port, function() {
//   console.log("Listening on " + port);
// });
