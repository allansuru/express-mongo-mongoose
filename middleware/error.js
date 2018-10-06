const winston = require('winston');
var moment = require('moment'),
      timestamp = moment().format('DD-MM-YYYY HH:mm:ss');

module.exports =  function(err, req, res, next) {
    // Log de excessão
    //  error: 0, warn: 1, info: 2,  verbose: 3,  debug: 4, silly: 5 
  //  winston.error(err.message, err);
    winston.error(err.message + ' ' +  timestamp, err);
    res.status(500).send('Error on server!')
  }