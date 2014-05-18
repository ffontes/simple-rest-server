var q = require('q'),
    fs = require('fs'),
    logger = require('./logger'),
    _s = require('underscore.string');

function getFileInfo(guid, path){
    var deferred= q.defer();
        fileInfo= {};

    logger.trace( _s.sprintf( '%s Checking for %s existence', guid, path ));
    fs.exists(path, function(fileExistence) {

        fileInfo.existence = fileExistence;
        if(fileExistence){
            logger.info( _s.sprintf( '%s %s exists!', guid, path));

            fs.readFile(fileSystemPath, function(error, content) {
                fileInfo.error= error;

                if (!error){
                    logger.trace( _s.sprintf( '%s Content: %s', guid, content));
                    fileInfo.content = content;
                }else{
                    logger.error( _s.sprintf( '%s error loading file', guid));
                }

                deferred.resolve(fileInfo);
            })

        }else{
            logger.warn( _s.sprintf( '%s file not found', guid));
            deferred.resolve(fileInfo);
        }
    });

    return deferred.promise;
}


module.exports={
    getFileInfo: getFileInfo 

}