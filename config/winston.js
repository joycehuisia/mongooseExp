const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      json: true,
      colorize: true,
      filename: 'logs/log.log',
      level: 'error'
    })
  ]
});

module.exports = logger;
