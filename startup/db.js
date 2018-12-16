const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
    const conn = config.get('db');
mongoose.connect(conn)
    .then(() => winston.info(`Connected to ${conn}`));
}

// development
// test

// set NODE_ENV development