const winston = require('winston');
const config = require('config')
require('winston-mongodb');

const dbConnect = config.get(`${process.env.NODE_ENV}.dbConfig.connect`);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
        }),
        winston.add(new winston.transports.MongoDB({
            level: 'error',
            db: `mongodb://${dbConnect}`,
            options: { useUnifiedTopology: true }
        })),
        winston.add(new winston.transports.MongoDB({
            level: 'debug',
            db: `mongodb://${dbConnect}`,
            options: { useUnifiedTopology: true }
        })),
    ],
});



logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports
      logger.debug(message);
    }
  };

logger.combinedFormat = function (err, req, res) {
    // Similar combined format in morgan
    // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
    return `${req.ip} - -  date: ${new Date().toLocaleString('en-GB', {
        hour12: false,
        timeZone: 'Europe/Berlin',
    })}, "${req.method} ${req.originalUrl} HTTP/${req.httpVersion} }" - ${
        req.headers['user-agent']
    }`;
};

module.exports = logger;
