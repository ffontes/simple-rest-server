var q = require('q'),
    fs = require('fs');

function getFileInfo(sessionLogger, path){
    var deferred= q.defer();
        fileInfo= {};

    sessionLogger.trace( 'Checking for %s existence'.build( path ) );
    fs.exists(path, function(fileExistence) {

        fileInfo.exists = fileExistence;
        if(fileExistence){
            sessionLogger.info( '%s exists!'.build(path) );

            fs.readFile(path, function(error, content) {
                fileInfo.error = error || false;

                if (!error){
                    sessionLogger.trace( 'Content: %s'.build(content) );
                    fileInfo.content = content;
                }else{
                    sessionLogger.error( 'Error loading file');
                }

                deferred.resolve(fileInfo);
            })

        }else{
            sessionLogger.warn('file not found');
            deferred.resolve(fileInfo);
        }
    });

    return deferred.promise;
}


module.exports={
    getFileInfo: getFileInfo 

}