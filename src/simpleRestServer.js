var express = require("express");
var handler = require("./requestHandler.js");
//var app = express();
//app.use(express.logger());

var port = process.env.PORT || 5000;

function init(){
    express.createServer(function (request, response) {
    	response.header("Access-Control-Allow-Origin", "*");
  		response.header("Access-Control-Allow-Headers", "X-Requested-With");
        handler.onRequest(request, response);
    }).listen(port);

    console.log("Listening on " + port);    
}

module.exports={
    init:init
};