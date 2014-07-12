var config = require('./config');
var rootPath = './services';


function getFileSystemPath(sessionLogger, url, method){
    sessionLogger.trace('%s request at: %s'.build(method, url) ) ;
    
    var filePath = rootPath + url + "/" + method + config.fileSystem.extension;
    sessionLogger.debug('File Path is: %s '.build( filePath ) ) ;
    
    return filePath;
}

function isSetPath(sessionLogger, url){
    var urlPaths = url.split("/");
    if(urlPaths[urlPaths.length-1].indexOf('set_') === 0){
        return true;
    }else{
        return false;
    }
}

module.exports ={
    getFileSystemPath: getFileSystemPath,
    isSetPath: isSetPath
};