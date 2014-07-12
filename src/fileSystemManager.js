var q = require('q'),
    fs = require('fs');

function getDynamicController(sessionLogger, request,urlParams){
    var deferred = q.defer();
    var indexPath = "./services/index.json";
    var dynamicUrl;

    var urlParameters = request.url.replace(request.url.substring(0,request.url.indexOf('?'))+'?','');
    var requestUrl = request.url.replace('?'+urlParameters,'');
    urlParameters = urlParameters.split('&').join('","');
    urlParameters = urlParameters.split('=').join('":"');
    urlParameters = '{"'+urlParameters+'"}';
    var jsonUrlParameters = JSON.parse(urlParameters);
    fs.readFile(indexPath, function(error, content) {
        if(!error){
            sessionLogger.trace( 'Content: %s'.build(content) );
            var indexInfo = JSON.parse(content);
            var dynamicControllerUrl = indexInfo[requestUrl];
            if(dynamicControllerUrl !== undefined){
                var payload = '';
                request.on('data', function(chunk) {
                    payload += chunk;
                });
                request.on('end', function() {
                    var dynamicController = require(dynamicControllerUrl);
                    dynamicUrl = dynamicController.executeController(sessionLogger, request.method, payload, jsonUrlParameters);
                });
            }else{
                dynamicUrl = null;
            }
        } else{
            sessionLogger.error( 'Error loading dynamic index file');
            dynamicUrl = null;
        }
        deferred.resolve(dynamicUrl);
    });

    return deferred.promise;
}

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

function createFile(sessionLogger, path, method, data){
    var deferred= q.defer();
    //remove set_ from path
    var dirPath = path.replace('set_','');
    var filePath = dirPath;
    //remove json file name to make dir path
    dirPath = dirPath.replace('/'+method+'.json','');
    //create file path dir
    fs.mkdir(dirPath, function(err) {
        var folderExist = true;
        if (err) {
            if (err.code !== 'EEXIST'){
                folderExist = false;
                sessionLogger.error(err); // something else went wrong
            }else{
                sessionLogger.warn('folder alerady exists'); // ignore the error if the folder already exists
            }
        } else {
            // successfully created folder
            sessionLogger.info('folder successfully created');
        }
        //create file
        if(folderExist){
            fs.writeFile(filePath, data, function (err) {
                if (err){
                    sessionLogger.error(err);
                }else{
                    sessionLogger.info( '%s was created successfully!'.build(filePath) );
                }
                deferred.resolve(filePath);
            });
        }
    });
    return deferred.promise;
}

function hasServiceController(sessionLogger, path){

}

module.exports={
    getFileInfo: getFileInfo,
    createFile: createFile,
    getDynamicController: getDynamicController
}