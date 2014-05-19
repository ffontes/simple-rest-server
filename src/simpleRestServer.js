var express = require("express");
var handler = require("./requestHandler.js");
//var app = express();
//app.use(express.logger());

var port = process.env.PORT || 5000;

function init(){
    express.createServer(function (request, response) {
        handler.onRequest(request, response);
    }).listen(port);

    console.log("Listening on " + port);    
}

module.exports={
    init:init
};