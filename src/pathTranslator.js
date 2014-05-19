var config = require('./config');
var rootPath = './services';


function getFileSystemPath(sessionLogger, url, method){
    sessionLogger.trace('%s request at: %s'.build(method, url) ) ;
    
    var filePath = rootPath + url + "/" + method + config.fileSystem.extension;
    sessionLogger.debug('File Path is: %s '.build( filePath ) ) ;
    
    return filePath;
}

module.exports ={
    getFileSystemPath: getFileSystemPath
};