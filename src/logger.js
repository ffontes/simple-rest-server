var log4js = require('log4js'),
    config = require('./config');

//setup
log4js.configure( config.log4js );
var logger = log4js.getLogger();
logger.setLevel( config.logLevel );

//done
logger.info("Initialized logger");

module.exports=logger;