const devLogger = require('./logger');
require('dotenv').config();

let logger = null;

if(process.env.NODE_ENV != 'production'){
    logger = devLogger();

    if(!logger){
        console.log('Logger not initiated properly');
        process.exit(1);
    }

    console.log('Winston dev logger initiated!');
}

module.exports = logger;