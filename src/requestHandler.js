var pathTranslator = require('./pathTranslator'),
    fsManager = require('./fileSystemManager'),
    rBuilder = require('./responseBuilder'),
    logger = require('./logger'),
    Guid = require('guid');



function onRequest(request, response){
    var fsPath,
        guid = Guid.create().value;
    //first we identify the file we need to get
    fsPath = pathTranslator.getFileSystemPath(guid, request.url, request.method);

    //then we ask the OS to give us the file
    fsManager.getFileInfo( guid, fsPath ).then( function( fileInfo ){
        var responseInfo;

        //then, we translate that to the structure of an HTTP response
        responseInfo = rBuilder.buildResponse( guid, fileInfo );
    
        //and finally... we respond the client
        response.writeHead(responseInfo.code, { 'Content-Type': responseInfo.type });
        response.end(responseInfo.content, 'utf-8');
    });

};



module.exports={
    onRequest: onRequest
}