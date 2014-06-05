var pathTranslator = require('./pathTranslator'),
    fsManager = require('./fileSystemManager'),
    rBuilder = require('./responseBuilder'),
    logger = require('./logger'),
    Guid = require('guid');



function onRequest(request, response){
    var fsPath,
        guid = Guid.create().value,
        sessionLogger = logger.getSessionLogger( guid + ' - ' );
    //first we identify the file we need to get
    fsPath = pathTranslator.getFileSystemPath(sessionLogger, request.url, request.method);

    //then we ask the OS to give us the file
    fsManager.getFileInfo( sessionLogger, fsPath ).then( function( fileInfo ){
        var responseInfo;

        //then, we translate that to the structure of an HTTP response
        responseInfo = rBuilder.buildResponse( sessionLogger, fileInfo );
    
        //and finally... we respond the client
        response.writeHead(responseInfo.code, { 'Content-Type': responseInfo.type });
        response.end(responseInfo.message, 'utf-8');
    });

};



module.exports={
    onRequest: onRequest
}