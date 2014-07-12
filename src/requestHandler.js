var pathTranslator = require('./pathTranslator'),
    fsManager = require('./fileSystemManager'),
    rBuilder = require('./responseBuilder'),
    logger = require('./logger'),
    Guid = require('guid');



function onRequest(request, response) {

    var fsPath,
        guid = Guid.create().value,
        sessionLogger = logger.getSessionLogger(guid + ' - ');

    var responseInfo;

    //remove extra parameters from url
    var urlParameters = request.url.replace(request.url.substring(0,request.url.indexOf('?'))+'?','');
    var requestUrl = request.url.replace('?'+urlParameters,'');



    //first we check if it is a set method
    if (pathTranslator.isSetPath(sessionLogger, requestUrl)){
        fsPath = pathTranslator.getFileSystemPath(sessionLogger, requestUrl, request.method);
        var data = '';
        request.on('data', function(chunk) {
            data += chunk;
        });
        request.on('end', function() {
            fsManager.createFile(sessionLogger, fsPath, request.method, data).then(function(filePath){
                //then, we translate that to the structure of an HTTP response
                responseInfo = rBuilder.buildCreateResponse(sessionLogger);

                //and finally... we respond the client
                response.writeHead(responseInfo.code, { 'Content-Type': responseInfo.type });
                response.end(responseInfo.message, 'utf-8');
            });
        });

    }else{
        //first we check if it has a dynamic controller
        fsManager.getDynamicController(sessionLogger, request).then(function(fileUrl){
            if(fileUrl != null){
                //we obtain the identify the file we need to get
                fsPath = fileUrl;
            }else{
                //we identify the file we need to get
                fsPath = pathTranslator.getFileSystemPath(sessionLogger, requestUrl, request.method);
            }

            //then we ask the OS to give us the file
            fsManager.getFileInfo( sessionLogger, fsPath ).then( function( fileInfo ){
                //then, we translate that to the structure of an HTTP response
                responseInfo = rBuilder.buildResponse( sessionLogger, fileInfo );

                //and finally... we respond the client
                response.writeHead(responseInfo.code, { 'Content-Type': responseInfo.type });
                response.end(responseInfo.message, 'utf-8');
            });
        });
    }
};

module.exports={
    onRequest: onRequest
}