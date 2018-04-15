const winston = require("winston");

const level = process.env.LOG_LEVEL || 'debug';

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: level,
      timestamp: function () {
        return (new Date()).toISOString();
      }
    })
  ]
});

module.exports = {
  debug: message => logger.log('debug', message),
  info: message => logger.log('info', message),
  warn: message => logger.log('warn', message),
  error: message => logger.log('error', message),
}
