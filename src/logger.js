var log4js = require('log4js'),
    config = require('./config'),
    _ = require('underscore'),
    _s = require('underscore.string');

//setup
log4js.configure( config.log4js );
var logger = log4js.getLogger();
logger.setLevel( config.logLevel );

//done
logger.info("Initialized logger");


//appends composite build method to string so that it is used for logging
String.prototype.build=function(){
    // logger.trace( 'String is '+ this);
    // logger.trace( 'arguments: '+ JSON.stringify(arguments) );

    //sprintf needs the text as first param, then the objects for replacement
    //we'll use flatten to get a single level array for the params
    //then pass them in to apply
    var params =_.flatten( [this, arguments]) ;

    // logger.trace( 'params: '+ JSON.stringify(params) );
    // logger.trace( 'apply: '+ _s.sprintf.apply(undefined, params ) );
    
    return _s.sprintf.apply(undefined, params );
}

function getSessionLogger(sessionId){
    function fatal(text){ logger.fatal( sessionId + text ) }
    function error(text){ logger.error( sessionId + text ) }
    function warn(text){ logger.warn( sessionId + text ) }
    function info(text){ logger.info( sessionId + text ) }
    function debug(text){ logger.debug( sessionId + text ) }
    function trace(text){ logger.trace( sessionId + text ) }

    return {
        fatal: fatal,
        error: error,
        warn: warn,
        info: info,
        debug: debug,
        trace: trace
    };

}


module.exports={
    getSessionLogger: getSessionLogger
};