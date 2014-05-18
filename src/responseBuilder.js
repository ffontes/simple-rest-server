var config = require('./config'),
    logger = require('./logger'),
    _s = require('underscore.string');

function buildResponse(guid, fileInfo){
    var responseInfo ={
            code: null, 
            content: '', //default
            type:'text/html' //default
    };

    if (fileInfo.exists && ! fileInfo.error){
        responseInfo.code = 200;
        responseInfo.message = fileInfo.content;
        //no need to evaluate mime type
        responseInfo.type = config.response.defaultContentType; //trutty
    }else{
        responseInfo.code= fileInfo.exists? 500:404;
        responseInfo.message= fileInfo.exists? 'Oooops!':'Not Found';
    }

    logger.trace( _s.sprintf( '%s Response is : %s', guid, responseInfo.code ));
    return responseInfo;
}


module.exports = {
    buildResponse: buildResponse
};