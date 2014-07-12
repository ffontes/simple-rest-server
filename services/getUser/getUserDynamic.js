
function executeController(sessionLogger, method, payload, urlParams){
    sessionLogger.trace('Controller get executed %s request with payload: %s and params: %s'.build(method, payload, urlParams) ) ;
    return "./services/getUser/"+method+".json";
}

module.exports={
    executeController: executeController
}