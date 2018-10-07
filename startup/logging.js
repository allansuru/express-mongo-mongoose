const winston = require('winston');
require('winston-mongodb');
require('express-async-errors'); 

module.exports = function() {
    winston.handleExceptions(new winston.transports.File({
        filename: 'uncaughtException.log'
      }));
      
      process.on('unhandledRejection', (ex) => {
        throw ex;
      });
      
      winston.add(winston.transports.File, {
        filename:'error.log',
        level: 'error'
      });
      winston.add(winston.transports.MongoDB,
         { 
            db: 'mongodb://localhost/vidly',
            level: 'info'
         });
      
        
        // simulando um unhandledReject ion
        //  const p = Promise.reject(new Error('erro reject promise'));
        //  p.then(() => console.log('Done'));
}