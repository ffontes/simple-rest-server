var config = {
    response: {
        defaultContentType: 'application/json'
    },
    fileSystem:{
        extension:'.json'
    },
    logLevel: 'ALL',
    log4js: {
        appenders: [
            { type: 'console'},
            { type: 'file', filename: 'logs/execution.log'}
        ]
    }
};

module.exports = config;