var config = require('./config');

function buildResponse(sessionLogger, fileInfo){
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

    sessionLogger.trace( 'Response is : %s'.build( responseInfo.code ));
    return responseInfo;
}


module.exports = {
    buildResponse: buildResponse
};