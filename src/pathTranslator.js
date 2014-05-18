var config = require('./config'),
    logger = require('./logger'),
    _s = require('underscore.string');
var rootPath = './services';


function getFileSystemPath(guid, url, method){
    logger.trace('%s %s request at: %s', guid, method, url);
    
    var filePath = rootPath + url + "/" + method + config.fileSystem.extension;
    logger.debug('%s File Path is: %s ', guid, filePath);
    
    return filePath;
}

module.exports ={
    getFileSystemPath: getFileSystemPath
};